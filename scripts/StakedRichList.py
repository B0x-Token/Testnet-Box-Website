import time
import json
from web3 import Web3

# --- CONFIG ---
INFURA_URL = "https://sepolia.base.org"
STAKING_CONTRACT = "0x3eA249809f032b1F5AE7B1Dd4986490d05eE2dC2"
TOKEN_CONTRACT = "0x3eA249809f032b1F5AE7B1Dd4986490d05eE2dC2"  # Replace them all with staking
POSITION_FINDER_CONTRACT = "0x3eA249809f032b1F5AE7B1Dd4986490d05eE2dC2"
EVENT_SIGNATURE = "0x9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d"


#JSON_FILE_WEB_SERVER = "/var/www/html/B0x_Staking_user_totals_testnet.json"
JSON_FILE_WEB_SERVER = "1B0x_Staking_user_totals_testnet.json"

JSON_FILE = "B0x_Staking_user_totals_testnet.json"
LOCAL_JSON_FILE = "B0x_Staking_Rich_List_logs.json"


FETCH_INTERVAL_LOGS = 300      # 5 minutes for new logs
FETCH_INTERVAL_BALANCES = 600  # 10 minutes for user balances
BLOCK_CHUNK = 500
START_BLOCK = 30540924

# --- ABIs ---
token_abi = [
    {
        "constant": True,
        "inputs": [{"name": "account","type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name":"","type":"uint256"}],
        "type": "function"
    }
]

position_finder_abi = [
    {
        "inputs": [],
        "name": "getContractTotals",
        "outputs": [
            {"internalType":"uint128","name":"liquidityInStaking","type":"uint128"},
            {"internalType":"uint128","name":"totalPooLLiquidity","type":"uint128"},
            {"internalType":"uint256","name":"total0xBTCStaked","type":"uint256"},
            {"internalType":"uint256","name":"totalB0xStaked","type":"uint256"}
        ],
        "stateMutability":"view",
        "type":"function"
    }
]

# --- Setup Web3 ---
w3 = Web3(Web3.HTTPProvider(INFURA_URL))
token_contract = w3.eth.contract(address=TOKEN_CONTRACT, abi=token_abi)
position_contract = w3.eth.contract(address=POSITION_FINDER_CONTRACT, abi=position_finder_abi)

# --- Load existing JSON ---
try:
    with open(LOCAL_JSON_FILE, "r") as f:
        data = json.load(f)
        user_addresses = set(data.get("user_addresses", []))
        last_block = data.get("last_block", START_BLOCK)
except FileNotFoundError:
    user_addresses = set()
    last_block = START_BLOCK

last_balance_update = 0

while True:
    current_time = time.time()

    # --- Fetch new logs ---
    try:
        latest_block = w3.eth.block_number
        if last_block <= latest_block:
            from_block = last_block
            diditchange = False
            while from_block <= latest_block:
                time.sleep(1)
                to_block = min(from_block + BLOCK_CHUNK - 1, latest_block)
                print(f"Fetching logs from block {from_block} to {to_block}...")
                try:
                    logs = w3.eth.get_logs({
                        "fromBlock": from_block,
                        "toBlock": to_block,
                        "address": STAKING_CONTRACT,
                        "topics": [EVENT_SIGNATURE]
                    })
                    for log in logs:
                        account = Web3.to_checksum_address("0x" + log['topics'][1].hex()[-40:])
                        user_addresses.add(account)
                        diditchange = True
                except Exception as e:
                    print(f"Error fetching logs chunk {from_block}-{to_block}: {e}")

                last_block = to_block + 1
                from_block = to_block + 1

                # Save updated addresses + last_block
                with open(LOCAL_JSON_FILE, "w") as f:
                    json.dump({
                        "last_block": last_block,
                        "user_addresses": list(user_addresses)
                    }, f, indent=4)

        print(f"Fetched logs up to block {latest_block}, total users: {len(user_addresses)}")
    except Exception as e:
        print("Error fetching logs:", e)

    # --- Update user balances every FETCH_INTERVAL_BALANCES seconds ---
    if current_time - last_balance_update >= FETCH_INTERVAL_BALANCES or diditchange:
        try:
            print("Updating user balances...")

            # Fetch balances
            user_balances = {}
            for account in user_addresses:
                time.sleep(2)
                try:
                    balance = token_contract.functions.balanceOf(account).call()
                    print("balance: ", balance)
                    user_balances[account] = balance
                except Exception as e:
                    print(f"Error fetching balance for {account}: {e}")
                    user_balances[account] = 0
                    time.sleep(11)

            # Get contract totals once
            time.sleep(1)
            totals = position_contract.functions.getContractTotals().call()
            liquidityInStaking = totals[0]
            print("liquidityInStaking: ",liquidityInStaking)
            totalPoolLiquidity = totals[1]
            print("totalPoolLiquidity: ",totalPoolLiquidity)
            total0xBTCStaked = totals[2]
            print("total0xBTCStaked: ",total0xBTCStaked)
            totalB0xStaked = totals[3]
            print("totalB0xStaked: ",totalB0xStaked)

            # Compute user totals
            user_totals = {}
            for account, balance in user_balances.items():
                if balance == 0 or totalPoolLiquidity == 0:
                    user_totals[account] = {
                        "balance": balance,
                        "0xBTCStaked": 0,
                        "B0xStaked": 0
                    }
                else:
                    share = balance / liquidityInStaking
                    user_totals[account] = {
                        "balance": balance,
                        "0xBTCStaked": int(total0xBTCStaked * share),
                        "B0xStaked": int(totalB0xStaked * share)
                    }

            # Save final JSON
            with open(JSON_FILE, "w") as f:
                json.dump({
                    "last_block": last_block,
                    "user_addresses": list(user_addresses),
                    "users": user_totals
                }, f, indent=4)

            # Save final JSON
            with open(JSON_FILE_WEB_SERVER, "w") as f:
                json.dump({
                    "last_block": last_block,
                    "user_addresses": list(user_addresses),
                    "users": user_totals
                }, f, indent=4)

            print(f"Updated balances for {len(user_addresses)} users")
            last_balance_update = current_time

        except Exception as e:
            print("Error updating user balances:", e)

    time.sleep(1000)  # short sleep to avoid tight loop

