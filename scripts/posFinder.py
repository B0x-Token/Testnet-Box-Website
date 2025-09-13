import json
import time
import requests
import os
import random
from dataclasses import dataclass, asdict
from typing import List, Dict, Set, Tuple, Optional
from web3 import Web3
from eth_abi import decode
from datetime import datetime

@dataclass
class PoolKey:
    currency0: str
    currency1: str
    fee: int
    tickSpacing: int
    hooks: str
    
    def matches_target(self, target: 'PoolKey') -> bool:
        return (self.currency0.lower() == target.currency0.lower() and
                self.currency1.lower() == target.currency1.lower() and
                self.fee == target.fee and
                self.tickSpacing == target.tickSpacing and
                self.hooks.lower() == target.hooks.lower())

@dataclass
class Position:
    token_id: int
    pool_key: PoolKey
    owner: str
    block_number: int
    tx_hash: str
    timestamp: str

class UniswapV4Monitor:
    def __init__(self, rpc_url: str, start_block: int, save_file: str = "uniswap_v4_data.json"):
        self.rpc_url = rpc_url
        self.web3 = Web3(Web3.HTTPProvider(rpc_url))
        self.start_block = start_block
        self.current_block = start_block
        self.save_file = save_file
        self.max_logs_per_request = 499
        self.max_blocks_per_request = 499  # Limit block range for eth_getLogs
        
        # Retry configuration
        self.max_retries = 5
        self.base_retry_delay = 1.0
        self.max_retry_delay = 60.0
        
        # Contract addresses
        self.position_manager_address = "0xc728AF6267315b5CB7669D7DC4F87f5174adabE8"
        self.nft_address = "0x4B2C77d209D3405F41a037Ec6c77F7F5b8e2ca80"
        
        # Event signatures
        self.create_position_topic = "0x97c3f5c9077358c7266488de6a3ebba41df38417797d90b665239fcb506c840a"
        self.transfer_topic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
        
        # Target pool key
        self.target_pool_key = PoolKey(
            currency0="0x4b20b6e9b678b111Dcc365EaD92b3277B178FB74",
            currency1="0xb379A851AC41bcDF0c2564b88916B10E5A08daAe",
            fee=8388608,
            tickSpacing=60,
            hooks="0x794B1409ef4b40a90eC8AF62EaF4c8bf275e5000"
        )
        
        # Storage
        self.valid_positions: List[Position] = []
        self.invalid_positions: List[Position] = []
        self.nft_owners: Dict[int, str] = {}  # token_id -> owner
        
        # Load existing data if available
        self.load_data()
        
        # Clean up any invalid data from previous runs
        self.cleanup_invalid_data()
        
        print(f"Initialized Uniswap V4 Monitor")
        print(f"Starting from block: {self.current_block}")
        print(f"Position Manager: {self.position_manager_address}")
        print(f"NFT Contract: {self.nft_address}")
        print(f"Save file: {self.save_file}")
        print(f"Max logs per request: {self.max_logs_per_request}")
        print(f"Max blocks per request: {self.max_blocks_per_request}")

    def cleanup_invalid_data(self):
        """Remove any tracked NFT owners that don't have valid positions"""
        if not self.nft_owners:
            return
            
        valid_token_ids = {pos.token_id for pos in self.valid_positions}
        original_count = len(self.nft_owners)
        
        # Remove NFT owners that don't have corresponding valid positions
        self.nft_owners = {token_id: owner for token_id, owner in self.nft_owners.items() 
                          if token_id in valid_token_ids}
        
        removed_count = original_count - len(self.nft_owners)
        if removed_count > 0:
            print(f"Cleaned up {removed_count} invalid NFT ownership records")
            # Save the cleaned data
            self.save_data()

    def exponential_backoff_delay(self, attempt: int) -> float:
        """Calculate exponential backoff delay with jitter"""
        delay = min(self.base_retry_delay * (2 ** attempt), self.max_retry_delay)
        # Add jitter to prevent thundering herd
        jitter = delay * 0.1 * random.random()
        return delay + jitter

    def retry_with_backoff(self, func, *args, **kwargs):
        """Execute function with exponential backoff retry logic"""
        last_exception = None
        
        for attempt in range(self.max_retries):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                last_exception = e
                if attempt == self.max_retries - 1:
                    # Last attempt failed
                    break
                
                delay = self.exponential_backoff_delay(attempt)
                print(f"Attempt {attempt + 1} failed: {str(e)[:100]}...")
                print(f"Retrying in {delay:.2f} seconds...")
                time.sleep(delay)
        
        # All attempts failed
        print(f"All {self.max_retries} attempts failed. Last error: {last_exception}")
        raise last_exception

    def rate_limit_pause(self):
        """Pause between RPC calls"""
        time.sleep(1.25)

    def save_data(self):
        """Save current state to JSON file"""
        try:
            data = {
                "metadata": {
                    "last_updated": datetime.now().isoformat(),
                    "current_block": self.current_block,
                    "start_block": self.start_block,
                    "target_pool_key": asdict(self.target_pool_key),
                    "total_valid_positions": len(self.valid_positions),
                    "total_invalid_positions": len(self.invalid_positions),
                    "total_nft_owners": len(self.nft_owners)
                },
                "valid_positions": [
                    {
                        "token_id": pos.token_id,
                        "pool_key": asdict(pos.pool_key),
                        "owner": pos.owner,
                        "block_number": pos.block_number,
                        "tx_hash": pos.tx_hash,
                        "timestamp": pos.timestamp
                    } for pos in self.valid_positions
                ],
                "invalid_positions": [
                    {
                        "token_id": pos.token_id,
                        "pool_key": asdict(pos.pool_key),
                        "owner": pos.owner,
                        "block_number": pos.block_number,
                        "tx_hash": pos.tx_hash,
                        "timestamp": pos.timestamp
                    } for pos in self.invalid_positions
                ],
                "nft_owners": self.nft_owners
            }
            
            # Write to temporary file first, then rename (atomic operation)
            temp_file = self.save_file + ".tmp"
            with open(temp_file, 'w') as f:
                json.dump(data, f, indent=2)
            
            os.rename(temp_file, self.save_file)
            print(f"Data saved to {self.save_file}")
            
        except Exception as e:
            print(f"Error saving data: {e}")

    def load_data(self):
        """Load existing data from JSON file"""
        if not os.path.exists(self.save_file):
            print(f"No existing save file found at {self.save_file}")
            return
            
        try:
            with open(self.save_file, 'r') as f:
                data = json.load(f)
            
            # Load metadata
            metadata = data.get("metadata", {})
            self.current_block = metadata.get("current_block", self.start_block)
            
            # Load valid positions
            for pos_data in data.get("valid_positions", []):
                pool_key = PoolKey(**pos_data["pool_key"])
                position = Position(
                    token_id=pos_data["token_id"],
                    pool_key=pool_key,
                    owner=pos_data["owner"],
                    block_number=pos_data["block_number"],
                    tx_hash=pos_data["tx_hash"],
                    timestamp=pos_data["timestamp"]
                )
                self.valid_positions.append(position)
            
            # Load invalid positions
            for pos_data in data.get("invalid_positions", []):
                pool_key = PoolKey(**pos_data["pool_key"])
                position = Position(
                    token_id=pos_data["token_id"],
                    pool_key=pool_key,
                    owner=pos_data["owner"],
                    block_number=pos_data["block_number"],
                    tx_hash=pos_data["tx_hash"],
                    timestamp=pos_data["timestamp"]
                )
                self.invalid_positions.append(position)
            
            # Load NFT owners
            self.nft_owners = {int(k): v for k, v in data.get("nft_owners", {}).items()}
            
            # Clean up: Remove any NFT owners that don't correspond to valid positions
            valid_token_ids = {pos.token_id for pos in self.valid_positions}
            self.nft_owners = {token_id: owner for token_id, owner in self.nft_owners.items() 
                             if token_id in valid_token_ids}
            
            print(f"Loaded data from {self.save_file}")
            print(f"  Resuming from block: {self.current_block}")
            print(f"  Valid positions: {len(self.valid_positions)}")
            print(f"  Invalid positions: {len(self.invalid_positions)}")
            print(f"  NFT owners: {len(self.nft_owners)} (cleaned up to match valid positions)")
            
        except Exception as e:
            print(f"Error loading data: {e}")
            print("Starting fresh...")

    def _get_logs_internal(self, from_block: int, to_block: int, topics: List[str], address: str) -> List[Dict]:
        """Internal method for getting logs (without retry logic)"""
        payload = {
            "jsonrpc": "2.0",
            "method": "eth_getLogs",
            "params": [{
                "fromBlock": hex(from_block),
                "toBlock": hex(to_block),
                "address": address,
                "topics": topics
            }],
            "id": 1
        }
        
        self.rate_limit_pause()
        response = requests.post(self.rpc_url, json=payload, timeout=30)
        response.raise_for_status()
        result = response.json()
        
        if "error" in result:
            error_msg = result['error']
            if isinstance(error_msg, dict):
                error_msg = error_msg.get('message', str(error_msg))
            raise Exception(f"RPC Error: {error_msg}")
            
        logs = result.get("result", [])
        if len(logs) >= self.max_logs_per_request:
            print(f"Warning: Received {len(logs)} logs (near limit of {self.max_logs_per_request})")
            
        return logs

    def get_logs(self, from_block: int, to_block: int, topics: List[str], address: str) -> List[Dict]:
        """Get logs using eth_getLogs RPC call with retry logic"""
        try:
            return self.retry_with_backoff(
                self._get_logs_internal, 
                from_block, to_block, topics, address
            )
        except Exception as e:
            print(f"Failed to get logs after {self.max_retries} attempts: {e}")
            return []

    def _call_contract_internal(self, address: str, data: str, block: str = "latest") -> str:
        """Internal method for contract calls (without retry logic)"""
        payload = {
            "jsonrpc": "2.0",
            "method": "eth_call",
            "params": [{
                "to": address,
                "data": data
            }, block],
            "id": 1
        }
        
        self.rate_limit_pause()
        response = requests.post(self.rpc_url, json=payload, timeout=30)
        response.raise_for_status()
        result = response.json()
        
        if "error" in result:
            error_msg = result['error']
            if isinstance(error_msg, dict):
                error_msg = error_msg.get('message', str(error_msg))
            raise Exception(f"RPC Error: {error_msg}")
            
        return result.get("result")

    def call_contract(self, address: str, data: str, block: str = "latest") -> Optional[str]:
        """Make a contract call using eth_call with retry logic"""
        try:
            return self.retry_with_backoff(
                self._call_contract_internal, 
                address, data, block
            )
        except Exception as e:
            print(f"Failed to call contract after {self.max_retries} attempts: {e}")
            return None

    def get_pool_and_position_info(self, token_id: int) -> Optional[Tuple[PoolKey, int]]:
        """Call getPoolAndPositionInfo for a token ID"""
        # getPoolAndPositionInfo(uint256) selector: 0x2d4e5efe
        function_selector = "0x7ba03aad"
        encoded_token_id = hex(token_id)[2:].zfill(64)  # Pad to 32 bytes
        data = function_selector + encoded_token_id
        
        result = self.call_contract(self.nft_address, data)
        if not result:
            return None
            
        try:
            # Decode the result
            # Returns (PoolKey, uint256)
            # PoolKey is (address,address,uint24,int24,address) = 5 * 32 bytes = 160 bytes
            # uint256 is 32 bytes
            # Total expected: 192 bytes of data (384 hex chars after 0x)
            
            result_bytes = bytes.fromhex(result[2:])
            
            # Decode PoolKey struct (5 addresses/uints)
            currency0 = "0x" + result_bytes[12:32].hex()  # address at offset 0
            currency1 = "0x" + result_bytes[44:64].hex()  # address at offset 32
            fee = int.from_bytes(result_bytes[64:96], 'big')  # uint24 at offset 64
            tick_spacing = int.from_bytes(result_bytes[96:128], 'big', signed=True)  # int24 at offset 96
            hooks = "0x" + result_bytes[140:160].hex()  # address at offset 128
            
            # Decode info uint256
            info = int.from_bytes(result_bytes[160:192], 'big')
            
            pool_key = PoolKey(
                currency0=currency0,
                currency1=currency1,
                fee=fee,
                tickSpacing=tick_spacing,
                hooks=hooks
            )
            
            return pool_key, info
            
        except Exception as e:
            print(f"Error decoding getPoolAndPositionInfo result: {e}")
            print(f"Result: {result}")
            return None

    def process_create_position_logs(self, logs: List[Dict]) -> List[Tuple[int, str, int]]:
        """Process CreatePosition logs and return (token_id, tx_hash, block_number) tuples"""
        positions = []
        
        for log in logs:
            try:
                # CreatePosition event typically emits the token ID
                # We need to decode the log data to get the token ID
                topics = log.get("topics", [])
                data = log.get("data", "0x")
                tx_hash = log.get("transactionHash", "")
                block_number = int(log.get("blockNumber", "0x0"), 16)
                
                if len(topics) > 0 and topics[0] == self.create_position_topic:
                    # The token ID is usually in the data or as an indexed parameter
                    # This depends on the exact event signature - you may need to adjust
                    if len(topics) >= 2:
                        # If token ID is indexed (topic 1)
                        token_id = int(topics[1], 16)
                    else:
                        # If token ID is in data (first 32 bytes)
                        data_bytes = bytes.fromhex(data[2:])
                        if len(data_bytes) >= 32:
                            token_id = int.from_bytes(data_bytes[:32], 'big')
                        else:
                            continue
                    
                    positions.append((token_id, tx_hash, block_number))
                    print(f"Found CreatePosition with token ID: {token_id}")
                    
            except Exception as e:
                print(f"Error processing CreatePosition log: {e}")
                continue
                
        return positions

    def process_transfer_logs(self, logs: List[Dict]) -> Dict[int, str]:
        """Process Transfer logs and return token_id -> owner mapping for valid positions only"""
        transfers = {}
        
        # Get set of valid token IDs for efficient lookup
        valid_token_ids = {pos.token_id for pos in self.valid_positions}
        
        if not valid_token_ids:
            # No valid positions to track - return empty dict without processing
            return transfers
        
        processed_count = 0
        ignored_count = 0
        
        for log in logs:
            try:
                topics = log.get("topics", [])
                
                if len(topics) >= 4 and topics[0] == self.transfer_topic:
                    from_address = "0x" + topics[1][-40:]  # Last 20 bytes (40 hex chars)
                    to_address = "0x" + topics[2][-40:]    # Last 20 bytes (40 hex chars)
                    token_id = int(topics[3], 16)
                    
                    # Only process transfers for valid position token IDs
                    if token_id in valid_token_ids:
                        # Update the owner (transfers can overwrite previous owners)
                        transfers[token_id] = to_address
                        print(f"      ✓ Valid Transfer: Token {token_id} from {from_address} to {to_address}")
                        processed_count += 1
                    else:
                        ignored_count += 1
                    
            except Exception as e:
                print(f"Error processing Transfer log: {e}")
                continue
        
        if ignored_count > 0:
            print(f"      Ignored {ignored_count} transfers for non-valid positions")
        if processed_count > 0:
            print(f"      Processed {processed_count} transfers for valid positions")
                
        return transfers

    def validate_positions(self, position_data: List[Tuple[int, str, int]]) -> Tuple[List[Position], List[Position]]:
        """Validate positions against target pool key"""
        valid_positions = []
        invalid_positions = []
        
        for token_id, tx_hash, block_number in position_data:
            try:
                result = self.get_pool_and_position_info(token_id)
                if not result:
                    print(f"Could not get pool info for token {token_id}")
                    continue
                    
                pool_key, info = result
                
                print(f"\nToken {token_id}:")
                print(f"  Currency0: {pool_key.currency0}")
                print(f"  Currency1: {pool_key.currency1}")
                print(f"  Fee: {pool_key.fee}")
                print(f"  TickSpacing: {pool_key.tickSpacing}")
                print(f"  Hooks: {pool_key.hooks}")
                print(f"  Info: {info}")
                
                owner = self.nft_owners.get(token_id, "Unknown")
                timestamp = datetime.now().isoformat()
                
                position = Position(
                    token_id=token_id,
                    pool_key=pool_key,
                    owner=owner,
                    block_number=block_number,
                    tx_hash=tx_hash,
                    timestamp=timestamp
                )
                
                if pool_key.matches_target(self.target_pool_key):
                    print(f"  ✓ VALID - matches target pool")
                    valid_positions.append(position)
                else:
                    print(f"  ✗ INVALID - does not match target pool")
                    invalid_positions.append(position)
                    
            except Exception as e:
                print(f"Error validating token {token_id}: {e}")
                continue
                
        return valid_positions, invalid_positions

    def calculate_block_range(self, from_block: int, to_block: int) -> List[Tuple[int, int]]:
        """Calculate block ranges to stay within log and block limits"""
        ranges = []
        current = from_block
        
        while current <= to_block:
            # Use the smaller of max_blocks_per_request or remaining blocks
            end_block = min(current + self.max_blocks_per_request - 1, to_block)
            ranges.append((current, end_block))
            current = end_block + 1
            
        return ranges

    def scan_blocks(self, from_block: int, to_block: int):
        """Scan a range of blocks for events"""
        print(f"\nScanning blocks {from_block} to {to_block}...")
        
        # Split into smaller ranges if needed
        block_ranges = self.calculate_block_range(from_block, to_block)
        
        all_create_positions = []
        all_transfers = {}
        
        for start, end in block_ranges:
            print(f"  Scanning sub-range: {start} to {end} ({end - start + 1} blocks)")
            
            # Get CreatePosition logs with retry
            create_logs = self.get_logs(
                from_block=start,
                to_block=end,
                topics=[self.create_position_topic],
                address=self.position_manager_address
            )
            
            print(f"    Found {len(create_logs)} CreatePosition events")
            
            # Get Transfer logs with retry
            transfer_logs = self.get_logs(
                from_block=start,
                to_block=end,
                topics=[self.transfer_topic],
                address=self.nft_address
            )
            
            print(f"    Found {len(transfer_logs)} Transfer events")
            
            # Process CreatePosition events first
            positions = self.process_create_position_logs(create_logs)
            all_create_positions.extend(positions)
            
            # Validate new positions to update our valid_positions list
            if positions:
                valid, invalid = self.validate_positions(positions)
                self.valid_positions.extend(valid)
                self.invalid_positions.extend(invalid)
            
            # Only process transfers if we have ANY valid positions across all time
            # (not just from this batch)
            if self.valid_positions:
                transfers = self.process_transfer_logs(transfer_logs)
                all_transfers.update(transfers)
            else:
                if transfer_logs:
                    print(f"    No valid positions exist - skipping all {len(transfer_logs)} transfer events")
        
        # Update NFT ownership for valid positions only
        if all_transfers:
            self.nft_owners.update(all_transfers)
            
            # Update ownership info in valid positions
            for position in self.valid_positions:
                if position.token_id in all_transfers:
                    position.owner = all_transfers[position.token_id]
        
        # Note: We don't re-validate positions here since validation was done per chunk

    def _get_latest_block_internal(self) -> int:
        """Internal method for getting latest block (without retry logic)"""
        payload = {
            "jsonrpc": "2.0",
            "method": "eth_blockNumber",
            "params": [],
            "id": 1
        }
        
        self.rate_limit_pause()
        response = requests.post(self.rpc_url, json=payload, timeout=30)
        response.raise_for_status()
        result = response.json()
        
        if "error" in result:
            error_msg = result['error']
            if isinstance(error_msg, dict):
                error_msg = error_msg.get('message', str(error_msg))
            raise Exception(f"RPC Error: {error_msg}")
            
        return int(result.get("result", "0x0"), 16)

    def get_latest_block(self) -> int:
        """Get the latest block number with retry logic"""
        try:
            return self.retry_with_backoff(self._get_latest_block_internal)
        except Exception as e:
            print(f"Failed to get latest block after {self.max_retries} attempts: {e}")
            return self.current_block

    def print_summary(self):
        """Print a summary of findings"""
        print(f"\n{'='*50}")
        print("SUMMARY")
        print(f"{'='*50}")
        print(f"Blocks scanned: {self.start_block} to {self.current_block}")
        print(f"Valid positions: {len(self.valid_positions)}")
        print(f"Invalid positions: {len(self.invalid_positions)}")
        print(f"NFT owners tracked: {len(self.nft_owners)}")
        
        if self.valid_positions:
            print(f"\nVALID POSITIONS:")
            for pos in self.valid_positions:
                print(f"  Token ID: {pos.token_id}, Owner: {pos.owner}, Block: {pos.block_number}")
        else:
            print(f"\nNo valid positions found yet")
        
        if self.nft_owners:
            print(f"\nVALID NFT OWNERS (tracked):")
            for token_id, owner in self.nft_owners.items():
                print(f"  Token ID: {token_id}, Owner: {owner}")
        else:
            print(f"No valid NFT owners being tracked")

    def run_once(self, blocks_per_scan: int = 1000):
        """Run a single scan cycle to the latest block"""
        latest_block = self.get_latest_block()
        
        if self.current_block <= latest_block:
            # Calculate how many blocks to scan (don't exceed blocks_per_scan in one go)
            blocks_to_scan = min(blocks_per_scan, latest_block - self.current_block + 1)
            to_block = self.current_block + blocks_to_scan - 1
            
            print(f"Latest block: {latest_block}, Current: {self.current_block}, Scanning to: {to_block}")
            
            self.scan_blocks(self.current_block, to_block)
            self.current_block = to_block + 1
            
            # Auto-save after each scan
            self.save_data()
        else:
            print(f"Already caught up to block {latest_block}")
        
        self.print_summary()
        return latest_block

    def run_continuous(self, blocks_per_scan: int = 1000, sleep_seconds: int = 10):
        """Run continuous monitoring - always scan to the newest block"""
        print("Starting continuous monitoring...")
        print("Will continuously scan to the newest block")
        print("Press Ctrl+C to stop")
        
        try:
            while True:
                latest_block = self.get_latest_block()
                
                if self.current_block <= latest_block:
                    # There are new blocks to scan
                    remaining_blocks = latest_block - self.current_block + 1
                    print(f"\n{remaining_blocks} blocks behind latest ({self.current_block} → {latest_block})")
                    
                    # Scan in chunks if there are many blocks to catch up
                    while self.current_block <= latest_block:
                        # Re-get latest block in case it changed during scanning
                        current_latest = self.get_latest_block()
                        blocks_to_scan = min(blocks_per_scan, current_latest - self.current_block + 1)
                        to_block = self.current_block + blocks_to_scan - 1
                        
                        if blocks_to_scan > 0:
                            print(f"Scanning blocks {self.current_block} to {to_block} ({blocks_to_scan} blocks)")
                            self.scan_blocks(self.current_block, to_block)
                            self.current_block = to_block + 1
                            
                            # Auto-save after each chunk
                            self.save_data()
                            
                            # Brief pause between chunks to avoid overwhelming RPC
                            if self.current_block <= current_latest:
                                time.sleep(2)
                        else:
                            break
                    
                    self.print_summary()
                    print(f"✓ Caught up to block {latest_block}")
                else:
                    print(f"Up to date at block {latest_block}")
                
                # Wait before checking for new blocks
                print(f"Waiting {sleep_seconds}s before checking for new blocks...")
                time.sleep(sleep_seconds)
                    
        except KeyboardInterrupt:
            print("\nStopping monitor...")
            self.save_data()
            self.print_summary()

def main():
    # Configuration
    RPC_URL = "https://sepolia.base.org"
    START_BLOCK = 30489054 
    SAVE_FILE = "uniswap_v4_data_testnet.json"
    
    # Create and run the monitor
    monitor = UniswapV4Monitor(RPC_URL, START_BLOCK, SAVE_FILE)
    
    # Run continuously to always stay up to date
    print("Starting continuous monitoring to newest block...")
    monitor.run_continuous(blocks_per_scan=1996, sleep_seconds=180)
    
    # Uncomment to run just once for testing
    # print("Running single scan...")
    # monitor.run_once(blocks_per_scan=1000)

if __name__ == "__main__":
    main()
