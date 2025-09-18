







                var bbaseurlBASE = "https://raw.githubusercontent.com/B0x-Token/B0x-Website/refs/heads/main/images/";
                var ethbase = bbaseurlBASE + "ETHonBase.png";
                var Zeroxbtcbase = bbaseurlBASE + "0xBTConBase.png";
                var B0xbase = bbaseurlBASE + "B0xonBase.png";
                var RightsTo0xBTCbase = bbaseurlBASE + "RightsTo0xBTConBase.png";
                var WETHbase = bbaseurlBASE + "WETHonBase.png";
                var USDCbase = bbaseurlBASE + "USDConBase.png";
                // Token addresses mapping
                const tokenIconsBase = {
                    'ETH': ethbase, // Example addresses
                    'B0x': B0xbase,
                    '0xBTC': Zeroxbtcbase,
                    'WETH': WETHbase,
                    'RightsTo0xBTC': RightsTo0xBTCbase,
                    'USDC': USDCbase,
                };


                var bbaseurl = "https://raw.githubusercontent.com/B0x-Token/B0x-Website/refs/heads/main/images/";
                var etheth = bbaseurl + "ETHonETH.png";
                var Zeroxbtceth = bbaseurl + "0xBTConETH.png";
                var B0xeth = bbaseurl + "B0xonETH.png";
                var RightsTo0xBTCeth = bbaseurl + "RightsTo0xBTConETH.png";
                var WETHeth = bbaseurl + "WETHonETH.png";
                // Token addresses mapping
                const tokenIconsETH = {
                    'ETH': etheth, // Example addresses
                    'B0x': B0xeth,
                    '0xBTC': Zeroxbtceth,
                    'WETH': WETHeth,
                    'RightsTo0xBTC': RightsTo0xBTCeth,
                };







                const UnsiwapV4PoolCreatorAddress = "0x24984FF72AA6bB298Ea7F369E36116F054642697";
                const USDCToken = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
                const positionManager_address = "0x4B2C77d209D3405F41a037Ec6c77F7F5b8e2ca80";
                const contractAddress_PositionFinderPro = '0x258404C795E969cFB831166163E064005e5Fa65C'; // Replace with actual contract address
                const contractAddress_Swapper = '0xc728AF6267315b5CB7669D7DC4F87f5174adabE8'; // Replace with actual contract address
                const contractAddressLPRewardsStaking = '0x3eA249809f032b1F5AE7B1Dd4986490d05eE2dC2';
                const hookAddress = '0x794B1409ef4b40a90eC8AF62EaF4c8bf275e5000';
                const ProofOfWorkAddresss = '0x925C42A57328FD8a7b07ecA444A34963e07C8999';

                // Token addresses mapping
                const tokenAddresses = {
                    'ETH': '0x0000000000000000000000000000000000000000', // Example addresses
                    'B0x': '0xb379A851AC41bcDF0c2564b88916B10E5A08daAe',
                    '0xBTC': '0x4b20b6e9b678b111Dcc365EaD92b3277B178FB74',
                    'WETH': '0x4200000000000000000000000000000000000006',
                    'RightsTo0xBTC': '0x4A437511e57f69507386B5866D48668884F63cbB', //temp until mainnet
                    'USDC': '0x036CbD53842c5426634e7929541eC2318f3dCF7e', //temp until mainnet
                };



                const tokenMap = {
                    "0x4200000000000000000000000000000000000006": "WETH",
                    "0x0000000000000000000000000000000000000000": "ETH",
                    "0xb379A851AC41bcDF0c2564b88916B10E5A08daAe": "B0x",
                    "0x4b20b6e9b678b111Dcc365EaD92b3277B178FB74": "0xBTC",
                    "0x4A437511e57f69507386B5866D48668884F63cbB": "RightsTo0xBTC", //temp until mainnet
                    "0x036CbD53842c5426634e7929541eC2318f3dCF7e": "USDC", //temp until mainnet
                    // Add more token mappings as needed
                };





                // Token addresses mapping FOR ETHEREUM MAINNET ONLY but using testnet base sepolia instead of mainnet ETH
                const tokenAddressesETH = {
                    'ETH': '0x0000000000000000000000000000000000000000', // Example addresses
                    'B0x': '0xb379A851AC41bcDF0c2564b88916B10E5A08daAe',
                    '0xBTC': '0x4b20b6e9b678b111Dcc365EaD92b3277B178FB74',
                    'RightsTo0xBTC': '0x4A437511e57f69507386B5866D48668884F63cbB',
                };





































                var walletBalancesETH = {
                    'ETH': 0.0,
                    '0xBTC': 0.000,
                    'B0x': 0.00,
                    'RightsTo0xBTC': 0.00
                };



                let lastCallTime = 0;
                const THROTTLE_DELAY = 15000; // 15 seconds in milliseconds

                // Declare global variables that should be defined elsewhere in your application
                let tokenSwapper = contractAddress_Swapper;
                let tokenAddress = tokenAddresses["B0x"];
                let Address_ZEROXBTC_TESTNETCONTRACT = tokenAddresses["0xBTC"];

                let HookAddress = hookAddress;
                let MinamountOut; // Declare this variable globally




async function fetchPriceData() {
    console.log("customDataSource customDataSource: ",customDataSource);
    const primaryUrl = customDataSource +'price_data_bwork.json';
    const backupUrl = customBACKUPDataSource+'price_data_bwork.json';
    
    try {
        console.log('Fetching price data from primary source...');
        const response = await fetch(primaryUrl);
        
        if (!response.ok) {
            throw new Error(`Primary source failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Primary source successful for price data');
        
        // Extract the prices array from the JSON structure
        const prices = data.prices || [];
        const timestamps = data.timestamps || [];
        const blocks = data.blocks || [];
        const lastUpdated = data.last_updated || null;
        const date = new Date(lastUpdated * 1000);

        // Convert from Central Time to local time
        lastUpdatedString = date.toLocaleString('en-US', {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone // User's local timezone
        });

        // Or if you want to show both Central and Local time:
        const centralTime = date.toLocaleString('en-US', {
            timeZone: 'America/Chicago'
        });
        const localTime = date.toLocaleString();

        lastUpdatedString = `${localTime} (was ${centralTime} CT)`;

        console.log(`Last updated: ${lastUpdatedString}`);
        console.log(`Loaded ${prices.length} price data points`);

        return {
            prices: prices,
            timestamps: timestamps,
            blocks: blocks,
            lastUpdated: lastUpdatedString
        };

    } catch (primaryError) {
        console.warn('⚠️ Primary source failed for price data:', primaryError.message);
        console.log('🔄 Falling back to GitHub backup for price data...');
        
        try {
            const backupResponse = await fetch(backupUrl);
            
            if (!backupResponse.ok) {
                throw new Error(`Backup source failed with status: ${backupResponse.status}`);
            }
            
            const data = await backupResponse.json();
            console.log('✅ Backup source successful for price data');
            
            // Extract the prices array from the JSON structure
            const prices = data.prices || [];
            const timestamps = data.timestamps || [];
            const blocks = data.blocks || [];
            const lastUpdated = data.last_updated || null;
            const date = new Date(lastUpdated * 1000);

            // Convert from Central Time to local time
            lastUpdatedString = date.toLocaleString('en-US', {
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone // User's local timezone
            });

            // Or if you want to show both Central and Local time:
            const centralTime = date.toLocaleString('en-US', {
                timeZone: 'America/Chicago'
            });
            const localTime = date.toLocaleString();

            lastUpdatedString = `${localTime} (was ${centralTime} CT) [FROM BACKUP]`;

            console.log(`Last updated: ${lastUpdatedString}`);
            console.log(`Loaded ${prices.length} price data points from backup`);

            return {
                prices: prices,
                timestamps: timestamps,
                blocks: blocks,
                lastUpdated: lastUpdatedString
            };

        } catch (backupError) {
            console.error('❌ Both primary and backup sources failed for price data!');
            console.error('Primary error:', primaryError.message);
            console.error('Backup error:', backupError.message);
            
            // Fallback data if both sources fail
            const fallbackData = {
                prices: [],
                timestamps: [],
                blocks: [],
                lastUpdated: 'Unable to fetch data - all sources failed'
            };

            return fallbackData;
        }
    }
}

                var customDataSource = "";
                var customBACKUPDataSource = "";
                // Settings object to hold our values
                const appSettings = {
                    minStaking: 0,
                    minUserHoldings: 0
                };




                // Default addresses
                const defaultRPC_testnet = 'https://sepolia.base.org';



                // Default addresses
                const defaultAddresses = '["0x4200000000000000000000000000000000000006", "0x0000000000000000000000000000000000000000"]';


                // Store current values in memory
                let currentSettingsAddresses = {
                    contractAddresses: defaultAddresses
                };


                
var defaultDataSource_Testnet = "https://data.bzerox.org/graph/";
                
var defaultBACKUPDataSource_Testnet = "https://data.github.bzerox.org/";



                var graphData, prices, timestamps;
                async function initializeChart() {
                    console.log("Loading setting: customDataSource: ",customDataSource);
                    await loadSettings();
                    console.log("AFTER setting: customDataSource: ",customDataSource);
                    // Fetch both price and timestamp data from GitHub

                    // Fetch price data from GitHub
                    graphData = await fetchPriceData();


                    // Generate corresponding timestamps
                    prices = graphData.prices;
                    timestamps = graphData.timestamps;


                    // Your data
                    // Convert timestamps to human-readable labels with relative time
                    const now = Date.now() / 1000; // Current time in seconds
                    const labels = timestamps.map(ts => {
                        const diffSeconds = now - ts;
                        const diffMinutes = diffSeconds / 60;
                        const diffHours = diffMinutes / 60;
                        const diffDays = diffHours / 24;

                        if (diffMinutes < 60) {
                            return `${Math.round(diffMinutes)}min ago`;
                        } else if (diffHours < 24) {
                            return `${diffHours.toFixed(1)}h ago`;
                        } else {
                            return `${diffDays.toFixed(1)} days ago`;
                        }
                    });

                    // Create movement bars data - each bar spans from previous price to current price
                    const movementBars = [];
                    for (let i = 1; i < prices.length; i++) {
                        const prevPrice = prices[i - 1];
                        const currentPrice = prices[i];
                        movementBars.push({
                            x: i - 0.5, // Position between previous and current point
                            y: Math.min(prevPrice, currentPrice), // Bottom of bar
                            w: 1, // Width spans full interval
                            h: Math.abs(currentPrice - prevPrice) // Height is the price difference
                        });
                    }

                    const ctx = document.getElementById('priceChart').getContext('2d');


                    // Custom plugin to draw the movement bars
                    const movementBarsPlugin = {
                        id: 'movementBars',
                        afterDatasetsDraw: function (chart) {
                            const ctx = chart.ctx;
                            const xAxis = chart.scales.x;
                            const yAxis = chart.scales.y;

                            movementBars.forEach((bar, index) => {
                                const prevPrice = prices[index];
                                const currentPrice = prices[index + 1];
                                const isUp = currentPrice >= prevPrice;

                                // Calculate pixel positions
                                const xStart = xAxis.getPixelForValue(index);
                                const xEnd = xAxis.getPixelForValue(index + 1);
                                const yStart = yAxis.getPixelForValue(prevPrice);
                                const yEnd = yAxis.getPixelForValue(currentPrice);

                                // Draw the vertical bar
                                ctx.fillStyle = isUp ? 'rgba(147, 51, 234, 0.6)' : 'rgba(234, 179, 8, 0.6)';
                                ctx.strokeStyle = isUp ? 'rgba(147, 51, 234, 1)' : 'rgba(234, 179, 8, 1)';
                                ctx.lineWidth = 1;

                                const barWidth = (xEnd - xStart) * 0.8; // 80% of the interval width
                                const barX = xStart + (xEnd - xStart - barWidth) / 2; // Center the bar

                                // Draw filled rectangle from prevPrice to currentPrice
                                ctx.fillRect(barX, Math.min(yStart, yEnd), barWidth, Math.abs(yEnd - yStart));
                                ctx.strokeRect(barX, Math.min(yStart, yEnd), barWidth, Math.abs(yEnd - yStart));
                            });
                        }
                    };


                    var divideby = 8;
                    const mediaQuery = window.matchMedia('(max-width: 768px)');

                    if (mediaQuery.matches) {
                        divideby = 4;
                    }

                    const priceChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    label: '',
                                    data: prices,
                                    borderColor: 'rgba(0, 0, 0, 0)', // Transparent border
                                    backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background
                                    fill: false,
                                    tension: 0,
                                    pointRadius: 0, // No points
                                    pointHoverRadius: 0, // No hover points
                                    borderWidth: 0, // No border width
                                    order: 1,
                                    yAxisID: 'y' // Explicitly assign to the y-axis
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            layout: {
                                padding: {
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0
                                }
                            },
                            interaction: {
                                intersect: false,
                                mode: 'index'
                            },
                            scales: {
                                x: {
                                    display: true,
                                    title: {
                                        display: true,
                                        text: '',
                                        color: 'white', // Make x-axis title white
                                        font: {
                                            size: 14,
                                            weight: 'bold'
                                        }
                                    },
                                    type: 'category',
                                    ticks: {
                                        color: 'white', // Make x-axis labels white
                                        maxRotation: 45,
                                        minRotation: 0,
                                        autoSkip: false, // Don't let Chart.js auto-skip
                                        maxTicksLimit: 10,
                                        callback: function (value, index) {
                                            // Show every nth label for even distribution
                                            const totalPoints = labels.length;
                                            const showEvery = Math.max(1, Math.floor(totalPoints / divideby)); // Show ~8 labels

                                            if (index % showEvery === 0 || index === totalPoints - 1) {
                                                if (divideby == 4) {
                                                    let label = labels[index];
                                                    console.log("label2: ", label);
                                                    if (totalPoints - showEvery < index && index != totalPoints - 1) {
                                                        console.log("not showing index: ", index);
                                                        return null;
                                                    }

                                                    if (label.includes('days ago')) {
                                                        const days = Math.round(parseFloat(label));
                                                        //console.log('Converted days:', days);
                                                        const result = days + 'd ago';
                                                        //console.log('Final result:', result);
                                                        return result;
                                                    } else if (label.includes('hours ago')) {
                                                        const hours = Math.round(parseFloat(label));
                                                        // console.log('Converted hours:', hours);
                                                        const result = hours + 'h ago';
                                                        //console.log('Final result:', result);
                                                        return result;
                                                    }
                                                    if (label.includes('min ago')) {

                                                        const min = parseFloat(label);
                                                        result = min + "m ago";
                                                        return result;
                                                    }
                                                } else {
                                                    let label = labels[index];

                                                    if (totalPoints - showEvery < index && index != totalPoints - 1) {

                                                        console.log("not showing index: ", index);
                                                        return null;
                                                    }
                                                    console.log("label1: ", label);
                                                    if (label.includes('min ago')) {

                                                        const min = parseFloat(label);
                                                        result = min + " min ago";
                                                        return result;
                                                    }
                                                    if (label.includes('h ago')) {

                                                        const min = parseFloat(label);
                                                        result = min + " hours ago";
                                                        return result;
                                                    }
                                                    return label;


                                                }
                                            }

                                           // if (index % showEvery === 0 || index === totalPoints - 1) {
                                    //            return labels[index];
                                     //       }
                                            return null; // Return null instead of empty string to hide tick
                                        }
                                    },
                                    grid: {
                                        display: true,
                                        drawOnChartArea: true,
                                        color: 'rgba(255, 255, 255, 0.1)' // Light white grid lines

                                    }
                                },
                                y: {
                                    position: 'right', // Move Y-axis to the right side
                                    display: true,
                                    title: {
                                        display: true,
                                        text: 'Price (USD $)',
                                        color: 'white', // Make y-axis title white
                                        font: {
                                            size: 14,
                                            weight: 'bold'
                                        }
                                    },
                                    beginAtZero: false,
                                    ticks: {
                                        color: 'white', // Make y-axis labels white
                                        callback: function (value) {
                                            return '$' + value.toFixed(6);
                                        }
                                    },
                                    grid: {
                                        display: true,
                                        drawOnChartArea: true,
                                        color: 'rgba(255, 255, 255, 0.1)' // Light white grid lines for y-axis too
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    display: true
                                },
                                tooltip: {
                                    mode: 'index',
                                    intersect: false,
                                    displayColors: false, // This removes the little color box
                                    callbacks: {
                                        label: function (context) {
                                            return `$${context.parsed.y.toFixed(8)}`; // Show 8 decimal places instead of default rounding
                                        },
                                        afterBody: function (context) {
                                            const dataIndex = context[0].dataIndex;
                                            if (dataIndex > 0) {
                                                const currentPrice = prices[dataIndex];
                                                const prevPrice = prices[dataIndex - 1];
                                                const change = currentPrice - prevPrice;
                                                const changePercent = ((change / prevPrice) * 100).toFixed(2);

                                                const date = new Date(timestamps[dataIndex] * 1000);
                                                const timeStr = date.toLocaleString();

                                                return [`Time: ${timeStr}`,
                                                `Previous: $${prevPrice.toFixed(8)}`, // More digits here too
                                                `Current: $${currentPrice.toFixed(8)}`, // And here
                                                `Change: ${change >= 0 ? '+' : ''}$${Math.abs(change).toFixed(8)}`,
                                                `(${change >= 0 ? '+' : ''}${changePercent}%)`];
                                            }
                                            return [`Time: ${new Date(timestamps[dataIndex] * 1000).toLocaleString()}`];
                                        }
                                    }
                                }
                            }
                        },
                        plugins: [movementBarsPlugin]
                    });



                }

                // Initialize the chart when the page loads
                initializeChart().catch(error => {
                    console.error('Failed to initialize chart:', error);
                });




























                document.addEventListener('DOMContentLoaded', () => {
                    const toggle = document.getElementById('toggle1');
                    const saveKey = toggle.dataset.saveKey;

                    // Load saved state
                    const savedState = localStorage.getItem(saveKey);
                    if (savedState !== null) {
                        toggle.checked = savedState === 'true';
                    }

                    // Save state on change
                    toggle.addEventListener('change', () => {
                        localStorage.setItem(saveKey, toggle.checked);
                    });
                });
                
                // Loading screen management
                function updateLoadingStatus(message) {
                    document.getElementById('loading-status').textContent = message;
                }



                function showLoadingWidget(message = 'Loading...', title = 'Loading') {
                    const widget = document.getElementById('loading-widget');
                    const messageEl = document.getElementById('loading-widget-message');
                    const titleEl = widget.querySelector('.loading-widget-title');

                    widget.className = 'loading-widget';
                    titleEl.textContent = title;
                    messageEl.textContent = message;
                    setLoadingProgress(0);

                    setTimeout(() => widget.classList.add('show'), 10);
                }

                function updateLoadingStatusWidget(message) {
                    document.getElementById('loading-widget-message').textContent = message;
                }

                function setLoadingProgress(percentage) {
                    document.getElementById('loading-progress-bar').style.width = percentage + '%';
                }

                function hideLoadingWidget() {
                    document.getElementById('loading-widget').classList.remove('show');
                }


















                function updateStakingStats() {
                    const container = document.querySelector('#staking-main-page #stakingStatsContainer');
                    console.log("thishur:");

                    console.log("continaer!: ", container)

                    if (!container) return;

                    // Use the same logic as updateStakingValues to get the 2 tokens
                    var tokencheck = Address_ZEROXBTC_TESTNETCONTRACT;
                    var tokencheck2 = tokenAddresses['B0x'];
                    console.log("tokenCheck: ", tokencheck);
                    console.log("tokencheck2: ", tokencheck2);

                    // Simple string comparison (addresses as hex strings)
                    let currency0, currency1;
                    if (tokencheck.toLowerCase() < tokencheck2.toLowerCase()) {
                        currency0 = tokencheck;
                        currency1 = tokencheck2;
                    } else {
                        currency0 = tokencheck2;
                        currency1 = tokencheck;
                    }

                    console.log("Using currency0:", currency0);
                    console.log("Using currency1:", currency1);

                    let statsHTML = '';

                    // Create stat cards for total staked (one card for all tokens)
                    statsHTML += `
        <div class="stat-card">
    `;

                    // Add stat-value divs for the 2 tokens only
                    const token0Name = getTokenNameFromAddress(currency0);
                    const token1Name = getTokenNameFromAddress(currency1);

                    statsHTML += `<div class="stat-value" id="totalStaked0">0 ${token0Name}</div>`;
                    statsHTML += `<div class="stat-value" id="totalStaked1">0 ${token1Name}</div>`;

                    statsHTML += `
            <div class="stat-label">Your Total Staked</div>
        </div>
        <div class="stat-card">
            <div class="stat-value" id="APYPercentage">0%</div>
            <div class="stat-label">Your Current APY</div>
        </div>
    `;

                    container.innerHTML = statsHTML;
                }

                // Function to update the values
                function updateStakingValues(stakedAmounts, apy) {


                    // Clean the string first
                    let rawString = currentSettingsAddresses.contractAddresses;
                    console.log("Original string:", rawString);

                    try {
                        // Remove any extra quotes or escape characters
                        rawString = rawString.replace(/^"/, '').replace(/"$/, ''); // Remove surrounding quotes
                        rawString = rawString.replace(/\\"/g, '"'); // Fix escaped quotes

                        console.log("Cleaned string:", rawString);
                        var tokenAddresses1;
                        tokenAddresses1 = JSON.parse(rawString);
                        console.log("Parsed successfully:", tokenAddresses1);
                    } catch (error) {
                        console.error("Still can't parse:", error);
                        tokenAddresses1 = rawString;
                    }



                    var tokencheck = Address_ZEROXBTC_TESTNETCONTRACT;
                    var tokencheck2 = tokenAddresses['B0x'];
                    console.log("tokenCheck: ", tokencheck);
                    console.log("tokencheck2: ", tokencheck2);
                    // Simple string comparison (addresses as hex strings)
                    let currency0, currency1;

                    if (tokencheck.toLowerCase() < tokencheck2.toLowerCase()) {
                        currency0 = tokencheck;
                        currency1 = tokencheck2;
                    } else {
                        currency0 = tokencheck2;
                        currency1 = tokencheck;
                    }


                    // Handle totalStaked0 (first address)
                    const element0 = document.getElementById(`totalStaked0`);
                    if (element0) {
                        const tokenName = getTokenNameFromAddress(currency0);
                        element0.textContent = `${stakedAmounts[0] || '0'} ${tokenName}`;
                    }

                    // Handle totalStaked1 (second address)
                    const element1 = document.getElementById(`totalStaked1`);
                    if (element1) {
                        const tokenName = getTokenNameFromAddress(currency1);
                        element1.textContent = `${stakedAmounts[1] || '0'} ${tokenName}`;
                    }




                    const apyElement = document.getElementById('APYPercentage');
                    if (apyElement) {
                        apyElement.textContent = `${apy}%`;
                    }
                }


                var mockRewardTokens = [
                ];

                var mockActivePeriods = [
                ];




                var wethTo0xBTCRate = 0;
                var lastWETHto0xBTCRateUpdate = 0;
                var APYFINAL = 0;
                var ratioB0xTo0xBTC = 0;
                var usdCostB0x = 0;


                async function GetRewardAPY(_tokenAddresses, _rewardRate, zeroXBTC_In_Staking) {
                    var total_rewardRate_WETH = 0;
                    var total_rewardRate_0xBTC = 0;
                    var total_rewardRate_B0x = 0;
                    for (var x = 0; x < _tokenAddresses.length; x++) {
                        var tknAdd = _tokenAddresses[x];
                        if (tknAdd == tokenAddresses['WETH']) {
                            total_rewardRate_WETH = _rewardRate[x];
                        }
                        if (tknAdd == tokenAddresses['0xBTC']) {
                            total_rewardRate_0xBTC = _rewardRate[x];
                        }
                        if (tknAdd == tokenAddresses['B0x']) {
                            total_rewardRate_B0x = _rewardRate[x];
                        }
                    }



                    let amountOut = 0;
                    const tokenSwapperABI = [
                        // Your existing getOutput function
                        {
                            "inputs": [
                                { "name": "tokenZeroxBTC", "type": "address" },
                                { "name": "tokenBZeroX", "type": "address" },
                                { "name": "tokenIn", "type": "address" },
                                { "name": "hookAddress", "type": "address" },
                                { "name": "amountIn", "type": "uint128" }
                            ],
                            "name": "getOutput",
                            "outputs": [{ "name": "amountOut", "type": "uint256" }],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        // Add the swapTokenTWOTOKENS function
                        {
                            "inputs": [
                                { "name": "tokenA", "type": "address" },
                                { "name": "tokenB", "type": "address" },
                                { "name": "tokenIn", "type": "address" },
                                { "name": "tokenOut", "type": "address" },
                                { "name": "amountIn", "type": "uint256" },
                                { "name": "minAmountOut", "type": "uint256" },
                                { "name": "hookAddress", "type": "address" },
                                { "name": "WhereToSendFunds", "type": "address" }
                            ],
                            "name": "swapTokenTWOTOKENS",
                            "outputs": [{ "name": "", "type": "bool" }],
                            "stateMutability": "nonpayable", // This will modify state
                            "type": "function"
                        }
                    ];


                    tokenSwapperContract = new ethers.Contract(
                        contractAddress_Swapper, // your tokenSwapper contract address
                        tokenSwapperABI,
                        signer // Use signer since the function isn't view/pure
                    );


                    /*
                    console.log("EERRROR HERE");
                    console.log("EERRROR Address_ZEROXBTC_TESTNETCONTRACT: ",Address_ZEROXBTC_TESTNETCONTRACT);
                    console.log("EERRROR tokenAddress: ",tokenAddress);
                    console.log("EERRROR tokenInputAddress: ",tokenInputAddress);
                    console.log("EERRROR HookAddress: ",HookAddress);
                    console.log("EERRROR amountToSwap: ",amountToSwap);
                    console.log("EERRROR amountToSwap: ",amountToSwap);
                    console.log("EERRROR contractAddress_Swapper: ",contractAddress_Swapper);
                    */

                    var tokenInputAddress = tokenAddresses['B0x'];
                    amountToSwap = BigInt(10 ** 18);
                    // Call the view function
                    var result = 0;

                    try {

                        result = await tokenSwapperContract.callStatic.getOutput(
                            Address_ZEROXBTC_TESTNETCONTRACT,
                            tokenAddress,
                            tokenInputAddress,
                            HookAddress,
                            amountToSwap
                        );


                    } catch (error) {
                        console.error('Error calling getOutput in rewardAPY:', error);
                    }

                    // First debug what we're getting back
                    console.log("Raw result type:", typeof result);
                    console.log("Raw result structure:", Object.keys(result).join(", "));

                    if (typeof result === 'bigint' || typeof result === 'number') {
                        // If it's already a primitive value
                        amountOut = result;
                    } else if (result._isBigNumber || result instanceof ethers.BigNumber) {
                        // For ethers v5 BigNumber
                        amountOut = result;
                    } else if (typeof result === 'object' && result !== null) {
                        // For objects, try to extract the value
                        // With ethers v6, we might get the value directly
                        if (typeof result.toString === 'function' && result.toString().match(/^[0-9]+$/)) {
                            amountOut = result;
                        } else {
                            // Attempt to extract value based on common patterns
                            amountOut = result[0] || result.amountOut || result._hex || result.value || result;
                        }
                    }




                    var HowManySecondsINyear = (365 * 24 * 60 * 60);


                    // Convert BigInts to numbers with proper decimal handling
                    var amountOutNumber = Number(amountOut) / (10 ** 8); // 0xBTC has 8 decimals
                    var amountToSwapNumber = Number(amountToSwap) / (10 ** 18); // B0x has 18 decimals
                    var exchangeRate = amountOutNumber / amountToSwapNumber; // This gives 0xBTC per B0x
                    console.log("exchange rate = ", exchangeRate);

                    // total_rewardRate_B0x is already in B0x units (18 decimals)
                    // Convert to proper B0x amount, then apply exchange rate
                    var total_rewardRate_B0x_proper = total_rewardRate_B0x / (10 ** 18); // Convert to actual B0x amount
                    var total_rewardRate_B0x_0xBTC_Yearly = HowManySecondsINyear * total_rewardRate_B0x_proper * exchangeRate;
                    console.log("total_rewardRate_B0x_0xBTC_Yearly: ", total_rewardRate_B0x_0xBTC_Yearly);



                    var total_rewardRate_0xBTC_Yearly = HowManySecondsINyear * total_rewardRate_0xBTC / 10 ** 8;
                    console.log("total_rewardRate_0xBTC_Yearly", total_rewardRate_0xBTC_Yearly);
                    //to limit coingecko calls
                    if (lastWETHto0xBTCRateUpdate < Date.now() - 120000) { // 120000ms = 120 seconds

                        try {
                            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=weth,oxbitcoin&vs_currencies=usd');
                            const data = await response.json();
                            console.log("Data", data);
                            const wethPriceUSD = data.weth.usd;
                            const oxbtcPriceUSD = data['oxbitcoin'].usd;

                            // Calculate how many 0xBTC you get per 1 WETH
                            wethTo0xBTCRate = wethPriceUSD / oxbtcPriceUSD;

                            console.log("VennD WETH price USD: ", wethPriceUSD);
                            console.log("VennD 0xBTC price USD: ", oxbtcPriceUSD);
                            ratiowethto0xBTC = wethPriceUSD / oxbtcPriceUSD;

                            ratioB0xTo0xBTC = amountOutNumber;
                            usdCostB0x = amountOutNumber * oxbtcPriceUSD;

                            console.log("VennD USD cost of token is: ", usdCostB0x);
                            console.log("VennD ratiowethto0xBTC = ", ratiowethto0xBTC);
                            console.log("WETH to 0xBTC rate: ", wethTo0xBTCRate);

                            lastWETHto0xBTCRateUpdate = Date.now();

                            var b0xwidget = document.getElementById('b0x-widget');// Method 1: Using style property (your current approach)
                            b0xwidget.style.display = "flex";


                        } catch (error) {
                            console.error("Error fetching CoinGecko prices:", error);
                            lastWETHto0xBTCRateUpdate = Date.now() - 60000;
                        }
                    }
                    var total_rewardRate_WETH_proper = total_rewardRate_WETH / (10 ** 18); // Convert to actual B0x amount
                    var total_rewardRate_WETH_0xBTC_Yearly = HowManySecondsINyear * total_rewardRate_WETH_proper * wethTo0xBTCRate;
                    console.log("total_rewardRate_WETH_0xBTC_Yearly", total_rewardRate_WETH_0xBTC_Yearly);
                    var total_0xBTC_gained_Yearly = total_rewardRate_WETH_0xBTC_Yearly + total_rewardRate_0xBTC_Yearly + total_rewardRate_B0x_0xBTC_Yearly;
                    console.log("add them all together we get: ", total_0xBTC_gained_Yearly);
                    var total0xbtcStaked = (zeroXBTC_In_Staking * 2) / 10 ** 8;
                    console.log("total 0xBTC staked in both pools", total0xbtcStaked);
                    APYFINAL = total_0xBTC_gained_Yearly / total0xbtcStaked * 100;
                    console.log("APY info total gained yearly / total staked * 100", APYFINAL);
                    //getcoingecko price of 0xBTC in weth.
                    //get exchange rate of weth to 0xBTC.
                    //multiply exchangerate * total_rewardRate_WETH* howmanysecondsinyear

                }


                function handleWidgetVisibility() {
                    const widget = document.getElementById('b0x-widget');
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const tolerance = 300; // Show widget if within 50px of top

                    // Check if screen is smaller than 500px
                    const isSmallScreen = window.matchMedia('(max-width: 800px)').matches;


                    if (scrollTop <= tolerance) {
                        widget.style.opacity = '1';
                        widget.style.visibility = 'visible';
                    } else if (isSmallScreen) {
                        widget.style.opacity = '0';
                        widget.style.visibility = 'hidden';
                    } else {
                        widget.style.opacity = '1';
                        widget.style.visibility = 'visible';

                    }
                }

                window.addEventListener('scroll', handleWidgetVisibility);
                window.addEventListener('load', handleWidgetVisibility);








                /**
                 * Fills in the Current Reward Tokens and Active Reward Periods sections
                 
                    var mockRewardTokens = [
                        { address: "0x742d35Cc6634C0532925a3b8D1C07E8DEa95C7C4", symbol: "REWARD" },
                        { address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", symbol: "UNI" },
                        { address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9", symbol: "AAVE" }
                    ];
                
                    var mockActivePeriods = [
                        { token: "REWARD", startTime: "2023-05-15", endTime: "2023-06-15", totalRewards: "10,000 REWARD" },
                        { token: "UNI", startTime: "2023-05-20", endTime: "2023-07-20", totalRewards: "5,000 UNI" }
                    ];
                
                
                 */
                function populateStakingManagementData() {
                    // Mock data - replace with actual data from your contract/API

                    // Populate Reward Tokens
                    const rewardTokensContainer = document.getElementById('rewardTokensContainer');
                    const tokenSelect = document.getElementById('selectedRewardToken');

                    if (mockRewardTokens.length === 0) {
                        rewardTokensContainer.innerHTML = '<p style="color: #6c757d; font-style: italic;">No reward tokens period is over with and ready for restarting.</p>'; // Also populate the select dropdown
                        tokenSelect.innerHTML = '<option value="">Select a reward token...</option>' +
                            mockRewardTokens.map(token =>
                                `<option value="${token.address}">${token.symbol} (${token.address})</option>`
                            ).join('');
                    } else {
                        rewardTokensContainer.innerHTML = '<ul class="token-list">' +
                            mockRewardTokens.map(token =>
                                `<li>
                        <span class="token-symbol">${token.symbol}</span>
                        <span class="token-address">${token.address}</span>
                    </li>`
                            ).join('') + '</ul>';

                        // Also populate the select dropdown
                        tokenSelect.innerHTML = '<option value="">Select a reward token...</option>' +
                            mockRewardTokens.map(token =>
                                `<option value="${token.address}">${token.symbol} (${token.address})</option>`
                            ).join(''); getTokenIDsOwnedByMetamask
                    }

                    // Populate Active Periods
                    const activePeriodsContainer = document.getElementById('activePeriodsContainer');

                    if (mockActivePeriods.length === 0) {
                        activePeriodsContainer.innerHTML = '<p style="color: #6c757d; font-style: italic;">No active reward periods.</p>';
                    } else {
                        activePeriodsContainer.innerHTML = `
                <table class="periods-table">
                    <thead>
                        <tr>
                            <th>Token</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Total Rewards</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${mockActivePeriods.map(period => `
                            <tr>
                                <td>${period.token}</td>
                                <td>${period.startTime}</td>
                                <td>${period.endTime}</td>
                                <td>${period.totalRewards}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
                    }
                }





                let walletConnected = false;
                let userAddress = null;

                // Check if wallet was previously connected
                async function checkWalletConnection() {
                    console.log("This");
                    if (typeof window.ethereum !== 'undefined' && localStorage.getItem('walletConnected') === 'true') {
                        try {
                            const accounts = await window.ethereum.request({
                                method: 'eth_accounts'
                            });

                            if (accounts.length > 0) {
                                await connectWallet();
                            }
                        } catch (error) {
                            console.error('Error checking wallet connection:', error);
                        }
                    }
                }

                let providerETH = "";
                let signerETH = "";
                let provider = "";
                let signer = "";



                async function quickconnectWallet() {

                    console.log("ConnectWallet");

                    if (walletConnected) {
                        console.log('Wallet already connected');
                        return userAddress;
                    }

                    if (typeof window.ethereum === 'undefined') {
                        alert('Please install MetaMask or Rabby wallet!');
                        return null;
                    }


                    try {
                        const accounts = await window.ethereum.request({
                            method: 'eth_requestAccounts'
                        });
                        if (accounts.length > 0) {


                            // Switch to Base Sepolia network
                            await switchToBaseSepolia();
                            userAddress = accounts[0];
                            walletConnected = true;


                            localStorage.setItem('walletConnected', 'true');
                            localStorage.setItem('walletAddress', userAddress);

                            provider = new ethers.providers.Web3Provider(window.ethereum);
                            signer = provider.getSigner();

                            updateWalletUI(userAddress, true);

                            await switchToEthereum();


                            // Set up event listeners for account changes
                            setupWalletListeners();
                            await fetchBalances();

                            await fetchBalancesETH();
                            await getRewardStats();

                            getTokenIDsOwnedByMetamask();
                            await checkAdminAccess();

                            await loadPositionsIntoDappSelections();

                            await throttledGetSqrtRtAndPriceRatio("ConnectWallet");

                            const toggle = document.getElementById('#settings toggle1');
                            if (toggle1.checked) {
                                console.log("contractAddresses MATCH ");
                                await restoreDefaultAddressesfromContract();
                            }



                            return userAddress;
                        }
                    } catch (error) {
                        handleWalletError(error);
                        return null;
                    }

                }

                var previousAct = "";
                async function connectWallet() {

                    console.log("ConnectWallet");

                    if (walletConnected) {
                        console.log('Wallet already connected');
                        return userAddress;
                    }

                    if (typeof window.ethereum === 'undefined') {
                        alert('Please install MetaMask or Rabby wallet!');
                        return null;
                    }


                    try {
                        const accounts = await window.ethereum.request({
                            method: 'eth_requestAccounts'
                        });
                        if (accounts.length > 0) {


                            // Switch to Base Sepolia network
                            await switchToBaseSepolia();
                            userAddress = accounts[0];
                            walletConnected = true;

                            if (previousAct != userAddress) {
                                WhereToStartSearch = LAUNCH_UNISWAP_ID;
                            }
                            previousAct = userAddress;
                            localStorage.setItem('walletConnected', 'true');
                            localStorage.setItem('walletAddress', userAddress);

                            provider = new ethers.providers.Web3Provider(window.ethereum);
                            signer = provider.getSigner();

                            updateWalletUI(userAddress, true);



                            // Set up event listeners for account changes
                            setupWalletListeners();
                            await fetchBalances();

                            await switchToEthereum();
                            await fetchBalancesETH();
                            await switchToBaseSepolia();
                            await getRewardStats();


                            WhereToStartSearch = LAUNCH_UNISWAP_ID;
                            WhereToStartSearchStaked = 0;

                            Object.keys(positionData).forEach(key => {
                                const idNumber = parseInt(key.split('_')[1]);
                                if (idNumber > 0) {
                                    delete positionData[key];
                                }
                            });

                            await getTokenIDsOwnedByMetamask();
                            await checkAdminAccess();


                            await loadPositionsIntoDappSelections();

                            await throttledGetSqrtRtAndPriceRatio("ConnectWallet");

                            const toggle = document.getElementById('#settings toggle1');
                            if (toggle1.checked) {
                                console.log("contractAddresses MATCH ");
                                await restoreDefaultAddressesfromContract();
                            }



                            return userAddress;
                        }
                    } catch (error) {
                        handleWalletError(error);
                        return null;
                    }
                }




                // Alternative approach - always try to add first, then switch
                async function switchToBaseSepolia() {
                    const baseSepoliaConfig = {
                        chainId: '0x14A34', // 84532 in hex
                        chainName: 'Base Sepolia',
                        nativeCurrency: {
                            name: 'Ethereum',
                            symbol: 'ETH',
                            decimals: 18
                        },
                        rpcUrls: [customRPC],
                        blockExplorerUrls: ['https://sepolia.basescan.org/']
                    };

                    try {
                        // Try to add the network first (this will do nothing if it already exists)
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [baseSepoliaConfig]
                        });
                        console.log('Base Sepolia network added/confirmed');

                        // Then switch to it
                        await window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: baseSepoliaConfig.chainId }]
                        });
                        console.log('Switched to Base Sepolia network');

                        provider = new ethers.providers.Web3Provider(window.ethereum);
                        signer = provider.getSigner();
                    } catch (error) {
                        console.error('Error with Base Sepolia network:', error);
                        throw new Error(`Failed to setup Base Sepolia network: ${error.message}`);
                    }
                }




                // Alternative approach - always try to add first, then switch
                async function switchToEthereum() {

                    /*base for now since we operate on base competly
                    const EthereumConfig= {
                        chainId: '0x1', // 84532 in hex
                        chainName: 'Ethereum',
                        nativeCurrency: {
                            name: 'Ethereum',
                            symbol: 'ETH',
                            decimals: 18
                        },
                        rpcUrls: ['https://eth.llamarpc.com'],
                        blockExplorerUrls: ['https://etherscan.io/']
                    };*/


                    const EthereumConfig = {
                        chainId: '0x14A34', // 84532 in hex
                        chainName: 'Base Sepolia',
                        nativeCurrency: {
                            name: 'Ethereum',
                            symbol: 'ETH',
                            decimals: 18
                        },
                        rpcUrls: [customRPC],
                        blockExplorerUrls: ['https://sepolia.basescan.org/']
                    };

                    try {
                        // Try to add the network first (this will do nothing if it already exists)
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [EthereumConfig]
                        });
                        console.log('Ethereum network added/confirmed');

                        // Then switch to it
                        await window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: EthereumConfig.chainId }]
                        });
                        console.log('Switched to Ethereum network');

                        providerETH = new ethers.providers.Web3Provider(window.ethereum);
                        signerETH = provider.getSigner();
                    } catch (error) {
                        console.error('Error with Base Sepolia network:', error);
                        throw new Error(`Failed to setup Base Sepolia network: ${error.message}`);
                    }
                }






                var totalLiquidityInStakingContract = 0;
                var Rewardduration = 0;



                async function getRewardStats() {

                    //Gets user rewardsOwed, gets symbol, decimals, names and addresses of all


                    const getRewardStatsABI = [{
                        "inputs": [],
                        "name": "getRewardOwedStats",
                        "outputs": [
                            {
                                "internalType": "address[]",
                                "name": "rewardTokenAddresses",
                                "type": "address[]"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "rewardsOwed",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "string[]",
                                "name": "tokenSymbols",
                                "type": "string[]"
                            },
                            {
                                "internalType": "string[]",
                                "name": "tokenNames",
                                "type": "string[]"
                            },
                            {
                                "internalType": "uint8[]",
                                "name": "tokenDecimals",
                                "type": "uint8[]"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "tokenRewardRates",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "tokenPeriodEndsAt",
                                "type": "uint256[]"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    }, {
                        "inputs": [],
                        "name": "totalSupply",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [],
                        "name": "duration_of_rewards",
                        "outputs": [
                            {
                                "internalType": "uint64",
                                "name": "",
                                "type": "uint64"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [],
                        "name": "getContractTotals",
                        "outputs": [
                            {
                                "internalType": "uint128",
                                "name": "liquidityInStaking",
                                "type": "uint128"
                            },
                            {
                                "internalType": "uint128",
                                "name": "totalPooLLiquidity",
                                "type": "uint128"
                            },
                            {
                                "internalType": "uint256",
                                "name": "total0xBTCStaked",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "totalB0xStaked",
                                "type": "uint256"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    }
                    ];





                    var LPRewarsdStakingContract = new ethers.Contract(
                        contractAddressLPRewardsStaking, // your tokenSwapper contract address
                        getRewardStatsABI,
                        signer // Use signer since the function isn't view/pure
                    );
                    console.log("LPRewarsdStakingContract", LPRewarsdStakingContract);
                    const resultDuration = await LPRewarsdStakingContract.duration_of_rewards();
                    const result = await LPRewarsdStakingContract.getRewardOwedStats();

                    var rewardAddressesStaking = result[0];
                    var rewardsOwed = result[1];
                    var rewardtokenSymbols = result[2];
                    var rewardtokenNames = result[3];
                    var rewardtokenDecimals = result[4];
                    var rewardtokenRewardRate = result[5];
                    var rewardtokenPeriodEndsAt = result[6];


                    console.log("getRewardOwedStats STATS BELOWWWWWWWWWWWW getRewardOwedStats");


                    console.log("Reward Address: ", rewardAddressesStaking);

                    console.log("rewardsOwed: ", rewardsOwed.toString());

                    console.log("rewardtokenSymbols: ", rewardtokenSymbols);

                    console.log("rewardtokenNamess: ", rewardtokenNames);

                    console.log("rewardtokenDecimals: ", rewardtokenDecimals.toString());
                    console.log("rewardtokenRewardRate: ", rewardtokenRewardRate.toString());
                    getRewardStats
                    console.log("rewardtokenPeriodEndsAt: ", rewardtokenPeriodEndsAt.toString());


                    /*
                                rewardsAmount.textContent = '15.67 STAKE';
                                rewardsUSD.textContent = '≈ $31.34 USD';
                        var mockRewardTokens = [
                            { address: "0x742d35Cc6634C0532925a3b8D1C07E8DEa95C7C4", symbol: "REWARD" },
                            { address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", symbol: "UNI" },
                            { address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9", symbol: "AAVE" }
                        ];
                    
                        var mockActivePeriods = [
                            { token: "REWARD", startTime: "2023-05-15", endTime: "2023-06-15", totalRewards: "10,000 REWARD" },
                            { token: "UNI", startTime: "2023-05-20", endTime: "2023-07-20", totalRewards: "5,000 UNI" }
                        ];
                    */

                    //resets the mocks to nothgin before population
                    mockActivePeriods = [];
                    mockRewardTokens = [];
                    rewardsAmount.textContent = '';
                    rewardsUSD.textContent = '';
                    currentSettingsAddresses.contractAddresses


                    // Clean the string first
                    let rawString = currentSettingsAddresses.contractAddresses;
                    console.log("Original string:", rawString);

                    try {
                        // Remove any extra quotes or escape characters
                        rawString = rawString.replace(/^"/, '').replace(/"$/, ''); // Remove surrounding quotes
                        rawString = rawString.replace(/\\"/g, '"'); // Fix escaped quotes

                        console.log("Cleaned string:", rawString);
                        var tokenAddresses1;

                        tokenAddresses1 = JSON.parse(rawString);
                        console.log("Parsed successfully:", tokenAddresses1);
                    } catch (error) {
                        console.error("Still can't parse:", error);
                        tokenAddresses1 = rawString;
                    }

                    Rewardduration = parseFloat(resultDuration.toString()); //300 seconds
                    console.log("Reward Duration is how many seconds = ", Rewardduration);
                    for (var x = 0; x < rewardAddressesStaking.length; x++) {
                        console.log("X = ", x);
                        const timestamp = rewardtokenPeriodEndsAt[x].toString();
                        const date = new Date(timestamp * 1000); // Convert to milliseconds
                        console.log(date.toLocaleDateString()); // "1/1/2025" (format varies by locale)
                        var rewardtokenPeriodEndsAtDate = date.toLocaleDateString();

                        // Subtract 45 days to get start date
                        var startDate = new Date(date);
                        startDate.setDate(startDate.getDate() - 45);
                        var rewardtokenPeriodStartsAtDate = startDate.toLocaleDateString();
                        console.log("Starts at Date: ", rewardtokenPeriodStartsAtDate, " end at Date: ", rewardtokenPeriodEndsAtDate);

                        var rewardRate = rewardtokenRewardRate[x];
                        var fortyfivedays = toBigNumber(Rewardduration); // make duration 45*24*60*60 when in production
                        var rewardsFor45Days = fortyfivedays.mul(rewardRate);
                        console.log("Total Rewards for 45 days = ", rewardsFor45Days);
                        var rewardAddress = rewardAddressesStaking[x];
                        const addressIndex = tokenAddresses1 ? tokenAddresses1.indexOf(rewardAddress) : -1;

                        console.log("AddressOfReward = ", rewardAddress);
                        var rewardSymbol = rewardtokenSymbols[x];
                        console.log("Symbol of Reward = ", rewardSymbol);
                        var totRewardsString = parseFloat(rewardsFor45Days.toString()).toFixed(6) + " " + rewardSymbol;
                        var rewardsOwedNow = rewardsOwed[x];


                        var tknDecimals = rewardtokenDecimals[x];
                        // Convert BigNumber to human-readable format first, then apply toFixed
                        var humanReadableAmount = ethers.utils.formatUnits(rewardsFor45Days, tknDecimals);
                        var totRewardsString = parseFloat(humanReadableAmount).toFixed(6) + " " + rewardSymbol;
                        console.log("Rewards for 45 days = ", totRewardsString);

                        var humanReadableAmount2 = ethers.utils.formatUnits(rewardsOwedNow, tknDecimals);
                        var totRewardsString2 = parseFloat(humanReadableAmount2).toFixed(6) + " " + rewardSymbol;
                        if (x == 0 && addressIndex != -1) {
                            rewardsAmount.innerHTML = totRewardsString2;

                        } else if (addressIndex != -1) {
                            rewardsAmount.innerHTML = rewardsAmount.innerHTML + "<br>" + totRewardsString2;
                        }
                        // If you still have access to the original timestamp value
                        const timestampEND = parseFloat(rewardtokenPeriodEndsAt[x].toString());
                        const endDateTimestamp = timestampEND * 1000; // Convert to milliseconds

                        if (endDateTimestamp < Date.now()) {
                            console.log("PERIOD ENDED FOR : ", rewardSymbol, " ", rewardAddress);

                            mockRewardTokens.push({
                                address: rewardAddress,
                                symbol: rewardSymbol
                            });


                        }


                        mockActivePeriods.push({
                            token: rewardSymbol,
                            startTime: rewardtokenPeriodStartsAtDate,
                            endTime: rewardtokenPeriodEndsAtDate,
                            totalRewards: totRewardsString
                        });

                    }


                    const result2 = await LPRewarsdStakingContract.totalSupply();
                    totalLiquidityInStakingContract = result2;


                    const result3 = await LPRewarsdStakingContract.getContractTotals();
                    totalLiquidityInStakingContract = result3[0]
                    var total0xBTCinContract = result3[2];
                    var totalB0xinContract = result3[3];

                    console.log("totalLiquidityInStakingContract called! result = ", totalLiquidityInStakingContract.toString());
                    populateStakingManagementData();

                    console.log("rewardAddressesStaking: ", rewardAddressesStaking);
                    console.log("rewardtokenRewardRate: ", rewardtokenRewardRate);
                    await GetRewardAPY(rewardAddressesStaking, rewardtokenRewardRate, total0xBTCinContract);
                    await calculateAndDisplayHashrate();
                    updateWidget();

                }

























                function handleWalletError(error) {
                    console.error('Wallet connection error:', error);

                    switch (error.code) {
                        case 4001:
                            alert('Please approve the connection request in your wallet');
                            break;
                        case -32002:
                            alert('Connection request is already pending. Please check your wallet');
                            break;
                        default:
                            alert('Failed to connect wallet: ' + error.message);
                    }
                }




                function disconnectWallet() {
                    walletConnected = false;
                    userAddress = null;

                    localStorage.removeItem('walletConnected');
                    localStorage.removeItem('walletAddress');

                    // Reset UI
                    const connectBtn = document.getElementById('connectBtn');
                    if (connectBtn) {
                        connectBtn.textContent = 'Connect Wallet';
                        connectBtn.classList.remove('connected');
                    }
                    updateWalletUI("", true);


                }


                var olduserAddy = "0x0";
                async function connect2() {

                    if (previousAct != userAddress) {
                        WhereToStartSearch = LAUNCH_UNISWAP_ID;
                    }
                    previousAct = userAddress;


                    await switchToEthereum();
                    await fetchBalancesETH();
                    await switchToBaseSepolia();
                    await fetchBalances();

                    await getRewardStats();

                    await getTokenIDsOwnedByMetamask();
                    await checkAdminAccess();

                    await loadPositionsIntoDappSelections();

                    throttledGetSqrtRtAndPriceRatio("ConnectWallet");

                    const toggle = document.getElementById('#settings toggle1');


                }





                async function setupWalletListeners() {
                    if (window.ethereum) {
                        // Handle account changes
                        window.ethereum.on('accountsChanged', (accounts) => {
                            if (accounts.length === 0) {
                                disconnectWallet();
                            } else {

                                olduserAddy = userAddress;
                                userAddress = accounts[0];
                                updateWalletUI(userAddress, true);
                                connect2();



                            }
                        });

                        // Handle network changes
                        window.ethereum.on('chainChanged', (chainId) => {
                            console.log('Network changed to:', chainId);
                            // Optionally reload the page or update UI
                        });
                    }
                }




                // Initialize on page load
                document.addEventListener('DOMContentLoaded', function () {

                    setTimeout(() => {
                        document.querySelector('#stake-increase #tokenAAmount').value = '0';
                        document.querySelector('#stake-increase #tokenBAmount').value = '0';
                    }, 500); // Wait for your init code to finish
                    //checkWalletConnection();
                });


                function updateWalletUI(userAddress, walletName) {
                    // Get the elements
                    const connectBtn = document.getElementById('connectBtn');
                    const walletInfo = document.getElementById('walletInfo');
                    const disconnectBtn = document.getElementById('disconnectBtn');
                    const walletAddress = document.getElementById('walletAddress');
                    const walletAddressSpan = document.querySelector('#walletInfo #walletAddress');

                    if (userAddress) {
                        // Shorten the address for display (first 6 + last 4 characters)
                        const shortAddress = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;

                        // Create the BaseScan URL
                        const baseScanUrl = `https://sepolia.basescan.org/address/${userAddress}`;

                        walletAddressSpan.style.display = 'block';
                        // Update the span with a clickable link that fills the entire button
                        walletAddressSpan.innerHTML = `<a href="${baseScanUrl}" target="_blank" rel="noopener noreferrer">${shortAddress}</a>`;

                        // Show the wallet info div
                        walletInfo.style.display = 'block';
                        disconnectBtn.style.display = 'block';

                        // Update connect button
                        connectBtn.textContent = `Connected (${walletName || 'Wallet'})`;
                        connectBtn.classList.add('connected');

                        // Optional: Add title attribute for full address on hover
                        walletAddressSpan.title = userAddress;
                    } else {
                        // Hide wallet info if no address
                        console.log("This");
                        walletAddressSpan.style.display = 'none';
                        walletInfo.style.display = 'none';
                        connectBtn.textContent = 'Connect Wallet';
                        connectBtn.classList.remove('connected');
                        disconnectBtn.style.display = 'none';

                    }
                }




                function updateTokenIcon(selectId, iconId) {
                    const select = document.getElementById(selectId);
                    const icon = document.getElementById(iconId);
                    const selectedValue = select.value;
                    console.log("ICON SELECTED : ", selectedValue);
                    var iconURL = tokenIconsBase[selectedValue];
                    console.log("ICON URL: ", iconURL);
                    // Map token symbols to their first letter
                    const tokenIcons = {
                        'ETH': 'E',
                        'USDC': 'U',
                        'DAI': 'D',
                        'WBTC': 'W'
                    };

                    if (iconURL) {
                        icon.innerHTML = `<img src="${iconURL}" alt="${selectedValue}" class="token-icon222" onerror="this.style.display='none'">`;
                    } else {
                        icon.textContent = tokenIcons[selectedValue] || selectedValue.charAt(0);
                    }

                }










































                updateTokenIcon('toToken22', 'toTokenIcon11');
                updateTokenIcon('fromToken22', 'fromTokenIcon22');


                // Function to update token icon and clear amount field
                function updateTokenIcon(selectId, iconId) {
                    // Get the selected token
                    const select = document.getElementById(selectId);
                    const token = select.value;

                    // Update the icon with image URL
                    const icon = document.getElementById(iconId);
                    const iconURL = tokenIconsBase[token]; // Get the icon URL

                    if (iconURL) {
                        // Use image if URL exists
                        icon.innerHTML = `<img src="${iconURL}" alt="${token}" class="token-icon222" onerror="this.parentElement.textContent='${token.charAt(0)}'">`;
                    } else {
                        // Fallback to first letter if no URL
                        icon.textContent = token.charAt(0);
                    }

                    // Clear the amount input field in the same form group
                    const formGroup = select.closest('.form-group').nextElementSibling;
                    if (formGroup && formGroup.classList.contains('form-group')) {
                        const amountInput = formGroup.querySelector('input[type="number"]');
                        if (amountInput) {
                            amountInput.value = '0.0';
                        }
                    }

                    filterTokenOptionsSwap();
                }




                function updateTokenIconCreate() {
                    const formGroups = document.querySelectorAll('#create .form-group');

                    formGroups.forEach(group => {
                        const label = group.querySelector('label');
                        const select = group.querySelector('select');
                        const icon = group.querySelector('.token-icon');

                        if (label && select && icon) {
                            const labelText = label.textContent;
                            if (labelText === 'Token A' || labelText === 'Token B') {
                                const selectedValue = select.value;

                                const tokenIcons = {
                                    'ETH': 'E',
                                    'USDC': 'U',
                                    'DAI': 'D',
                                    'WBTC': 'W'
                                };

                                const iconURL = tokenIconsBase[selectedValue]; // Get the icon URL

                                if (iconURL) {
                                    // Use image if URL exists
                                    icon.innerHTML = `<img src="${iconURL}" alt="${selectedValue}" class="token-icon222" onerror="this.parentElement.textContent='${selectedValue.charAt(0)}'">`;
                                } else {
                                    // Fallback to first letter if no URL
                                    icon.textContent = selectedValue.charAt(0);
                                }
                            }
                        }
                    });

                    filterTokenOptionsCreate();
                }




                // Add event listeners when page loads
                document.addEventListener('DOMContentLoaded', function () {
                    const createSelects = document.querySelectorAll('#create .token-selector select');
                    createSelects.forEach(select => {
                        select.addEventListener('change', updateTokenIconCreate);
                    });
                });











                var positionData = {};

                // Staking position data structure
                var stakingPositionData = {};






                /* FILL IN OLD DATA Position data structure
                var positionData = {
                    "position_1": {
                        id: "position_1",
                        pool: "ETH/USDC",
                        feeTier: "0.30%",
                        tokenA: "ETH",
                        tokenB: "USDC",
                        currentLiquidity: 1250.00,
                        currentTokenA: 1.00,
                        currentTokenB: 2000.00,
                        unclaimedFeesTokenA: 12.50,
                        unclaimedFeesTokenB: 12.50,
                        tokenAIcon: "E",
                        tokenBIcon: "U"
                    },
                    "position_2": {
                        id: "position_2",
                        pool: "DAI/USDC",
                        feeTier: "0.05%",
                        tokenA: "DAI",
                        tokenB: "USDC",
                        currentLiquidity: 850.00,
                        currentTokenA: 2000.00,
                        currentTokenB: 2000.00,
                        unclaimedFeesTokenA: 12.50,
                        unclaimedFeesTokenB: 12.50,
                        tokenAIcon: "D",
                        tokenBIcon: "U"
                    },
                    "position_3": {
                        id: "position_3",
                        pool: "WBTC/ETH",
                        feeTier: "0.30%",
                        tokenA: "WBTC",
                        tokenB: "ETH",
                        currentLiquidity: 2100.00,
                        currentTokenA: 1.00,
                        currentTokenB: 50.00,
                        unclaimedFeesTokenA: 12.50,
                        unclaimedFeesTokenB: 12.50,
                        tokenAIcon: "W",
                        tokenBIcon: "E"
                    },
                    "position_4": {
                        id: "position_4",
                        pool: "ETH/B0x",
                        feeTier: "0.30%",
                        tokenA: "ETH",
                        tokenB: "B0x",
                        currentLiquidity: 100.00,
                        currentTokenA: 1.00,
                        currentTokenB: 2000.00,
                        unclaimedFeesTokenA: 0.12,
                        unclaimedFeesTokenB: 212.50,
                        tokenAIcon: "E",
                        tokenBIcon: "B"
                    },
                    "position_5": {
                        id: "position_5",
                        pool: "0xBTC/B0x",
                        feeTier: "10.00%",
                        tokenA: "0xBTC",
                        tokenB: "B0x",
                        currentLiquidity: 100.00,
                        currentTokenA: 1.00,
                        currentTokenB: 2000.00,
                        unclaimedFeesTokenA: 0.12,
                        unclaimedFeesTokenB: 212.50,
                        tokenAIcon: "0",
                        tokenBIcon: "B"
                    },
                    "position_6": {
                        id: "position_6",
                        pool: "B0x/0xBTC",
                        feeTier: "10.00%",
                        tokenA: "B0x",
                        tokenB: "0xBTC",
                        currentLiquidity: 100.00,
                        currentTokenA: "2000.000000000001234578",
                        currentTokenB: "1.00000070",
                        unclaimedFeesTokenA:  "212.000000000005555578",
                        unclaimedFeesTokenB: "0.10000012",
                        tokenAIcon: "B",
                        tokenBIcon: "0"
                    }
                };
                
                // Staking position data structure
                var stakingPositionData = {
                    "stake_position_1": {
                        id: "stake_position_1",
                        pool: "ETH/USDC",
                        feeTier: "0.30%",
                        tokenA: "ETH",
                        tokenB: "USDC",
                        currentLiquidity: 1250.00,
                        currentTokenA: 1.00,
                        currentTokenB: 2000.00,
                        PenaltyForWithdraw: "10%",
                        apy: "8.75%",
                        tokenAIcon: "E",
                        tokenBIcon: "U"
                    },
                    "stake_position_2": {
                        id: "stake_position_2",
                        pool: "DAI/USDC",
                        feeTier: "0.05%",
                        tokenA: "DAI",
                        tokenB: "USDC",
                        currentLiquidity: 850.00,
                        currentTokenA: 2000.00,
                        currentTokenB: 2000.00,
                        PenaltyForWithdraw: "10%",
                        apy: "12.1%",
                        tokenAIcon: "D",
                        tokenBIcon: "U"
                    },
                    "stake_position_3": {
                        id: "stake_position_3",
                        pool: "WBTC/ETH",
                        feeTier: "0.30%",
                        tokenA: "WBTC",
                        tokenB: "ETH",
                        currentLiquidity: 2100.00,
                        currentTokenA: 1.00,
                        currentTokenB: 50.00,
                        PenaltyForWithdraw: "10%",
                        apy: "5.2%",
                        tokenAIcon: "W",
                        tokenBIcon: "E"
                    },
                    "stake_position_4": {
                        id: "stake_position_4",
                        pool: "0xBTC/B0x",
                        feeTier: "0.30%",
                        tokenA: "0xBTC",
                        tokenB: "B0x",
                        currentLiquidity: 100.00,
                        currentTokenA: 1.00000070,
                        currentTokenB: 2000.000000000001234578,
                        PenaltyForWithdraw: "10%",
                        apy: "11.2%",
                        tokenAIcon: "0",
                        tokenBIcon: "B"
                    }
                };
                */




                function updatePositionInfoMAIN_STAKING() {
                    const positionSelect = document.querySelector('#staking-main-page select');
                    const selectedPositionId = positionSelect.value;
                    const position = positionData[selectedPositionId];

                    if (!position) {

                        const infoCard = document.querySelector('#staking-main-page .info-card2');
                        infoCard.innerHTML = `<h3>NFT Position Info</h3>
                                <p>Create Position to Stake Position</p>`;

                        document.getElementById('estimatedRewards').value = "0%";

                        return;
                    }

                    console.log("updatePositionInfoMAIN_STAKING");
                    var positionLiq = parseFloat(position.currentLiquidity);
                    var percentOfStaking = positionLiq / (parseFloat(totalLiquidityInStakingContract.toString()) + positionLiq);

                    document.getElementById('estimatedRewards').value = percentOfStaking.toFixed(6) * 100 + "%";


                    const infoCard = document.querySelector('#staking-main-page .info-card2');
                    infoCard.innerHTML = `<h3>Current Selected Position</h3>
        <p><strong>Pool:</strong> ${position.pool} (${position.feeTier})</p>
        <p><strong>Current Liquidity:</strong> ${position.currentLiquidity.toFixed(2)}</p>
        <p><strong>Total Liquidity:</strong> ${parseFloat(position.currentTokenA).toFixed(4)} ${position.tokenA} & ${parseFloat(position.currentTokenB).toFixed(4)} ${position.tokenB}</p>
    `;



                }



                function updatePositionInfoMAIN_UNSTAKING() {
                    console.log('staking-main-page:', document.querySelector('#staking-main-page'));
                    console.log('form-group2:', document.querySelector('#staking-main-page .form-group2'));
                    console.log('select:', document.querySelector('#staking-main-page .form-group2 select'));
                    const positionSelect = document.querySelector('#staking-main-page .form-group2 select');
                    const selectedPositionId = positionSelect.value;
                    const position = stakingPositionData[selectedPositionId];
                    if (!position) {


                        const infoCard = document.querySelector('#staking-main-page .info-card');
                        infoCard.innerHTML = `<h3>Token Withdrawing</h3>
                            <p>Unstake your Unsiwap NFT tokens below.  Currently you have no staked positions.</p>
                            `;


                        return;
                    }

                    console.log("Success position: ", position);


                    const infoCard = document.querySelector('#staking-main-page .info-card');

                    console.log('Found info-car12313213d2:', infoCard);

                    infoCard.innerHTML = `<h3>Current Selected Position</h3>
        <p><strong>Pool:</strong> ${position.pool} (${position.feeTier})</p>
        <p><strong>Current Liquidity:</strong> ${position.currentLiquidity.toFixed(2)}</p>
        <p><strong>Total Liquidity:</strong> ${parseFloat(position.currentTokenA).toFixed(4)} ${position.tokenA} & ${parseFloat(position.currentTokenB).toFixed(4)} ${position.tokenB}</p>

        <p style="font-weight: bold; font-size: 2em; color: red;"><strong>Penalty for Early Stake Withdrawl:</strong> ${position.PenaltyForWithdraw}</p>    
         <p>It is cheaper if you use Stake Decrease if you are only removing a portion of your funds from staking, cheaper than removing everthing and restaking.</p>
                  
        `;



                }


                function updatePositionInfo() {
                    const positionSelect = document.querySelector('#increase select');
                    const selectedPositionId = positionSelect.value;
                    const position = positionData[selectedPositionId];

                    if (!position) {
                        // Update current position info card
                        const infoCard = document.querySelector('#increase .info-card:nth-child(5)');
                        infoCard.innerHTML = `
            <h3>Increase Position Liquidity</h3>
             <p>Create Position to increase liquidity on it</p>`;

                        return;
                    }

                    // Update current position info card
                    const infoCard = document.querySelector('#increase .info-card:nth-child(5)');
                    infoCard.innerHTML = `
        <h3>Current Selected Position</h3>
        <p><strong>Pool:</strong> ${position.pool} (${position.feeTier})</p>
        <p><strong>Current Liquidity:</strong> ${position.currentLiquidity.toFixed(2)}</p>
        <p><strong>Total Liquidity:</strong> ${parseFloat(position.currentTokenA).toFixed(4)} ${position.tokenA} & ${parseFloat(position.currentTokenB).toFixed(4)} ${position.tokenB}</p>

        <p><strong>Unclaimed Fees:</strong> ${parseFloat(position.unclaimedFeesTokenA).toFixed(4)} ${position.tokenA} & ${parseFloat(position.unclaimedFeesTokenB).toFixed(4)} ${position.tokenB}</p>

    `;
                    // Clear input values when position changes
                    const inputs = document.querySelectorAll('#increase input[type="number"]');
                    inputs.forEach(input => input.value = '0');
                    updateTotalLiqIncrease();

                }


                function updateTotalLiqIncrease() {
                    const positionSelect = document.querySelector('#increase select');
                    const selectedPositionId = positionSelect.value;
                    const position = positionData[selectedPositionId];
                    if (!position) return;







                    // Just directly update each span - much cleaner!
                    const tokenASpan = document.querySelector('#increase #tokenALabel');
                    const tokenBSpan = document.querySelector('#increase #tokenBLabel');

                    if (tokenASpan) {
                        const iconURL = tokenIconsBase[position.tokenA];

                        if (iconURL) {
                            tokenASpan.innerHTML = `<img src="${iconURL}" alt="${position.tokenA}" class="token-icon222" style="margin-right: 8px;"> ${position.tokenA}`;
                        } else {
                            tokenASpan.textContent = position.tokenA;
                        }
                        console.log(`Set tokenALabel to: ${position.tokenA}`);
                    }

                    if (tokenBSpan) {
                        const iconURL = tokenIconsBase[position.tokenB];

                        if (iconURL) {
                            tokenBSpan.innerHTML = `<img src="${iconURL}" alt="${position.tokenB}" class="token-icon222" style="margin-right: 8px;"> ${position.tokenB}`;
                        } else {
                            tokenBSpan.textContent = position.tokenB;
                        }
                        console.log(`Set tokenBLabel to: ${position.tokenB}`);
                    }




                    // Get input values
                    let inputTokenA = 0;
                    let inputTokenB = 0;

                    const tokenAInput = document.querySelector('#increase #tokenAAmount');
                    const tokenBInput = document.querySelector('#increase #tokenBAmount');

                    if (tokenAInput) inputTokenA = tokenAInput.value || 0;
                    if (tokenBInput) inputTokenB = tokenBInput.value || 0;

                    console.log(`Final values: ${position.tokenA}=${inputTokenA}, ${position.tokenB}=${inputTokenB}`);
                    console.log(`Final values position wise: ${position.tokenA}=${position.currentTokenA}, ${position.tokenB}=${position.currentTokenB}`);
                    var maxAmountA = addWithPrecision(position.currentTokenA, inputTokenA, tokenAddressesDecimals[position.tokenA]);
                    var maxAmountB = addWithPrecision(position.currentTokenB, inputTokenB, tokenAddressesDecimals[position.tokenB]);
                    console.log("Output maxAmountA: ", maxAmountA.toString());
                    console.log("Output maxAmountB: ", maxAmountB.toString());
                    // Update total liquidity
                    const totalLiquidityInput = document.querySelector('#increase input[readonly]');
                    if (totalLiquidityInput) {
                        console.log("MaxAmount B: maxAmountB: ", maxAmountB);
                        totalLiquidityInput.value = `${(maxAmountA).toString()} ${position.tokenA} & ${(maxAmountB).toString()} ${position.tokenB}`;
                    }


                }





                function updateTotalLiqIncreaseSTAKING() {

                    const positionSelect = document.querySelector('#stake-increase select');
                    const selectedPositionId = positionSelect.value;
                    const position = stakingPositionData[selectedPositionId];
                    console.log("Postion Staking Udpate Liq: ", position);
                    if (!position) {



                        if (Object.keys(stakingPositionData).length === 0) {
                            console.log("hello world");
                            disableButtonWithSpinner('increaseLiquidityStakedBtn', "No positions to increase Liquidity on, stake a position");
                        } else {
                            enableButton('increaseLiquidityStakedBtn', 'Increase Staked Position Liquidity');
                        }

                        return;
                    }
                    var x = 0;
                    var inputTokenA = 0;
                    var inputTokenB = 0;
                    // Update form labels and placeholders
                    const formGroups = document.querySelectorAll('#stake-increase .form-row .form-group');
                    formGroups.forEach(group => {
                        const label = group.querySelector('label');
                        const input = group.querySelector('input'); // Get the input element

                        // Get the input value
                        if (input) {
                            const inputValue = input.value;
                            console.log("input value is: ", inputValue);
                            console.log(`${label?.textContent}: ${inputValue}`);
                            if (x == 0) {
                                inputTokenA = parseFloat(inputValue) || 0; // Convert to number
                            } else {
                                inputTokenB = parseFloat(inputValue) || 0; // Convert to number
                            }
                            // Or do something with the value
                            // someFunction(inputValue);
                        }
                        x = x + 1;
                    });

                    // Update new total liquidity field
                    const totalLiquidityInput = document.querySelector('#stake-increase input[readonly]');
                    totalLiquidityInput.value = `${(parseFloat(position.currentTokenA) + parseFloat(inputTokenA)).toFixed(4)} ${position.tokenA} & ${(parseFloat(position.currentTokenB) + parseFloat(inputTokenB)).toFixed(4)} ${position.tokenB}`;


                    if (Object.keys(stakingPositionData).length === 0) {
                        console.log("hello world");
                        disableButtonWithSpinner('increaseLiquidityStakedBtn', "No positions to increase Liquidity on, stake a position");
                    } else {
                        enableButton('increaseLiquidityStakedBtn', 'Increase Staked Position Liquidity');
                    }


                }



                function updateStakePositionInfo() {
                    const positionSelect = document.querySelector('#stake-increase select');
                    const selectedPositionId = positionSelect.value;
                    const position = stakingPositionData[selectedPositionId];
                    console.log("Staked Position: ", position);
                    if (!position) {

                        // Update current position info card
                        const infoCard = document.querySelector('#stake-increase .info-card:nth-child(5)');
                        infoCard.innerHTML = `
                <h3>Current Selected Position</h3>
                <p>Create position then Stake it in order to decrease liquidity of position.  No position Staked currently.</p>
            `;



                        if (Object.keys(positionData).length === 0) {
                            console.log("hello world");
                            disableButtonWithSpinner('increaseLiquidityBtn', "No positions to increase Liquidity on, create a position");
                        } else {
                            enableButton('increaseLiquidityBtn', 'Increase Liquidity');
                        }

                        return;
                    }

                    // Update current position info card
                    const infoCard = document.querySelector('#stake-increase .info-card:nth-child(5)');
                    infoCard.innerHTML = `
        <h3>Current Selected Position</h3>
        <p><strong>Pool:</strong> ${position.pool} (${position.feeTier})</p>
        <p><strong>Current Liquidity:</strong> ${position.currentLiquidity.toFixed(2)}</p>
        <p><strong>Total Liquidity:</strong> ${parseFloat(position.currentTokenA).toFixed(4)} ${position.tokenA} & ${parseFloat(position.currentTokenB).toFixed(4)} ${position.tokenB}</p>

        <p><strong>APY:</strong> ${position.apy}</p>
       <p style="font-weight: bold; font-size: 1em; color: red;"><strong>Stake Increase will reset your Early Stake Withdrawal Penalty, usually better to create and stake new seperate NFT.</p>    
       <p><strong>Penalty for Early Stake Withdrawl:</strong> ${position.PenaltyForWithdraw}</p>
    `;








                    // Just directly update each span - much cleaner!
                    const tokenASpan = document.querySelector('#stake-increase #tokenALabelINC');
                    const tokenBSpan = document.querySelector('#stake-increase #tokenBLabelINC');

                    if (tokenASpan) {
                        const iconURL = tokenIconsBase[position.tokenA];

                        if (iconURL) {
                            tokenASpan.innerHTML = `<img src="${iconURL}" alt="${position.tokenA}" class="token-icon222" style="margin-right: 8px;"> ${position.tokenA}`;
                        } else {
                            tokenASpan.textContent = position.tokenA;
                        }
                        console.log(`Set tokenALabel to: ${position.tokenA}`);
                    }

                    if (tokenBSpan) {
                        const iconURL = tokenIconsBase[position.tokenB];

                        if (iconURL) {
                            tokenBSpan.innerHTML = `<img src="${iconURL}" alt="${position.tokenB}" class="token-icon222" style="margin-right: 8px;"> ${position.tokenB}`;
                        } else {
                            tokenBSpan.textContent = position.tokenB;
                        }
                        console.log(`Set tokenBLabel to: ${position.tokenB}`);
                    }


                    // Update new total liquidity field
                    const totalLiquidityInput = document.querySelector('#stake-increase input[readonly]');
                    totalLiquidityInput.value = `${parseFloat(position.currentTokenA).toFixed(4)} ${position.tokenA} & ${parseFloat(position.currentTokenB).toFixed(4)} ${position.tokenB}`;
                    // Clear input values when position changes
                    const inputs = document.querySelectorAll('#stake-increase input[type="number"]');
                    inputs.forEach(input => input.value = '0');


                    if (Object.keys(positionData).length === 0) {
                        console.log("hello world");
                        disableButtonWithSpinner('increaseLiquidityBtn', "No positions to increase Liquidity on, create a position");
                    } else {
                        enableButton('increaseLiquidityBtn', 'Increase Liquidity');
                    }
                }




                function updateDecreasePositionInfo() {
                    const positionSelect = document.querySelector('#decrease select');
                    const selectedPositionId = positionSelect.value;
                    const position = positionData[selectedPositionId];

                    if (!position) {
                        // Update current position info card
                        const infoCard = document.querySelector('#decrease .info-card:nth-child(4)');
                        infoCard.innerHTML = `
            <h3>Decrease Position Liquidity</h3>
             <p>Create Position to decrease liquidity on it</p>`;

                        if (Object.keys(stakingPositionData).length === 0) {
                            console.log("hello world");
                            disableButtonWithSpinner('decreaseLiquidityStakedBtn', "No positions to increase Liquidity on, stake a position");
                        } else {
                            enableButton('decreaseLiquidityStakedBtn', 'Decrease Liquidity of Staked Position');
                        }

                        return;
                    }

                    // Update position details info card
                    const infoCard = document.querySelector('#decrease .info-card:nth-child(4)');
                    infoCard.innerHTML = `
        <h3>Position Details</h3>
        <p><strong>Pool:</strong> ${position.pool} (${position.feeTier})</p>
        <p><strong>Total Liquidity:</strong> ${position.currentLiquidity.toFixed(2)}</p>
        <p><strong>Total Liquidity:</strong> ${parseFloat(position.currentTokenA).toFixed(4)} ${position.tokenA} & ${parseFloat(position.currentTokenB).toFixed(4)} ${position.tokenB}</p>
        <p><strong>Unclaimed Fees:</strong> ${parseFloat(position.unclaimedFeesTokenA).toFixed(4)} ${position.tokenA} & ${parseFloat(position.unclaimedFeesTokenB).toFixed(4)} ${position.tokenB}</p>
    `;















                    // Just directly update each span - much cleaner!
                    const tokenASpan = document.querySelector('#decrease #tokenALabel');
                    const tokenBSpan = document.querySelector('#decrease #tokenBLabel');

                    if (tokenASpan) {
                        const iconURL = tokenIconsBase[position.tokenA];

                        if (iconURL) {
                            tokenASpan.innerHTML = `<img src="${iconURL}" alt="${position.tokenA}" class="token-icon222" style="margin-right: 8px;"> ${position.tokenA}`;
                        } else {
                            tokenASpan.textContent = position.tokenA;
                        }
                        console.log(`Set tokenALabel to: ${position.tokenA}`);
                    }

                    if (tokenBSpan) {
                        const iconURL = tokenIconsBase[position.tokenB];

                        if (iconURL) {
                            tokenBSpan.innerHTML = `<img src="${iconURL}" alt="${position.tokenB}" class="token-icon222" style="margin-right: 8px;"> ${position.tokenB}`;
                        } else {
                            tokenBSpan.textContent = position.tokenB;
                        }
                        console.log(`Set tokenBLabel to: ${position.tokenB}`);
                    }



                    // Update fees to claim field
                    const feesInput = Array.from(document.querySelectorAll('#decrease .form-group'))
                        .find(group => group.querySelector('label')?.textContent === 'Fees to Claim')
                        ?.querySelector('input'); console.log("fees input: ", feesInput);
                    if (feesInput) {
                        console.log("changing fee input!");
                        console.log("position.unclaimedFeesTokenA: ", position.unclaimedFeesTokenA);
                        console.log("position.unclaimedFeesTokenB: ", position.unclaimedFeesTokenB);

                        feesInput.value = `${position.unclaimedFeesTokenA} ${position.tokenA} & ${position.unclaimedFeesTokenB} ${position.tokenB}`;

                        console.log("changing fee input! feeInput.value = ", feesInput.value);
                    }
                    // Force recalculate amounts with current percentage
                    const slider = document.querySelector('#decrease .slider');
                    if (slider) {
                        // Trigger the calculation manually
                        const percentage = parseFloat(slider.value) / 100;
                        const removeAmount = percentage;

                        // Calculate token amounts (simplified - in reality would depend on current pool ratios)
                        const tokenAAmount = position.currentTokenA * removeAmount;
                        const tokenBAmount = position.currentTokenB * removeAmount;

                        const tokenInputs = document.querySelectorAll('#decrease .form-row input');
                        tokenInputs[0].value = `${(tokenAAmount).toFixed(6)} ${position.tokenA}`;
                        tokenInputs[1].value = `${(tokenBAmount).toFixed(6)} ${position.tokenB}`;
                        console.log("TokenAAmount: ", tokenAAmount);
                        /* Update token receive inputs with correct formatting
                        const tokenInputs = document.querySelectorAll('#decrease .form-row input');
                        if (tokenInputs.length >= 2) {
                            // Format TokenA based on token type
                            if (position.tokenA === 'ETH' || position.tokenA === 'WBTC') {
                                tokenInputs[0].value = `${(tokenAAmount / 2000).toFixed(6)} ${position.tokenA}`;
                            } else {
                                tokenInputs[0].value = `${tokenAAmount.toFixed(2)} ${position.tokenA}`;
                            }
                            
                            // Format TokenB based on token type
                            if (position.tokenB === 'ETH' || position.tokenB === 'WBTC') {
                                tokenInputs[1].value = `${(tokenBAmount / 2000).toFixed(6)} ${position.tokenB}`;
                            } else {
                                tokenInputs[1].value = `${tokenBAmount.toFixed(2)} ${position.tokenB}`;
                            }
                        }
                            */
                    }

                    if (Object.keys(stakingPositionData).length === 0) {
                        console.log("hello world");
                        disableButtonWithSpinner('decreaseLiquidityStakedBtn', "No positions to increase Liquidity on, stake a position");
                    } else {
                        enableButton('decreaseLiquidityStakedBtn', 'Decrease Liquidity of Staked Position');
                    }


                }



                function updateStakeDecreasePositionInfo() {
                    const positionSelect = document.querySelector('#stake-decrease select');
                    const selectedPositionId = positionSelect.value;
                    const position = stakingPositionData[selectedPositionId];

                    if (!position) {

                        // Update position details info card
                        const infoCard = document.querySelector('#stake-decrease .info-card:nth-child(4)');
                        infoCard.innerHTML = `
                <h3>Position Details</h3>
                <p>Stake a Uniswap V4 NFT in order to decrease liquidity.  Nothing Staked currently</p>        `;





                        if (Object.keys(positionData).length === 0) {
                            console.log("hello world");
                            disableButtonWithSpinner('decreaseLiquidityBtn', "No positions to Decrease Liquidity on, create a position");
                        } else {
                            enableButton('decreaseLiquidityBtn', 'Remove Liquidity & Claim Fees');
                        }

                        return;
                    }

                    // Update position details info card
                    const infoCard = document.querySelector('#stake-decrease .info-card:nth-child(4)');
                    infoCard.innerHTML = `
        <h3>Position Details</h3>
        <p><strong>Pool:</strong> ${position.pool} (${position.feeTier})</p>
        <p><strong>Total Liquidity:</strong> ${position.currentLiquidity.toFixed(2)}</p>
        <p><strong>Total Liquidity:</strong> ${parseFloat(position.currentTokenA).toFixed(4)} ${position.tokenA} & ${parseFloat(position.currentTokenB).toFixed(4)} ${position.tokenB}</p>

        <p><strong>APY:</strong> ${position.apy}</p>
        <p style="font-weight: bold; font-size: 2em; color: red;"><strong>Penalty for Early Stake Withdrawl:</strong> ${position.PenaltyForWithdraw}</p>        `;



                    // Just directly update each span - much cleaner!
                    const tokenASpan = document.querySelector('#stake-decrease #tokenALabelDec');
                    const tokenBSpan = document.querySelector('#stake-decrease #tokenBLabelDec');

                    if (tokenASpan) {
                        const iconURL = tokenIconsBase[position.tokenA];

                        if (iconURL) {
                            tokenASpan.innerHTML = `<img src="${iconURL}" alt="${position.tokenA}" class="token-icon222" style="margin-right: 8px;"> ${position.tokenA}`;
                        } else {
                            tokenASpan.textContent = position.tokenA;
                        }
                        console.log(`Set tokenALabel to: ${position.tokenA}`);
                    }

                    if (tokenBSpan) {
                        const iconURL = tokenIconsBase[position.tokenB];

                        if (iconURL) {
                            tokenBSpan.innerHTML = `<img src="${iconURL}" alt="${position.tokenB}" class="token-icon222" style="margin-right: 8px;"> ${position.tokenB}`;
                        } else {
                            tokenBSpan.textContent = position.tokenB;
                        }
                        console.log(`Set tokenBLabel to: ${position.tokenB}`);
                    }



                    // Recalculate amounts with current percentage
                    const slider = document.querySelector('#stake-decrease .slider');
                    if (slider) {
                        updateStakePercentage(slider.value);
                    }

                    if (Object.keys(positionData).length === 0) {
                        console.log("hello world");
                        disableButtonWithSpinner('decreaseLiquidityBtn', "No positions to Decrease Liquidity on, create a position");
                    } else {
                        enableButton('decreaseLiquidityBtn', 'Remove Liquidity & Claim Fees');
                    }
                }




                function updateStakePercentage(value) {
                    const percentageDisplay = document.getElementById('stakePercentageDisplay');
                    if (percentageDisplay) {
                        percentageDisplay.textContent = value + '%';
                    }

                    const slider = document.querySelector('#stake-decrease .slider');
                    // Update the CSS custom property to move the gradient
                    slider.style.setProperty('--value', value + '%');

                    // Get current position data
                    const positionSelect = document.querySelector('#stake-decrease select');
                    if (!positionSelect) return;

                    const selectedPositionId = positionSelect.value;
                    const position = stakingPositionData[selectedPositionId];

                    if (!position) return;
                    console.log("Value = ", value);
                    const percentage = parseFloat(value) / 100;
                    const removeAmount = percentage;

                    // Calculate token amounts (simplified - in reality would depend on current pool ratios)
                    // Calculate token amounts (simplified - in reality would depend on current pool ratios)
                    const tokenAAmount = position.currentTokenA * removeAmount;
                    const tokenBAmount = position.currentTokenB * removeAmount;


                    console.log("token B Amount: ", tokenBAmount);

                    var tokenaDecimals = tokenAddressesDecimals[position.tokenA];
                    console.log("TokenA decimals: ", tokenaDecimals);
                    var tokenBDecimals = tokenAddressesDecimals[position.tokenB];
                    console.log("TokenB decimals: ", tokenBDecimals);
                    // Update token receive inputs
                    const tokenInputs = document.querySelectorAll('#stake-decrease .form-row input');
                    if (tokenInputs.length >= 2) {
                        console.log("Stake stuff: ", position.PenaltyForWithdraw);
                        var penaltyAsNumber = parseFloat(position.PenaltyForWithdraw.replace('%', ''));
                        console.log("penaltyAsNumber: ", penaltyAsNumber);
                        tokenInputs[0].value = `${(((tokenAAmount * (100 - penaltyAsNumber)) / 100)).toFixed(tokenaDecimals)} ${position.tokenA}`;
                        tokenInputs[1].value = `${(((tokenBAmount * (100 - penaltyAsNumber)) / 100)).toFixed(tokenBDecimals)} ${position.tokenB}`;
                    }
                }












                function updatePercentage(value) {
                    const percentageDisplay = document.getElementById('percentageDisplay');
                    percentageDisplay.textContent = value + '%';

                    // Get current position data
                    const positionSelect = document.querySelector('#decrease select');
                    const selectedPositionId = positionSelect.value;
                    const position = positionData[selectedPositionId];

                    const slider = document.querySelector('#decrease .slider');
                    // Update the CSS custom property to move the gradient
                    slider.style.setProperty('--value', value + '%');


                    if (!position) return;
                    console.log("Value = ", value);
                    const percentage = parseFloat(value) / 100;
                    const removeAmount = percentage;

                    // Calculate token amounts (simplified - in reality would depend on current pool ratios)
                    // Calculate token amounts (simplified - in reality would depend on current pool ratios)
                    const tokenAAmount = position.currentTokenA * removeAmount;
                    const tokenBAmount = position.currentTokenB * removeAmount;


                    var tokenaDecimals = tokenAddressesDecimals[position.tokenA];
                    console.log("TokenA decimals: ", tokenaDecimals);
                    var tokenBDecimals = tokenAddressesDecimals[position.tokenB];
                    console.log("TokenB decimals: ", tokenBDecimals);
                    // Update token receive inputs
                    const tokenInputs = document.querySelectorAll('#decrease .form-row input');
                    if (tokenInputs.length >= 2) {

                        tokenInputs[0].value = `${(tokenAAmount).toFixed(tokenaDecimals)} ${position.tokenA}`;
                        tokenInputs[1].value = `${(tokenBAmount).toFixed(tokenBDecimals)} ${position.tokenB}`;
                    }
                }







                function saveAddresses() {
                    const addresses = document.getElementById('contractAddresses').value;
                    try {
                        // Validate JSON format
                        currentSettingsAddresses.contractAddresses = addresses;
                        showSuccessMessage('addressSuccess');
                        console.log('Contract addresses saved:', addresses);

                        // Save to localStorage
                        localStorage.setItem('stakingRewardAddresses', JSON.stringify(currentSettingsAddresses.contractAddresses));
                        updateStakingStats();
                        // updateStakingValues(['1.0120213', '15.000'], '8.75');
                    } catch (error) {
                        alert('Invalid JSON format. Please check your address format.');
                    }
                }


function saveCustomRPC_Testnet() {
    const customRPC1212 = document.getElementById('customRPC');

    // Fix: Check the correct variable name and get the value
    if (!customRPC1212 || !customRPC1212.value.trim()) {
        showAlert('Please enter a valid RPC URL', 'error');
        return;
    }

    try {
        // Fix: Store the VALUE, not the DOM element
        customRPC = customRPC1212.value.trim();
        CONFIG.RPC_URL = customRPC1212.value.trim();
        
        console.log('customRPC Saved:', customRPC);

        // Fix: Save just the string value, no need for JSON.stringify for simple strings
        localStorage.setItem('customRPCValue_Testnet', customRPC);
              showSuccessMessage('rpcSuccess');
                 
        if(walletConnected){
            connect2();
        }
    } catch (error) {
        alert('Invalid Format for customRPC_Testnet.', error);
    }
}

function restoreDefaultRPC() {
    document.getElementById('customRPC').value = defaultRPC_testnet;
    customRPC = defaultRPC_testnet;
    
    console.log('custom RPC restored to defaults and saved');
    saveCustomRPC_Testnet();
}





 
function saveCustomDataSource_Testnet() {
    const customRPC1212 = document.getElementById('customDataSource');

    // Fix: Check the correct variable name and get the value
    if (!customRPC1212 || !customRPC1212.value.trim()) {
        showAlert('Please enter a valid RPC URL', 'error');
        return;
    }

    try {
        // Fix: Store the VALUE, not the DOM element
        customDataSource = customRPC1212.value.trim();
       // CONFIG.RPC_URL = customRPC1212.value.trim();
        
        console.log('customDataSource Saved:', customDataSource);

        // Fix: Save just the string value, no need for JSON.stringify for simple strings
        localStorage.setItem('customDataSource_Testnet', customDataSource);
         showSuccessMessage('dataSourceSuccess'); 
        if(walletConnected){
            connect2();
        }
    } catch (error) {
        alert('Invalid Format for customRPC_Testnet.', error);
    }
}




function restoreDefaultCustomDataSource() {
    document.getElementById('customDataSource').value = defaultDataSource_Testnet;
    customDataSource = defaultDataSource_Testnet;
    
    console.log('custom customDataSource restored to defaults and saved');
    saveCustomDataSource_Testnet();
}



function saveBACKUPCustomDataSource_Testnet() {
    const customRPC1212 = document.getElementById('BACKUPcustomDataSource');

    // Fix: Check the correct variable name and get the value
    if (!customRPC1212 || !customRPC1212.value.trim()) {
        showAlert('Please enter a valid RPC URL', 'error');
        return;
    }

    try {
        // Fix: Store the VALUE, not the DOM element
        customDataSource = customRPC1212.value.trim();
       // CONFIG.RPC_URL = customRPC1212.value.trim();
        
        console.log('customBACKUPDataSource Saved:', customDataSource);

        // Fix: Save just the string value, no need for JSON.stringify for simple strings
        localStorage.setItem('customDataSource_BACKUP_Testnet', customDataSource);
         showSuccessMessage('dataBACKUPSourceSuccess'); 
        if(walletConnected){
            connect2();
        }
    } catch (error) {
        alert('Invalid Format for customRPC_Testnet.', error);
        console.log("ERROR in backupcustomdatasource: ",error);
    }
}




function restoreDefaultBACKUPCustomDataSource() {
    document.getElementById('BACKUPcustomDataSource').value = defaultBACKUPDataSource_Testnet;
    customDataSource = defaultDataSource_Testnet;
    
    console.log('custom BACKUP customDataSource restored to defaults and saved');
    saveBACKUPCustomDataSource_Testnet();
}



                function restoreDefaultAddresses() {
                    document.getElementById('contractAddresses').value = defaultAddresses;
                    currentSettingsAddresses.contractAddresses = defaultAddresses;
                    
                    console.log('Addresses restored to defaults');

                }




                async function restoreDefaultAddressesfromContract() {
                    if(!walletConnected){
                        alert('Connect Wallet first');
                    }
                    try {
                        console.log('Getting reward tokens from contract...');

                        // Create contract with full ABI (not just single function)
                        const getRewardTokensABI = [
                            {
                                "inputs": [],
                                "name": "getRewardTokens",
                                "outputs": [
                                    {
                                        "internalType": "address[]", // Fixed: should be address[] not IERC20[]
                                        "name": "",
                                        "type": "address[]"
                                    }
                                ],
                                "stateMutability": "view",
                                "type": "function"
                            }
                        ];

                        tokenLPRewardsStakingContract = new ethers.Contract(
                            contractAddressLPRewardsStaking,
                            getRewardTokensABI,
                            provider // Use provider for view functions, not signer
                        );

                        // Call the contract function
                        const rewardTokens = await tokenLPRewardsStakingContract.getRewardTokens();

                        console.log('Raw result from contract:', rewardTokens);

                        // Convert to array of strings
                        let tokenAddresses = [];
                        if (Array.isArray(rewardTokens)) {
                            tokenAddresses = rewardTokens.map(address => address.toString());
                        } else {
                            // Handle case where result might be wrapped
                            tokenAddresses = [rewardTokens.toString()];
                        }

                        console.log('Parsed token addresses:', tokenAddresses);

                        // Option 3: One-liner formatting
                        const oneLineFormatted = `["${tokenAddresses.join('","')}"]`;
                        // Join addresses with newlines for textarea display
                        //const addressesString = tokenAddresses.join('\n');

                        // Update the UI and settings
                        document.getElementById('contractAddresses').value = oneLineFormatted;
                        currentSettingsAddresses.contractAddresses = tokenAddresses; // Store as array

                        console.log('Addresses restored from contract:', tokenAddresses);
                        console.log('Addresses restored currentSettingsAddresses.contractAddresses:', currentSettingsAddresses.contractAddresses);

                        console.log('Addresses for ERC20 restored to defaults of contract');
                    } catch (e) {
                        console.error('Error loading settings:', e);
                    }
                }







                function restoreDefaultAddressesfromGithub() {
                    /*GET CONTRACT ERC20s to put into list*/
                    document.getElementById('contractAddresses').value = defaultAddresses;
                    currentSettingsAddresses.contractAddresses = defaultAddresses;
                    console.log('Addresses restored to defaults');
                }



                function showSuccessMessage(elementId) {
                    const element = document.getElementById(elementId);
                    element.style.display = 'block';
                    setTimeout(() => {
                        element.style.display = 'none';
                    }, 3000);
                }

                // Global variables for tracking user selection
                let userSelectedPosition = null;
                let hasUserMadeSelection = false;
                let functionCallCounter = 0;
                // Set up the user selection tracker (call this ONCE when your app starts)
                function setupUserSelectionTracking() {
                    const positionSelect = document.querySelector('#staking-main-page select');
                    if (positionSelect && !positionSelect.hasAttribute('data-user-tracker')) {
                        positionSelect.addEventListener('change', function (e) {
                            // Debug what we're actually getting
                            console.log('🔍 Change event details:', {
                                value: e.target.value,
                                selectedIndex: e.target.selectedIndex,
                                optionText: e.target.options[e.target.selectedIndex]?.textContent,
                                optionValue: e.target.options[e.target.selectedIndex]?.value
                            });

                            // Only track if it's a real position (not the static HTML options)
                            if (e.target.value && e.target.value.startsWith('position_')) {
                                userSelectedPosition = e.target.value;
                                hasUserMadeSelection = true;
                                console.log('👤 USER MANUALLY SELECTED VALID POSITION:', userSelectedPosition);
                            } else {
                                console.log('⚠️ User selected static HTML option, ignoring:', e.target.value || e.target.options[e.target.selectedIndex]?.textContent);
                            }
                        });
                        positionSelect.setAttribute('data-user-tracker', 'true');
                        console.log('🎯 User selection tracker installed');
                    }
                }

                // Modified position update function
                function updatePositionDropdown() {
                    const positionSelect2 = document.querySelector('#staking-main-page select');
                    if (!positionSelect2) return;

                    functionCallCounter++;
                    console.log(`🔄 updatePositionDropdown call #${functionCallCounter}`);

                    // Check current state before clearing
                    console.log('🔍 Before clearing:', {
                        currentValue: positionSelect2.value,
                        currentText: positionSelect2.selectedIndex >= 0 ? positionSelect2.options[positionSelect2.selectedIndex].textContent : 'None',
                        allOptions: Array.from(positionSelect2.options).map(opt => ({ value: opt.value, text: opt.textContent }))
                    });

                    // Determine what selection to preserve - only use valid position values
                    let selectionToPreserve;
                    if (hasUserMadeSelection && userSelectedPosition && userSelectedPosition.startsWith('position_')) {
                        selectionToPreserve = userSelectedPosition;
                        console.log('🔒 Preserving user selection:', selectionToPreserve);
                    } else {
                        // Check if current DOM value is a valid position
                        const currentValue = positionSelect2.value;
                        if (currentValue && currentValue.startsWith('position_')) {
                            selectionToPreserve = currentValue;
                            console.log('📋 Using current valid DOM selection:', selectionToPreserve);
                        } else {
                            selectionToPreserve = null; // Don't try to preserve static HTML options
                            console.log('📋 No valid position to preserve, will default to first position');
                        }
                    }

                    console.log('🔄 Updating dropdown with', Object.keys(positionData).length, 'positions');

                    // IMPORTANT: Clear the static HTML options first
                    positionSelect2.innerHTML = '';

                    // Add your dynamic position options
                    Object.values(positionData).forEach(position => {
                        const option = document.createElement('option');
                        option.value = position.id; // This should be like "position_3893"
                        option.textContent = `${position.pool} - ${position.feeTier} - Position #${position.id.split('_')[1]}`;
                        positionSelect2.appendChild(option);
                        console.log('➕ Added position option:', { value: option.value, text: option.textContent });
                    });

                    console.log('🎯 All available position values:', Array.from(positionSelect2.options).map(opt => opt.value));

                    // Restore the preserved selection
                    if (selectionToPreserve) {
                        const targetOption = positionSelect2.querySelector(`option[value="${selectionToPreserve}"]`);
                        if (targetOption) {
                            positionSelect2.value = selectionToPreserve;
                            console.log('✅ Restored selection to:', selectionToPreserve);
                        } else {
                            console.log('⚠️ Could not find preserved selection, using first option');
                            if (positionSelect2.options.length > 0) {
                                positionSelect2.selectedIndex = 0;
                            }
                        }
                    } else {
                        // No valid selection to preserve, select first option
                        if (positionSelect2.options.length > 0) {
                            positionSelect2.selectedIndex = 0;
                            console.log('📋 Selected first option:', positionSelect2.value);
                        }
                    }

                    // Add main change listener only once
                    if (!positionSelect2.hasAttribute('data-main-listener')) {
                        positionSelect2.addEventListener('change', function (e) {
                            console.log('🎯 Main change event fired:', e.target.value);
                            updatePositionInfoMAIN_STAKING();
                        });
                        positionSelect2.setAttribute('data-main-listener', 'true');
                    }

                    updatePositionInfoMAIN_STAKING();
                }

                // Alternative: Remove the static HTML options from your HTML
                // Change your HTML to just:
                // <select></select>
                // 
                // Or give the static options proper values:
                // <option value="">STAKE - Staking Token</option>
                // <option value="">DAI - Dai Stablecoin</option>

                // Call this once when your app starts

                // Replace your existing position dropdown code with:
                // updatePositionDropdown();

                // Initialize when page loads
                document.addEventListener('DOMContentLoaded', function () {

                    document.getElementById('contractAddresses').value = defaultAddresses;

                    // Set up position selector for regular increase
                    const positionSelect = document.querySelector('#increase select');
                    if (positionSelect) {
                        positionSelect.innerHTML = '';
                        Object.values(positionData).forEach(position => {
                            const option = document.createElement('option');
                            option.value = position.id;
                            option.textContent = `${position.pool} - ${position.feeTier} - Position #${position.id.split('_')[1]}`;
                            positionSelect.appendChild(option);
                        });

                        positionSelect.addEventListener('change', updatePositionInfo);
                        positionSelect.addEventListener('change', updateTotalLiqIncrease);
                        updatePositionInfo();
                    }
                    // Add event listeners to both inputs in the form-row
                    const ethInput = document.querySelector('#increase .form-row .form-group:first-child input');
                    const usdcInput = document.querySelector('#increase .form-row .form-group:last-child input');


                    if (ethInput) {
                        ethInput.addEventListener('input', updateTotalLiqIncrease);
                        updateTotalLiqIncrease();
                    }

                    if (usdcInput) {
                        usdcInput.addEventListener('input', updateTotalLiqIncrease);
                    }


                    updatePositionDropdown();

                    const positionSelectMainPageWithdrawNFT = document.querySelector('#staking-main-page .form-group2 select');
                    if (positionSelectMainPageWithdrawNFT) {
                        positionSelectMainPageWithdrawNFT.innerHTML = '';
                        Object.values(stakingPositionData).forEach(position => {
                            const option = document.createElement('option');
                            option.value = position.id;
                            option.textContent = `${position.pool} - ${position.feeTier} - Stake Position #${position.id.split('_')[2]}`;
                            positionSelectMainPageWithdrawNFT.appendChild(option);
                        });

                        positionSelectMainPageWithdrawNFT.addEventListener('change', updatePositionInfoMAIN_UNSTAKING);
                        updatePositionInfoMAIN_UNSTAKING();
                    }

                    // Set up position selector for decrease
                    const decreasePositionSelect = document.querySelector('#decrease select');
                    if (decreasePositionSelect) {
                        decreasePositionSelect.innerHTML = '';
                        Object.values(positionData).forEach(position => {
                            const option = document.createElement('option');
                            option.value = position.id;
                            option.textContent = `${position.pool} - ${position.feeTier} - Position #${position.id.split('_')[1]}`;
                            decreasePositionSelect.appendChild(option);
                        });

                        decreasePositionSelect.addEventListener('change', updateDecreasePositionInfo);
                        updateDecreasePositionInfo();
                    }

                    // Set up position selector for stake increase
                    const stakePositionSelect = document.querySelector('#stake-increase select');
                    if (stakePositionSelect) {
                        stakePositionSelect.innerHTML = '';
                        Object.values(stakingPositionData).forEach(position => {
                            const option = document.createElement('option');
                            option.value = position.id;
                            option.textContent = `${position.pool} - ${position.feeTier} - Stake Position #${position.id.split('_')[2]}`;
                            stakePositionSelect.appendChild(option);
                        });

                        stakePositionSelect.addEventListener('change', updateStakePositionInfo);
                        updateStakePositionInfo();
                    }

                    // Set up position selector for stake decrease
                    const stakeDecreasePositionSelect = document.querySelector('#stake-decrease select');
                    if (stakeDecreasePositionSelect) {
                        stakeDecreasePositionSelect.innerHTML = '';
                        Object.values(stakingPositionData).forEach(position => {
                            const option = document.createElement('option');
                            option.value = position.id;
                            option.textContent = `${position.pool} - ${position.feeTier} - Stake Position #${position.id.split('_')[2]}`;
                            stakeDecreasePositionSelect.appendChild(option);
                        });

                        stakeDecreasePositionSelect.addEventListener('change', updateStakeDecreasePositionInfo);
                        updateStakeDecreasePositionInfo();
                    }

                    // Set up slider for decrease section with multiple event types
                    const decreaseSlider = document.querySelector('#decrease .slider');
                    if (decreaseSlider) {
                        decreaseSlider.addEventListener('input', function () {
                            updatePercentage(this.value);
                        });
                        decreaseSlider.addEventListener('change', function () {
                            updatePercentage(this.value);
                        });
                        decreaseSlider.addEventListener('mouseup', function () {
                            updatePercentage(this.value);
                        });
                    }

                    // Set up slider for stake decrease section with multiple event types
                    const stakeDecreaseSlider = document.querySelector('#stake-decrease .slider');
                    if (stakeDecreaseSlider) {
                        stakeDecreaseSlider.addEventListener('input', function () {
                            updateStakePercentage(this.value);
                        });
                        stakeDecreaseSlider.addEventListener('change', function () {
                            updateStakePercentage(this.value);
                        });
                        stakeDecreaseSlider.addEventListener('mouseup', function () {
                            updateStakePercentage(this.value);
                        });
                    }




                    // Add event listeners to both inputs in the form-row
                    const ethInput2 = document.querySelector('#stake-increase .form-row .form-group:first-child input');
                    const usdcInput2 = document.querySelector('#stake-increase .form-row .form-group:last-child input');

                    console.log("Eth input2: ", ethInput2);
                    if (ethInput2) {
                        ethInput2.addEventListener('input', updateTotalLiqIncreaseSTAKING);
                        updateTotalLiqIncreaseSTAKING();
                    }

                    if (usdcInput2) {
                        usdcInput2.addEventListener('input', updateTotalLiqIncreaseSTAKING);
                    }


                    populateStakingManagementData();

                    displayWalletBalances();
                    loadSettings();
                    filterTokenOptionsCreate();

                    // Target the create section
                    const createSection = document.getElementById('create');
                    if (createSection) {
                        // Get both number inputs in the create section
                        const numberInputs = createSection.querySelectorAll('input[type="number"]');
                        const amountAInput = numberInputs[0]; // First input (Amount A)
                        const amountBInput = numberInputs[1]; // Second input (Amount B)

                        let isUpdating = false;
                        let debounceTimerA;
                        let debounceTimerB;

                        if (amountAInput) {
                            amountAInput.addEventListener('input', function () {
                                if (isUpdating) return; // Prevent circular updates

                                console.log('Create section - Amount A typing:', this.value);

                                // Clear previous timer
                                clearTimeout(debounceTimerA);

                                // Set new timer - only call function after user stops typing for 300ms
                                debounceTimerA = setTimeout(() => {
                                    console.log('Create section - Amount A final value:', this.value);
                                    isUpdating = true;

                                    if (typeof getRatioCreatePositiontokenA === 'function') {
                                        getRatioCreatePositiontokenA();
                                    } else {
                                        console.log('getRatioCreatePositiontokenA function called from create section');
                                    }

                                    // Reset the updating flag after processing
                                    setTimeout(() => {
                                        isUpdating = false;
                                    }, 50);
                                }, 1200); // Wait 300ms after user stops typing
                            });
                        }

                        // Similar for the other input
                        if (amountBInput) {
                            amountBInput.addEventListener('input', function () {
                                if (isUpdating) return; // Prevent circular updates

                                console.log('Create section - Amount B typing:', this.value);

                                // Clear previous timer
                                clearTimeout(debounceTimerB);

                                // Set new timer - only call function after user stops typing for 300ms
                                debounceTimerB = setTimeout(() => {
                                    console.log('Create section - Amount B final value:', this.value);
                                    isUpdating = true;

                                    if (typeof getRatioCreatePositiontokenB === 'function') {
                                        getRatioCreatePositiontokenB();
                                    } else {
                                        console.log('getRatioCreatePositiontokenB function called from create section');
                                    }

                                    // Reset the updating flag after processing
                                    setTimeout(() => {
                                        isUpdating = false;
                                    }, 50);
                                }, 1200); // Wait 300ms after user stops typing
                            });
                        }





                    }



                    setupUserSelectionTracking();


                    let isProgrammaticUpdate = false;

                    let isProgrammaticUpdateB = false;

                    // Target the create section
                    const increase = document.getElementById('increase');
                    if (increase) {
                        // Get both number inputs in the create section
                        const numberInputs = increase.querySelectorAll('input[type="number"]');
                        const amountAInput = numberInputs[0]; // First input (Amount A)
                        const amountBInput = numberInputs[1]; // Second input (Amount B)

                        let isUpdating = false;
                        let debounceTimerA;
                        let debounceTimerB;

                        if (amountAInput) {
                            amountAInput.addEventListener('input', function () {
                                if (isUpdating) return; // Prevent circular updates

                                if (isProgrammaticUpdate || isProgrammaticUpdateB) return;
                                console.log('Create section - Amount A typing:', this.value);

                                // Clear previous timer
                                clearTimeout(debounceTimerA);

                                // Set new timer - only call function after user stops typing for 300ms
                                debounceTimerA = setTimeout(() => {
                                    console.log('Create section - Amount A final value:', this.value);
                                    isUpdating = true;

                                    if (typeof getRatioIncreasePositiontokenA === 'function') {
                                        getRatioIncreasePositiontokenA();
                                    } else {
                                        console.log('getRatioIncreasePositiontokenA function called from create section');
                                    }

                                    // Reset the updating flag after processing
                                    setTimeout(() => {
                                        isUpdating = false;
                                    }, 50);
                                }, 1001); // Wait 1001ms after user stops typing
                            });
                        }

                        // Similar for the other input
                        if (amountBInput) {
                            amountBInput.addEventListener('input', function () {
                                if (isUpdating) return; // Prevent circular updates

                                if (isProgrammaticUpdate || isProgrammaticUpdateB) return;
                                console.log('Create section - Amount B typing:', this.value);

                                // Clear previous timer
                                clearTimeout(debounceTimerB);

                                // Set new timer - only call function after user stops typing for 300ms
                                debounceTimerB = setTimeout(() => {
                                    console.log('Create section - Amount B final value:', this.value);
                                    isUpdating = true;

                                    if (typeof getRatioIncreasePositiontokenB === 'function') {
                                        getRatioIncreasePositiontokenB();
                                    } else {
                                        console.log('getRatioCreatePositiontokenB function called from create section');
                                    }

                                    // Reset the updating flag after processing
                                    setTimeout(() => {
                                        isUpdating = false;
                                    }, 50);
                                }, 1001); // Wait 1001ms after user stops typing
                            });
                        }
                    }





                    let isProgrammaticUpdateC = false;

                    let isProgrammaticUpdateD = false;

                    // Target the create section
                    const increaseStaking = document.getElementById('stake-increase');
                    console.log("increase staking doc: ", increaseStaking);
                    if (increaseStaking) {
                        // Get both number inputs in the create section
                        const numberInputs = increaseStaking.querySelectorAll('input[type="number"]');
                        const amountAInput = numberInputs[0]; // First input (Amount A)
                        const amountBInput = numberInputs[1]; // Second input (Amount B)
                        console
                        let isUpdating = false;
                        let debounceTimerC;
                        let debounceTimerD;

                        if (amountAInput) {
                            amountAInput.addEventListener('input', function () {
                                if (isUpdating) return; // Prevent circular updates

                                if (isProgrammaticUpdate || isProgrammaticUpdateB) return;
                                console.log('Create section - Amount A typing:', this.value);

                                // Clear previous timer
                                clearTimeout(debounceTimerC);

                                // Set new timer - only call function after user stops typing for 300ms
                                debounceTimerC = setTimeout(() => {
                                    console.log('Create section - Amount A final value:', this.value);
                                    isUpdating = true;

                                    if (typeof getRatioStakeIncreasePositiontokenA === 'function') {
                                        getRatioStakeIncreasePositiontokenA();
                                    } else {
                                        console.log('Error getRatioStakeIncreasePositiontokenA');
                                    }

                                    // Reset the updating flag after processing
                                    setTimeout(() => {
                                        isUpdating = false;
                                    }, 50);
                                }, 1001); // Wait 1001ms after user stops typing
                            });
                        }

                        // Similar for the other input
                        if (amountBInput) {
                            amountBInput.addEventListener('input', function () {
                                if (isUpdating) return; // Prevent circular updates

                                if (isProgrammaticUpdate || isProgrammaticUpdateB) return;
                                console.log('Create section - Amount B typing:', this.value);

                                // Clear previous timer
                                clearTimeout(debounceTimerD);

                                // Set new timer - only call function after user stops typing for 300ms
                                debounceTimerD = setTimeout(() => {
                                    console.log('Create section - Amount B final value:', this.value);
                                    isUpdating = true;

                                    if (typeof getRatioStakeIncreasePositiontokenB === 'function') {
                                        getRatioStakeIncreasePositiontokenB();
                                    } else {
                                        console.log('Error getRatioStakeIncreasePositiontokenB');
                                    }

                                    // Reset the updating flag after processing
                                    setTimeout(() => {
                                        isUpdating = false;
                                    }, 50);
                                }, 1001); // Wait 1001ms after user stops typing
                            });
                        }
                    }











                    console.log("contractAddresses value = ", document.getElementById('contractAddresses').value);

                    console.log("contractAddresses defaultAddresses= ", defaultAddresses);


                    document.addEventListener('DOMContentLoaded', renderContracts);


                    updateTokenIcon('toToken22', 'toTokenIcon11');
                    updateTokenIcon('fromToken22', 'fromTokenIcon22');


                    updateTokenSelection('tokenB', 'tokenBIcon');
                    updateTokenSelection('tokenA', 'tokenAIcon');


                    swapTokensConvert();
                    swapTokensConvert();
                });




                // Chain configuration with network details
                const chainConfig = {
                    ethereum: {
                        name: "Ethereum",
                        explorerUrl: "https://etherscan.io/address/",
                        chainId: 1, // Ethereum mainnet
                        rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY", // You'll need to replace this
                        nativeCurrency: {
                            name: "Ethereum",
                            symbol: "ETH",
                            decimals: 18
                        }
                    },
                    base: {
                        name: "Base",
                        explorerUrl: "https://basescan.org/address/", // Use basescan.org for mainnet
                        chainId: 8453, // Base mainnet (use 84532 for Base Sepolia testnet)
                        rpcUrl: "https://mainnet.base.org",
                        nativeCurrency: {
                            name: "Ethereum",
                            symbol: "ETH",
                            decimals: 18
                        }
                    },
                    baseSepolia: {
                        name: "Base Sepolia Testnet",
                        explorerUrl: "https://sepolia.basescan.org/address/", // https://sepolia.basescan.org/ for  Base Sepolia testnet
                        chainId: 84532, // Base Seplia Testnet (use 84532 for Base Sepolia testnet)
                        rpcUrl: customRPC,
                        nativeCurrency: {
                            name: "Ethereum",
                            symbol: "ETH",
                            decimals: 18
                        }
                    }
                };

                // CORRECTED: Proper array of objects
                const contractsList = [
                    {
                        name: "B0x Token / B ZERO X Token ",
                        address: tokenAddresses['B0x'],
                        symbol: "tB0X",
                        imageSymbol: "B0x",
                        decimals: 18,
                        isToken: true,
                        chain: "baseSepolia"
                    },
                    {
                        name: "0xBitcoin Token ",
                        address: tokenAddresses['0xBTC'],
                        symbol: "T0xBTC",
                        imageSymbol: "0xBTC",
                        decimals: 8,
                        isToken: true,
                        chain: "baseSepolia"
                    },
                    {
                        name: "Proof of Work / Mining Address ",
                        address: ProofOfWorkAddresss,
                        isToken: false,
                        chain: "baseSepolia"
                    },
                    {
                        name: "B0x Token Uniswap Liquidity Pool Staking Contract ",
                        address: contractAddressLPRewardsStaking,
                        isToken: false,
                        chain: "baseSepolia"
                    }, {
                        name: "B0x Uniswap Router",
                        address: contractAddress_Swapper,
                        isToken: false,
                        chain: "baseSepolia"
                    },
                    {
                        name: "Hook Address for Uniswap ",
                        address: hookAddress,
                        isToken: false,
                        chain: "baseSepolia"
                    },
                    {
                        name: "B0x Token ",
                        address: tokenAddressesETH['B0x'],
                        symbol: "B0X",
                        imageSymbol: "B0x",
                        decimals: 18,
                        isToken: true,
                        chain: "ethereum"
                    },
                    {
                        name: "0xBitcoin Token ",
                        address: tokenAddressesETH['0xBTC'],
                        symbol: "0xBTC",
                        imageSymbol: "0xBTC",
                        decimals: 8,
                        isToken: true,
                        chain: "ethereum"
                    },
                    {
                        name: "RightsTo0xBitcoin Token (fix 4 mainet) ",
                        address: tokenAddressesETH['RightsTo0xBTC'],
                        symbol: "R0xBTC",
                        imageSymbol: "RightsTo0xBTC",
                        decimals: 18,
                        isToken: true,
                        chain: "baseSepolia"
                    },
                    {
                        name: "RightsTo0xBitcoin Token ",
                        address: tokenAddresses['RightsTo0xBTC'],
                        symbol: "R0xBTC",
                        imageSymbol: "RightsTo0xBTC",
                        decimals: 18,
                        isToken: true,
                        chain: "baseSepolia"
                    },
                    {
                        name: "Uniswapv4PoolCreator ",
                        address: UnsiwapV4PoolCreatorAddress,
                        isToken: false,
                        chain: "baseSepolia"
                    }
                ];

                // CORRECTED: Function expects contractData, not chain
                function getExplorerUrl(contractData) {
                    const chain = chainConfig[contractData.chain];
                    // console.log("CHAIN: ", chain);
                    return `${chain.explorerUrl}${contractData.address}`;
                }





                // CORRECTED: renderContracts function
                function renderContracts() {
                    const container = document.getElementById('contracts-container');
                    container.innerHTML = '';

                    contractsList.forEach((contractData, index) => {
                        const contractDiv = document.createElement('div');
                        contractDiv.className = 'contract-item';

                        // Conditionally set iconURL based on chain
                        const iconURL = contractData.chain === "ethereum" ?
                            tokenIconsETH[contractData.imageSymbol] :
                            tokenIconsBase[contractData.imageSymbol];

                        const chain = chainConfig[contractData.chain];
                        const explorerUrl = getExplorerUrl(contractData);

                        const metaMaskButton = contractData.isToken ?
                            `<button class="btn btn-metamask" onclick="addToMetaMaskByIndex(${index}, this)">
                🦊 Add to MetaMask or Rabby
                </button>` : '';

                        contractDiv.innerHTML = `
                <div class="contract-name">
                    ${contractData.name} 
                    <span class="chain-badge chain-${contractData.chain}">
                        ${iconURL ? `<img src="${iconURL}" alt="${contractData.imageSymbol}" class="chain-icon"> ` : ''}
                         on ${chain.name}
                    </span>
                </div>
                <div class="address-row">
                    <textarea class="address" readonly>${contractData.address}</textarea>
                    <button class="btn btn-copy" onclick="copyToClipboard('${contractData.address}', this)">
                        📋 Copy
                    </button>
                    <a href="${explorerUrl}" target="_blank" class="btn" style="display: flex; justify-content: center; align-items: center; text-align: center;">
                        🔍 View on ${chain.name === 'Ethereum' ? 'Etherscan' : 'BaseScan'}
                    </a>
                    ${metaMaskButton}
                </div>
            `;

                        container.appendChild(contractDiv);
                    });
                }





                // Function to switch MetaMask to the correct chain
                async function switchToChain(chainKey) {
                    if (!window.ethereum) {
                        showToast("MetaMask not detected. Please install MetaMask.", true);
                        return false;
                    }

                    const chainData = chainConfig[chainKey];
                    if (!chainData) {
                        showToast(`Unknown chain: ${chainKey}`, true);
                        return false;
                    }

                    const chainIdHex = `0x${chainData.chainId.toString(16)}`;

                    try {
                        // Try to switch to the chain
                        await window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: chainIdHex }],
                        });

                        showToast(`Switched to ${chainData.name}`);
                        return true;
                    } catch (switchError) {
                        // Chain not added to MetaMask yet
                        if (switchError.code === 4902) {
                            try {
                                // Add the chain to MetaMask
                                await window.ethereum.request({
                                    method: 'wallet_addEthereumChain',
                                    params: [{
                                        chainId: chainIdHex,
                                        chainName: chainData.name,
                                        nativeCurrency: chainData.nativeCurrency,
                                        rpcUrls: [chainData.rpcUrl],
                                        blockExplorerUrls: [chainData.explorerUrl.replace('/address/', '')]
                                    }],
                                });

                                showToast(`Added and switched to ${chainData.name}`);
                                return true;
                            } catch (addError) {
                                console.error('Failed to add chain:', addError);
                                showToast(`Failed to add ${chainData.name} network`, true);
                                return false;
                            }
                        } else if (switchError.code === 4001) {
                            // User rejected the request
                            showToast("Chain switch cancelled by user", true);
                            return false;
                        } else {
                            console.error('Failed to switch chain:', switchError);
                            showToast(`Failed to switch to ${chainData.name}`, true);
                            return false;
                        }
                    }
                }



                // Updated MetaMask function to work with array index
                async function addToMetaMaskByIndex(index, button) {
                    if (!window.ethereum) {
                        showToast("MetaMask not detected. Please install MetaMask.", true);
                        return;
                    }

                    const contractData = contractsList[index];
                    if (!contractData || !contractData.isToken) {
                        showToast("Invalid token data", true);
                        return;
                    }

                    if (!walletConnected) {

                        await quickconnectWallet();
                    }

                    // Move originalText OUTSIDE the try block so it's accessible in catch
                    const originalText = button.innerHTML;

                    try {

                        button.innerHTML = '⏳ Switching chain...';
                        button.disabled = true;

                        // First, switch to the correct chain
                        const chainSwitched = await switchToChain(contractData.chain);

                        if (!chainSwitched) {
                            button.innerHTML = originalText;
                            button.disabled = false;
                            return;
                        }

                        // Now add the token
                        button.innerHTML = '⏳ Adding token...';

                        const wasAdded = await window.ethereum.request({
                            method: 'wallet_watchAsset',
                            params: {
                                type: 'ERC20',
                                options: {
                                    address: contractData.address,
                                    symbol: contractData.symbol,
                                    decimals: contractData.decimals,
                                },
                            },
                        });

                        if (wasAdded) {
                            const chainName = chainConfig[contractData.chain].name;
                            showToast(`${contractData.symbol} added to MetaMask on ${chainName}!`);
                            button.innerHTML = '✓ Added';
                            button.classList.add('copied');
                            setTimeout(() => {
                                button.innerHTML = originalText;
                                button.classList.remove('copied');
                                button.disabled = false;
                            }, 3000);
                        } else {
                            showToast("Token addition was cancelled", true);
                            button.innerHTML = originalText;
                            button.disabled = false;
                        }
                    } catch (error) {
                        console.error('Error adding token to MetaMask:', error);
                        showToast("Failed to add token to MetaMask", true);
                        button.innerHTML = originalText;
                        button.disabled = false;
                    }
                }
                // Function to check current chain
                async function getCurrentChain() {
                    if (!window.ethereum) return null;

                    try {
                        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                        const chainIdDecimal = parseInt(chainId, 16);

                        // Find matching chain in our config
                        for (const [key, config] of Object.entries(chainConfig)) {
                            if (config.chainId === chainIdDecimal) {
                                return key;
                            }
                        }
                        return null;
                    } catch (error) {
                        console.error('Error getting current chain:', error);
                        return null;
                    }
                }

                // Function to display current network status (optional)
                async function displayNetworkStatus() {
                    const currentChain = await getCurrentChain();
                    const statusElement = document.getElementById('network-status');

                    if (statusElement) {
                        if (currentChain) {
                            const chainData = chainConfig[currentChain];
                            statusElement.innerHTML = `
                <span class="network-indicator connected">
                    ● Connected to ${chainData.name}
                </span>
            `;
                        } else {
                            statusElement.innerHTML = `
                <span class="network-indicator disconnected">
                    ● Unknown network or disconnected
                </span>
            `;
                        }
                    }
                }

                // Listen for network changes
                if (window.ethereum) {
                    window.ethereum.on('chainChanged', (chainId) => {
                        console.log('Chain changed to:', chainId);
                        displayNetworkStatus();
                        // Optionally reload the page or update UI
                        // window.location.reload();
                    });

                    window.ethereum.on('accountsChanged', (accounts) => {
                        console.log('Accounts changed:', accounts);
                        displayNetworkStatus();
                    });
                }

                // Initialize network status on page load
                document.addEventListener('DOMContentLoaded', () => {
                    renderContracts();
                    displayNetworkStatus();
                });

                // Your existing functions (copyToClipboard, showToast) remain the same
                function copyToClipboard(text, button) {
                    navigator.clipboard.writeText(text).then(() => {
                        showToast("Address copied to clipboard!");

                        // Visual feedback on button
                        const originalText = button.innerHTML;
                        button.innerHTML = '✓ Copied';
                        button.classList.add('copied');

                        setTimeout(() => {
                            button.innerHTML = originalText;
                            button.classList.remove('copied');
                        }, 2000);
                    }).catch(err => {
                        console.error('Failed to copy: ', err);
                        showToast("Failed to copy address", true);
                    });
                }

                function showToast(message, isError = false) {
                    const toast = document.getElementById('toast');
                    toast.textContent = message;
                    toast.style.background = isError ? '#dc3545' : '#28a745';
                    toast.classList.add('show');

                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 3000);
                }









                // Helper function to format numbers without rounding
                function formatExactNumber(value) {
                    // If it's already a string, return as-is
                    if (typeof value === 'string') {
                        return value;
                    }

                    // If it's a BigInt, convert to string
                    if (typeof value === 'bigint') {
                        return value.toString();
                    }

                    // If it's a number, use toFixed(0) for integers or check if it needs decimal places
                    if (typeof value === 'number') {
                        // Check if it's a whole number
                        if (Number.isInteger(value)) {
                            return value.toFixed(0);
                        }
                        // For decimals, you might want to preserve more precision
                        return value.toString();
                    }

                    return value.toString();
                }



                // Optional: Format with commas for better readability
                function formatExactNumberWithCommas(value) {
                    const exactValue = formatExactNumber(value);
                    // Add commas to make large numbers more readable (10,999,900)
                    return exactValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                }



                // Solution 1: Define a fixed token order (RECOMMENDED)
                const TOKEN_ORDER = ['ETH', 'B0x', '0xBTC', 'USDC', 'DAI', 'WBTC'];



                // Solution 1: Define a fixed token order (RECOMMENDED)
                const TOKEN_ORDERETH = ['ETH', '0xBTC', 'B0x', 'RightsTo0xBTC', 'DAI', 'WBTC'];


                // Updated function with consistent ordering and icons
                function displayWalletBalances() {
                    const balancesContainer = document.getElementById('walletBalancesDisplay');
                    const balancesContainer2 = document.getElementById('walletBalancesDisplay2');
                    const balancesContainer3 = document.getElementById('walletBalancesDisplay3');
                    const balancesContainer4 = document.getElementById('walletBalancesDisplay4');

                    if (!balancesContainer) return;

                    // Create HTML with consistent token order
                    let balancesHTML = '';

                    // Method 1: Use predefined order
                    TOKEN_ORDER.forEach(token => {
                        if (walletBalances[token] !== undefined) {
                            const iconUrl = tokenIconsBase[token] || ''; // Get icon URL or empty string if not found
                            balancesHTML += `
                        <div class="balance-item">
                            ${iconUrl ? `<img src="${iconUrl}" alt="${token}" class="token-icon222" onerror="this.style.display='none'">` : ''}
                            <span class="token-name">${token}</span>
                            <span class="token-amount">${formatExactNumber(walletBalances[token])}</span>
                        </div>
                    `;
                        }
                    });

                    // Add any tokens not in the predefined order (in case you add new tokens)
                    for (const [token, balance] of Object.entries(walletBalances)) {
                        if (!TOKEN_ORDER.includes(token)) {
                            const iconUrl = tokenIconsBase[token] || ''; // Get icon URL or empty string if not found
                            balancesHTML += `
                        <div class="balance-item">
                            ${iconUrl ? `<img src="${iconUrl}" alt="${token}" class="token-icon222" onerror="this.style.display='none'">` : ''}
                            <span class="token-name">${token}</span>
                            <span class="token-amount">${formatExactNumber(balance)}</span>
                        </div>
                    `;
                        }
                    }

                    // Update all containers
                    balancesContainer.innerHTML = balancesHTML;
                    if (balancesContainer2) balancesContainer2.innerHTML = balancesHTML;
                    if (balancesContainer3) balancesContainer3.innerHTML = balancesHTML;
                    if (balancesContainer4) balancesContainer4.innerHTML = balancesHTML;
                }






                // Updated function with consistent ordering and icons
                function displayWalletBalancesETH() {
                    const balancesContainer = document.getElementById('walletBalancesDisplay5');

                    if (!balancesContainer) return;

                    // Create HTML with consistent token order
                    let balancesHTML = '';

                    // Method 1: Use predefined order
                    TOKEN_ORDERETH.forEach(token => {
                        if (walletBalancesETH[token] !== undefined) {
                            const iconUrl = tokenIconsETH[token] || ''; // Get icon URL or empty string if not found
                            balancesHTML += `
                <div class="balance-item">
                    ${iconUrl ? `<img src="${iconUrl}" alt="${token}" class="token-icon222" onerror="this.style.display='none'">` : ''}
                    <span class="token-name">${token}</span>
                    <span class="token-amount">${formatExactNumber(walletBalancesETH[token])}</span>
                </div>
            `;
                        }
                    });

                    // Add any tokens not in the predefined order (in case you add new tokens)
                    for (const [token, balance] of Object.entries(walletBalancesETH)) {
                        if (!TOKEN_ORDERETH.includes(token)) {
                            const iconUrl = tokenIconsETH[token] || ''; // Get icon URL or empty string if not found
                            balancesHTML += `
                <div class="balance-item">
                    ${iconUrl ? `<img src="${iconUrl}" alt="${token}" class="token-icon222" onerror="this.style.display='none'">` : ''}
                    <span class="token-name">${token}</span>
                    <span class="token-amount">${formatExactNumber(balance)}</span>
                </div>
            `;
                        }
                    }

                    // Update all containers
                    balancesContainer.innerHTML = balancesHTML;
                }




                /**
                 * Saves the minimum staking amount to localStorage
                 */
                function saveMinStaking() {
                    const minStakingInput = document.getElementById('minStaking');
                    const value = minStakingInput.value.trim();

                    if (!value || isNaN(value) || parseFloat(value) < 0) {
                        showAlert('Please enter a valid positive number', 'error');
                        return;
                    }



                    if (value < appSettings.minStaking) {
                        WhereToStartSearchStaked = 0;
                    }
                    // Save to our settings object
                    appSettings.minStaking = value;

                    // Save to localStorage
                    localStorage.setItem('stakingSettings', JSON.stringify(appSettings));

                    showSuccessMessage('stakingSuccess');
                    showAlert(`Minimum staking amount set to ${value} tokens`, 'success');


                    sfsdfsdfsdf

                    sdfsdfsdfs
                }



                /**
                 * Saves the minimum user holdings to localStorage
                 */
                function saveMinUserHoldings() {
                    const minHoldingsInput = document.getElementById('minUserHoldings');
                    const value = minHoldingsInput.value.trim();

                    if (!value || isNaN(value) || parseFloat(value) < 0) {
                        showAlert('Please enter a valid positive number', 'error');
                        return;
                    }

                    if (value < appSettings.minUserHoldings) {
                        WhereToStartSearch = LAUNCH_UNISWAP_ID;
                    }
                    // Save to our settings object
                    appSettings.minUserHoldings = value;

                    // Save to localStorage
                    localStorage.setItem('stakingSettings', JSON.stringify(appSettings));

                    showSuccessMessage('holdingsSuccess');
                    showAlert(`Minimum user holdings set to ${value} tokens`, 'success');
                }

                var customRPC = "";
                /**
                 * Loads settings from localStorage and updates the form
                 */
                function loadSettings() {
                    const dataSource = localStorage.getItem('customDataSource_Testnet');
                    const dataSourceBACKUP = localStorage.getItem('customBACKUPDataSource_Testnet');
                    const rpc = localStorage.getItem('customRPCValue_Testnet');
                    const savedSettings = localStorage.getItem('stakingSettings');
                    const savedSettingsRewards = localStorage.getItem('stakingRewardAddresses');
                    if (savedSettingsRewards) {


                        const setting2 = JSON.parse(savedSettingsRewards);
                        console.log("setting2: ", setting2);
                        // Update our appSettings object
                        currentSettingsAddresses.contractAddresses = setting2 || "0xError";

                        document.getElementById('contractAddresses').value = currentSettingsAddresses.contractAddresses;
                    }
                    if (savedSettings) {
                        try {
                            const settings = JSON.parse(savedSettings);

                            // Update our appSettings object
                            appSettings.minStaking = settings.minStaking || 0;
                            appSettings.minUserHoldings = settings.minUserHoldings || 0;

                            // Update the form inputs
                            document.getElementById('minStaking').value = appSettings.minStaking;
                            document.getElementById('minUserHoldings').value = appSettings.minUserHoldings;

                        } catch (e) {
                            console.error('Error loading settings:', e);
                        }
                    } else {

                        appSettings.minStaking = 0;
                        appSettings.minUserHoldings = 0;
                    }
                    
                     if (rpc) {
                        try {
                            // Since we're storing a simple string, just use it directly
                            customRPC = rpc;
                            
                            // Update the form input
                            const rpcElement = document.getElementById('customRPC');
                            if (rpcElement) {
                                rpcElement.value = customRPC;
                            }
                            
                        } catch (e) {
                            console.error('Error loading custom RPC settings:', e);
                            customRPC = defaultRPC_testnet;
                        }
                    } else {
                        customRPC = defaultRPC_testnet;
                        // Also update the input field with default value
                        const rpcElement = document.getElementById('customRPC');
                        if (rpcElement) {
                            rpcElement.value = defaultRPC_testnet;
                        }
                    }


                    if(dataSource){
                        try {
                            // Since we're storing a simple string, just use it directly
                            
                            customDataSource = dataSource;
                            
                            // Update the form input
                            const rpcElement = document.getElementById('customDataSource');
                            if (rpcElement) {
                                rpcElement.value = customDataSource;
                            }
                            
                        } catch (e) {
                            console.error('Error loading custom Data Source settings:', e);
                            customDataSource = defaultDataSource_Testnet;
                        }
                    }else{


                            customDataSource = defaultDataSource_Testnet;
                               // Update the form input
                            const rpcElement = document.getElementById('customDataSource');
                            if (rpcElement) {
                                rpcElement.value = customDataSource;
                            }


                    }

                    if(dataSourceBACKUP){
                        try {
                            // Since we're storing a simple string, just use it directly
                            
                            customBACKUPDataSource = dataSourceBACKUP;
                            
                            // Update the form input
                            const rpcElement = document.getElementById('BACKUPcustomDataSource');
                            if (rpcElement) {
                                rpcElement.value = customDataSourceBACKUP;
                            }
                            
                        } catch (e) {
                            console.error('Error loading BACKUP custom Data Source settings:', e);
                            customBACKUPDataSource = defaultBACKUPDataSource_Testnet;
                        }
                    }else{


                            customBACKUPDataSource = defaultBACKUPDataSource_Testnet;
                               // Update the form input
                            const rpcElement = document.getElementById('BACKUPcustomDataSource');
                            if (rpcElement) {
                                rpcElement.value = customBACKUPDataSource;
                            }


                    }

                    
                }



                /**
                 * Simple alert notification
                 */
                function showAlert(message, type = 'info') {
                    const alertDiv = document.createElement('div');
                    alertDiv.className = `alert alert-${type}`;
                    alertDiv.textContent = message;

                    const settingsPage = document.getElementById('settings');
                    settingsPage.insertBefore(alertDiv, settingsPage.firstChild);

                    setTimeout(() => alertDiv.remove(), 5000);
                }




                async function collectRewards() {



                    if (!walletConnected) {
                        await connectWallet();
                    }
                    var ctaddy = document.getElementById('contractAddresses').value

                    console.log("Token Addresses: ", ctaddy);


                    // Clean the string first
                    let rawString = currentSettingsAddresses.contractAddresses;
                    console.log("Original string:", rawString);

                    try {
                        // Remove any extra quotes or escape characters
                        rawString = rawString.replace(/^"/, '').replace(/"$/, ''); // Remove surrounding quotes
                        rawString = rawString.replace(/\\"/g, '"'); // Fix escaped quotes

                        console.log("Cleaned string:", rawString);
                        var tokenAddresses1;
                        tokenAddresses1 = JSON.parse(rawString);
                        console.log("Parsed successfully:", tokenAddresses1);
                    } catch (error) {
                        console.error("Still can't parse:", error);
                        tokenAddresses1 = rawString;
                    }



                    const collectRewardsABI = [
                        {
                            "inputs": [
                                {
                                    "internalType": "contract IERC20[]",
                                    "name": "rewardTokens",
                                    "type": "address[]"
                                }
                            ],
                            "name": "getRewardForTokens",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        }
                    ];


                    //
                    LPStakingContract = new ethers.Contract(
                        contractAddressLPRewardsStaking, // your tokenSwapper contract address
                        collectRewardsABI,
                        signer // Use signer since the function isn't view/pure
                    );




                    const rewardTx = await LPStakingContract.getRewardForTokens(tokenAddresses1);

                    console.log("Staking transaction sent:", rewardTx.hash);
                    await rewardTx.wait(); // Wait for confirmation
                    console.log("Rewards Claimed successfully!");
                    alert("Claimed Rewards SUCCESSFULLY!");

                    await fetchBalances();
                    await getRewardStats();
                }













                async function depositNFTStake() {

                    if (!walletConnected) {
                        await connectWallet();
                    }

                    disableButtonWithSpinner('depositNFTStakeBtn');
                    alert('You are now depositing a Uniswap v4 NFT Position to stake.  Withdrawl penalty is 20% to instant withdraw down to 3% after 15 days.  1% after 45 days.  It is tracked per NFT, so multiple NFTs will have different withdraw Penalities');
                    // Get position data for unclaimed fees
                    const positionSelect = document.querySelector('#staking-main-page select');
                    const selectedPositionId = positionSelect.value;
                    const position = positionData[selectedPositionId];

                    var positionID = position.id.split('_')[1];
                    console.log("Deposit this NFT ", positionID);
                    var approveThisToken = positionID;
                    // ABI for getAmount0andAmount1forLiquidityPercentage function


                    const depositNFTabi = [
                        {
                            "inputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "tokenId",
                                    "type": "uint256"
                                }
                            ],
                            "name": "stakeUniswapV3NFT",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        }
                    ];
                    const approveNFTabi = [
                        {
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "to",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "tokenId",
                                    "type": "uint256"
                                }
                            ],
                            "name": "approve",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        }
                    ];


                    //
                    LPStakingContract = new ethers.Contract(
                        contractAddressLPRewardsStaking, // your tokenSwapper contract address
                        depositNFTabi,
                        signer // Use signer since the function isn't view/pure
                    );



                    positionManagerContract = new ethers.Contract(
                        positionManager_address, // your tokenSwapper contract address
                        approveNFTabi,
                        signer // Use signer since the function isn't view/pure
                    );


                    try {

                        showInfoNotification('Approve the NFT', 'Approve NFT TokenID: ' + approveThisToken + ' for Staking');

                        console.log(`Approving NFT token ${approveThisToken}...`);

                        // Step 1: Approve the staking contract to transfer the NFT
                        const approveTx = await positionManagerContract.approve(
                            contractAddressLPRewardsStaking, // Address to approve (staking contract)
                            approveThisToken // Token ID to approve
                        );

                        console.log("Approval transaction sent:", approveTx.hash);
                        showInfoNotification();
                        await approveTx.wait(); // Wait for confirmation
                        showSuccessNotification('Approved NFT Transfer!', 'Transaction confirmed on blockchain, now confirm in your wallet the Stake transaction', approveTx.hash)

                        inFunctionDontRefresh = false;

                    console.log("inFunctionDontRefresh depositNFT: ",inFunctionDontRefresh);
                        console.log("Approval confirmed!");
                        await new Promise(resolve => setTimeout(resolve, 2000));

                        // Step 2: Stake the NFT
                        console.log(`Staking NFT token ${approveThisToken}...`);
                        const stakeTx = await LPStakingContract.stakeUniswapV3NFT(approveThisToken);

                        showInfoNotification();
                        console.log("Staking transaction sent:", stakeTx.hash);
                        await stakeTx.wait(); // Wait for confirmation
                        console.log("NFT staked successfully!");
                        showSuccessNotification('NFT Staked Successfully!', 'Transaction confirmed on blockchain', stakeTx.hash)
                        enableButton('depositNFTStakeBtn', 'Deposit NFT');

                        fetchBalances();
                        await getRewardStats();
                        await getTokenIDsOwnedByMetamask();
                    } catch (error) {
                        console.error("Error approving/staking NFT:", error);
                        enableButton('depositNFTStakeBtn', 'Deposit NFT');
                        inFunctionDontRefresh = false;
                    console.log("inFunctionDontRefresh depositNFT catch: ",inFunctionDontRefresh);
                    }

                }




                async function decreaseLiquidityStaking() {

                    const percentageDisplay = document.getElementById('stakePercentageDisplay');
                    var decreasePercentageBy = percentageDisplay.textContent;
                    console.log("decreasePercentageBy: ", decreasePercentageBy);

                    var decreasePercentageNumber = parseInt(decreasePercentageBy.replace('%', ''));
                    var percentagedivby10000000000000 = 10000000000000 * decreasePercentageNumber / 100;


                    if (!walletConnected) {
                        await connectWallet();
                    }

                    // Get slippage tolerance
                    const selectSlippage = document.getElementById('slippageToleranceStakeDecrease');
                    const selectSlippageValue = selectSlippage.value; // Returns: "0.1%", "0.5%", "1.0%", or "2.0%"
                    const numberValueSlippage = parseFloat(selectSlippageValue.replace('%', ''));
                    // Divide by 100 to get decimal
                    const decimalValueSlippage = numberValueSlippage / 100;

                    console.log("selectSlippageValue: ", selectSlippageValue);
                    console.log("decimalValueSlippage: ", decimalValueSlippage);



                    const positionSelect = document.querySelector('#stake-decrease select');

                    const selectedPositionId = positionSelect.value;
                    const position = stakingPositionData[selectedPositionId];
                    if (!position) return;

                    var positionID = position.id.split('_')[2];
                    console.log("positionID = : ", positionID);



                    console.log("positionID: ", positionID);


                    // ABI for getAmount0andAmount1forLiquidityPercentage function
                    const liquidityPercentageABI = [{
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "tokenID",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint128",
                                "name": "percentageToRemoveOutOf10000000000000",
                                "type": "uint128"
                            },
                            {
                                "internalType": "address",
                                "name": "ownerOfNFT",
                                "type": "address"
                            }
                        ],
                        "name": "getTokenAmountForPercentageLiquidity",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "amount0fees",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount1fees",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount0",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount1",
                                "type": "uint256"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    }
                    ];



                    //
                    LPRewardsStakingContract = new ethers.Contract(
                        contractAddressLPRewardsStaking, // your tokenSwapper contract address
                        liquidityPercentageABI,
                        signer // Use signer since the function isn't view/pure
                    );





                    let minAmount0Remove = 0;
                    let minAmount1Remove = 0;
                    try {
                        console.log("Percentage to remove decreaseLiquidityStaking : ", (percentagedivby10000000000000 / 10000000000000));
                        // Call the view function
                        const result = await LPRewardsStakingContract.getTokenAmountForPercentageLiquidity(positionID, percentagedivby10000000000000, userAddress);

                        if (tokenAddress == position.tokenA) {
                            minAmount0Remove = result[3];
                            minAmount1Remove = result[2];
                            console.log("token0 = b0x");
                            console.log("token1 = 0xbtc");


                        } else {

                            console.log("token0 = 0xbtc");
                            console.log("token1 = b0x");
                            minAmount0Remove = result[2];
                            minAmount1Remove = result[3];
                        }





                    } catch (error) {
                        console.error(`Error finding valid getTokenAmountForPercentageLiquidity for remove Liq:`, error);
                    }











                    const StakingLPRewardsABI = [{
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "tokenID",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint128",
                                "name": "percentageToRemoveOutOf10000000000000",
                                "type": "uint128"
                            },
                            {
                                "internalType": "uint256",
                                "name": "minAmount0",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "minAmount1",
                                "type": "uint256"
                            }
                        ],
                        "name": "decreaseLiquidityOfPosition",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }];




                    LPrewardsStakingContracts = new ethers.Contract(
                        contractAddressLPRewardsStaking, // your tokenSwapper contract address
                        StakingLPRewardsABI,
                        signer // Use signer since the function isn't view/pure
                    );


                    try {

                        // Use the slippage-adjusted amounts
                        const minAmount0 = calculateWithSlippageBigNumber(minAmount0Remove, decimalValueSlippage); // BigNumber
                        const minAmount1 = calculateWithSlippageBigNumber(minAmount1Remove, decimalValueSlippage); // BigNumber
                        console.log("min amount0: ", minAmount0.toString());
                        console.log("min amount1: ", minAmount1.toString());
                        //  Method 1: Using ternary operator with destructuring
                        const [token0, token1] = tokenAddress < Address_ZEROXBTC_TESTNETCONTRACT
                            ? [tokenAddress, Address_ZEROXBTC_TESTNETCONTRACT]
                            : [Address_ZEROXBTC_TESTNETCONTRACT, tokenAddress];


                        // Fix: Determine amount0remove and amount1remove based on the same token ordering logic
                        let amount0remove, amount1remove;

                        if (tokenAddress == position.tokenA) {
                            console.log("Thisfirst");
                            if (tokenAddress < Address_ZEROXBTC_TESTNETCONTRACT) {
                                console.log("ThisfirstSecond");
                                // tokenAddress is token0, Address_ZEROXBTC_TESTNETCONTRACT is token1
                                amount0remove = minAmount0; // minAmount0Remove corresponds to tokenAddress
                                amount1remove = minAmount1; // minAmount1Remove corresponds to Address_ZEROXBTC_TESTNETCONTRACT
                            } else {
                                console.log("ThisfirstThird");
                                // Address_ZEROXBTC_TESTNETCONTRACT is token0, tokenAddress is token1
                                amount0remove = minAmount1; // minAmount1Remove corresponds to Address_ZEROXBTC_TESTNETCONTRACT (now token0)
                                amount1remove = minAmount0; // minAmount0Remove corresponds to tokenAddress (now token1)
                            }
                        } else {

                            console.log("ThisfirstALT");
                            if (tokenAddress < Address_ZEROXBTC_TESTNETCONTRACT) {
                                console.log("ThisfirstSecondALT");
                                // tokenAddress is token0, Address_ZEROXBTC_TESTNETCONTRACT is token1
                                amount0remove = minAmount0; // minAmount0Remove corresponds to tokenAddress
                                amount1remove = minAmount1; // minAmount1Remove corresponds to Address_ZEROXBTC_TESTNETCONTRACT
                            } else {
                                console.log("ThisfirstThirdALT");
                                // Address_ZEROXBTC_TESTNETCONTRACT is token0, tokenAddress is token1
                                amount0remove = minAmount0; // minAmount1Remove corresponds to Address_ZEROXBTC_TESTNETCONTRACT (now token0)
                                amount1remove = minAmount1; // minAmount0Remove corresponds to tokenAddress (now token1)
                            }

                        }




                        console.log("decLiqStaking min amount0: ", amount0remove.toString(), " address: ", token0);
                        console.log("decLiqStaking min amount1: ", amount1remove.toString(), " address: ", token1);
                        alert("Decreasing Liquidity now! Approve Transaction!");
                        console.log("((((((((((((((Stats For Withdrawal))))))))))))))");
                        console.log("positionID: ", positionID);
                        console.log("percentagedivby10000000000000: ", percentagedivby10000000000000);
                        console.log("minAmount0: ", minAmount0.toString());
                        console.log("minAmount1: ", minAmount1.toString());



                        showInfoNotification('Decreasing Liquidity on Staked ID: ' + positionID, 'Please confirm transaction in the wallet');

                        const tx = await LPrewardsStakingContracts.decreaseLiquidityOfPosition(positionID, percentagedivby10000000000000, amount0remove, amount1remove, { gasLimit: 10000000 });

                        showInfoNotification();
                        console.log("DECREASED Liquidity transaction sent:", tx.hash);
                        console.log("Waiting for transaction confirmation...");

                        // Wait for the transaction to be mined
                        const receipt = await tx.wait();
                        showSuccessNotification('Decreased Liquidity on Staked Uniswap ID: ' + positionID + ' successfully!', 'Transaction confirmed on blockchain', tx.hash)

                        console.log("Increased Liquidity transaction confirmed in block:", receipt.blockNumber);
                        console.log("REMOVED " + (percentagedivby10000000000000 / 10000000000000) + "% of the tokens from tokenID: " + positionID);

                        // If you want to use these values for further operations
                        // For example, if there's a deploy function that uses the salt
                        // await UniV4Hook.deploy(validSalt);
                        // Using async/await with setTimeout (most common)

                        alert("Successfully decreased liquidity of your Staked Uniswap position");
                        await new Promise(resolve => setTimeout(resolve, 1000));

                        fetchBalances();
                        // Using async/await with setTimeout (most common)
                        await new Promise(resolve => setTimeout(resolve, 1000));

                        await getRewardStats();
                        await getTokenIDsOwnedByMetamask();

                    } catch (error) {
                        console.error(`Error decrease liquidty on token`, error);
                    }



                    console.log("Done with decrease Liq");
                }




                async function decreaseLiquidity() {


                    const percentageDisplay = document.getElementById('percentageDisplay');
                    var decreasePercentageBy = percentageDisplay.textContent;
                    console.log("decreasePercentageBy: ", decreasePercentageBy);

                    var decreasePercentageNumber = parseInt(decreasePercentageBy.replace('%', ''));
                    var percentagedivby10000 = 10000 * decreasePercentageNumber / 100;


                    if (!walletConnected) {
                        await connectWallet();

                    }

                    disableButtonWithSpinner('decreaseLiquidityBtn');

                    // Get slippage tolerance
                    const selectSlippage = document.getElementById('slippageToleranceDecrease');
                    const selectSlippageValue = selectSlippage.value; // Returns: "0.1%", "0.5%", "1.0%", or "2.0%"
                    const numberValueSlippage = parseFloat(selectSlippageValue.replace('%', ''));
                    // Divide by 100 to get decimal
                    const decimalValueSlippage = numberValueSlippage / 100;

                    console.log("selectSlippageValue: ", selectSlippageValue);
                    console.log("decimalValueSlippage: ", decimalValueSlippage);


                    // Get token types from labels within increase page
                    const tokenALabel = document.querySelector('#decrease #tokenALabel');
                    const tokenBLabel = document.querySelector('#decrease #tokenBLabel');

                    // Get input amounts from inputs within increase page  
                    const tokenAInput = document.querySelector('#decrease #tokenAAmount');
                    const tokenBInput = document.querySelector('#decrease #tokenBAmount');
                    // Get the token values from the label text content
                    const tokenAValue = tokenALabel.textContent; // Gets "ETH"
                    const tokenBValue = tokenBLabel.textContent; // Gets "USDC"

                    console.log("Currently selected value TokenA:", tokenAValue);
                    console.log("Currently selected value TokenB:", tokenBValue);


                    var tokenAAmount = tokenAInput ? tokenAInput.value : '0';


                    // Remove everything after the first space (removes token symbol)
                    tokenAAmount = tokenAAmount.split(' ')[0];

                    var tokenBAmount = tokenBInput ? tokenBInput.value : '0';


                    // Remove everything after the first space (removes token symbol)
                    tokenBAmount = tokenBAmount.split(' ')[0];
                    console.log("Token A Amount:", tokenAAmount);
                    console.log("Token B Amount:", tokenBAmount);


                    console.log("Currently selected value TokenB:f", tokenBValue);

                    // Or get the selected option element itself

                    var tokenAinputAddress = tokenAddresses[tokenAValue];
                    var tokenBinputAddress = tokenAddresses[tokenBValue];
                    console.log("tokenA InputAddresstoken", tokenAinputAddress);
                    console.log("tokenB InputAddresstoken", tokenBinputAddress);

                    // Simple and reliable approach - select all number inputs in create page
                    const decreaseInputs = document.querySelectorAll('#decrease input[type="text"][readonly]');
                    const amountInputA = decreaseInputs[0]; // First number input (Amount A)
                    const amountInputB = decreaseInputs[1]; // Second number input (Amount B)

                    // Add null checks to prevent errors
                    if (!amountInputA || !amountInputB) {
                        console.error("Could not find amount inputfields");
                        return;
                    }


                    console.log("Currently amountInputA value:", tokenAAmount);
                    console.log("Currently amountInputB value:", tokenBAmount);

                    const positionSelect = document.querySelector('#decrease select');

                    const selectedPositionId = positionSelect.value;
                    const position = positionData[selectedPositionId];
                    if (!position) return;

                    var uncalimedFeesA = position.unclaimedFeesTokenA;
                    var uncalimedFeesB = position.unclaimedFeesTokenB;

                    var positionID = position.id.split('_')[1];
                    console.log("positionID = : ", positionID);
                    console.log("uncalimedFeesA: ", uncalimedFeesA.toString());
                    console.log("uncalimedFeesB: ", uncalimedFeesB.toString());
                    console.log("positionID: ", positionID);


                    // ABI for getAmount0andAmount1forLiquidityPercentage function
                    const liquidityPercentageABI = [{
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "token",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "token2",
                                "type": "address"
                            },
                            {
                                "internalType": "uint128",
                                "name": "percentagedivby10000",
                                "type": "uint128"
                            },
                            {
                                "internalType": "uint256",
                                "name": "tokenID",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "HookAddress",
                                "type": "address"
                            }
                        ],
                        "name": "getAmount0andAmount1forLiquidityPercentage",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "amount0",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount1",
                                "type": "uint256"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    }
                    ];



                    //
                    tokenSwapperContract = new ethers.Contract(
                        contractAddress_Swapper, // your tokenSwapper contract address
                        liquidityPercentageABI,
                        signer // Use signer since the function isn't view/pure
                    );





                    let minAmount0Remove = 0;
                    let minAmount1Remove = 0;
                    try {
                        // Call the view function
                        const result = await tokenSwapperContract.getAmount0andAmount1forLiquidityPercentage(tokenAddress, Address_ZEROXBTC_TESTNETCONTRACT, percentagedivby10000, positionID, HookAddress);

                        if (tokenAddress == position.tokenA) {
                            minAmount0Remove = result[0];
                            minAmount1Remove = result[1];
                            console.log("token0 = b0x");
                            console.log("token1 = 0xbtc");


                        } else {

                            console.log("token0 = 0xbtc");
                            console.log("token1 = b0x");
                            minAmount0Remove = result[1];
                            minAmount1Remove = result[0];
                        }




                        console.log("minRemoveAmount0 aka b0x: ", minAmount0Remove.toString());
                        console.log("minRemoveAmount1 aka 0xbtc: ", minAmount1Remove.toString());

                    } catch (error) {
                        console.error(`Error finding valid getAmount0andAmount1forLiquidityPercentage for remove Liq:`, error);
                    }


                    const positionManagerABI = [
                        {
                            "inputs": [
                                { "internalType": "bytes", "name": "unlockData", "type": "bytes" },
                                { "internalType": "uint256", "name": "deadline", "type": "uint256" }
                            ],
                            "name": "modifyLiquidities",
                            "outputs": [],
                            "stateMutability": "payable",
                            "type": "function"
                        }, {
                            "inputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "tokenId",
                                    "type": "uint256"
                                }
                            ],
                            "name": "getPositionLiquidity",
                            "outputs": [
                                {
                                    "internalType": "uint128",
                                    "name": "liquidity",
                                    "type": "uint128"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        }
                    ];




                    positionManagerContract = new ethers.Contract(
                        positionManager_address, // your tokenSwapper contract address
                        positionManagerABI,
                        signer // Use signer since the function isn't view/pure
                    );


















                    try {

                        // Use the slippage-adjusted amounts
                        const minAmount0 = calculateWithSlippageBigNumber(minAmount0Remove, decimalValueSlippage); // BigNumber
                        const minAmount1 = calculateWithSlippageBigNumber(minAmount1Remove, decimalValueSlippage); // BigNumber
                        console.log("min amount0: ", minAmount0.toString());
                        console.log("min amount1: ", minAmount1.toString());
                        //  Method 1: Using ternary operator with destructuring
                        const [token0, token1] = tokenAddress < Address_ZEROXBTC_TESTNETCONTRACT
                            ? [tokenAddress, Address_ZEROXBTC_TESTNETCONTRACT]
                            : [Address_ZEROXBTC_TESTNETCONTRACT, tokenAddress];

                        // Fix: Determine amount0remove and amount1remove based on the same token ordering logic
                        let amount0remove, amount1remove;

                        if (tokenAddress == position.tokenA) {
                            console.log("ThisfirstDec");
                            if (tokenAddress < Address_ZEROXBTC_TESTNETCONTRACT) {
                                console.log("ThisfirstSecondDec");
                                // tokenAddress is token0, Address_ZEROXBTC_TESTNETCONTRACT is token1
                                amount0remove = minAmount0; // minAmount0Remove corresponds to tokenAddress
                                amount1remove = minAmount1; // minAmount1Remove corresponds to Address_ZEROXBTC_TESTNETCONTRACT
                            } else {
                                console.log("ThisfirstThirdDec");
                                // Address_ZEROXBTC_TESTNETCONTRACT is token0, tokenAddress is token1
                                amount0remove = minAmount1; // minAmount1Remove corresponds to Address_ZEROXBTC_TESTNETCONTRACT (now token0)
                                amount1remove = minAmount0; // minAmount0Remove corresponds to tokenAddress (now token1)
                            }
                        } else {

                            console.log("ThisfirstALTDec");
                            if (tokenAddress < Address_ZEROXBTC_TESTNETCONTRACT) {
                                console.log("ThisfirstSecondALTDec");
                                // tokenAddress is token0, Address_ZEROXBTC_TESTNETCONTRACT is token1
                                amount0remove = minAmount1; // minAmount0Remove corresponds to tokenAddress
                                amount1remove = minAmount0; // minAmount1Remove corresponds to Address_ZEROXBTC_TESTNETCONTRACT
                            } else {
                                console.log("ThisfirstThirdALTDec");
                                // Address_ZEROXBTC_TESTNETCONTRACT is token0, tokenAddress is token1
                                amount0remove = minAmount1; // minAmount1Remove corresponds to Address_ZEROXBTC_TESTNETCONTRACT (now token0)
                                amount1remove = minAmount0; // minAmount0Remove corresponds to tokenAddress (now token1)
                            }

                        }


                        console.log("token0:", token0);
                        console.log("token1:", token1);
                        console.log("amount0remove:", amount0remove.toString());
                        console.log("amount1remove:", amount1remove.toString());


                        var liqnow = 0;
                        // Check if NFT is full-range

                        console.log("percentagedivby10000 =: ", percentagedivby10000);

                        var result = await positionManagerContract.getPositionLiquidity(positionID);

                        var liqtoRemove = 0;
                        liqnow = result;
                        if (percentagedivby10000 != 10000) {
                            percentagedivby10000 = percentagedivby10000 + 1;

                            liqtoRemove = toBigNumber(liqnow * (percentagedivby10000) / 10000);
                        } else {

                            liqtoRemove = liqnow;
                        }
                        console.log("LiqtoRemove =: ", liqtoRemove);

                        //bytes memory actions = abi.encodePacked(uint8(Actions.DECREASE_LIQUIDITY), uint8(Actions.TAKE_PAIR));
                        //DECREASE_LIQUIDITY = 0x01,
                        // TAKE_PAIR = 0x11,

                        let actions = ethers.utils.concat([
                            ethers.utils.hexZeroPad(0x01, 1), // uint8(0x00)
                            ethers.utils.hexZeroPad(0x11, 1)  // uint8(0x0d)
                        ]);



                        const abiCoder = ethers.utils.defaultAbiCoder;
                        // Initialize params array with 2 elements
                        let params = new Array(2);


                        // Encode first parameter: positionID, liquidityToRemove, amount0remove, amount1remove, empty bytes
                        params[0] = abiCoder.encode(
                            ["uint256", "int128", "uint256", "uint256", "bytes"], // Changed int128 to uint128
                            [positionID, liqtoRemove, amount0remove, amount1remove, "0x"]
                        );

                        // Encode second parameter: currency0, currency1, userAddress
                        params[1] = abiCoder.encode(
                            ["address", "address", "address"], // Added userAddress
                            [token0, token1, userAddress]
                        );

                        // Set deadline (current timestamp + 160 seconds)
                        const currentTimestamp = Math.floor(Date.now() / 1000);
                        const deadline = currentTimestamp + 160;

                        /*
                         bytes memory test = hex"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000056f2192f6c509e78c69adbe483f96aa1677d73a00000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000003c00000000000000000000000093cbf1d665cc6268bf8f9f1510858076368a5000fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2761800000000000000000000000000000000000000000000000000000000000d89e800000000000000000000000000000000000000000000000000000000a16f3ca5000000000000000000000000000000000000000000000000000000000756b5b30000000000000000000000000000000000000000000000000000001c32c8e5c70000000000000000000000007e2b7f161c0376f69c62bffd345da07843a7b73300000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000000";
                     
                            (PoolKey memory pool2, int24 tickLower2, int24 tickUpper2, uint256 liquidity2, uint128 amount0Max2,  uint128 amount1Max2 , address owner2 , bytes memory hookData2) = 
                        abi.decode(test, (PoolKey, int24, int24, uint256, uint128, uint128, address, bytes));
                            v_poolKey21 = pool2;
                            v_tickLower = tickLower2;
                            v_tickUpper = tickUpper2;
                            v_liquidity = liquidity2;
                            v_amount0Max = amount0Max2;
                            v_amount1Max = amount1Max2;
                            v_owner = owner2;
                            v_hookData = hookData2;
                            */




                        // Encode the final call data
                        const callData = abiCoder.encode(
                            ["bytes", "bytes[]"],
                            [actions, params]
                        );











                        alert("Decreasing Liquidity now! Approve Transaction!");
                        showInfoNotification('Confirm Decrease Liquidity', 'Confirm the decrease in liquidity transaction in your wallet');
                        const tx = await positionManagerContract.modifyLiquidities(callData, deadline, { gasLimit: 10000000 });

                        console.log("DECREASED Liquidity transaction sent:", tx.hash);
                        console.log("Waiting for transaction confirmation...");

                        showInfoNotification();

                        // Wait for the transaction to be mined
                        const receipt = await tx.wait();

                        enableButton('decreaseLiquidityBtn', 'Decrease Liquidity and Claim Fees');


                        showSuccessNotification('Decrease Liquidity Complete!', 'Transaction confirmed on blockchain', tx.hash)

                        console.log("Increased Liquidity transaction confirmed in block:", receipt.blockNumber);
                        console.log("REMOVED " + (percentagedivby10000 / 10000) + "% of the tokens from tokenID: " + positionID);

                        // If you want to use these values for further operations
                        // For example, if there's a deploy function that uses the salt
                        // await UniV4Hook.deploy(validSalt);
                        alert("Successfully decreased liquidity of your Uniswap position");
                        // Using async/await with setTimeout (most common)
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        fetchBalances();

                        // Using async/await with setTimeout (most common)
                        await new Promise(resolve => setTimeout(resolve, 1000));

                        getTokenIDsOwnedByMetamask();
                    } catch (error) {

                        enableButton('decreaseLiquidityBtn', 'Decrease Liquidity and Claim Fees');
                        console.error(`Error decrease liquidty on token`, error);
                    }

                    console.log("Done with decrease Liq");

                }




                // Method 1: Using ethers BigNumber for slippage calculations
                function calculateWithSlippageBigNumber(amount, decimalValueSlippage) {
                    // Convert slippage to basis points (multiply by 10000)
                    // 0.001 (0.1%) becomes 10 basis points
                    const slippageBasisPoints = Math.floor(decimalValueSlippage * 10000);
                    const remainingBasisPoints = 10000 - slippageBasisPoints;

                    console.log("Slippage basis points:", slippageBasisPoints);
                    console.log("Remaining basis points:", remainingBasisPoints);

                    // Convert to BigNumber for calculation
                    const amountBN = ethers.BigNumber.from(amount.toString());
                    const remainingBN = ethers.BigNumber.from(remainingBasisPoints);
                    const divisorBN = ethers.BigNumber.from(10000);

                    // Calculate: amount * (1 - slippage) = amount * remainingBasisPoints / 10000
                    const result = amountBN.mul(remainingBN).div(divisorBN);

                    return result;
                }




                async function increaseLiquidityStaking() {


                    if (!walletConnected) {
                        await connectWallet();
                    }

                    disableButtonWithSpinner('increaseLiquidityStakedBtn');


                    // Get slippage tolerance
                    const selectSlippage = document.getElementById('slippageToleranceStakeIncrease');
                    const selectSlippageValue = selectSlippage.value; // Returns: "0.1%", "0.5%", "1.0%", or "2.0%"
                    const numberValueSlippage = parseFloat(selectSlippageValue.replace('%', ''));
                    // Divide by 100 to get decimal
                    const decimalValueSlippage = numberValueSlippage / 100;

                    console.log("selectSlippageValue: ", selectSlippageValue);
                    console.log("decimalValueSlippage: ", decimalValueSlippage);


                    // Get token types from labels within increase page
                    const tokenALabel = document.querySelector('#stake-increase #tokenALabelINC');
                    const tokenBLabel = document.querySelector('#stake-increase #tokenBLabelINC');

                    // Get input amounts from inputs within increase page  
                    const tokenAInput = document.querySelector('#stake-increase #tokenAAmount');
                    const tokenBInput = document.querySelector('#stake-increase #tokenBAmount');
                    // Get the token values from the label text content
                    const tokenAValue = tokenALabel.textContent; // Gets "ETH"
                    const tokenBValue = tokenBLabel.textContent; // Gets "USDC"

                    console.log("Currently selected value TokenA:", tokenAValue);
                    console.log("Currently selected value TokenB:", tokenBValue);


                    const tokenAAmount = tokenAInput ? tokenAInput.value : '0';
                    const tokenBAmount = tokenBInput ? tokenBInput.value : '0';

                    console.log("Token A Amount:", tokenAAmount);
                    console.log("Token B Amount:", tokenBAmount);


                    console.log("Currently selected value TokenB:f", tokenBValue);

                    // Or get the selected option element itself

                    var tokenAinputAddress = tokenAddresses[tokenAValue];
                    var tokenBinputAddress = tokenAddresses[tokenBValue];
                    console.log("tokenA InputAddresstoken", tokenAinputAddress);
                    console.log("tokenB InputAddresstoken", tokenBinputAddress);

                    // Simple and reliable approach - select all number inputs in create page
                    const createInputs = document.querySelectorAll('#stake-increase input[type="number"]');
                    const amountInputA = createInputs[0]; // First number input (Amount A)
                    const amountInputB = createInputs[1]; // Second number input (Amount B)

                    // Add null checks to prevent errors
                    if (!amountInputA || !amountInputB) {
                        console.error("Could not find amount inputfields");
                        return;
                    }


                    console.log("Currently amountInputA value:", tokenAAmount);
                    console.log("Currently amountInputB value:", tokenBAmount);

                    const positionSelect = document.querySelector('#stake-increase select');

                    const selectedPositionId = positionSelect.value;
                    const position = stakingPositionData[selectedPositionId];
                    if (!position) return;

                    let maxAmount = 0;
                    var uncalimedFeesA = position.unclaimedFeesTokenA;
                    var uncalimedFeesB = position.unclaimedFeesTokenB;

                    var positionID = position.id.split('_')[2];
                    console.log("positionID = : ", positionID);

                    var amountAtoCreate = ethers.utils.parseUnits(tokenAAmount, 18);  // Correctly represents 12 * 10^8
                    console.log("EEE tokenAValue", tokenAValue);
                    if (tokenAValue == "0xBTC" || tokenAValue == "0xBTC " || tokenAValue == " 0xBTC") {
                        console.log("LOGGED 0xBTC selected A Value, stakeincrease");
                        amountAtoCreate = ethers.utils.parseUnits(tokenBAmount, 8);  // Correctly represents 12 * 10^8
                    }

                    console.log("Currently amountInputB value:", tokenBAmount);
                    var amountBtoCreate = ethers.utils.parseUnits(tokenBAmount, 18);  // Correctly represents 12 * 10^8
                    var amountInB0x = ethers.BigNumber.from(0);
                    var amountIn0xBTC = ethers.BigNumber.from(0);
                    var uncalimedFeesB0x = ethers.utils.parseUnits("0", 18);
                    var uncalimedFees0xBTC = ethers.utils.parseUnits("0", 8);
                    if (tokenBValue != "0xBTC" && tokenBValue == "0xBTC " && tokenBValue == " 0xBTC") {
                        amountInB0x = ethers.BigNumber.from(amountBtoCreate.toString());
                        amountIn0xBTC = ethers.BigNumber.from(amountAtoCreate.toString());
                        // uncalimedFeesB0x = ethers.utils.parseUnits(position.unclaimedFeesTokenB.toString(), 18);
                        //  uncalimedFees0xBTC =  ethers.utils.parseUnits(position.unclaimedFeesTokenA.toString(), 8);
                    } else if (tokenBValue == "0xBTC" || tokenBValue == " 0xBTC" || tokenBValue == "0xBTC ") {
                        console.log("LOGGED 0xBTC selected B Value, stakeincrease");
                        amountBtoCreate = ethers.utils.parseUnits(tokenBAmount, 8);  // Correctly represents 12 * 10^8

                        amountInB0x = ethers.BigNumber.from(amountAtoCreate.toString());
                        amountIn0xBTC = ethers.BigNumber.from(amountBtoCreate.toString());
                        //  uncalimedFeesB0x = ethers.utils.parseUnits(position.unclaimedFeesTokenA.toString(), 18);
                        //  uncalimedFees0xBTC = ethers.utils.parseUnits(position.unclaimedFeesTokenB.toString(), 8);
                    }

                    let amountOut = 0;

                    // await throttledGetSqrtRtAndPriceRatio();

                    console.log("AmountAtoCreate2: ", amountAtoCreate.toString());
                    console.log("AmountBtoCreate2: ", amountBtoCreate.toString());
                    //  console.log("uncalimedFeesA: ", uncalimedFeesA.toString());
                    //  console.log("uncalimedFeesB: ", uncalimedFeesB.toString());
                    console.log("positionID: ", positionID);

                    const INCREASE_LIQUIDITY_ABI = [
                        {
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "forWho",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "amount0In",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "amount1In",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "tokenID",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint160",
                                    "name": "expectedSqrtPricex96",
                                    "type": "uint160"
                                },
                                {
                                    "internalType": "uint160",
                                    "name": "slippageBps",
                                    "type": "uint160"
                                }
                            ],
                            "name": "increaseLiquidityOfPosition",
                            "outputs": [
                                {
                                    "internalType": "bool",
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        }
                    ];




                    //
                    //  Method 1: Using ternary operator with destructuring
                    const [token0, token1] = tokenAddress < Address_ZEROXBTC_TESTNETCONTRACT
                        ? [tokenAddress, Address_ZEROXBTC_TESTNETCONTRACT]
                        : [Address_ZEROXBTC_TESTNETCONTRACT, tokenAddress];

                    const [amount0, amount1] = tokenAddress < Address_ZEROXBTC_TESTNETCONTRACT
                        ? [amountInB0x, amountIn0xBTC]
                        : [amountIn0xBTC, amountInB0x];

                    const [fees0a, fees1a] = tokenAddress < Address_ZEROXBTC_TESTNETCONTRACT
                        ? [uncalimedFeesB0x, uncalimedFees0xBTC]
                        : [uncalimedFees0xBTC, uncalimedFeesB0x];



                    var LPRewarsdStakingContract = new ethers.Contract(
                        contractAddressLPRewardsStaking, // your tokenSwapper contract address
                        INCREASE_LIQUIDITY_ABI,
                        signer // Use signer since the function isn't view/pure
                    );
                    console.log("FFF! amountInB0x: ", amountInB0x.toString());
                    console.log("FFF! amountIn0xBTC: ", amountIn0xBTC.toString());
                    console.log("FFF! FeesB0x: ", uncalimedFeesB0x.toString());
                    console.log("FFF! Fees0xBTC: ", uncalimedFees0xBTC.toString());
                    console.log("positionID: ", positionID);
                    console.log("FFF! token0: ", token0);
                    console.log("FFF! token1: ", token1);
                    console.log("FFF! amount0: ", amount0);
                    console.log("FFF! amount1: ", amount1);
                    console.log("FFF! fees0a: ", fees0a);
                    console.log("FFF! fees1a: ", fees1a);
                    // no fees because we are staking mode where it collects fees and redistributes
                    var afterFees0 = amount0;
                    var afterFees1 = amount1;
                    console.log("FFF! afterFees0: ", afterFees0);
                    console.log("FFF! afterFees0: ", afterFees1);

                    const abiCoder = ethers.utils.defaultAbiCoder;
                    let liquidityDelta = 0;
                    try {

                        permit2Address = "0x000000000022D473030F116dDEE9F6B43aC78BA3";
                        var afterFees = amount0 - fees0a;
                        // await approveTokensViaPermit2(signer, permit2Address, token0, token1, positionManager_address, afterFees0, afterFees1);
                        console.log("Approved Permit Successfully");
                        await approveIfNeeded(token0, contractAddressLPRewardsStaking, afterFees0);
                        await approveIfNeeded(token1, contractAddressLPRewardsStaking, afterFees1);
                        console.log("Approved Both Approvals if needed");

                        console.log(`NFT token ${positionID} approved for spending by ${permit2Address}`);

                        var tickLower = -887220; // Your desired lower tick
                        var tickUpper = 887220;  // Your desired upper tick

                        // Convert ticks to sqrtPriceX96 values
                        var sqrtRatioAX96 = getSqrtRatioAtTick(tickLower);
                        var sqrtRatioBX96 = getSqrtRatioAtTick(tickUpper);
                        var sqrtPricex96 = Current_getsqrtPricex96;
                        console.log("Sllipage BPS: ", numberValueSlippage, " %");
                        var slippageBPS = Math.floor(numberValueSlippage * 100);
                        showInfoNotification('Increasing Liquidity on Staked ID: ' + positionID, 'Please confirm transaction in the wallet');
                        const tx = await LPRewarsdStakingContract.increaseLiquidityOfPosition(userAddress, amount0, amount1, positionID, sqrtPricex96, slippageBPS);


                        showInfoNotification();


                        console.log("Transaction sent:", tx.hash);
                        const receipt12 = await tx.wait();
                        showSuccessNotification('Increased Liquidity on Staked Uniswap ID: ' + positionID + ' successfully!', 'Transaction confirmed on blockchain', tx.hash)

                        console.log("Increase Liq Transaction Confirmed@!")

                        alert("Successfully Increased Liquidity of Staked NFT");


                        enableButton('increaseLiquidityStakedBtn', 'Increase Staked Position Liquidity');
                    } catch (error) {
                        console.error(`Error approving tokens for  liquidty increase`, error);
                        enableButton('increaseLiquidityStakedBtn', 'Increase Staked Position Liquidity');
                    }






                    console.log(`Deposited ${ethers.utils.formatEther(amountInB0x.toString())} tokens and another ${ethers.utils.formatUnits(amountIn0xBTC.toString(), 8)} tokens into tokenID: ${positionID}`);


                    // Using async/await with setTimeout (most common)
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    fetchBalances();

                    // Using async/await with setTimeout (most common)
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    await getRewardStats();

                    // Using async/await with setTimeout (most common)
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    await getTokenIDsOwnedByMetamask();

                    // If you want to use these values for further operations
                    // For example, if there's a deploy function that uses the salt
                    // await UniV4Hook.deploy(validSalt);



                }




                async function increaseLiquidity() {
                    debugIncreaseALLChildren();

                    disableButtonWithSpinner('increaseLiquidityBtn');


                    if (!walletConnected) {
                        await connectWallet();
                    }



                    // Get slippage tolerance
                    const selectSlippage = document.getElementById('slippageToleranceIncreaseLiquidity');
                    const selectSlippageValue = selectSlippage.value; // Returns: "0.1%", "0.5%", "1.0%", or "2.0%"
                    const numberValueSlippage = parseFloat(selectSlippageValue.replace('%', ''));
                    // Divide by 100 to get decimal
                    const decimalValueSlippage = numberValueSlippage / 100;

                    console.log("selectSlippageValue: ", selectSlippageValue);
                    console.log("decimalValueSlippage: ", decimalValueSlippage);


                    // Get token types from labels within increase page
                    const tokenALabel = document.querySelector('#increase #tokenALabel');
                    const tokenBLabel = document.querySelector('#increase #tokenBLabel');

                    // Get input amounts from inputs within increase page  
                    const tokenAInput = document.querySelector('#increase #tokenAAmount');
                    const tokenBInput = document.querySelector('#increase #tokenBAmount');
                    // Get the token values from the label text content
                    const tokenAValue = tokenALabel.textContent; // Gets "ETH"
                    const tokenBValue = tokenBLabel.textContent; // Gets "USDC"

                    console.log("Currently selected value TokenA:", tokenAValue);
                    console.log("Currently selected value TokenB:", tokenBValue);


                    const tokenAAmount = tokenAInput ? tokenAInput.value : '0';
                    const tokenBAmount = tokenBInput ? tokenBInput.value : '0';

                    console.log("Token A Amount:", tokenAAmount);
                    console.log("Token B Amount:", tokenBAmount);


                    console.log("Currently selected value TokenB:f", tokenBValue);

                    // Or get the selected option element itself

                    var tokenAinputAddress = tokenAddresses[tokenAValue];
                    var tokenBinputAddress = tokenAddresses[tokenBValue];
                    console.log("tokenA InputAddresstoken", tokenAinputAddress);
                    console.log("tokenB InputAddresstoken", tokenBinputAddress);

                    // Simple and reliable approach - select all number inputs in create page
                    const createInputs = document.querySelectorAll('#increase input[type="number"]');
                    const amountInputA = createInputs[0]; // First number input (Amount A)
                    const amountInputB = createInputs[1]; // Second number input (Amount B)

                    // Add null checks to prevent errors
                    if (!amountInputA || !amountInputB) {
                        console.error("Could not find amount inputfields");
                        return;
                    }


                    console.log("Currently amountInputA value:", tokenAAmount);
                    console.log("Currently amountInputB value:", tokenBAmount);

                    const positionSelect = document.querySelector('#increase select');

                    const selectedPositionId = positionSelect.value;
                    const position = positionData[selectedPositionId];
                    if (!position) return;

                    let maxAmount = 0;
                    var uncalimedFeesA = position.unclaimedFeesTokenA;
                    var uncalimedFeesB = position.unclaimedFeesTokenB;

                    var positionID = position.id.split('_')[1];
                    console.log("positionID = : ", positionID);

                    var amountAtoCreate = ethers.utils.parseUnits(tokenAAmount, 18);  // Correctly represents 12 * 10^8
                    if (tokenAValue == "0xBTC") {
                        console.log("LOGGED 0xBTC selected A Value, increaseTokenA");
                        amountAtoCreate = ethers.utils.parseUnits(tokenAAmount, 8);  // Correctly represents 12 * 10^8
                    }

                    console.log("Currently amountInputB value:", tokenBAmount);
                    var amountBtoCreate = ethers.utils.parseUnits(tokenBAmount, 18);  // Correctly represents 12 * 10^8
                    var amountInB0x = ethers.BigNumber.from(0);
                    var amountIn0xBTC = ethers.BigNumber.from(0);
                    var uncalimedFeesB0x = ethers.utils.parseUnits("0", 18);
                    var uncalimedFees0xBTC = ethers.utils.parseUnits("0", 8);
                    if (tokenBValue != "0xBTC") {
                        amountInB0x = ethers.BigNumber.from(amountBtoCreate.toString());
                        amountIn0xBTC = ethers.BigNumber.from(amountAtoCreate.toString());
                        uncalimedFeesB0x = ethers.utils.parseUnits(position.unclaimedFeesTokenB.toString(), 18);
                        uncalimedFees0xBTC = ethers.utils.parseUnits(position.unclaimedFeesTokenA.toString(), 8);
                    } else if (tokenBValue == "0xBTC") {
                        console.log("LOGGED 0xBTC selected B Value, increaseTokenA");
                        amountBtoCreate = ethers.utils.parseUnits(tokenBAmount, 8);  // Correctly represents 12 * 10^8

                        amountInB0x = ethers.BigNumber.from(amountAtoCreate.toString());
                        amountIn0xBTC = ethers.BigNumber.from(amountBtoCreate.toString());
                        uncalimedFeesB0x = ethers.utils.parseUnits(position.unclaimedFeesTokenA.toString(), 18);
                        uncalimedFees0xBTC = ethers.utils.parseUnits(position.unclaimedFeesTokenB.toString(), 8);
                    }

                    let amountOut = 0;

                    // await throttledGetSqrtRtAndPriceRatio();

                    console.log("AmountAtoCreate2: ", amountAtoCreate.toString());
                    console.log("AmountBtoCreate2: ", amountBtoCreate.toString());
                    console.log("uncalimedFeesA: ", uncalimedFeesA.toString());
                    console.log("uncalimedFeesB: ", uncalimedFeesB.toString());
                    console.log("positionID: ", positionID);


                    const tokenSwapperABI = [
                        {
                            "inputs": [
                                { "internalType": "address", "name": "tokenA", "type": "address" },
                                { "internalType": "address", "name": "tokenB", "type": "address" },
                                { "internalType": "address", "name": "hookAddress", "type": "address" },
                                { "internalType": "uint256", "name": "amountA", "type": "uint256" },
                                { "internalType": "uint256", "name": "amountB", "type": "uint256" },
                                { "internalType": "uint256", "name": "tokenID", "type": "uint256" },
                                { "internalType": "uint256", "name": "fees0", "type": "uint256" },
                                { "internalType": "uint256", "name": "fees1", "type": "uint256" }
                            ],
                            "name": "increaseLiqTwoTokens",
                            "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
                            "stateMutability": "payable",
                            "type": "function"
                        }, {
                            "inputs": [
                                {
                                    "internalType": "uint160",
                                    "name": "sqrtPriceX96",
                                    "type": "uint160"
                                },
                                {
                                    "internalType": "uint160",
                                    "name": "sqrtPriceAX96",
                                    "type": "uint160"
                                },
                                {
                                    "internalType": "uint160",
                                    "name": "sqrtPriceBX96",
                                    "type": "uint160"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "amount0",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "amount1",
                                    "type": "uint256"
                                }
                            ],
                            "name": "getLiquidityForAmounts",
                            "outputs": [
                                {
                                    "internalType": "uint128",
                                    "name": "liquidity",
                                    "type": "uint128"
                                }
                            ],
                            "stateMutability": "pure",
                            "type": "function"
                        }



                    ];
                    const positionManagerABI = [
                        {
                            "inputs": [
                                { "internalType": "bytes", "name": "unlockData", "type": "bytes" },
                                { "internalType": "uint256", "name": "deadline", "type": "uint256" }
                            ],
                            "name": "modifyLiquidities",
                            "outputs": [],
                            "stateMutability": "payable",
                            "type": "function"
                        }
                    ];




                    //
                    //  Method 1: Using ternary operator with destructuring
                    const [token0, token1] = tokenAddress < Address_ZEROXBTC_TESTNETCONTRACT
                        ? [tokenAddress, Address_ZEROXBTC_TESTNETCONTRACT]
                        : [Address_ZEROXBTC_TESTNETCONTRACT, tokenAddress];

                    const [amount0, amount1] = tokenAddress < Address_ZEROXBTC_TESTNETCONTRACT
                        ? [amountInB0x, amountIn0xBTC]
                        : [amountIn0xBTC, amountInB0x];

                    const [fees0a, fees1a] = tokenAddress < Address_ZEROXBTC_TESTNETCONTRACT
                        ? [uncalimedFeesB0x, uncalimedFees0xBTC]
                        : [uncalimedFees0xBTC, uncalimedFeesB0x];



                    tokenSwapperContract = new ethers.Contract(
                        contractAddress_Swapper, // your tokenSwapper contract address
                        tokenSwapperABI,
                        signer // Use signer since the function isn't view/pure
                    );
                    positionManagerContract = new ethers.Contract(
                        positionManager_address, // your tokenSwapper contract address
                        positionManagerABI,
                        signer // Use signer since the function isn't view/pure
                    );

                    console.log("FFF! amountInB0x: ", amountInB0x.toString());
                    console.log("FFF! amountIn0xBTC: ", amountIn0xBTC.toString());
                    console.log("FFF! FeesB0x: ", uncalimedFeesB0x.toString());
                    console.log("FFF! Fees0xBTC: ", uncalimedFees0xBTC.toString());
                    console.log("positionID: ", positionID);
                    console.log("FFF! token0: ", token0);
                    console.log("FFF! token1: ", token1);
                    console.log("FFF! amount0: ", amount0);
                    console.log("FFF! amount1: ", amount1);
                    console.log("FFF! fees0a: ", fees0a);
                    console.log("FFF! fees1a: ", fees1a);
                    var afterFees0 = amount0 - fees0a;
                    var afterFees1 = amount1 - fees1a;
                    console.log("FFF! afterFees0: ", afterFees0);
                    console.log("FFF! afterFees0: ", afterFees1);

                    const abiCoder = ethers.utils.defaultAbiCoder;
                    let liquidityDelta = 0;
                    try {

                        permit2Address = "0x000000000022D473030F116dDEE9F6B43aC78BA3";
                        var afterFees = amount0 - fees0a;
                        // await approveTokensViaPermit2(signer, permit2Address, token0, token1, positionManager_address, afterFees0, afterFees1);
                        console.log("Approved Permit Successfully");
                        await approveIfNeeded(token0, permit2Address, afterFees0);
                        await approveIfNeeded(token1, permit2Address, afterFees1);
                        console.log("Approved Both Approvals if needed, now we approve permit in wallet");
                        await approveTokensViaPermit2(signer, permit2Address, token0, token1, positionManager_address, afterFees0, afterFees1);

                        console.log(`NFT token ${positionID} approved for spending by ${permit2Address}`);

                        var tickLower = -887220; // Your desired lower tick
                        var tickUpper = 887220;  // Your desired upper tick

                        // Convert ticks to sqrtPriceX96 values
                        var sqrtRatioAX96 = getSqrtRatioAtTick(tickLower);
                        var sqrtRatioBX96 = getSqrtRatioAtTick(tickUpper);
                        var sqrtPricex96 = Current_getsqrtPricex96;
                        const result = await tokenSwapperContract.getLiquidityForAmounts(sqrtPricex96, sqrtRatioAX96, sqrtRatioBX96, amount0, amount1);
                        console.log("Get Liquidity for amounts result: ", result.toString());
                        liquidityDelta = result;






                    } catch (error) {
                        console.error(`Error approving tokens for  liquidty increase`, error);
                    }






                    // Initialize params array with 2 elements
                    let params = new Array(2);

                    // Encode first parameter: tokenID, liquidityDelta, amount0, amount1, empty bytes
                    params[0] = abiCoder.encode(
                        ["uint256", "int128", "uint256", "uint256", "bytes"],
                        [positionID, liquidityDelta, amount0, amount1, "0x"]
                    );

                    // Currency wrapping (assuming Currency.wrap just returns the address)
                    const currency0 = token0; // In JS, we'll just use the token address directly
                    const currency1 = token1;

                    // Encode currency pair for settlement
                    params[1] = abiCoder.encode(
                        ["address", "address"],
                        [currency0, currency1]
                    );

                    // Initial actions: INCREASE_LIQUIDITY (0x00) and SETTLE_PAIR (0x0d)
                    let actions = ethers.utils.concat([
                        ethers.utils.hexZeroPad(0x00, 1), // uint8(0x00)
                        ethers.utils.hexZeroPad(0x0d, 1)  // uint8(0x0d)
                    ]);

                    // Calculate remaining fees to avoid claiming more than available
                    const remainingFees0 = fees0a > amount0 ? fees0a - amount0 : 0;
                    const remainingFees1 = fees1a > amount1 ? fees1a - amount1 : 0;

                    // Only use CLOSE_CURRENCY if there are actually remaining fees to claim
                    if (remainingFees0 > 0 || remainingFees1 > 0) {
                        // Resize params array to 3 elements
                        params = new Array(3);

                        // Update actions: INCREASE_LIQUIDITY, CLOSE_CURRENCY, CLOSE_CURRENCY
                        actions = ethers.utils.concat([
                            ethers.utils.hexZeroPad(0x00, 1), // INCREASE_LIQUIDITY
                            ethers.utils.hexZeroPad(0x12, 1), // CLOSE_CURRENCY
                            ethers.utils.hexZeroPad(0x12, 1)  // CLOSE_CURRENCY
                        ]);

                        // Re-encode first parameter
                        params[0] = abiCoder.encode(
                            ["uint256", "int128", "uint256", "uint256", "bytes"],
                            [positionID, liquidityDelta, amount0, amount1, "0x"]
                        );

                        // Encode individual currencies for closing
                        params[1] = abiCoder.encode(["address"], [token0]); // Close token0
                        params[2] = abiCoder.encode(["address"], [token1]); // Close token1
                    }

                    // Set deadline (current timestamp + 160 seconds)
                    const currentTimestamp = Math.floor(Date.now() / 1000);
                    const deadline = currentTimestamp + 160;

                    // Encode the final call data
                    const callData = abiCoder.encode(
                        ["bytes", "bytes[]"],
                        [actions, params]
                    );

                    showInfoNotification('Confirm Increase Liquidity', 'Confirm the increase liquidity transaction in your wallet');
                    try {
                        const tx = await positionManagerContract.modifyLiquidities(
                            callData,
                            deadline
                        );
                        showInfoNotification();

                        console.log("Transaction sent:", tx.hash);
                        const receipt12 = await tx.wait();
                        console.log("Transaction confirmed:", receipt12.transactionHash);


                        showSuccessNotification('Increase Liquidity Complete!', 'Transaction confirmed on blockchain', tx.hash)





                        console.log("Increased Liquidity transaction confirmed in block:", receipt12.blockNumber);
                        console.log(`Deposited ${ethers.utils.formatEther(amountInB0x.toString())} tokens and another ${ethers.utils.formatUnits(amountIn0xBTC.toString(), 8)} tokens into tokenID: ${positionID}`);

                        enableButton('increaseLiquidityBtn', 'Increase Liquidity');
                        alert("Successfully increased Liquidity of position you own");

                        // Using async/await with setTimeout (most common)
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        fetchBalances();
                        // Using async/await with setTimeout (most common)
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await getTokenIDsOwnedByMetamask();
                        // If you want to use these values for further operations
                        // For example, if there's a deploy function that uses the salt
                        // await UniV4Hook.deploy(validSalt);

                    } catch (error) {
                        console.error(`Error increasing liquidty on modfiyLiquitidies`, error);
                        enableButton('increaseLiquidityBtn', 'Increase Liquidity');
                    }


                }





                // Check current allowance for a token
                async function checkAllowance2(permit2Contract, userAddress, tokenAddress, spenderAddress) {
                    const allowanceData = await permit2Contract.allowance(userAddress, tokenAddress, spenderAddress);
                    return {
                        amount: allowanceData.amount,
                        expiration: allowanceData.expiration,
                        nonce: allowanceData.nonce,
                        isExpired: allowanceData.expiration < Math.floor(Date.now() / 1000)
                    };
                }



                // Check if approval is needed
                async function needsApproval(permit2Contract, userAddress, tokenAddress, spenderAddress, requiredAmount) {
                    const allowance = await checkAllowance2(permit2Contract, userAddress, tokenAddress, spenderAddress);
                    // When setting requiredAmount earlier in your code:
                    requiredAmount = toBigNumber(requiredAmount);
                    // Then your comparison will work:
                    // Check if allowance is sufficient and not expired
                    const sufficientAmount = allowance.amount.gte(requiredAmount);
                    const notExpired = !allowance.isExpired;

                    return !(sufficientAmount && notExpired);
                }


                async function approveTokensViaPermit2(signer, permit2Address, token0, token1, positionManagerAddress, requiredAmount0, requiredAmount1) {
                    // Create contract instance
                    // Permit2 interface
                    const permit2Abi = [
                        {
                            "name": "approve",
                            "type": "function",
                            "stateMutability": "nonpayable", // Add this
                            "inputs": [
                                { "name": "token", "type": "address" },
                                { "name": "spender", "type": "address" },
                                { "name": "amount", "type": "uint160" },
                                { "name": "expiration", "type": "uint48" }
                            ],
                            "outputs": []
                        },
                        {
                            "name": "allowance",
                            "type": "function",
                            "stateMutability": "view", // Add this
                            "inputs": [
                                { "name": "user", "type": "address" },
                                { "name": "token", "type": "address" },
                                { "name": "spender", "type": "address" }
                            ],
                            "outputs": [
                                { "name": "amount", "type": "uint160" },
                                { "name": "expiration", "type": "uint48" },
                                { "name": "nonce", "type": "uint48" }
                            ]
                        }
                    ];
                    const permit2Contract = new ethers.Contract(permit2Address, permit2Abi, signer);
                    const userAddress = await signer.getAddress();

                    // Get current timestamp and add 1 hour (3600 seconds)
                    const currentTime = Math.floor(Date.now() / 1000);
                    const expiration = currentTime + 3600; // 1 hour from now

                    // Maximum uint160 value (equivalent to type(uint160).max in Solidity)
                    const maxAmount = ethers.BigNumber.from(2).pow(160).sub(1);

                    try {
                        // Check if token0 needs approval
                        const needsToken0Approval = await needsApproval(
                            permit2Contract,
                            userAddress,
                            token0,
                            positionManagerAddress,
                            requiredAmount0 || maxAmount
                        );

                        if (needsToken0Approval) {

                            var sym = getSymbolFromAddress(token0);
                            showInfoNotification('Approve ' + sym + ' Tokens', 'Requesting approval of ' + sym + ' tokens for Uniswaps Contract...');
                            var sym = getSymbolFromAddress(token0);
                            console.log('Token0 needs permit approval, approving...');
                            alert(sym + ' needs permit approval to use on Uniswap, sign tx in wallet');
                            const tx1 = await permit2Contract.approve(
                                token0,
                                positionManagerAddress,
                                maxAmount,
                                expiration
                            );
                            console.log(sym + ' approval transaction hash:', tx1.hash);
                            await tx1.wait();

                            showSuccessNotification(sym + ' Approved!', sym + ' Tokens have been approved on the contract successfully');
                            alert(sym + ' approved on uniswap');
                        } else {

                            var sym = getSymbolFromAddress(token0);
                            console.log(sym + ' already has sufficient allowance');
                        }

                        // Check if token1 needs approval
                        const needsToken1Approval = await needsApproval(
                            permit2Contract,
                            userAddress,
                            token1,
                            positionManagerAddress,
                            requiredAmount1 || maxAmount
                        );

                        if (needsToken1Approval) {

                            var sym = getSymbolFromAddress(token1);
                            showInfoNotification('Approve ' + sym + ' Tokens', 'Requesting approval of ' + sym + ' tokens for Uniswaps Contract...');
                            console.log('Token1 needs approval, approving...');
                            const tx2 = await permit2Contract.approve(
                                token1,
                                positionManagerAddress,
                                maxAmount,
                                expiration
                            );
                            console.log(sym + ' approval transaction hash:', tx2.hash);
                            await tx2.wait();
                            showSuccessNotification(sym + ' Approved!', sym + ' Tokens have been approved on the contract successfully');
                        } else {
                            var sym = getSymbolFromAddress(token1);
                            console.log(sym + ' already has sufficient allowance');
                        }

                        console.log('Approval check and setup completed');

                    } catch (error) {
                        console.error('Error checking/approving tokens:', error);
                        throw error;
                    }
                }




                const MAX_TICK = 887220;

                /**
                 * Convert tick to sqrtPriceX96
                 * @param {number} tick - The tick value
                 * @returns {bigint} - The sqrt ratio as a 160-bit unsigned integer
                 */
                function getSqrtRatioAtTick(tick) {
                    const absTick = tick < 0 ? -tick : tick;

                    if (absTick > MAX_TICK) {
                        throw new Error("TICK_OUT_OF_RANGE");
                    }

                    let ratio = (absTick & 0x1) !== 0
                        ? 0xfffcb933bd6fad37aa2d162d1a594001n
                        : 0x100000000000000000000000000000000n;

                    if ((absTick & 0x2) !== 0) ratio = (ratio * 0xfff97272373d413259a46990580e213an) >> 128n;
                    if ((absTick & 0x4) !== 0) ratio = (ratio * 0xfff2e50f5f656932ef12357cf3c7fdccn) >> 128n;
                    if ((absTick & 0x8) !== 0) ratio = (ratio * 0xffe5caca7e10e4e61c3624eaa0941cd0n) >> 128n;
                    if ((absTick & 0x10) !== 0) ratio = (ratio * 0xffcb9843d60f6159c9db58835c926644n) >> 128n;
                    if ((absTick & 0x20) !== 0) ratio = (ratio * 0xff973b41fa98c081472e6896dfb254c0n) >> 128n;
                    if ((absTick & 0x40) !== 0) ratio = (ratio * 0xff2ea16466c96a3843ec78b326b52861n) >> 128n;
                    if ((absTick & 0x80) !== 0) ratio = (ratio * 0xfe5dee046a99a2a811c461f1969c3053n) >> 128n;
                    if ((absTick & 0x100) !== 0) ratio = (ratio * 0xfcbe86c7900a88aedcffc83b479aa3a4n) >> 128n;
                    if ((absTick & 0x200) !== 0) ratio = (ratio * 0xf987a7253ac413176f2b074cf7815e54n) >> 128n;
                    if ((absTick & 0x400) !== 0) ratio = (ratio * 0xf3392b0822b70005940c7a398e4b70f3n) >> 128n;
                    if ((absTick & 0x800) !== 0) ratio = (ratio * 0xe7159475a2c29b7443b29c7fa6e889d9n) >> 128n;
                    if ((absTick & 0x1000) !== 0) ratio = (ratio * 0xd097f3bdfd2022b8845ad8f792aa5825n) >> 128n;
                    if ((absTick & 0x2000) !== 0) ratio = (ratio * 0xa9f746462d870fdf8a65dc1f90e061e5n) >> 128n;
                    if ((absTick & 0x4000) !== 0) ratio = (ratio * 0x70d869a156d2a1b890bb3df62baf32f7n) >> 128n;
                    if ((absTick & 0x8000) !== 0) ratio = (ratio * 0x31be135f97d08fd981231505542fcfa6n) >> 128n;
                    if ((absTick & 0x10000) !== 0) ratio = (ratio * 0x9aa508b5b7a84e1c677de54f3e99bc9n) >> 128n;
                    if ((absTick & 0x20000) !== 0) ratio = (ratio * 0x5d6af8dedb81196699c329225ee604n) >> 128n;
                    if ((absTick & 0x40000) !== 0) ratio = (ratio * 0x2216e584f5fa1ea926041bedfe98n) >> 128n;
                    if ((absTick & 0x80000) !== 0) ratio = (ratio * 0x48a170391f7dc42444e8fa2n) >> 128n;

                    if (tick > 0) {
                        // Equivalent to type(uint256).max / ratio
                        const MAX_UINT256 = (1n << 256n) - 1n;
                        ratio = MAX_UINT256 / ratio;
                    }

                    // This divides by 1<<32 rounding up to go from a Q128.128 to a Q96.64
                    const sqrtPriceX96 = (ratio >> 32n) + (ratio % (1n << 32n) === 0n ? 0n : 1n);

                    // Return as bigint (equivalent to uint160 - we trust it fits in 160 bits)
                    return sqrtPriceX96;
                }























                /* Mock wallet balances - replace with real data from your wallet
                var walletBalances = {
                    'ETH': 2.5,
                    'USDC': 1500.75,
                    'DAI': 890.25,
                    'WBTC': 0.15,
                    '0xBTC': 13.99997,
                    'B0x': 5.0000
                };
                
                */


                var walletBalances = {
                    'ETH': 0.0,
                    'USDC': 0.000,
                    '0xBTC': 0.00,
                    'B0x': 0.00,
                    'WETH': 0.00
                };



























                // Helper function to get token name from address
                function getTokenNameFromAddress(address) {

                    return tokenMap[address] || `Token${address.slice(-4)}`;
                }









                // Token addresses mapping
                const tokenAddressesDecimalsETH = {
                    'USDC': '6', // Example addresses
                    'ETH': '18', // Example addresses
                    'DAI': '18',
                    'WBTC': '8',
                    'B0x': '18',
                    '0xBTC': '8',
                    'RightsTo0xBTC': '18'
                };



                const addressToSymbolETH = {};
                Object.keys(tokenAddressesETH).forEach(symbol => {
                    const address = tokenAddressesETH[symbol].toLowerCase(); // Store in lowercase for easier matching
                    addressToSymbolETH[address] = symbol;
                });


                // Function to get symbol from address using reverse mapping
                function getSymbolFromAddressETH(address) {
                    if (!address) return null;

                    const normalizedAddress = address.toLowerCase();
                    return addressToSymbol[normalizedAddress] || null;
                }



















                // Token addresses mapping
                const tokenAddressesDecimals = {
                    'USDC': '6', // Example addresses
                    'ETH': '18', // Example addresses
                    'DAI': '18',
                    'WBTC': '8',
                    'B0x': '18',
                    '0xBTC': '8',
                    'WETH': '18',
                    'RightsTo0xBTC': '18'
                };


                const addressToSymbol = {};
                Object.keys(tokenAddresses).forEach(symbol => {
                    const address = tokenAddresses[symbol].toLowerCase(); // Store in lowercase for easier matching
                    addressToSymbol[address] = symbol;
                });

                // Function to get symbol from address using reverse mapping
                function getSymbolFromAddress(address) {
                    if (!address) return null;

                    const normalizedAddress = address.toLowerCase();
                    return addressToSymbol[normalizedAddress] || null;
                }


                function debugIncreaseALLChildren() {
                    console.log("=== DEBUGGING ALL CHILDREN 0-12 IN #increase ===");

                    for (let i = 0; i <= 12; i++) {
                        console.log(`\n--- CHILD ${i} ---`);

                        // Try to get the nth-child element
                        const child = document.querySelector(`#increase> :nth-child(${i})`);

                        if (!child) {
                            console.log(`Child ${i}: Does not exist`);
                            continue;
                        }

                        console.log(`Child ${i}: Tag = ${child.tagName}, Class = "${child.className}", ID = "${child.id}"`);

                        // If it's a form-group, look for selects inside
                        if (child.classList.contains('form-group')) {
                            const label = child.querySelector('label');
                            const select = child.querySelector('select');
                            const input = child.querySelector('input');

                            if (label) {
                                console.log(`  Label: "${label.textContent}"`);
                            }

                            if (select) {
                                console.log(`  Select ID: "${select.id}"`);
                                console.log(`  Select options:`);
                                for (let j = 0; j < select.options.length; j++) {
                                    console.log(`    Option ${j}: value="${select.options[j].value}", text="${select.options[j].text}"`);
                                }
                                console.log(`  Currently selected: "${select.value}"`);
                            }

                            if (input) {
                                console.log(`  Input type: "${input.type}", value: "${input.value}", placeholder: "${input.placeholder}"`);
                            }
                        }

                        // If it has other interesting content, show it
                        if (child.tagName === 'DIV' && !child.classList.contains('form-group')) {
                            const text = child.textContent.trim().substring(0, 100);
                            if (text) {
                                console.log(`  Text content (first 100 chars): "${text}"`);
                            }
                        }

                        // Check for any selects anywhere in this child
                        const allSelects = child.querySelectorAll('select');
                        if (allSelects.length > 0) {
                            console.log(`  Contains ${allSelects.length} select element(s):`);
                            allSelects.forEach((sel, idx) => {
                                console.log(`    Select ${idx}: ID="${sel.id}", options count=${sel.options.length}`);
                            });
                        }
                    }

                    console.log("\n=== END DEBUG ===");
                }


                async function getSwapOfTwoTokens() {

                    // Run the debug function
                    if (!walletConnected) {
                        await connectWallet();
                    }

                    var selectSlippage = document.getElementById('slippageToleranceSwap');
                    var selectSlippageValue = selectSlippage.value; // Returns: "0.1%", "0.5%", "1.0%", or "2.0%"
                    const numberValueSlippage = parseFloat(selectSlippageValue.replace('%', ''));
                    // Divide by 100 to get decimal
                    const decimalValueSlippage = numberValueSlippage / 100;
                    console.log("selectSlippageValue: ", selectSlippageValue);
                    console.log("decimalValueSlippage: ", decimalValueSlippage);

                    // FROM TOKEN - this is the 4th child of #swap
                    const fromSelect = document.querySelector('#swap .form-group:nth-child(4) select');

                    // Get the currently selected value
                    const selectedValue = fromSelect.value;
                    console.log("Currently selected value:", selectedValue);

                    // Or get the selected option element itself
                    const selectedOption = fromSelect.options[fromSelect.selectedIndex];
                    console.log("Selected option text:", selectedOption.text);
                    console.log("Selected option value:", selectedOption.value);

                    // AMOUNT INPUT - this is the 5th child of #swap
                    const amountInput = document.querySelector('#swap .form-group:nth-child(5) input');
                    console.log("Amount value:", amountInput.value);

                    // TO TOKEN - this is the 7th child of #swap (after swap-direction div)
                    const toSelect = document.querySelector('#swap .form-group:nth-child(7) select');

                    // Get the currently selected value
                    const toSelectValue = toSelect.value;
                    console.log("To token selected value:", toSelectValue);

                    var tokenInputAddress = tokenAddresses[selectedValue];
                    var tokenOutputAddress = tokenAddresses[toSelectValue];
                    console.log("tokenInputAddress:", tokenInputAddress);
                    console.log("tokenOutputAddress:", tokenOutputAddress);



                    // Get the currently selected value
                    const selectedValue2 = amountInput.value;
                    console.log("Currently amountInput value:", selectedValue2);
                    var amountToSwap = ethers.utils.parseUnits(selectedValue2, 18);  // Correctly represents 12 * 10^8

                    if (selectedValue == "0xBTC") {
                        console.log("LOGGED 0xBTC selected Value");
                        amountToSwap = ethers.utils.parseUnits(selectedValue2, 8);  // Correctly represents 12 * 10^8
                    }
                    let amountOut = 0;
                    const tokenSwapperABI = [
                        // Your existing getOutput function
                        {
                            "inputs": [
                                { "name": "tokenZeroxBTC", "type": "address" },
                                { "name": "tokenBZeroX", "type": "address" },
                                { "name": "tokenIn", "type": "address" },
                                { "name": "hookAddress", "type": "address" },
                                { "name": "amountIn", "type": "uint128" }
                            ],
                            "name": "getOutput",
                            "outputs": [{ "name": "amountOut", "type": "uint256" }],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        // Add the swapTokenTWOTOKENS function
                        {
                            "inputs": [
                                { "name": "tokenA", "type": "address" },
                                { "name": "tokenB", "type": "address" },
                                { "name": "tokenIn", "type": "address" },
                                { "name": "tokenOut", "type": "address" },
                                { "name": "amountIn", "type": "uint256" },
                                { "name": "minAmountOut", "type": "uint256" },
                                { "name": "hookAddress", "type": "address" },
                                { "name": "WhereToSendFunds", "type": "address" }
                            ],
                            "name": "swapTokenTWOTOKENS",
                            "outputs": [{ "name": "", "type": "bool" }],
                            "stateMutability": "nonpayable", // This will modify state
                            "type": "function"
                        }
                    ];


                    tokenSwapperContract = new ethers.Contract(
                        contractAddress_Swapper, // your tokenSwapper contract address
                        tokenSwapperABI,
                        signer // Use signer since the function isn't view/pure
                    );

                    try {
                        // Call the view function
                        const result = await tokenSwapperContract.callStatic.getOutput(
                            Address_ZEROXBTC_TESTNETCONTRACT,
                            tokenAddress,
                            tokenInputAddress,
                            HookAddress,
                            amountToSwap
                        );

                        // First debug what we're getting back
                        console.log("Raw result type:", typeof result);
                        console.log("Raw result structure:", Object.keys(result).join(", "));

                        if (typeof result === 'bigint' || typeof result === 'number') {
                            // If it's already a primitive value
                            amountOut = result;
                        } else if (result._isBigNumber || result instanceof ethers.BigNumber) {
                            // For ethers v5 BigNumber
                            amountOut = result;
                        } else if (typeof result === 'object' && result !== null) {
                            // For objects, try to extract the value
                            // With ethers v6, we might get the value directly
                            if (typeof result.toString === 'function' && result.toString().match(/^[0-9]+$/)) {
                                amountOut = result;
                            } else {
                                // Attempt to extract value based on common patterns
                                amountOut = result[0] || result.amountOut || result._hex || result.value || result;
                            }
                        }

                        console.log(`Found valid amountOut: ${amountOut.toString()}`);
                        const formattedResult = ethers.utils.formatEther(result);
                        // Format to display as a readable number
                        let readableAmountOut2Output = ethers.utils.formatEther(amountOut);
                        let readableAmountIN2Input = ethers.utils.formatUnits(amountToSwap, 8);

                        if (tokenInputAddress == Address_ZEROXBTC_TESTNETCONTRACT) {
                            // Keep the current formatting
                        } else {
                            readableAmountOut2Output = ethers.utils.formatUnits(amountOut, 8);
                            readableAmountIN2Input = ethers.utils.formatEther(amountToSwap);
                        }

                        // Fix the BigInt arithmetic issue
                        if (typeof amountOut === 'bigint') {
                            MinamountOut = amountOut * ((1 - decimalValueSlippage) * 1000n) / 10000n; // Use 10n for BigInt
                        } else {
                            MinamountOut = amountOut * ((1 - decimalValueSlippage) * 1000) / 10000;
                        }

                        alert(`You will trade ` + readableAmountIN2Input + ` ` + selectedValue + " for " + readableAmountOut2Output + " " + toSelectValue);


                        console.log(`Predicted amountOut: ${amountToSwap} tokens for ${MinamountOut} tokens input`);
                        console.log(`Predicted amountOut: ${readableAmountIN2Input} tokens for ${readableAmountOut2Output} tokens input`);

                    } catch (error) {
                        console.error(`Error finding valid getOutput for swap:`, error);
                        return; // Exit early if there's an error
                    }

                    console.log("\n\n!!!!!!!!!!!!!!!!!!!SWAPTWO TOKENS STUFF INFO BELOW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    console.log("TokenAddress: ", tokenAddress);
                    console.log("Address_ZEROXBTC_TESTNETCONTRACT: ", Address_ZEROXBTC_TESTNETCONTRACT);
                    console.log("TokenIn: ", tokenAddress);
                    console.log("TokenOut: ", Address_ZEROXBTC_TESTNETCONTRACT);
                    console.log("AmountIn: ", amountToSwap);
                    console.log("MinAmountOut: ", MinamountOut);
                    console.log("HookAddress: ", HookAddress);
                    console.log("WheretoSendFunds: ", userAddress);

                    console.log(`Found valid amountOut: ${amountOut.toString()}`);
                    console.log(`Found valid MinamountOut amountOut: ${MinamountOut.toString()}`);









                    if (Address_ZEROXBTC_TESTNETCONTRACT == tokenInputAddress) {





                        const amountToSwapBN = ethers.BigNumber.from(amountToSwap.toString());
                        const minAmountOutBN = ethers.BigNumber.from(MinamountOut.toString());

                        await approveIfNeeded(Address_ZEROXBTC_TESTNETCONTRACT, contractAddress_Swapper, amountToSwapBN);
                        console.log("amountToSwapBN: ", amountToSwapBN);
                        console.log("minAmountOutBN: ", minAmountOutBN);
                        console.log("tokenAddress: ", tokenAddress);
                        console.log("Address_ZEROXBTC_TESTNETCONTRACT: ", Address_ZEROXBTC_TESTNETCONTRACT);
                        console.log("HookAddress: ", HookAddress);
                        console.log("userAddress: ", userAddress);
                        console.log("minAmountOutBN: ", minAmountOutBN);
                        try {
                            // Call the swap function
                            const tx = await tokenSwapperContract.swapTokenTWOTOKENS(
                                tokenAddress,
                                Address_ZEROXBTC_TESTNETCONTRACT,
                                Address_ZEROXBTC_TESTNETCONTRACT,
                                tokenAddress,
                                amountToSwapBN,
                                minAmountOutBN,
                                HookAddress,
                                userAddress
                            );

                            showInfoNotification();
                            console.log("swapTokenTWOTOKENS transaction sent:", tx.hash);
                            await tx.wait();
                            console.log("Transaction confirmed!");
                            showSuccessNotification('Swap Complete!', 'Transaction complete, successfully swapped tokens', tx.hash);

                        } catch (error) {
                            console.error(`Error finding swapTokenTWOTOKENS stuff:`, error);
                            alert("User rejected request for swap!")
                        }




                    } else {



                        const amountToSwapBN = ethers.BigNumber.from(amountToSwap.toString());
                        const minAmountOutBN = ethers.BigNumber.from(MinamountOut.toFixed(0).toString());


                        await approveIfNeeded(tokenAddress, contractAddress_Swapper, amountToSwapBN);
                        try {
                            // Call the swap function
                            const tx = await tokenSwapperContract.swapTokenTWOTOKENS(
                                tokenAddress,
                                Address_ZEROXBTC_TESTNETCONTRACT,
                                tokenAddress,
                                Address_ZEROXBTC_TESTNETCONTRACT,
                                amountToSwapBN,
                                minAmountOutBN,
                                HookAddress,
                                userAddress
                            );
                            showInfoNotification();
                            console.log("swapTokenTWOTOKENS transaction sent:", tx.hash);
                            await tx.wait();
                            console.log("Transaction confirmed!");
                            //alert("Successful Swap!");

                            showSuccessNotification('Swap Complete!', 'Transaction complete, successfully swapped tokens', tx.hash);
                            await new Promise(resolve => setTimeout(resolve, 3000));
                            await throttledGetSqrtRtAndPriceRatio("SwapFunction");
                            fetchBalances();
                        } catch (error) {
                            console.error(`Error finding swapTokenTWOTOKENS stuff:`, error);
                        }
                    }

                }


                async function getConvertTotal(usemetamask) {


                    if (!walletConnected && usemetamask) {
                        try {
                            await connectWallet();

                        } catch (error) {
                            console.error(`Error connecting wallet on convertTotal:`, error);
                        }
                    }

                    const fromSelect = document.querySelector('#convert .form-group:nth-child(4) select');
                    const toSelect = document.querySelector('#convert .form-group:nth-child(7) select');


                    // Get the currently selected value
                    const selectedValue = fromSelect.value;
                    const selectedValueTO = toSelect.value;
                    console.log("Currently selected value:", selectedValue);

                    // Or get the selected option element itself
                    const selectedOption = fromSelect.options[fromSelect.selectedIndex];
                    const TOOption = toSelect.options[toSelect.selectedIndex];
                    console.log("Selected option text:", selectedOption.text);
                    console.log("Selected option value:", selectedOption.value);
                    console.log("Selected option text TOOption:", TOOption.text);
                    console.log("Selected option value TOOption:", TOOption.value);


                    var balanceOfInput0xBTC = walletBalancesETH['0xBTC'];
                    var balanceOfInputB0x = walletBalancesETH['B0x'];
                    var balanceOfInputRightsTo0xBTC = walletBalancesETH['RightsTo0xBTC'];



                    var tokenInputAddress = tokenAddresses[selectedValue];
                    console.log("tokenInputAddresstokenInputAddresstokenInputAddresstokenInputAddress", tokenInputAddress);
                    const amountInput = document.querySelector('#convert .form-group:nth-child(5) input');
                    // Get the currently selected value
                    const selectedValue2 = amountInput.value;
                    console.log("Currently amountInput value:", selectedValue2);
                    var decimalsOfToken = tokenAddressesDecimals[selectedOption.value];
                    var amountToSwap = ethers.utils.parseUnits(selectedValue2, decimalsOfToken);  // Correctly represents 12 * 10^8


                    const tokenInputTwo = document.querySelector('#convert input[readonly]');

                    var decimalsOfToken2 = tokenAddressesDecimals[TOOption.value];
                    if (selectedOption.value == '0xBTC') {

                        const formattedResult = ethers.utils.formatUnits(amountToSwap, 8);
                        tokenInputTwo.value = `${formattedResult} B0x Tokens & ${formattedResult} RightsTo0xBitcoin Tokens`;
                        if (true) {

                            console.log("Check here: decimalsOfToken2: ", decimalsOfToken2, " vs balanceOfInputB0x: ", balanceOfInputB0x);
                        }
                    } else {
                        console.log("amoutn to swap : ", amountToSwap);
                        const formattedResult = ethers.utils.formatUnits(amountToSwap, 18);


                        tokenInputTwo.value = `${formattedResult} 0xBitcoin Tokens`;

                    }


                }


                async function executeConvert() {
                    disableButtonWithSpinner('executeSwapConvertBtn');
                    await switchToEthereum();

                    const fromSelect = document.querySelector('#convert .form-group:nth-child(4) select');


                    // Get the currently selected value
                    const selectedValue = fromSelect.value;
                    console.log("Currently selected value:", selectedValue);

                    // Or get the selected option element itself
                    const selectedOption = fromSelect.options[fromSelect.selectedIndex];

                    if (selectedOption.value == 'B0x') {
                        console.log("Withdrawing from V2 to V1");
                        withdrawFromV2toV1();
                    }
                    else {
                        console.log("Depositing from V1 to V2");
                        depositFromV1toV2();
                    }

                    enableButton('executeSwapConvertBtn');
                    fetchBalancesETH();
                    await switchToBaseSepolia();
                    fetchBalances();


                }



                async function depositFromV1toV2() {
                    try {
                        tokenInputAddress = tokenAddressesETH['0xBTC'];
                        console.log("tokenInputAddresstokenInputAddresstokenInputAddresstokenInputAddress", tokenInputAddress);
                        const amountInput = document.querySelector('#convert .form-group:nth-child(5) input');
                        // Get the currently selected value
                        const selectedValue2 = amountInput.value;

                        // Convert the input amount to the correct format (8 decimals for 0xBTC)
                        // Assuming selectedValue2 is in decimal format, convert to Wei with 8 decimals
                        const amountOf_0xBTC_ToGive = ethers.utils.parseUnits(selectedValue2.toString(), 8);

                        // Contract ABI for the approveAndCall function
                        const contractABI = [
                            "function approveAndCall(address spender, uint tokens, bytes memory data) public returns (bool success)"
                        ];

                        // Create contract instance for the 0xBTC token
                        const contract = new ethers.Contract(tokenInputAddress, contractABI, signerETH);

                        // You need to specify the spender address (the V2 contract address)
                        const spenderAddress = tokenAddressesETH['B0x'];

                        // Call approveAndCall function
                        console.log("Calling approveAndCall with amount:", amountOf_0xBTC_ToGive.toString());

                        showInfoNotification('Depositing 0xBTC -> B0x + RightsTo0xBTC', 'Please confirm transaction in the wallet');
                        const tx = await contract.approveAndCall(
                            spenderAddress,           // address spender
                            amountOf_0xBTC_ToGive,   // uint tokens
                            "0x"                     // bytes data (empty data as hex)
                        );

                        showInfoNotification();



                        console.log("Transaction sent:", tx.hash);

                        // Wait for transaction confirmation
                        const receipt = await tx.wait();

                        showSuccessNotification('Successfully converted!', 'Converted 0xBTC -> B0x + RightsTo0xBTC', tx.hash)


                        console.log("Transaction confirmed:", receipt.transactionHash);

                        return {
                            success: true,
                            txHash: receipt.transactionHash,
                            receipt: receipt
                        };

                    } catch (error) {
                        console.error("Error in depositFromV1toV2:", error);
                        return {
                            success: false,
                            error: error.message
                        };
                    }
                }


                async function withdrawFromV2toV1() {
                    try {
                        tokenInputAddress = tokenAddressesETH['B0x'];
                        console.log("tokenInputAddresstokenInputAddresstokenInputAddresstokenInputAddress", tokenInputAddress);
                        const amountInput = document.querySelector('#convert .form-group:nth-child(5) input');
                        // Get the currently selected value
                        const selectedValue2 = amountInput.value;
                        // Convert the input amount to the correct format (8 decimals for 0xBTC)
                        // Assuming selectedValue2 is in decimal format, convert to Wei with 8 decimals
                        const amountOf_0xBTC_ToReceive = ethers.utils.parseUnits(selectedValue2.toString(), 8);

                        // Contract ABI for the withdrawFromV2toV1 function
                        const contractABI = [
                            "function withdrawFromV2toV1(uint amountOf_0xBTC_ToRecieve) public"
                        ];

                        // Create contract instance
                        const contract = new ethers.Contract(tokenInputAddress, contractABI, signerETH);

                        // Call the withdraw function
                        console.log("Calling withdrawFromV2toV1 with amount:", amountOf_0xBTC_ToReceive.toString());

                        showInfoNotification('Depositing B0x + RightsTo0xBTC -> 0xBitcoin', 'Please confirm transaction in the wallet');
                        const tx = await contract.withdrawFromV2toV1(amountOf_0xBTC_ToReceive);

                        console.log("Transaction sent:", tx.hash);

                        showInfoNotification();
                        // Wait for transaction confirmation
                        const receipt = await tx.wait();

                        showSuccessNotification('Successfully converted!', 'Converted B0x + RightsTo0xBTC -> 0xBitcoin', tx.hash)
                        console.log("Transaction confirmed:", receipt.transactionHash);





                        return {
                            success: true,
                            txHash: receipt.transactionHash,
                            receipt: receipt
                        };

                    } catch (error) {
                        console.error("Error in withdrawFromV2toV1:", error);
                        return {
                            success: false,
                            error: error.message
                        };
                    }
                }



                async function getEstimate() {


                    if (!walletConnected) {
                        await connectWallet();
                    }

                    const fromSelect = document.querySelector('#swap .form-group:nth-child(4) select');


                    // Get the currently selected value
                    const selectedValue = fromSelect.value;
                    console.log("Currently selected value:", selectedValue);

                    // Or get the selected option element itself
                    const selectedOption = fromSelect.options[fromSelect.selectedIndex];
                    console.log("Selected option text:", selectedOption.text);
                    console.log("Selected option value:", selectedOption.value);


                    var tokenInputAddress = tokenAddresses[selectedValue];
                    console.log("tokenInputAddresstokenInputAddresstokenInputAddresstokenInputAddress", tokenInputAddress);
                    const amountInput = document.querySelector('#swap .form-group:nth-child(5) input');
                    // Get the currently selected value
                    const selectedValue2 = amountInput.value;
                    console.log("Currently amountInput value:", selectedValue2);
                    var amountToSwap = ethers.utils.parseUnits(selectedValue2, 18);  // Correctly represents 12 * 10^8
                    if (amountToSwap == 0) {
                        console.log("AmountToSwap 0 returning");
                        return;
                    }

                    if (selectedValue == "0xBTC") {
                        console.log("LOGGED 0xBTC selected Value");

                        const numericValue = parseFloat(selectedValue2);

                        // Count decimal places
                        const decimalPlaces = (selectedValue2.split('.')[1] || '').length;

                        let valueToUse;
                        if (decimalPlaces > 8) {
                            // Chop off decimals after 8th place (no rounding)
                            const parts = selectedValue2.split('.');
                            valueToUse = parts[0] + '.' + parts[1].substring(0, 8);
                            console.log(`Truncated from ${decimalPlaces} to 8 decimal places: ${valueToUse}`);
                        } else {
                            valueToUse = selectedValue2; // Keep original string
                        }
                        amountToSwap = ethers.utils.parseUnits(valueToUse, 8);  // Correctly represents 12 * 10^8
                        amountInput.value = ethers.utils.formatUnits(amountToSwap, 8);;

                    }
                    let amountOut = 0;
                    const tokenSwapperABI = [
                        // Your existing getOutput function
                        {
                            "inputs": [
                                { "name": "tokenZeroxBTC", "type": "address" },
                                { "name": "tokenBZeroX", "type": "address" },
                                { "name": "tokenIn", "type": "address" },
                                { "name": "hookAddress", "type": "address" },
                                { "name": "amountIn", "type": "uint128" }
                            ],
                            "name": "getOutput",
                            "outputs": [{ "name": "amountOut", "type": "uint256" }],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        // Add the swapTokenTWOTOKENS function
                        {
                            "inputs": [
                                { "name": "tokenA", "type": "address" },
                                { "name": "tokenB", "type": "address" },
                                { "name": "tokenIn", "type": "address" },
                                { "name": "tokenOut", "type": "address" },
                                { "name": "amountIn", "type": "uint256" },
                                { "name": "minAmountOut", "type": "uint256" },
                                { "name": "hookAddress", "type": "address" },
                                { "name": "WhereToSendFunds", "type": "address" }
                            ],
                            "name": "swapTokenTWOTOKENS",
                            "outputs": [{ "name": "", "type": "bool" }],
                            "stateMutability": "nonpayable", // This will modify state
                            "type": "function"
                        }
                    ];


                    tokenSwapperContract = new ethers.Contract(
                        contractAddress_Swapper, // your tokenSwapper contract address
                        tokenSwapperABI,
                        signer // Use signer since the function isn't view/pure
                    );


                    /*
                    console.log("EERRROR HERE");
                    console.log("EERRROR Address_ZEROXBTC_TESTNETCONTRACT: ",Address_ZEROXBTC_TESTNETCONTRACT);
                    console.log("EERRROR tokenAddress: ",tokenAddress);
                    console.log("EERRROR tokenInputAddress: ",tokenInputAddress);
                    console.log("EERRROR HookAddress: ",HookAddress);
                    console.log("EERRROR amountToSwap: ",amountToSwap);
                    console.log("EERRROR amountToSwap: ",amountToSwap);
                    console.log("EERRROR contractAddress_Swapper: ",contractAddress_Swapper);
                    */

                    // Call the view function
                    const result = await tokenSwapperContract.callStatic.getOutput(
                        Address_ZEROXBTC_TESTNETCONTRACT,
                        tokenAddress,
                        tokenInputAddress,
                        HookAddress,
                        amountToSwap
                    );

                    // First debug what we're getting back
                    console.log("Raw result type:", typeof result);
                    console.log("Raw result structure:", Object.keys(result).join(", "));

                    if (typeof result === 'bigint' || typeof result === 'number') {
                        // If it's already a primitive value
                        amountOut = result;
                    } else if (result._isBigNumber || result instanceof ethers.BigNumber) {
                        // For ethers v5 BigNumber
                        amountOut = result;
                    } else if (typeof result === 'object' && result !== null) {
                        // For objects, try to extract the value
                        // With ethers v6, we might get the value directly
                        if (typeof result.toString === 'function' && result.toString().match(/^[0-9]+$/)) {
                            amountOut = result;
                        } else {
                            // Attempt to extract value based on common patterns
                            amountOut = result[0] || result.amountOut || result._hex || result.value || result;
                        }
                    }

                    console.log(`Found valid amountOut: ${amountOut.toString()}`);
                    const formattedResult = ethers.utils.formatEther(result);
                    // Format to display as a readable number
                    let readableAmountOut2Output = ethers.utils.formatEther(amountOut);
                    let readableAmountIN2Input = ethers.utils.formatUnits(amountToSwap, 8);

                    if (tokenInputAddress == Address_ZEROXBTC_TESTNETCONTRACT) {
                        // Keep the current formatting
                    } else {
                        readableAmountOut2Output = ethers.utils.formatUnits(amountOut, 8);
                        readableAmountIN2Input = ethers.utils.formatEther(amountToSwap);
                    }

                    // Fix the BigInt arithmetic issue
                    if (typeof amountOut === 'bigint') {
                        MinamountOut = amountOut - 10n; // Use 10n for BigInt
                    } else {
                        MinamountOut = amountOut - 10;
                    }

                    // Update the estimated output display
                    const estimatedOutputInput = document.querySelector('#swap .form-group:nth-child(8) input');


                    // Fix 4: Using ethers.js formatUnits (if you're using ethers.js)
                    if (selectedValue == "0xBTC") {
                        estimatedOutputInput.value = ethers.utils.formatUnits(amountOut, 18);
                    } else {
                        estimatedOutputInput.value = ethers.utils.formatUnits(amountOut, 8);
                    }
                }






                const amountInput = document.querySelector('#swap .form-group:nth-child(5) input');

                let debounceTimerSwap;

                // Function to handle amount changes
                function handleAmountChange() {
                    const amount = parseFloat(this.value) || 0;
                    console.log("Amount changed:", amount);

                    // Clear the previous timer
                    clearTimeout(debounceTimerSwap);

                    // Only call getEstimate if amount > 0
                    if (amount > 0) {
                        // Set a new timer for 1 second delay
                        debounceTimerSwap = setTimeout(() => {
                            getEstimate();
                        }, 1000); // 1000ms = 1 second delay
                    }
                }


                // Listen for both input and change events
                amountInput.addEventListener('input', handleAmountChange);
                amountInput.addEventListener('change', handleAmountChange);


                const amountInputETH = document.querySelector('#convert input[type="number"]');

                let debounceTimerSwapETH;

                // Function to handle amount changes
                function handleAmountChangeETH() {
                    const amount = parseFloat(this.value) || 0;
                    console.log("Amount changed:", amount);

                    // Clear the previous timer
                    clearTimeout(debounceTimerSwapETH);

                    // Only call getEstimate if amount > 0
                    if (amount > 0) {
                        // Set a new timer for 1 second delay
                        debounceTimerSwap = setTimeout(() => {
                            getConvertTotal(true);
                        }, 1000); // 1000ms = 1 second delay
                    }
                }


                // Listen for both input and change events
                amountInputETH.addEventListener('input', handleAmountChangeETH);
                amountInputETH.addEventListener('change', handleAmountChangeETH);


                function calculateNewRewards() {
                    // This would calculate based on additional staking amount
                    console.log('Calculating new rewards...');
                    // Update the rewards amount
                    rewardsAmount.textContent = '15.67 STAKE';
                    rewardsUSD.textContent = '≈ $31.34 USD';
                    APYPercentage.textContent = '99.99 %';
                }



                // Swap functions
                async function executeSwap() {

                    try {
                        // Check if wallet is connected
                        if (!window.ethereum || !userAddress) {
                            alert('Please connect your wallet first!');
                            return;
                        }
                        // Get form values
                        const fromToken = document.getElementById('fromToken').value;
                        const toToken = document.getElementById('toToken').value;
                        const amountInput = document.querySelector('#swap input[type="number"]');
                        const amount = amountInput.value;

                        // Validation
                        if (!amount || parseFloat(amount) <= 0) {
                            alert('Please enter a valid amount to swap');
                            return;
                        }

                        if (fromToken === toToken) {
                            alert('Cannot swap the same token');
                            return;
                        }

                        var curBal = walletBalances[fromToken]
                        console.log("wal bal :", curBal, " vs input: ", amount);
                        if (parseFloat(curBal) < parseFloat(amount)) {

                            alert('Cannot swap, too much ' + fromToken + ' only have ' + curBal + ' in wallet');
                            return;
                        }
                        // Only support swapping TO ETH for now (based on your contract function)

                        disableButtonWithSpinner('executeSwapBtn');
                        await getSwapOfTwoTokens();

                        enableButton('executeSwapBtn', 'Execute Swap');
                        //alert('Swap completed successfully!');

                        // Refresh balances
                        if (typeof fetchBalances === 'function') {
                            fetchBalances();
                        }
                        await getTokenIDsOwnedByMetamask();
                        // Clear the input
                        amountInput.value = '0.0';

                    } catch (error) {

                        enableButton('executeSwapBtn', 'Execute Swap');
                        console.error('Swap failed:', error);

                        // Handle specific error types
                        if (error.code === 4001) {
                            alert('Transaction cancelled by user');
                        } else if (error.code === -32603) {
                            alert('Transaction failed. Please check your balance and try again.');
                        } else {
                            alert('Swap failed: ' + (error.message || error.reason || 'Unknown error'));
                        }
                    }
                }




                // Add this function to check ownership and show/hide admin tab
                async function checkAdminAccess() {
                    try {

                        console.log("user address checkAdminAccess Function : ", userAddress);
                        console.log("walletConnected checkAdminAccess Function : ", walletConnected);

                        if (!userAddress || !walletConnected) {
                            hideAdminTab();
                            return;
                        }
                        // Global contract variables
                        let lpRewardsContract = null;
                        let hookContract = null;
                        // ABI for owner function (standard Ownable contract)
                        const OWNER_ABI = [
                            {
                                "inputs": [],
                                "name": "owner",
                                "outputs": [
                                    {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                    }
                                ],
                                "stateMutability": "view",
                                "type": "function"
                            }
                        ];

                        // Initialize LP Rewards contract
                        if (contractAddressLPRewardsStaking) {
                            lpRewardsContract = new ethers.Contract(
                                contractAddressLPRewardsStaking,
                                OWNER_ABI,
                                provider // Use provider for read-only calls
                            );
                            console.log("LP Rewards contract initialized:", contractAddressLPRewardsStaking);
                        }

                        // Initialize Hook contract
                        if (HookAddress) {
                            hookContract = new ethers.Contract(
                                HookAddress,
                                OWNER_ABI,
                                provider // Use provider for read-only calls
                            );
                            console.log("Hook contract initialized:", HookAddress);
                        }




                        // Check if user is owner of LP Rewards Staking contract
                        let isLPOwner = false;
                        try {
                            if (contractAddressLPRewardsStaking && lpRewardsContract) {
                                const lpOwner = await lpRewardsContract.owner();
                                isLPOwner = lpOwner.toLowerCase() === userAddress.toLowerCase();
                                console.log("LP Rewards owner:", lpOwner);
                                console.log("Is LP owner:", isLPOwner);
                            }
                        } catch (error) {
                            console.log("Error checking LP owner:", error);
                        }

                        // Check if user is owner of Hook contract
                        let isHookOwner = false;
                        try {
                            if (HookAddress && hookContract) {
                                const hookOwner = await hookContract.owner();
                                isHookOwner = hookOwner.toLowerCase() === userAddress.toLowerCase();
                                console.log("Hook owner:", hookOwner);
                                console.log("Is Hook owner:", isHookOwner);
                            }
                        } catch (error) {
                            console.log("Error checking Hook owner:", error);
                        }

                        // Show admin tab if user owns either contract
                        if (isLPOwner || isHookOwner) {
                            showAdminTab();
                            console.log("User has admin access");
                        } else {
                            hideAdminTab();
                            console.log("User does not have admin access");
                        }

                    } catch (error) {
                        console.error("Error checking admin access:", error);
                        hideAdminTab();
                    }
                }



                function showAdminTab() {
                    let adminTab = document.getElementById('admin-tab');
                    if (!adminTab) {
                        // Create the admin tab if it doesn't exist
                        const navTabs = document.querySelector('.nav-tabs');
                        adminTab = document.createElement('button');
                        adminTab.id = 'admin-tab';
                        adminTab.className = 'nav-tab';
                        adminTab.onclick = () => switchTab('admin-functions');
                        adminTab.textContent = 'Admin Functions';
                        navTabs.appendChild(adminTab);
                    }
                    adminTab.style.display = 'inline-block';
                }



                function hideAdminTab() {
                    const adminTab = document.getElementById('admin-tab');
                    if (adminTab) {
                        adminTab.style.display = 'none';
                    }
                }




                async function getFaucetTokens() {

                    if (!walletConnected) {
                        await connectWallet();
                    }


                    // Check if wallet is connected
                    if (!window.ethereum || !userAddress) {
                        alert('Please connect your wallet first!');
                        return;
                    }

                    const faucetABI_0xBTC = [
                        // Your existing getOutput function
                        {
                            "inputs": [],
                            "name": "getFaucetTokens_Testnet_0xBTC",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        }
                    ];

                    const faucetABI_MainToken = [
                        // Your existing getOutput function
                        {
                            "inputs": [],
                            "name": "getFaucetTokens_Testnet",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        }
                    ];



                    Address_ZEROXBTC_TESTNETCONTRACT_CONTRACT = new ethers.Contract(
                        Address_ZEROXBTC_TESTNETCONTRACT, // your tokenSwapper contract address
                        faucetABI_0xBTC,
                        signer // Use signer since the function isn't view/pure
                    );

                    MAIN_TOKEN_CONTRACT = new ethers.Contract(
                        tokenAddress, // your tokenSwapper contract address
                        faucetABI_MainToken,
                        signer // Use signer since the function isn't view/pure
                    );




                    const tx = await Address_ZEROXBTC_TESTNETCONTRACT_CONTRACT.getFaucetTokens_Testnet_0xBTC();


                    console.log("getFaucetTokens_Testnet_0xBTC transaction sent:", tx.hash);
                    await tx.wait();
                    console.log("Transaction confirmed!");


                    const tx2 = await MAIN_TOKEN_CONTRACT.getFaucetTokens_Testnet();


                    console.log("getFaucetokens_Testnet transaction sent:", tx2.hash);
                    await tx2.wait();
                    console.log("Transaction confirmed!");


                    new Promise(resolve => setTimeout(resolve, 2000));
                    fetchBalances();



                }





                const erc20ABI = [
                    { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
                    { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
                    { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
                    { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" },
                    { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
                    { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
                    { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
                    { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
                    { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }
                ];


                async function checkAllowance(tokenToCheck, spenderAddress, requiredAmount) {

                    if (!walletConnected) {
                        await connectWallet();
                    }
                    try {
                        let tokenContract;
                        let tokenName;


                        // Determine which token to check
                        if (tokenToCheck === tokenAddress) {
                            tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);
                            tokenName = "B0x";
                        } else if (tokenToCheck === Address_ZEROXBTC_TESTNETCONTRACT) {
                            tokenContract = new ethers.Contract(Address_ZEROXBTC_TESTNETCONTRACT, erc20ABI, signer);
                            tokenName = "0xBTC";
                        } else if (tokenToCheck === USDCToken) {
                            tokenContract = new ethers.Contract(USDCToken, erc20ABI, signer);
                            tokenName = "USDC";
                        } else {
                            console.error("Unknown token address!");
                            return false;
                        }

                        requiredAmount = toBigNumber(requiredAmount);
                        // Get current allowance
                        const userAddress = await signer.getAddress();
                        const currentAllowance = await tokenContract.allowance(userAddress, spenderAddress);

                        console.log(`Current ${tokenName} allowance:`, ethers.utils.formatEther(currentAllowance));
                        if (tokenName == "0xBTC") {

                            console.log(`Required11 ${tokenName} amount:`, ethers.utils.formatUnits(requiredAmount, 8));
                        } else {

                            console.log(`Required ${tokenName} amount:`, ethers.utils.formatEther(requiredAmount));

                        }

                        // Check if allowance is sufficient
                        if (currentAllowance.gte(requiredAmount)) {
                            alert(`${tokenName} allowance is sufficient. No approval needed.`);
                            return true;
                        } else {
                            alert(`${tokenName} allowance is insufficient. Approval needed.`);
                            return false;
                        }

                    } catch (error) {
                        console.error("Allowance check failed:", error);
                        alert(`Allowance check failed: ${error.message}`);
                        return false;
                    }
                }



















                function toBigNumber(value) {
                    if (ethers.BigNumber.isBigNumber(value)) {
                        return value;
                    }

                    if (typeof value === 'number') {
                        // Convert scientific notation to proper integer string
                        if (value >= 1e20 || value <= -1e20) {
                            // Use Number.prototype.toPrecision to get full precision
                            const str = value.toPrecision().replace('.', '').replace(/e.*$/, '');
                            return ethers.BigNumber.from(str);
                        }
                        return ethers.BigNumber.from(Math.floor(value).toString());
                    }

                    // Handle string values
                    if (typeof value === 'string') {
                        if (value.includes('e') || value.includes('E')) {
                            const num = parseFloat(value);
                            return toBigNumber(num); // Recursive call to handle as number
                        }
                        // Remove any decimal places for integer conversion
                        return ethers.BigNumber.from(value.split('.')[0]);
                    }

                    return ethers.BigNumber.from(value.toString().split('.')[0]);
                }



                // Fix: Handle arrays by summing all BigNumbers in each array
                function sumBigNumberArray(bigNumberArray) {
                    if (!Array.isArray(bigNumberArray)) {
                        return toBigNumber(bigNumberArray);
                    }

                    let sum = ethers.BigNumber.from(0);
                    for (let i = 0; i < bigNumberArray.length; i++) {
                        if (ethers.BigNumber.isBigNumber(bigNumberArray[i])) {
                            sum = sum.add(bigNumberArray[i]);
                        } else {
                            sum = sum.add(toBigNumber(bigNumberArray[i]));
                        }
                    }
                    return sum;
                }


                // Approve function
                async function approveToken(tokenToApprove, spenderAddress, amount) {

                    if (!walletConnected) {
                        await connectWallet();
                    }
                    try {
                        alert(`Approving ${tokenToApprove} token...`);

                        let tokenContract;


                        // Determine which token to approve
                        if (tokenToApprove === tokenAddress) {
                            // B0x token
                            tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);
                            alert("Approving B0x token for spending...");
                        } else if (tokenToApprove === Address_ZEROXBTC_TESTNETCONTRACT) {
                            // 0xBTC token  
                            tokenContract = new ethers.Contract(Address_ZEROXBTC_TESTNETCONTRACT, erc20ABI, signer);
                            alert("Approving 0xBTC token for spending...");
                        } else if (tokenToApprove === USDCToken) {
                            tokenContract = new ethers.Contract(USDCToken, erc20ABI, signer);
                            alert("Approving USDC token for spending");
                        } else {
                            alert("Unknown token address!");
                            return false;
                        }

                        // Send approval transaction
                        const approveTx = await tokenContract.approve(spenderAddress, amount);
                        alert("Approval transaction sent! Waiting for confirmation...");

                        // Wait for confirmation
                        await approveTx.wait();
                        alert("Token approval confirmed!");

                        return true;

                    } catch (error) {
                        console.error("Approval failed:", error);
                        alert(`Approval failed: ${error.message}`);
                        return false;
                    }
                }



                async function approveIfNeeded(tokenToApprove, spenderAddress, requiredAmount) {
                    try {
                        // First check if approval is needed
                        const allowanceSufficient = await checkAllowance(tokenToApprove, spenderAddress, requiredAmount);

                        if (allowanceSufficient) {
                            console.log("Approval not needed - sufficient allowance exists");
                            return true;
                        }

                        showInfoNotification('Approve Token', 'Requesting approval for unlimited amount to avoid future approvals...');
                        // If not sufficient, request approval for max amount
                        const txResponse = await approveToken(tokenToApprove, spenderAddress, ethers.constants.MaxUint256);
                        // Only call .wait() if txResponse has it
                        let txReceipt;
                        if (txResponse.wait) {
                            txReceipt = await txResponse.wait(); // wait for mining
                        } else {
                            txReceipt = txResponse; // already a receipt
                        }

                        showSuccessNotification(
                            'Approved Tokens!',
                            'Tokens have been approved on the contract successfully',
                            txReceipt.transactionHash
                        );

                        return txReceipt;

                    } catch (error) {
                        console.error("Approve if needed failed:", error);
                        alert(`Approval process failed: ${error.message}`);
                        return false;
                    }
                }

                // Usage examples:
                // Check allowance only:
                // checkAllowance(tokenAddress, POOL_MANAGER_ADDRESS, ethers.utils.parseEther("100"));

                // Check and approve if needed:














                // Helper function for 24-bit sign extension
                function signExtend24Bit(value) {
                    const SIGN_BIT = 0x800000; // Bit 23 for 24-bit numbers
                    const MASK_24BIT = 0xFFFFFF;

                    if (value & SIGN_BIT) {
                        // Negative number - extend with 1s
                        return (value | (~MASK_24BIT)) | 0; // | 0 converts to 32-bit signed int
                    } else {
                        // Positive number
                        return value;
                    }
                }
                // Direct JavaScript equivalents of your Solidity functions
                function TOtickLower(info) {
                    const TICK_LOWER_OFFSET = 8;
                    const shifted = Number((BigInt(info) >> BigInt(TICK_LOWER_OFFSET)) & 0xFFFFFFn);
                    return signExtend24Bit(shifted);
                }

                function TOtickUpper(info) {
                    const TICK_UPPER_OFFSET = 32;
                    const shifted = Number((BigInt(info) >> BigInt(TICK_UPPER_OFFSET)) & 0xFFFFFFn);
                    return signExtend24Bit(shifted);
                }


                // Global variable to track user's manual selection for withdraw NFT (add this at the top)
                let userManualSelectionWithdraw = null;
                // Global variable to track user's manual selection
                let userManualSelection = null;
                // Global variables to track user's manual selections (add these at the top)
                let userManualSelectionIncrease = null;
                let userManualSelectionDecrease = null;
                // Global variables to track user's manual selections for staking (add these at the top)
                let userManualSelectionStakeIncrease = null;
                let userManualSelectionStakeDecrease = null;
                function loadPositionsIntoDappSelections() {


                    // Set up position selector for regular increase
                    const positionSelect = document.querySelector('#increase select');
                    console.log("increaseSelect: ", positionSelect);

                    if (positionSelect) {
                        // Set up user selection tracking (only once)
                        if (!positionSelect.hasAttribute('data-selection-tracker')) {
                            positionSelect.addEventListener('change', function (e) {
                                if (e.target.value && e.target.value.startsWith('position_')) {
                                    userManualSelectionIncrease = e.target.value;
                                    console.log('👤 User manually selected increase position:', userManualSelectionIncrease);
                                }
                            });
                            positionSelect.setAttribute('data-selection-tracker', 'true');
                        }

                        // Determine what to preserve
                        let currentValue;
                        if (userManualSelectionIncrease) {
                            currentValue = userManualSelectionIncrease;
                            console.log('🔒 Using user manual selection (increase):', currentValue);
                        } else {
                            const domValue = positionSelect.value;
                            if (domValue && domValue.startsWith('position_')) {
                                currentValue = domValue;
                                console.log('📋 Using DOM position value (increase):', currentValue);
                            } else {
                                currentValue = null;
                                console.log('📋 No valid increase position to preserve');
                            }
                        }

                        // Clear ALL options
                        positionSelect.innerHTML = '';

                        // Add dynamic position options
                        Object.values(positionData).forEach(position => {
                            console.log("positionIDzz: ", position.id);
                            const option = document.createElement('option');
                            option.value = position.id;
                            option.textContent = `${position.pool} - ${position.feeTier} - Position #${position.id.split('_')[1]}`;
                            positionSelect.appendChild(option);
                        });

                        // Use setTimeout to ensure DOM is updated before checking
                        setTimeout(() => {
                            console.log('🔍 Checking for increase target after DOM update...');
                            console.log('🎯 Available increase options:', Array.from(positionSelect.options).map(opt => opt.value));

                            const targetExists = positionSelect.querySelector(`option[value="${currentValue}"]`);
                            console.log('🔍 Looking for increase position:', currentValue);
                            console.log('🔍 Increase target exists:', !!targetExists);

                            if (currentValue && targetExists) {
                                positionSelect.value = currentValue;
                                console.log('✅ Restored increase selection to:', currentValue);
                            } else if (currentValue) {
                                console.log('⚠️ Could not restore increase selection:', currentValue);
                                userManualSelectionIncrease = null;
                                console.log('🔓 Cleared invalid manual increase selection');
                            }

                            updatePositionInfo();
                        }, 0);

                        // Add main change listener (only once)
                        if (!positionSelect.hasAttribute('data-main-listener')) {
                            positionSelect.addEventListener('change', updatePositionInfo);
                            positionSelect.setAttribute('data-main-listener', 'true');
                        }
                    } else {
                        console.log("NO psoitions");
                    }

                    // Set up position selector for decrease
                    const positionSelect2 = document.querySelector('#decrease select');
                    console.log("decreaseSelect: ", positionSelect2);

                    if (positionSelect2) {
                        // Set up user selection tracking (only once)
                        if (!positionSelect2.hasAttribute('data-selection-tracker')) {
                            positionSelect2.addEventListener('change', function (e) {
                                if (e.target.value && e.target.value.startsWith('position_')) {
                                    userManualSelectionDecrease = e.target.value;
                                    console.log('👤 User manually selected decrease position:', userManualSelectionDecrease);
                                }
                            });
                            positionSelect2.setAttribute('data-selection-tracker', 'true');
                        }

                        // Determine what to preserve
                        let currentValue2;
                        if (userManualSelectionDecrease) {
                            currentValue2 = userManualSelectionDecrease;
                            console.log('🔒 Using user manual selection (decrease):', currentValue2);
                        } else {
                            const domValue = positionSelect2.value;
                            if (domValue && domValue.startsWith('position_')) {
                                currentValue2 = domValue;
                                console.log('📋 Using DOM position value (decrease):', currentValue2);
                            } else {
                                currentValue2 = null;
                                console.log('📋 No valid decrease position to preserve');
                            }
                        }

                        // Clear ALL options
                        positionSelect2.innerHTML = '';

                        // Add dynamic position options
                        Object.values(positionData).forEach(position => {
                            const option = document.createElement('option');
                            option.value = position.id;
                            option.textContent = `${position.pool} - ${position.feeTier} - Position #${position.id.split('_')[1]}`;
                            positionSelect2.appendChild(option);
                        });

                        // Use setTimeout to ensure DOM is updated before checking
                        setTimeout(() => {
                            console.log('🔍 Checking for decrease target after DOM update...');
                            console.log('🎯 Available decrease options:', Array.from(positionSelect2.options).map(opt => opt.value));

                            const targetExists = positionSelect2.querySelector(`option[value="${currentValue2}"]`);
                            console.log('🔍 Looking for decrease position:', currentValue2);
                            console.log('🔍 Decrease target exists:', !!targetExists);

                            if (currentValue2 && targetExists) {
                                positionSelect2.value = currentValue2;
                                console.log('✅ Restored decrease selection to:', currentValue2);
                            } else if (currentValue2) {
                                console.log('⚠️ Could not restore decrease selection:', currentValue2);
                                userManualSelectionDecrease = null;
                                console.log('🔓 Cleared invalid manual decrease selection');
                            }

                            updateDecreasePositionInfo();
                        }, 1000);

                        // Add main change listener (only once)
                        if (!positionSelect2.hasAttribute('data-main-listener')) {
                            positionSelect2.addEventListener('change', updateDecreasePositionInfo);
                            positionSelect2.setAttribute('data-main-listener', 'true');
                        }
                    }










                    const positionSelect3 = document.querySelector('#staking-main-page select');
                    console.log("stakingmianpageslect: ", positionSelect3);

                    if (positionSelect3) {
                        // Set up user selection tracking (only once)
                        if (!positionSelect3.hasAttribute('data-selection-tracker')) {
                            positionSelect3.addEventListener('change', function (e) {
                                if (e.target.value && e.target.value.startsWith('position_')) {
                                    userManualSelection = e.target.value;
                                    console.log('👤 User manually selected:', userManualSelection);
                                }
                            });
                            positionSelect3.setAttribute('data-selection-tracker', 'true');
                        }

                        // Determine what to preserve
                        let currentValue3;
                        if (userManualSelection) {
                            currentValue3 = userManualSelection;
                            console.log('🔒 Using user manual selection:', currentValue3);
                        } else {
                            const domValue = positionSelect3.value;
                            if (domValue && domValue.startsWith('position_')) {
                                currentValue3 = domValue;
                                console.log('📋 Using DOM position value:', currentValue3);
                            } else {
                                currentValue3 = null;
                                console.log('📋 No valid position to preserve');
                            }
                        }

                        // Clear ALL options
                        positionSelect3.innerHTML = '';

                        // Add dynamic position options
                        Object.values(positionData).forEach(position => {
                            const option = document.createElement('option');
                            option.value = position.id;
                            option.textContent = `${position.pool} - ${position.feeTier} - Position #${position.id.split('_')[1]}`;
                            positionSelect3.appendChild(option);
                        });

                        // IMPORTANT FIX: Use setTimeout to ensure DOM is updated before checking
                        setTimeout(() => {
                            console.log('🔍 Checking for target after DOM update...');
                            console.log('🎯 Available options:', Array.from(positionSelect3.options).map(opt => opt.value));

                            // Check if the target position exists NOW
                            const targetExists = positionSelect3.querySelector(`option[value="${currentValue3}"]`);
                            console.log('🔍 Looking for:', currentValue3);
                            console.log('🔍 Target exists:', !!targetExists);

                            // Restore previous selection if it still exists
                            if (currentValue3 && targetExists) {
                                positionSelect3.value = currentValue3;
                                console.log('✅ Restored selection to:', currentValue3);
                            } else if (currentValue3) {
                                console.log('⚠️ Could not restore selection:', currentValue3);
                                // Clear invalid selection
                                userManualSelection = null;
                                console.log('🔓 Cleared invalid manual selection');
                            }

                            // Update the UI after setting the value
                            updatePositionInfoMAIN_STAKING();
                        }, 0); // Even timeout 0 ensures this runs after current execution stack

                        // Add main change listener (only once)
                        if (!positionSelect3.hasAttribute('data-main-listener')) {
                            positionSelect3.addEventListener('change', updatePositionInfoMAIN_STAKING);
                            positionSelect3.setAttribute('data-main-listener', 'true');
                        }
                    }







                    // Alternative approach: Use requestAnimationFrame instead of setTimeout
                    // requestAnimationFrame(() => {
                    //     // restoration code here
                    //     updatePositionInfoMAIN_STAKING();
                    // });










                    const positionSelectMainPageWithdrawNFT = document.querySelector('#staking-main-page .form-group2 select');
                    console.log("withdrawNFTSelect: ", positionSelectMainPageWithdrawNFT);

                    if (positionSelectMainPageWithdrawNFT) {
                        // Set up user selection tracking (only once)
                        if (!positionSelectMainPageWithdrawNFT.hasAttribute('data-selection-tracker')) {
                            positionSelectMainPageWithdrawNFT.addEventListener('change', function (e) {
                                if (e.target.value && e.target.value.startsWith('stake_position_')) {
                                    userManualSelectionWithdraw = e.target.value;
                                    console.log('👤 User manually selected withdraw position:', userManualSelectionWithdraw);
                                }
                            });
                            positionSelectMainPageWithdrawNFT.setAttribute('data-selection-tracker', 'true');
                        }

                        // Determine what to preserve
                        let currentValueWithdrawNFT;
                        if (userManualSelectionWithdraw) {
                            currentValueWithdrawNFT = userManualSelectionWithdraw;
                            console.log('🔒 Using user manual selection (withdraw):', currentValueWithdrawNFT);
                        } else {
                            const domValue = positionSelectMainPageWithdrawNFT.value;
                            if (domValue && domValue.startsWith('stake_position_')) {
                                currentValueWithdrawNFT = domValue;
                                console.log('📋 Using DOM position value (withdraw):', currentValueWithdrawNFT);
                            } else {
                                currentValueWithdrawNFT = null;
                                console.log('📋 No valid withdraw position to preserve');
                            }
                        }

                        // Clear ALL options
                        positionSelectMainPageWithdrawNFT.innerHTML = '';

                        // Add dynamic position options
                        Object.values(stakingPositionData).forEach(position => {
                            const option = document.createElement('option');
                            option.value = position.id;
                            option.textContent = `${position.pool} - ${position.feeTier} - Stake Position #${position.id.split('_')[2]}`;
                            positionSelectMainPageWithdrawNFT.appendChild(option);
                        });

                        // IMPORTANT FIX: Use setTimeout to ensure DOM is updated before checking
                        setTimeout(() => {
                            console.log('🔍 Checking for withdraw target after DOM update...');
                            console.log('🎯 Available withdraw options:', Array.from(positionSelectMainPageWithdrawNFT.options).map(opt => opt.value));

                            // Check if the target position exists NOW
                            const targetExists = positionSelectMainPageWithdrawNFT.querySelector(`option[value="${currentValueWithdrawNFT}"]`);
                            console.log('🔍 Looking for withdraw position:', currentValueWithdrawNFT);
                            console.log('🔍 Withdraw target exists:', !!targetExists);

                            // Restore previous selection if it still exists
                            if (currentValueWithdrawNFT && targetExists) {
                                positionSelectMainPageWithdrawNFT.value = currentValueWithdrawNFT;
                                console.log('✅ Restored withdraw selection to:', currentValueWithdrawNFT);
                            } else if (currentValueWithdrawNFT) {
                                console.log('⚠️ Could not restore withdraw selection:', currentValueWithdrawNFT);
                                // Clear invalid selection
                                userManualSelectionWithdraw = null;
                                console.log('🔓 Cleared invalid manual withdraw selection');
                            }

                            // Update the UI after setting the value
                            updatePositionInfoMAIN_UNSTAKING();
                        }, 0);

                        // Add main change listener (only once)
                        if (!positionSelectMainPageWithdrawNFT.hasAttribute('data-main-listener')) {
                            positionSelectMainPageWithdrawNFT.addEventListener('change', updatePositionInfoMAIN_UNSTAKING);
                            positionSelectMainPageWithdrawNFT.setAttribute('data-main-listener', 'true');
                        }
                    }





                    // Set up position selector for stake increase
                    const stakePositionSelect = document.querySelector('#stake-increase select');
                    console.log("stakeIncreaseSelect: ", stakePositionSelect);

                    if (stakePositionSelect) {
                        // Set up user selection tracking (only once)
                        if (!stakePositionSelect.hasAttribute('data-selection-tracker')) {
                            stakePositionSelect.addEventListener('change', function (e) {
                                if (e.target.value && e.target.value.startsWith('stake_position_')) {
                                    userManualSelectionStakeIncrease = e.target.value;
                                    console.log('👤 User manually selected stake increase position:', userManualSelectionStakeIncrease);
                                }
                            });
                            stakePositionSelect.setAttribute('data-selection-tracker', 'true');
                        }

                        // Determine what to preserve
                        let currentValueStakeIncrease;
                        if (userManualSelectionStakeIncrease) {
                            currentValueStakeIncrease = userManualSelectionStakeIncrease;
                            console.log('🔒 Using user manual selection (stake increase):', currentValueStakeIncrease);
                        } else {
                            const domValue = stakePositionSelect.value;
                            if (domValue && domValue.startsWith('stake_position_')) {
                                currentValueStakeIncrease = domValue;
                                console.log('📋 Using DOM position value (stake increase):', currentValueStakeIncrease);
                            } else {
                                currentValueStakeIncrease = null;
                                console.log('📋 No valid stake increase position to preserve');
                            }
                        }

                        // Clear ALL options
                        stakePositionSelect.innerHTML = '';

                        // Add dynamic position options
                        Object.values(stakingPositionData).forEach(position => {
                            const option = document.createElement('option');
                            option.value = position.id;
                            option.textContent = `${position.pool} - ${position.feeTier} - Stake Position #${position.id.split('_')[2]}`;
                            stakePositionSelect.appendChild(option);
                        });

                        // Use setTimeout to ensure DOM is updated before checking
                        setTimeout(() => {
                            console.log('🔍 Checking for stake increase target after DOM update...');
                            console.log('🎯 Available stake increase options:', Array.from(stakePositionSelect.options).map(opt => opt.value));

                            const targetExists = stakePositionSelect.querySelector(`option[value="${currentValueStakeIncrease}"]`);
                            console.log('🔍 Looking for stake increase position:', currentValueStakeIncrease);
                            console.log('🔍 Stake increase target exists:', !!targetExists);

                            if (currentValueStakeIncrease && targetExists) {
                                stakePositionSelect.value = currentValueStakeIncrease;
                                console.log('✅ Restored stake increase selection to:', currentValueStakeIncrease);
                            } else if (currentValueStakeIncrease) {
                                console.log('⚠️ Could not restore stake increase selection:', currentValueStakeIncrease);
                                userManualSelectionStakeIncrease = null;
                                console.log('🔓 Cleared invalid manual stake increase selection');
                            }

                            updateStakePositionInfo();
                        }, 0);

                        // Add main change listener (only once)
                        if (!stakePositionSelect.hasAttribute('data-main-listener')) {
                            stakePositionSelect.addEventListener('change', updateStakePositionInfo);
                            stakePositionSelect.setAttribute('data-main-listener', 'true');
                        }
                    }




                    // Set up position selector for stake decrease
                    const stakeDecreasePositionSelect = document.querySelector('#stake-decrease select');
                    console.log("stakeDecreaseSelect: ", stakeDecreasePositionSelect);

                    if (stakeDecreasePositionSelect) {
                        // Set up user selection tracking (only once)
                        if (!stakeDecreasePositionSelect.hasAttribute('data-selection-tracker')) {
                            stakeDecreasePositionSelect.addEventListener('change', function (e) {
                                if (e.target.value && e.target.value.startsWith('stake_position_')) {
                                    userManualSelectionStakeDecrease = e.target.value;
                                    console.log('👤 User manually selected stake decrease position:', userManualSelectionStakeDecrease);
                                }
                            });
                            stakeDecreasePositionSelect.setAttribute('data-selection-tracker', 'true');
                        }

                        // Determine what to preserve
                        let currentValueStakeDecrease;
                        if (userManualSelectionStakeDecrease) {
                            currentValueStakeDecrease = userManualSelectionStakeDecrease;
                            console.log('🔒 Using user manual selection (stake decrease):', currentValueStakeDecrease);
                        } else {
                            const domValue = stakeDecreasePositionSelect.value;
                            if (domValue && domValue.startsWith('stakingposition_')) {
                                currentValueStakeDecrease = domValue;
                                console.log('📋 Using DOM position value (stake decrease):', currentValueStakeDecrease);
                            } else {
                                currentValueStakeDecrease = null;
                                console.log('📋 No valid stake decrease position to preserve');
                            }
                        }

                        // Clear ALL options
                        stakeDecreasePositionSelect.innerHTML = '';

                        // Add dynamic position options
                        Object.values(stakingPositionData).forEach(position => {
                            const option = document.createElement('option');
                            option.value = position.id;
                            option.textContent = `${position.pool} - ${position.feeTier} - Stake Position #${position.id.split('_')[2]}`;
                            stakeDecreasePositionSelect.appendChild(option);
                        });

                        // Use setTimeout to ensure DOM is updated before checking
                        setTimeout(() => {
                            console.log('🔍 Checking for stake decrease target after DOM update...');
                            console.log('🎯 Available stake decrease options:', Array.from(stakeDecreasePositionSelect.options).map(opt => opt.value));

                            const targetExists = stakeDecreasePositionSelect.querySelector(`option[value="${currentValueStakeDecrease}"]`);
                            console.log('🔍 Looking for stake decrease position:', currentValueStakeDecrease);
                            console.log('🔍 Stake decrease target exists:', !!targetExists);

                            if (currentValueStakeDecrease && targetExists) {
                                stakeDecreasePositionSelect.value = currentValueStakeDecrease;
                                console.log('✅ Restored stake decrease selection to:', currentValueStakeDecrease);
                            } else if (currentValueStakeDecrease) {
                                console.log('⚠️ Could not restore stake decrease selection:', currentValueStakeDecrease);
                                userManualSelectionStakeDecrease = null;
                                console.log('🔓 Cleared invalid manual stake decrease selection');
                            }

                            updateStakeDecreasePositionInfo();
                        }, 0);

                        // Add main change listener (only once)
                        if (!stakeDecreasePositionSelect.hasAttribute('data-main-listener')) {
                            stakeDecreasePositionSelect.addEventListener('change', updateStakeDecreasePositionInfo);
                            stakeDecreasePositionSelect.setAttribute('data-main-listener', 'true');
                        }
                    }

















                    if (Object.keys(positionData).length === 0) {
                        console.log("hello world");
                        disableButtonWithSpinner('decreaseLiquidityBtn', "No positions to Decrease Liquidity on, create a position");
                    } else {
                        enableButton('decreaseLiquidityBtn', 'Remove Liquidity & Claim Fees');
                    }


                    if (Object.keys(positionData).length === 0) {
                        console.log("hello world");
                        disableButtonWithSpinner('increaseLiquidityBtn', "No positions to increase Liquidity on, create a position");
                    } else {
                        enableButton('increaseLiquidityBtn', 'Increase Liquidity');
                    }


                    if (Object.keys(stakingPositionData).length === 0) {
                        console.log("hello world");
                        disableButtonWithSpinner('increaseLiquidityStakedBtn', "No positions to increase Liquidity on, stake a position first");
                    } else {
                        enableButton('increaseLiquidityStakedBtn', 'Increase Staked Position Liquidity');
                    }

                    if (Object.keys(stakingPositionData).length === 0) {
                        console.log("hello world");
                        disableButtonWithSpinner('decreaseLiquidityStakedBtn', "No positions to decrease Liquidity on, stake a position first");
                    } else {
                        enableButton('decreaseLiquidityStakedBtn', 'Decrease Liquidity of Staked Position');
                    }

                }





                function cleanupPositionData() {
                    // Clean positionData
                    Object.keys(positionData).forEach(key => {
                        const idNumber = parseInt(key.split('_')[1]);
                        if (idNumber > 0) {
                            delete positionData[key];
                        }
                    });

                    // Clean stakingPositionData
                    Object.keys(stakingPositionData).forEach(key => {
                        const idNumber = parseInt(key.split('_')[2]); // stake_position_X
                        if (idNumber > 0) {
                            delete stakingPositionData[key];
                        }
                    });
                }



                async function getTokenIDsOwnedByMetamask() {
                    await getTokenIDsOwnedByUser(userAddress);

                }


                async function getTokenIDsOwnedByStaking() {
                    await getTokenIDsOwnedByUser(contractAddressLPRewardsStaking);
                }

                var LAUNCH_UNISWAP_ID = 0;
                var WhereToStartSearch = LAUNCH_UNISWAP_ID;
                var WhereToStartSearchStaked = 0;
                async function getTokenIDsOwnedByUser(ADDRESSTOSEARCHOF) {

                    triggerRefresh();
                    await sleep(1000);
                    console.log("Calling findUserTokenIds for: ", ADDRESSTOSEARCHOF, " to find all tokens owned by tokenAddress_Rewards aka Staking Contract");

                    if (!walletConnected) {
                        await connectWallet();
                    }





                    positionFinderABI = [
                        {
                            "inputs": [
                                { "internalType": "address", "name": "user", "type": "address" },
                                { "internalType": "uint256", "name": "startId", "type": "uint256" },
                                { "internalType": "uint256", "name": "endId", "type": "uint256" },
                                { "internalType": "address", "name": "Token0", "type": "address" },
                                { "internalType": "address", "name": "Token1", "type": "address" },
                                { "internalType": "address", "name": "HookAddress", "type": "address" },
                                { "internalType": "uint256", "name": "minTokenA", "type": "uint256" }
                            ],
                            "name": "findUserTokenIdswithMinimum",
                            "outputs": [
                                { "internalType": "uint256[]", "name": "ownedTokens", "type": "uint256[]" },
                                { "internalType": "uint256[]", "name": "amountTokenA", "type": "uint256[]" },
                                { "internalType": "uint256[]", "name": "amountTokenB", "type": "uint256[]" },
                                { "internalType": "uint128[]", "name": "positionLiquidity", "type": "uint128[]" },
                                { "internalType": "int128[]", "name": "feesOwedTokenA", "type": "int128[]" },
                                { "internalType": "int128[]", "name": "feesOwedTokenB", "type": "int128[]" },
                                {
                                    "internalType": "struct PoolKey[]", "name": "poolKeyz", "type": "tuple[]",
                                    "components": [
                                        { "internalType": "address", "name": "currency0", "type": "address" },
                                        { "internalType": "address", "name": "currency1", "type": "address" },
                                        { "internalType": "uint24", "name": "fee", "type": "uint24" },
                                        { "internalType": "int24", "name": "tickSpacing", "type": "int24" },
                                        { "internalType": "address", "name": "hooks", "type": "address" }
                                    ]
                                },
                                { "internalType": "uint256[]", "name": "poolInfo", "type": "uint256[]" }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        }, {
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "user",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "Token0",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "Token1",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "minAmount0",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "startIndex",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "count",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "address",
                                    "name": "HookAddress",
                                    "type": "address"
                                }
                            ],
                            "name": "getIDSofStakedTokensForUserwithMinimum",
                            "outputs": [
                                {
                                    "internalType": "uint256[]",
                                    "name": "ids",
                                    "type": "uint256[]"
                                },
                                {
                                    "internalType": "uint256[]",
                                    "name": "LiquidityTokenA",
                                    "type": "uint256[]"
                                },
                                {
                                    "internalType": "uint256[]",
                                    "name": "LiquidityTokenB",
                                    "type": "uint256[]"
                                },
                                {
                                    "internalType": "uint128[]",
                                    "name": "positionLiquidity",
                                    "type": "uint128[]"
                                },
                                {
                                    "internalType": "uint256[]",
                                    "name": "timeStakedAt",
                                    "type": "uint256[]"
                                },
                                {
                                    "internalType": "uint256[]",
                                    "name": "multiplierPenalty",
                                    "type": "uint256[]"
                                },
                                {
                                    "internalType": "address[]",
                                    "name": "currency0",
                                    "type": "address[]"
                                },
                                {
                                    "internalType": "address[]",
                                    "name": "currency1",
                                    "type": "address[]"
                                },
                                {
                                    "internalType": "uint256[]",
                                    "name": "poolInfo",
                                    "type": "uint256[]"
                                },
                                {
                                    "internalType": "int128",
                                    "name": "startCountAt",
                                    "type": "int128"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        }

                        , {
                            "inputs": [],
                            "name": "getMaxUniswapIDPossible",
                            "outputs": [
                                { "internalType": "uint256", "name": "", "type": "uint256" }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "user",
                                    "type": "address"
                                }
                            ],
                            "name": "getMaxStakedIDforUser",
                            "outputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        }

                    ];


                    tokenPositionFinderPro = new ethers.Contract(
                        contractAddress_PositionFinderPro, // your tokenSwapper contract address
                        positionFinderABI,
                        signer // Use signer since the function isn't view/pure
                    );



























                    console.log("Calling getIDSofStakedTokensForUser of tokenAddress_Swapper");
                    // Get current time in milliseconds since Unix epoch
                    const currentTime = Date.now();
                    // If you need it in seconds (like Unix timestamp), divide by 1000
                    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
                    console.log("Current Time in seconds since epoch", currentTimeInSeconds); // e.g., 1717974123





                    const minStaking = document.getElementById('minStaking').value || 0;
                    const minUserHoldings = document.getElementById('minUserHoldings').value || 0;


                    console.log("Global Settings variables to prevent spam!:minStaking: ", minStaking, "  &&&&& minUserHoldings: ", minUserHoldings);

                    // Compact ABI for findUserTokenIdswithMinimum function







                    console.log("getting getMaxUniswapIDPossible!");
                    var MAXTOKENPOSSIBLE_STAKING = 0;
                    var maxTokenPossible_STAKING = 0;


                    try {
                        // Call the view function
                        const result = await tokenPositionFinderPro.getMaxStakedIDforUser(userAddress);



                        // First debug what we're getting back
                        console.log("Raw result type:", typeof result);
                        console.log("Raw result structure:", Object.keys(result).join(", "));

                        if (typeof result === 'bigint' || typeof result === 'number') {
                            // If it's already a primitive value
                            MAXTOKENPOSSIBLE_STAKING = result;
                        } else if (result._isBigNumber || result instanceof ethers.BigNumber) {
                            // For ethers v5 BigNumber
                            MAXTOKENPOSSIBLE_STAKING = result;
                        } else if (typeof result === 'object' && result !== null) {
                            // For objects, try to extract the value
                            // With ethers v6, we might get the value directly
                            if (typeof result.toString === 'function' && result.toString().match(/^[0-9]+$/)) {
                                MAXTOKENPOSSIBLE_STAKING = result;
                            } else {
                                // Attempt to extract value based on common patterns
                                MAXTOKENPOSSIBLE_STAKING = result[0] || result.amountOut || result._hex || result.value || result;
                            }
                        }

                        console.log(`Found valid Uniswap v4 MAXTOKEN POSSIBLE_STAKING: ${MAXTOKENPOSSIBLE_STAKING.toString()}`);

                        // CONVERT TO REGULAR NUMBER FOR LOOP
                        if (typeof MAXTOKENPOSSIBLE_STAKING === 'bigint') {
                            maxTokenPossible_STAKING = Number(MAXTOKENPOSSIBLE_STAKING);
                        } else if (MAXTOKENPOSSIBLE_STAKING._isBigNumber || MAXTOKENPOSSIBLE_STAKING instanceof ethers.BigNumber) {
                            // For ethers v5
                            maxTokenPossible_STAKING = MAXTOKENPOSSIBLE_STAKING.toNumber();
                        } else if (typeof MAXTOKENPOSSIBLE_STAKING.toString === 'function') {
                            // For ethers v6 or other BigInt-like objects
                            maxTokenPossible_STAKING = Number(MAXTOKENPOSSIBLE_STAKING.toString());
                        } else {
                            maxTokenPossible_STAKING = Number(MAXTOKENPOSSIBLE_STAKING);
                        }

                        console.log(`Converted to number for loop: ${maxTokenPossible_STAKING}`);
                    } catch (error) {
                        console.error(`Error finding valid getMaxUniswapIDPossible for swap:`, error);
                    }





                    const maxLoopLookups = 1000;
                    var startSearchAt = WhereToStartSearchStaked; // Start searching from token ID 0
                    const totalRange = maxTokenPossible_STAKING + 1 - startSearchAt;
                    const NumberOfLoops = Math.ceil(totalRange / maxLoopLookups);

                    // Initialize as empty arrays (not undefined)
                    let ownedTokenIdsOFSwapperOnStaked = [];
                    let OWNEDtOKEN1 = [];
                    let OWNEDtOKEN2 = [];
                    let liquidity = [];
                    let timeStakedAT1 = [];
                    let PenaltyForWithdraw = [];
                    let poolKeyi = [];
                    let poolInfoi = [];
                    let PoolKeyCurrency0 = [];
                    let PoolKeyCurrency1 = [];
                    var totalStakedToken0 = toBigNumber(0);
                    var totalStakedToken1 = toBigNumber(0);
                    var lastSpotTosetStartSearchAt = -1;
                    for (let x = 0; x < NumberOfLoops; x++) {
                        const startId = startSearchAt + (maxLoopLookups * x);
                        const endId = Math.min(startId + maxLoopLookups - 1, maxTokenPossible_STAKING);

                        console.log("22222Looking at NFT ids in this search IDS:", startId, "to", endId);
                        console.log("DOING FUNCTION getIDSofStakedTokensForUserwithMinimum ");
                        console.log("STAT((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))) getIDSofStakedTokensForUserwithMinimum");
                        console.log("ADDRESSTOSEARCHOF: ", ADDRESSTOSEARCHOF);
                        console.log("tokenAddress: ", tokenAddress);
                        console.log("Address_ZEROXBTC_TESTNETCONTRACT: ", Address_ZEROXBTC_TESTNETCONTRACT);
                        console.log("minStaking: ", minStaking);
                        console.log("startId: ", startId);
                        console.log("maxLoopLookups: ", maxLoopLookups);
                        console.log("HookAddress: ", HookAddress);
                        var result;
                        var worked = 1;
                        try {
                            result = await tokenPositionFinderPro.getIDSofStakedTokensForUserwithMinimum(
                                ADDRESSTOSEARCHOF,
                                tokenAddress,
                                Address_ZEROXBTC_TESTNETCONTRACT,
                                minStaking,
                                startId,
                                maxLoopLookups,
                                HookAddress
                            );
                            worked = 0;
                        } catch (e) {
                            console.log("Error e: ", e);
                        }

                        if (worked == 1) {


                            await loadPositionsIntoDappSelections();

                            hideLoadingWidget();
                            return;
                        }

                        console.log("result[6]: ", result[6]);
                        // Concatenate arrays properly using spread operator or concat
                        ownedTokenIdsOFSwapperOnStaked = ownedTokenIdsOFSwapperOnStaked.concat(result[0]);


                        // Now add the arrays properly
                        totalStakedToken0 = totalStakedToken0.add(sumBigNumberArray(result[1]));
                        totalStakedToken1 = totalStakedToken1.add(sumBigNumberArray(result[2]));

                        OWNEDtOKEN1 = OWNEDtOKEN1.concat(result[1]);
                        OWNEDtOKEN2 = OWNEDtOKEN2.concat(result[2]);
                        liquidity = liquidity.concat(result[3]);
                        timeStakedAT1 = timeStakedAT1.concat(result[4]);
                        PenaltyForWithdraw = PenaltyForWithdraw.concat(result[5]);
                        PoolKeyCurrency0 = PoolKeyCurrency0.concat(result[6]);
                        PoolKeyCurrency1 = PoolKeyCurrency1.concat(result[7]);
                        poolInfoi = poolInfoi.concat(result[8]);
                        console.log("lastSpotTosetStartSearchAt:  ", result[9].toString());
                        if (lastSpotTosetStartSearchAt == -1) {
                            console.log("lastSpotTosetStartSearchAt:  ", result[9].toString());
                            lastSpotTosetStartSearchAt = result[9]
                        }

                    }
                    console.log("RUNNING updateStakingValues");
                    updateStakingStats();

                    var tokenASymbol = getSymbolFromAddress(PoolKeyCurrency0[0]);
                    var decimalsTokenA = tokenAddressesDecimals[tokenASymbol];
                    var tokenBSymbol = getSymbolFromAddress(PoolKeyCurrency1[0]);
                    var decimalsTokenB = tokenAddressesDecimals[tokenBSymbol]; // Fixed: was tokenASymbol

                    // Format the BigNumbers to human-readable units
                    var formattedTokenA = ethers.utils.formatUnits(totalStakedToken0, decimalsTokenA);
                    var formattedTokenB = ethers.utils.formatUnits(totalStakedToken1, decimalsTokenB);

                    // Optional: Apply toFixed for consistent decimal places
                    var formattedTokenAWithDecimals = parseFloat(formattedTokenA).toFixed(6);
                    var formattedTokenBWithDecimals = parseFloat(formattedTokenB).toFixed(6);

                    updateStakingValues([formattedTokenAWithDecimals, formattedTokenBWithDecimals], APYFINAL.toFixed(2));




                    /*
        
                    console.log("Calling getIDSofStakedTokensForUserwithMinimum of tokenPositionFinderPro");
                    console.log("Calling minStaking : ",minStaking);
                            // Call the view function
                            // Call the view function
                            const result = await tokenPositionFinderPro.getIDSofStakedTokensForUserwithMinimum(userAddress, tokenAddress, Address_ZEROXBTC_TESTNETCONTRACT, HookAddress, minStaking);
        
                                    
                    // result is already the array of token IDs
                    const ownedTokenIdsOFSwapperOnStaked = result[0]; // This is uint256[] - array of token IDs
                    var OWNEDtOKEN1 = result[1];
                    var OWNEDtOKEN2 = result[2];
                    var liquidity = result[3];
                    var timeStakedAT1 = result[4];
                    var PenaltyForWithdraw = result[5];
                    var poolKeyi = result[6];
                    var  poolInfoi = result[7];*/

                    console.log("Called getIDSofStakedTokensForUserwithMinimum of tokenPositionFinderPro");
                    console.log("Number of tokens owned By user in the Staking Contract:", ownedTokenIdsOFSwapperOnStaked.length);
                    console.log("NFTs Owned by User in Staking ContraT:", ownedTokenIdsOFSwapperOnStaked.map(id => id.toString()));



                    if (lastSpotTosetStartSearchAt != -1) {
                        console.log("Found valid count to search at!!! SPOT TO START AT: ", lastSpotTosetStartSearchAt - 1)

                        WhereToStartSearchStaked = lastSpotTosetStartSearchAt - 1;
                        if (WhereToStartSearchStaked < 0) {
                            WhereToStartSearchStaked = 0;
                        }
                    }


                    // Now loop through each token ID to get position details
                    for (let i = 0; i < ownedTokenIdsOFSwapperOnStaked.length; i++) {
                        const tokenId = ownedTokenIdsOFSwapperOnStaked[i];
                        info2 = poolInfoi[i];


                        try {
                            console.log("START COUNT SEARCH AT: ", WhereToStartSearchStaked.toString());
                            console.log(`Token ID ${tokenId.toString()}:`);
                            console.log(" Pool Key:");
                            console.log("   Currency0:", PoolKeyCurrency0[i]);     // Now properly typed as address
                            console.log("   Currency1:", PoolKeyCurrency1[i]);     // Now properly typed as address
                            console.log(" Time Staked AT:", timeStakedAT1[i].toString());
                            console.log(" Position Info (packed):", info2.toString());

                            //just add function decodePositionInfo(packedInfo) { and return the decodedInfo if u want standalone function



                            const decodedInfo = {
                                tickLower: TOtickLower(info2.toString()),
                                tickUpper: TOtickUpper(info2.toString())
                            };
                            var idNameID = `stake_position_` + tokenId.toString();
                            console.log("   id:", idNameID);



                            console.log(" Decoded Position Info:");
                            console.log("   Tick Lower:", decodedInfo.tickLower);
                            console.log("   Tick Upper:", decodedInfo.tickUpper);
                            console.log("   Liquidity:", liquidity[i].toString());
                            console.log("   tOKEN 1 AMOUNT Staked:", OWNEDtOKEN1[i].toString());
                            console.log("   tOKEN 2 AMOUNT Staked:", OWNEDtOKEN2[i].toString());
                            console.log(" Time Staked AT:", timeStakedAT1[i].toString());
                            const timetotal = currentTimeInSeconds - Number(timeStakedAT1[i]);
                            console.log(" total staked position time", timetotal.toString());
                            console.log("Penalty for withdraw = ", PenaltyForWithdraw[i]);
                            console.log("Penalty withdraw % = ", (PenaltyForWithdraw[i] / 1000 * 100), " %");

                            var tokenASymbol = getSymbolFromAddress(PoolKeyCurrency0[i]);
                            var tokenBSymbol = getSymbolFromAddress(PoolKeyCurrency1[i]);

                            var tokenAIcon = tokenASymbol ? tokenASymbol[0] : "?"
                            var tokenBIcon = tokenBSymbol ? tokenBSymbol[0] : "?"

                            console.log("   Token A Symbol :", tokenASymbol);
                            console.log("   Token B Symbol :", tokenBSymbol);
                            console.log("   tokenAIcon:", tokenAIcon);

                            console.log("   tokenBIcon:", tokenBIcon);

                            var poolNamepool = tokenASymbol + "/" + tokenBSymbol;
                            console.log("   pool:", poolNamepool);

                            var decimalsTokenA = tokenAddressesDecimals[tokenASymbol];
                            var decimalsTokenB = tokenAddressesDecimals[tokenBSymbol];

                            var formattedToken1 = ethers.utils.formatUnits(OWNEDtOKEN1[i], decimalsTokenA);
                            var formattedToken2 = ethers.utils.formatUnits(OWNEDtOKEN2[i], decimalsTokenB);


                            var penaltyWithdrawString = (PenaltyForWithdraw[i] / 1000 * 100) + "%"
                            // Add the new position to positionData
                            stakingPositionData[idNameID] = {
                                id: idNameID,
                                pool: poolNamepool,
                                feeTier: "Dynamic Fee",
                                tokenA: tokenASymbol,
                                tokenB: tokenBSymbol,
                                currentLiquidity: parseFloat(liquidity[i].toString()),
                                currentTokenA: formattedToken1,
                                currentTokenB: formattedToken2,
                                tokenAIcon: tokenAIcon,
                                tokenBIcon: tokenBIcon,
                                apy: APYFINAL.toFixed(2) + "%",
                                PenaltyForWithdraw: penaltyWithdrawString,

                            };















                        } catch (error) {
                            console.error(`Error findUserTokenIds:`, error);
                        }
                        console.log("DONE FINDINGI USER IDS and Stakeded IDs in getTokenIDsOwnedByUser");
                    }




                    await loadPositionsIntoDappSelections();























/*USE OUR THING NOW*/



/*USE OUR THING NOW*/



/*USE OUR THING NOW*/
try{

    const positionFinderABI2 = [
    {
        "inputs": [
            {
                "name": "user",
                "type": "address"
            },
            {
                "name": "tokenIds",
                "type": "uint256[]"
            },
            {
                "name": "Token0",
                "type": "address"
            },
            {
                "name": "Token1",
                "type": "address"
            },
            {
                "name": "HookAddress",
                "type": "address"
            },
            {
                "name": "minTokenA",
                "type": "uint256"
            }
        ],
        "name": "findUserTokenIdswithMinimumIndividual",
        "outputs": [
            {
                "name": "ownedTokens",
                "type": "uint256[]"
            },
            {
                "name": "amountTokenA",
                "type": "uint256[]"
            },
            {
                "name": "amountTokenB",
                "type": "uint256[]"
            },
            {
                "name": "positionLiquidity",
                "type": "uint128[]"
            },
            {
                "name": "feesOwedTokenA",
                "type": "int128[]"
            },
            {
                "name": "feesOwedTokenB",
                "type": "int128[]"
            },
            {
                "name": "poolKeyz",
                "type": "tuple[]",
                "components": [
                    {
                        "name": "currency0",
                        "type": "address"
                    },
                    {
                        "name": "currency1",
                        "type": "address"
                    },
                    {
                        "name": "fee",
                        "type": "uint24"
                    },
                    {
                        "name": "tickSpacing",
                        "type": "int24"
                    },
                    {
                        "name": "hooks",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "poolInfo",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

  // temp contract that we used  const contractAddress = "0x258404C795E969cFB831166163E064005e5Fa65C";
// Now you can use it like this:
tokenPositionFinderPro2 = new ethers.Contract(
    contractAddress_PositionFinderPro,
    positionFinderABI2,
    signer
);


    while (WeAreSearchingLogsRightNow){
        console.log("Before sleep:", Date.now());
await sleep(1000);
console.log("After sleep:", Date.now());
        console.log("SearchingLogsRightNowCantUpdateJustYet");
    }

    
// Debug version with logging
const userTokenIds = [];
console.log(`\nDebugging NFT search for user: ${userAddress}`);
console.log(`Total NFT owners in dataset: ${Object.keys(nftOwners).length}`);

// Show first few entries for inspection
const entries = Object.entries(nftOwners).slice(0, 5);
console.log("Sample nftOwners entries:", entries);

let matchCount = 0;
for (const [tokenId, owner] of Object.entries(nftOwners)) {
    // Debug each comparison
    const ownerLower = owner.toLowerCase();
    const userLower = userAddress.toLowerCase();
    
    if (ownerLower === userLower) {
        matchCount++;
        console.log(`✓ Match found: Token ${tokenId} owned by ${owner}`);
        userTokenIds.push(parseInt(tokenId));
    }
}

console.log(`Total matches found: ${matchCount}`);
console.log(`User tokens array:`, userTokenIds);
    if (userTokenIds.length === 0) {
        console.log(`No NFTs found for user ${userAddress}`);

                    await loadPositionsIntoDappSelections();


                    hideLoadingWidget();

        return null;
    }
    
    console.log(`Found ${userTokenIds.length} NFTs for user ${userAddress}`);
    
    // Initialize result arrays
    let ownedTokenIds = [];
    let OWNEDtOKEN1 = [];
    let OWNEDtOKEN2 = [];
    let liquidity = [];
    let feesOwedToken1 = [];
    let feesOwedToken2 = [];
    let poolKeyi = [];
    let poolInfoi = [];
    
    // Process in batches of 500
    const batchSize = 500;
    for (let i = 0; i < userTokenIds.length; i += batchSize) {
        const batch = userTokenIds.slice(i, i + batchSize);
        console.log(`Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(userTokenIds.length/batchSize)} (${batch.length} tokens)`);
        
        try {
            const result = await tokenPositionFinderPro2.findUserTokenIdswithMinimumIndividual(
                userAddress,
                batch,
                CONFIG.TARGET_POOL_KEY.currency0,
                CONFIG.TARGET_POOL_KEY.currency1,
                CONFIG.TARGET_POOL_KEY.hooks,
                0 // minTokenA
            );
            
            if (result) {
                // Concatenate results
                ownedTokenIds = result[0].concat(ownedTokenIds);
                OWNEDtOKEN1 = result[1].concat(OWNEDtOKEN1);
                OWNEDtOKEN2 = result[2].concat(OWNEDtOKEN2);
                liquidity = result[3].concat(liquidity);
                feesOwedToken1 = result[4].concat(feesOwedToken1);
                feesOwedToken2 = result[5].concat(feesOwedToken2);
                poolKeyi = result[6].concat(poolKeyi);
                poolInfoi = result[7].concat(poolInfoi);
            }
        } catch(e){
            console.log("Search error e",e);
        }
    }
        try{


                        console.log("Number of tokens user owns that fit criteria for staking:", ownedTokenIds.length);
                        console.log("NFTs owned by user :", ownedTokenIds.map(id => id.toString()));

                        // Now loop through each token ID to get position details
                        for (let i = 0; i < ownedTokenIds.length; i++) {
                            const tokenId = ownedTokenIds[i];
                            if (tokenId > WhereToStartSearch) {
                                WhereToSTartSearch = parseInt(tokenId.toString());
                            }
                            try {
                                // Get pool and position info using V4 method with corrected types
                                // const [poolKey, info2] = await positionManager.getPoolAndPositionInfo(tokenId);
                                poolKey = poolKeyi[i];
                                info2 = poolInfoi[i];
                                console.log(`Token ID ${tokenId.toString()}:`);
                                console.log(" Pool Key:");
                                console.log("   Currency0:", poolKey.currency0);     // Now properly typed as address
                                console.log("   Currency1:", poolKey.currency1);     // Now properly typed as address
                                console.log("   Fee:", poolKey.fee.toString());
                                console.log("   Tick Spacing:", poolKey.tickSpacing.toString());
                                console.log("   Hooks:", poolKey.hooks);             // Now properly typed as address
                                console.log(" Position Info (packed):", info2.toString());



                                const decodedInfo = {
                                    tickLower: TOtickLower(info2.toString()),
                                    tickUpper: TOtickUpper(info2.toString())
                                };

                                var feeVariable = (parseInt(poolKey.fee.toString()) / 10000).toFixed(2) + "%";
                                if ("8388608" == poolKey.fee.toString()) {
                                    feeVariable = "Dynamic Fee";

                                }
                                console.log("   Fee:", poolKey.fee.toString());
                                console.log(" Decoded Position Info:");
                                console.log("   Tick Lower:", decodedInfo.tickLower);
                                console.log("   Tick Upper:", decodedInfo.tickUpper);
                                console.log("   tOKEN 1 AMOUNT:", OWNEDtOKEN1[i].toString(), " address: ", poolKey.currency0);
                                console.log("   tOKEN 2 AMOUNT:", OWNEDtOKEN2[i].toString(), " address: ", poolKey.currency1);
                                console.log("   Liquidity:", liquidity[i].toString());
                                console.log("   FEES OWED Token 1 AMOUNT:", feesOwedToken1[i].toString());
                                console.log("   FEES OWED Token 2 AMOUNT:", feesOwedToken2[i].toString());


                                var tokenASymbol = getSymbolFromAddress(poolKey.currency0);
                                var tokenBSymbol = getSymbolFromAddress(poolKey.currency1);

                                var tokenAIcon = tokenASymbol ? tokenASymbol[0] : "?"
                                var tokenBIcon = tokenBSymbol ? tokenBSymbol[0] : "?"

                                console.log("   Token A Symbol :", tokenASymbol);
                                console.log("   Token B Symbol :", tokenBSymbol);
                                console.log("   tokenAIcon:", tokenAIcon);

                                console.log("   tokenBIcon:", tokenBIcon);

                                var poolNamepool = tokenASymbol + "/" + tokenBSymbol;
                                console.log("   pool:", poolNamepool);
                                var idNameID = `position_` + tokenId.toString();
                                console.log("   id:", idNameID);

                                var decimalsTokenA = tokenAddressesDecimals[tokenASymbol];
                                var decimalsTokenB = tokenAddressesDecimals[tokenBSymbol];

                                console.log("   decimalsTokenA:", decimalsTokenA);
                                console.log("   decimalsTokenB:", decimalsTokenB);
                                var formattedToken1 = ethers.utils.formatUnits(OWNEDtOKEN1[i], decimalsTokenA);
                                var formattedToken2 = ethers.utils.formatUnits(OWNEDtOKEN2[i], decimalsTokenB);
                                console.log("   formattedToken1:", formattedToken1);
                                console.log("   formattedToken2:", formattedToken2);
                                var formattedToken1FEESOWED = ethers.utils.formatUnits(feesOwedToken1[i], decimalsTokenA);
                                var formattedToken2FEESOWED = ethers.utils.formatUnits(feesOwedToken2[i], decimalsTokenB);
                                console.log("   ")


                                if (decodedInfo.tickUpper == 887220 && decodedInfo.tickLower == -887220) {
                                    console.log("Valid position entering it into positionData");
                                    // Add the new position to positionData
                                    positionData[idNameID] = {
                                        id: idNameID,
                                        pool: poolNamepool,
                                        feeTier: feeVariable,
                                        tokenA: tokenASymbol,
                                        tokenB: tokenBSymbol,
                                        currentLiquidity: parseFloat(liquidity[i].toString()),
                                        currentTokenA: formattedToken1,
                                        currentTokenB: formattedToken2,
                                        unclaimedFeesTokenA: formattedToken1FEESOWED,
                                        unclaimedFeesTokenB: formattedToken2FEESOWED,
                                        tokenAIcon: tokenAIcon,
                                        tokenBIcon: tokenBIcon
                                    };
                                } else {
                                    console.log("Ticks outside of acceptable range for staking not included is this ID in our interface, sorry it doesnt work");
                                }


                            } catch (positionError) {
                                console.error(`Error getting position details for token ${tokenId}:`, positionError);
                            }

                        }
                    
                    }catch(e){
                        console.log("Error E: ",e);
                    }
                 }catch(e){
                        console.log("Error E: ",e);
                    }
            
            

/*USE OUR THING NOW*/




                    console.log("getting getMaxUniswapIDPossible!");
                    var MAXTOKENPOSSIBLE = 0;
                    var maxTokenPossible = 0;

                    /*
                    try {


                        showLoadingWidget('Loading all positions from Uniswap');
                        updateLoadingStatusWidget('Loading All Positions for user:' + ADDRESSTOSEARCHOF);
                        await new Promise(resolve => setTimeout(resolve, 1000));



                        // Call the view function
                        const result = await tokenPositionFinderPro.getMaxUniswapIDPossible();



                        // First debug what we're getting back
                        console.log("Raw result type:", typeof result);
                        console.log("Raw result structure:", Object.keys(result).join(", "));

                        if (typeof result === 'bigint' || typeof result === 'number') {
                            // If it's already a primitive value
                            MAXTOKENPOSSIBLE = result;
                        } else if (result._isBigNumber || result instanceof ethers.BigNumber) {
                            // For ethers v5 BigNumber
                            MAXTOKENPOSSIBLE = result;
                        } else if (typeof result === 'object' && result !== null) {
                            // For objects, try to extract the value
                            // With ethers v6, we might get the value directly
                            if (typeof result.toString === 'function' && result.toString().match(/^[0-9]+$/)) {
                                MAXTOKENPOSSIBLE = result;
                            } else {
                                // Attempt to extract value based on common patterns
                                MAXTOKENPOSSIBLE = result[0] || result.amountOut || result._hex || result.value || result;
                            }
                        }

                        console.log(`Found valid Uniswap v4 MAXTOKEN POSSIBLE: ${MAXTOKENPOSSIBLE.toString()}`);

                        // CONVERT TO REGULAR NUMBER FOR LOOP
                        if (typeof MAXTOKENPOSSIBLE === 'bigint') {
                            maxTokenPossible = Number(MAXTOKENPOSSIBLE);
                        } else if (MAXTOKENPOSSIBLE._isBigNumber || MAXTOKENPOSSIBLE instanceof ethers.BigNumber) {
                            // For ethers v5
                            maxTokenPossible = MAXTOKENPOSSIBLE.toNumber();
                        } else if (typeof MAXTOKENPOSSIBLE.toString === 'function') {
                            // For ethers v6 or other BigInt-like objects
                            maxTokenPossible = Number(MAXTOKENPOSSIBLE.toString());
                        } else {
                            maxTokenPossible = Number(MAXTOKENPOSSIBLE);
                        }

                        console.log(`Converted to number for loop: ${maxTokenPossible}`);
                    } catch (error) {
                        console.error(`Error finding valid getMaxUniswapIDPossible for swap:`, error);
                    }


            */
/*
                    try {
                        const maxLoopLookups = 30;
                        console.log("THIS333: WhereToStartSearch", WhereToStartSearch);
                        var startSearchAt = maxTokenPossible; // Start searching from highest token ID
                        var endSearchAt = WhereToStartSearch; // End searching at this token ID
                        const totalRange = startSearchAt - endSearchAt; // Range from maxTokenPossible down to WhereToStartSearch
                        const NumberOfLoops = Math.ceil(totalRange / maxLoopLookups);
                        // Initialize as empty arrays (not undefined)
                        let ownedTokenIds = [];
                        let OWNEDtOKEN1 = [];
                        let OWNEDtOKEN2 = [];
                        let liquidity = [];
                        let feesOwedToken1 = [];
                        let feesOwedToken2 = [];
                        let poolKeyi = [];
                        let poolInfoi = [];
                        var endIdz = endSearchAt;


                        for (let x = 0; x < NumberOfLoops; x++) {
                            if(ADDRESSTOSEARCHOF != userAddress){

                                return;
                            }
                            // Calculate startId and endId for high-to-low search
                            const endId = Math.max(startSearchAt - (maxLoopLookups * x), endSearchAt);
                            const startId = Math.max(endId - maxLoopLookups + 1, endSearchAt);
                            endIdz = startId;

                            console.log("1111Looking at NFT ids in this search IDS:", startId, "to", endId);

                            updateLoadingStatusWidget('Loading All Positions for user:' + ADDRESSTOSEARCHOF + " Loop #:" + x + " MaxLoop #: " + NumberOfLoops);
                            setLoadingProgress(Math.floor((x + 1) / (NumberOfLoops) * 100));

                            const result = await tokenPositionFinderPro.findUserTokenIdswithMinimum(
                                ADDRESSTOSEARCHOF,
                                startId,
                                endId,
                                tokenAddress,
                                Address_ZEROXBTC_TESTNETCONTRACT,
                                HookAddress,
                                minUserHoldings
                            );

                            console.log("result: ", result);

                            // Concatenate arrays properly using spread operator or concat
                            ownedTokenIds = result[0].concat(ownedTokenIds);
                            OWNEDtOKEN1 = result[1].concat(OWNEDtOKEN1);
                            OWNEDtOKEN2 = result[2].concat(OWNEDtOKEN2);
                            liquidity = result[3].concat(liquidity);
                            feesOwedToken1 = result[4].concat(feesOwedToken1);
                            feesOwedToken2 = result[5].concat(feesOwedToken2);
                            poolKeyi = result[6].concat(poolKeyi);
                            poolInfoi = result[7].concat(poolInfoi);



                            if (x % 30 == 0) {



                                // Now loop through each token ID to get position details
                                for (let i = 0; i < ownedTokenIds.length; i++) {
                                    const tokenId = ownedTokenIds[i];
                                    if (i == 0) {

                                        console.log("THIS4444: WhereToStartSearch", WhereToStartSearch);
                                        console.log("ownedTokenIds[0]: ", ownedTokenIds[0]);

                                        WhereToStartSearch = parseInt(ownedTokenIds[0].toString())

                                        console.log("THIS5555: WhereToStartSearch", WhereToStartSearch);
                                    }
                                    try {
                                        // Get pool and position info using V4 method with corrected types
                                        // const [poolKey, info2] = await positionManager.getPoolAndPositionInfo(tokenId);
                                        poolKey = poolKeyi[i];
                                        info2 = poolInfoi[i];
                                        console.log(`Token ID ${tokenId.toString()}:`);
                                        console.log(" Pool Key:");
                                        console.log("   Currency0:", poolKey.currency0);     // Now properly typed as address
                                        console.log("   Currency1:", poolKey.currency1);     // Now properly typed as address
                                        console.log("   Fee:", poolKey.fee.toString());
                                        console.log("   Tick Spacing:", poolKey.tickSpacing.toString());
                                        console.log("   Hooks:", poolKey.hooks);             // Now properly typed as address
                                        console.log(" Position Info (packed):", info2.toString());



                                        const decodedInfo = {
                                            tickLower: TOtickLower(info2.toString()),
                                            tickUpper: TOtickUpper(info2.toString())
                                        };

                                        var feeVariable = (parseInt(poolKey.fee.toString()) / 10000).toFixed(2) + "%";
                                        if ("8388608" == poolKey.fee.toString()) {
                                            feeVariable = "Dynamic Fee";

                                        }
                                        console.log("   Fee:", poolKey.fee.toString());
                                        console.log(" Decoded Position Info:");
                                        console.log("   Tick Lower:", decodedInfo.tickLower);
                                        console.log("   Tick Upper:", decodedInfo.tickUpper);
                                        console.log("   tOKEN 1 AMOUNT:", OWNEDtOKEN1[i].toString(), " address: ", poolKey.currency0);
                                        console.log("   tOKEN 2 AMOUNT:", OWNEDtOKEN2[i].toString(), " address: ", poolKey.currency1);
                                        console.log("   Liquidity:", liquidity[i].toString());
                                        console.log("   FEES OWED Token 1 AMOUNT:", feesOwedToken1[i].toString());
                                        console.log("   FEES OWED Token 2 AMOUNT:", feesOwedToken2[i].toString());


                                        var tokenASymbol = getSymbolFromAddress(poolKey.currency0);
                                        var tokenBSymbol = getSymbolFromAddress(poolKey.currency1);

                                        var tokenAIcon = tokenASymbol ? tokenASymbol[0] : "?"
                                        var tokenBIcon = tokenBSymbol ? tokenBSymbol[0] : "?"

                                        console.log("   Token A Symbol :", tokenASymbol);
                                        console.log("   Token B Symbol :", tokenBSymbol);
                                        console.log("   tokenAIcon:", tokenAIcon);

                                        console.log("   tokenBIcon:", tokenBIcon);

                                        var poolNamepool = tokenASymbol + "/" + tokenBSymbol;
                                        console.log("   pool:", poolNamepool);
                                        var idNameID = `position_` + tokenId.toString();
                                        console.log("   id:", idNameID);

                                        var decimalsTokenA = tokenAddressesDecimals[tokenASymbol];
                                        var decimalsTokenB = tokenAddressesDecimals[tokenBSymbol];

                                        console.log("   decimalsTokenA:", decimalsTokenA);
                                        console.log("   decimalsTokenB:", decimalsTokenB);
                                        var formattedToken1 = ethers.utils.formatUnits(OWNEDtOKEN1[i], decimalsTokenA);
                                        var formattedToken2 = ethers.utils.formatUnits(OWNEDtOKEN2[i], decimalsTokenB);
                                        console.log("   formattedToken1:", formattedToken1);
                                        console.log("   formattedToken2:", formattedToken2);
                                        var formattedToken1FEESOWED = ethers.utils.formatUnits(feesOwedToken1[i], decimalsTokenA);
                                        var formattedToken2FEESOWED = ethers.utils.formatUnits(feesOwedToken2[i], decimalsTokenB);
                                        console.log("   ")


                                        if (decodedInfo.tickUpper == 887220 && decodedInfo.tickLower == -887220) {
                                            console.log("Valid position entering it into positionData");
                                            // Add the new position to positionData
                            if(ADDRESSTOSEARCHOF != userAddress){

                                return;
                            }
                                            positionData[idNameID] = {
                                                id: idNameID,
                                                pool: poolNamepool,
                                                feeTier: feeVariable,
                                                tokenA: tokenASymbol,
                                                tokenB: tokenBSymbol,
                                                currentLiquidity: parseFloat(liquidity[i].toString()),
                                                currentTokenA: formattedToken1,
                                                currentTokenB: formattedToken2,
                                                unclaimedFeesTokenA: formattedToken1FEESOWED,
                                                unclaimedFeesTokenB: formattedToken2FEESOWED,
                                                tokenAIcon: tokenAIcon,
                                                tokenBIcon: tokenBIcon
                                            };
                                        } else {
                                            console.log("Ticks outside of acceptable range for staking not included is this ID in our interface, sorry it doesnt work");
                                        }


                                    } catch (e) {
                                        console.error(`Error tokenIDsOwnedByUser :`, e);
                                    }
                                    console.log("THinker");
                                    await loadPositionsIntoDappSelections();
                                }


































                            }
                        }




                            if(ADDRESSTOSEARCHOF != userAddress){

                                return;
                            }

                        WhereToStartSearch = -1;
                        console.log("Number of tokens user owns that fit criteria for staking:", ownedTokenIds.length);
                        console.log("NFTs owned by user :", ownedTokenIds.map(id => id.toString()));

                        // Now loop through each token ID to get position details
                        for (let i = 0; i < ownedTokenIds.length; i++) {
                            const tokenId = ownedTokenIds[i];
                            if (tokenId > WhereToStartSearch) {
                                WhereToSTartSearch = parseInt(tokenId.toString());
                            }
                            try {
                                // Get pool and position info using V4 method with corrected types
                                // const [poolKey, info2] = await positionManager.getPoolAndPositionInfo(tokenId);
                                poolKey = poolKeyi[i];
                                info2 = poolInfoi[i];
                                console.log(`Token ID ${tokenId.toString()}:`);
                                console.log(" Pool Key:");
                                console.log("   Currency0:", poolKey.currency0);     // Now properly typed as address
                                console.log("   Currency1:", poolKey.currency1);     // Now properly typed as address
                                console.log("   Fee:", poolKey.fee.toString());
                                console.log("   Tick Spacing:", poolKey.tickSpacing.toString());
                                console.log("   Hooks:", poolKey.hooks);             // Now properly typed as address
                                console.log(" Position Info (packed):", info2.toString());



                                const decodedInfo = {
                                    tickLower: TOtickLower(info2.toString()),
                                    tickUpper: TOtickUpper(info2.toString())
                                };

                                var feeVariable = (parseInt(poolKey.fee.toString()) / 10000).toFixed(2) + "%";
                                if ("8388608" == poolKey.fee.toString()) {
                                    feeVariable = "Dynamic Fee";

                                }
                                console.log("   Fee:", poolKey.fee.toString());
                                console.log(" Decoded Position Info:");
                                console.log("   Tick Lower:", decodedInfo.tickLower);
                                console.log("   Tick Upper:", decodedInfo.tickUpper);
                                console.log("   tOKEN 1 AMOUNT:", OWNEDtOKEN1[i].toString(), " address: ", poolKey.currency0);
                                console.log("   tOKEN 2 AMOUNT:", OWNEDtOKEN2[i].toString(), " address: ", poolKey.currency1);
                                console.log("   Liquidity:", liquidity[i].toString());
                                console.log("   FEES OWED Token 1 AMOUNT:", feesOwedToken1[i].toString());
                                console.log("   FEES OWED Token 2 AMOUNT:", feesOwedToken2[i].toString());


                                var tokenASymbol = getSymbolFromAddress(poolKey.currency0);
                                var tokenBSymbol = getSymbolFromAddress(poolKey.currency1);

                                var tokenAIcon = tokenASymbol ? tokenASymbol[0] : "?"
                                var tokenBIcon = tokenBSymbol ? tokenBSymbol[0] : "?"

                                console.log("   Token A Symbol :", tokenASymbol);
                                console.log("   Token B Symbol :", tokenBSymbol);
                                console.log("   tokenAIcon:", tokenAIcon);

                                console.log("   tokenBIcon:", tokenBIcon);

                                var poolNamepool = tokenASymbol + "/" + tokenBSymbol;
                                console.log("   pool:", poolNamepool);
                                var idNameID = `position_` + tokenId.toString();
                                console.log("   id:", idNameID);

                                var decimalsTokenA = tokenAddressesDecimals[tokenASymbol];
                                var decimalsTokenB = tokenAddressesDecimals[tokenBSymbol];

                                console.log("   decimalsTokenA:", decimalsTokenA);
                                console.log("   decimalsTokenB:", decimalsTokenB);
                                var formattedToken1 = ethers.utils.formatUnits(OWNEDtOKEN1[i], decimalsTokenA);
                                var formattedToken2 = ethers.utils.formatUnits(OWNEDtOKEN2[i], decimalsTokenB);
                                console.log("   formattedToken1:", formattedToken1);
                                console.log("   formattedToken2:", formattedToken2);
                                var formattedToken1FEESOWED = ethers.utils.formatUnits(feesOwedToken1[i], decimalsTokenA);
                                var formattedToken2FEESOWED = ethers.utils.formatUnits(feesOwedToken2[i], decimalsTokenB);
                                console.log("   ")


                                if (decodedInfo.tickUpper == 887220 && decodedInfo.tickLower == -887220) {
                                    console.log("Valid position entering it into positionData");
                                    // Add the new position to positionData
                                    positionData[idNameID] = {
                                        id: idNameID,
                                        pool: poolNamepool,
                                        feeTier: feeVariable,
                                        tokenA: tokenASymbol,
                                        tokenB: tokenBSymbol,
                                        currentLiquidity: parseFloat(liquidity[i].toString()),
                                        currentTokenA: formattedToken1,
                                        currentTokenB: formattedToken2,
                                        unclaimedFeesTokenA: formattedToken1FEESOWED,
                                        unclaimedFeesTokenB: formattedToken2FEESOWED,
                                        tokenAIcon: tokenAIcon,
                                        tokenBIcon: tokenBIcon
                                    };
                                } else {
                                    console.log("Ticks outside of acceptable range for staking not included is this ID in our interface, sorry it doesnt work");
                                }


                            } catch (positionError) {
                                console.error(`Error getting position details for token ${tokenId}:`, positionError);
                            }

                        }
                        if (WhereToStartSearch == -1) {
                            WhereToStartSearch = startSearchAt - 1;
                        }

                        if (WhereToStartSearch < 0) {
                            WhereToStartSearch = 0;
                        }

                        console.log("THISffff: WhereToStartSearch", WhereToStartSearch);



                        console.log("Calling getIDSofStakedTokensForUser of tokenAddress_Swapper");
                        console.log("positionData:zzzz: ", positionData);





                    } catch (e) {
                        console.error(`Error getting globalTokenIDS by user: `, e);
                    }



*/






                    await loadPositionsIntoDappSelections();


                    hideLoadingWidget();
                    console.log("Called loadPositionsIntoDappSelections after getTokenIDsOwnedByUser");

}





                async function throttledGetSqrtRtAndPriceRatio(NameOfFunction = "General") {
                    const now = Date.now();

                    if (now - lastCallTime < THROTTLE_DELAY) {
                        console.log(`Function throttled. Please wait ${Math.ceil((THROTTLE_DELAY - (now - lastCallTime)) / 1000)} more seconds.`);
                        return null; // or return cached result if you have one
                    }

                    lastCallTime = now;
                    return await getSqrtRtAndPriceRatio(NameOfFunction);
                }




                async function getRatioCreatePositiontokenB() {
                    if (!walletConnected) {
                        await connectWallet();
                    }

                    // Get input elements first
                    const createInputs = document.querySelectorAll('#create input[type="number"]');
                    const amountInputA = createInputs[0]; // First number input (Amount A)
                    const amountInputB = createInputs[1]; // Second number input (Amount B)


                    // Add null checks to prevent errors
                    if (!amountInputA || !amountInputB) {
                        console.error("Could not find amount input fields");
                        return;
                    }

                    const tokenASelect = document.querySelector('#create .form-group:nth-child(1) select');
                    const tokenAValue = tokenASelect.value;
                    console.log("Currently selected value TokenA:", tokenAValue);

                    const tokenBSelect = document.querySelector('#create .form-group:nth-child(2) select');
                    const tokenBvalue = tokenBSelect.value;
                    console.log("Currently selected value TokenB:", tokenBvalue);

                    const selectedOptionA = tokenASelect.options[tokenASelect.selectedIndex];
                    const selectedOptionB = tokenBSelect.options[tokenBSelect.selectedIndex];

                    var tokenAinputAddress = tokenAddresses[selectedOptionA.value];
                    var tokenBinputAddress = tokenAddresses[selectedOptionB.value];

                    // Get the currently selected values
                    const tokenAInput = amountInputA.value;
                    const tokenBInput = amountInputB.value;

                    console.log("Currently amountInputA value:", tokenAInput);
                    console.log("Currently amountInputB value:", tokenBInput);

                    // Parse tokenB input (since this function is triggered by tokenB changes)
                    var amountBtoCreate = ethers.utils.parseUnits(tokenBInput, selectedOptionB.value === "0xBTC" ? 8 : 18);

                    await throttledGetSqrtRtAndPriceRatio();

                    let amountToDeposit, amountWith8Decimals0xBTC;


                    /*
        
                            if(tokenAinputAddress == Address_ZEROXBTC_TESTNETCONTRACT) {
                                console.log(`Found valid Ratio: ${ratioz.toString()}`);
                                console.log("TokenA == zer0x Token (0xBTC is token0, B0x is token1)");
                                calculatedPriceRatio = BigInt(ratioz);
                                amountWith8Decimals0xBTC = amountAtoCreate;
                                console.log("amountWith8Decimals0xBTCamountWith8Decimals0xBTC: ",amountWith8Decimals0xBTC.toString());
                                    
                                var priceIn18Decimals = 0n;
                                if(BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) > BigInt(tokenAddresses['B0x'].toLowerCase())){
                                        // INVERTED: Use division instead of multiplication
                                        priceIn18Decimals = (10n**36n) / (calculatedPriceRatio * (10n**10n)); // Invert the ratio
                                    } else {
                                        // INVERTED: Use division instead of multiplication  
                                        priceIn18Decimals = (10n**36n) / (calculatedPriceRatio / (10n**10n)); // Invert the ratio
                                    }
                                    console.log("Price in 18-decimal format:", priceIn18Decimals.toString());
                                    
                                    const amountZer0XIn18Decimals = BigInt(amountAtoCreate) * 10n**10n; // Convert 8-decimal to 18-decimal
                                    amountToDeposit = (amountZer0XIn18Decimals * priceIn18Decimals) / (10n**18n);
                                    
                                    console.log(`Estimated Deposit B0x amount: ${ethers.utils.formatEther(amountToDeposit)}`);
                                    console.log(`Estimated Deposit 0xBTC amount: ${ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8)}`);
                                    console.log(`amountWith8Decimals0xBTC: ${amountWith8Decimals0xBTC}`);
                                    console.log(`amountToDeposit: ${amountToDeposit}`);
                        } else { 
                                                // Start with b0x amount (this could be user input or calculated value)
                            var amountB0x = BigInt(amountAtoCreate); // Your b0x input
                            console.log("Amount B0x input: ", amountB0x.toString());
                            const priceRatio2 = BigInt(ratioz);
                            console.log(`priceRatio: ${priceRatio2}`);
        
                            // Apply the same address comparison logic for ratio handling
                            var adjustedPriceRatio = 0n;
                            if(BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) > BigInt(tokenAddresses['B0x'].toLowerCase())){
                                adjustedPriceRatio = (10n**36n) / (priceRatio2 * (10n**10n)); // Invert the ratio
                            } else {
                                adjustedPriceRatio =(10n**36n) / (priceRatio2 / (10n**10n)); // Invert the ratio
                            }
                            console.log(`Adjusted Price ratio: ${adjustedPriceRatio}`);
        
                            // Calculate 0xBTC amount by DIVIDING B0x amount by price ratio
                            // Need to account for decimal differences: B0x is 18 decimals, 0xBTC is 8 decimals
                            amountAtoCreate = (amountB0x * (10n**18n)) / adjustedPriceRatio / (10n**10n); // Divide by 10^10 to convert from 18 to 8 decimals
        
                            var temp = amountB0x;
                            amountB0x = amountAtoCreate;
                            amountAtoCreate = temp;
        
                            console.log(`Estimated Deposit 0xBTC amount: ${amountB0x}`);
                            console.log(`Estimated Deposit B0x amount: ${amountAtoCreate}`);
                            console.log(`Estimated Deposit 0xBTC amount: ${ethers.utils.formatUnits(amountB0x, 8)}`);
                            console.log(`Estimated Deposit B0x amount: ${ethers.utils.formatEther(amountAtoCreate)}`);
                            amountToDeposit = amountAtoCreate;
                            amountWith8Decimals0xBTC = amountB0x;
        
                                    
                        }
        
                    */
                    if (tokenBinputAddress === Address_ZEROXBTC_TESTNETCONTRACT) {
                        console.log("TokenA is 0xBTC, calculating TokenB amount");
                        const calculatedPriceRatio = BigInt(ratioz);

                        const amountZer0XIn18Decimals = BigInt(amountBtoCreate) * 10n ** 10n;
                        amountWith8Decimals0xBTC = amountBtoCreate;

                        // Use the reverse of the B0x calculation logic
                        if (BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) < BigInt(tokenAddresses['B0x'].toLowerCase())) {
                            var priceIn18Decimals = calculatedPriceRatio / (10n ** 10n);
                            // 0xBTC < B0x: Use the inverse of what works for B0x → 0xBTC
                            amountToDeposit = (amountZer0XIn18Decimals * priceIn18Decimals) / (10n ** 18n);
                        } else {
                            console.log("DIS");
                            // 0xBTC > B0x: Use the inverse of what works for B0x → 0xBTC                     

                            amountToDeposit = (amountZer0XIn18Decimals * (10n ** 18n)) / (calculatedPriceRatio * 10n ** 10n);

                        }

                        console.log(`fTokenB (0xBTC) amount: ${ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8)}`);
                        console.log(`fCalculated TokenA (B0x) amount: ${ethers.utils.formatEther(amountToDeposit)}`);
                        console.log(`fTokenB (0xBTC) amount: ${ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8)}`);
                        console.log(`fCalculated TokenA (B0x) amount: ${ethers.utils.formatEther(amountToDeposit)}`);

                    } else {
                        // TokenB is B0x, calculate how much TokenA (0xBTC) is needed
                        console.log("TokenB is B0x, calculating TokenA amount");
                        const priceRatio = BigInt(ratioz);
                        amountToDeposit = amountBtoCreate;

                        // Check token ordering to determine calculation method
                        if (BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) < BigInt(tokenAddresses['B0x'].toLowerCase())) {
                            // 0xBTC < B0x: Use direct calculation
                            amountWith8Decimals0xBTC = (BigInt(amountBtoCreate) * (10n ** 18n)) / priceRatio;
                        } else {
                            // 0xBTC > B0x: Use inverted calculation
                            amountWith8Decimals0xBTC = (BigInt(amountBtoCreate) * priceRatio) / (10n ** 18n);
                        }

                        console.log(`TokenB (B0x) amount: ${ethers.utils.formatEther(amountToDeposit)}`);
                        console.log(`Calculated TokenA (0xBTC) amount: ${ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8)}`);
                    }


                    // Wallet balance checks
                    var zeroxbtcdecimal = amountWith8Decimals0xBTC.toString();
                    var wallet_zeroxbtc = ethers.utils.parseUnits(walletBalances['0xBTC'], 8).toString();

                    if (parseFloat(zeroxbtcdecimal) > parseFloat(wallet_zeroxbtc)) {
                        alert("Too much 0xBTC - you don't have enough, lower the amount!");
                        await getMaxCreatePosition();
                        return;
                    }

                    var b0xdecimal = amountToDeposit.toString();
                    var wallet_b0x = ethers.utils.parseUnits(walletBalances['B0x'], 18).toString();

                    if (parseFloat(b0xdecimal) > parseFloat(wallet_b0x)) {
                        alert("Too much B0x - you don't have enough, lower the amount!");
                        await getMaxCreatePosition();
                        return;
                    }

                    const amountToDepositBN = ethers.BigNumber.from(amountToDeposit.toString());
                    const amountToDepositBN2 = ethers.BigNumber.from(amountWith8Decimals0xBTC.toString());

                    try {
                        console.log("Updating TokenA input with calculated value");

                        // Update ONLY TokenA input (don't touch TokenB since user is typing in it)
                        if (tokenAinputAddress === Address_ZEROXBTC_TESTNETCONTRACT) {
                            // TokenA is 0xBTC
                            amountInputA.value = ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8);
                            amountInputB.value = ethers.utils.formatUnits(amountToDeposit, 18);
                        } else {
                            // TokenA is B0x
                            amountInputA.value = ethers.utils.formatUnits(amountToDeposit, 18);
                            amountInputB.value = ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8);
                        }

                        ratiozToSave = 10000 * amountToDepositBN / amountToDepositBN2;

                    } catch (error) {
                        console.error(`Error in getRatioCreatePositiontokenB:`, error);
                    }
                }











                var ratiozToSave = 0;





                async function getRatioCreatePositiontokenA() {
                    console.log("running: getRatioIncreasePositiontokenB token a");


                    if (!walletConnected) {
                        await connectWallet();
                    }

                    const tokenASelect = document.querySelector('#create .form-group:nth-child(1) select');


                    // Get the currently selected value
                    const tokenAValue = tokenASelect.value;
                    console.log("Currently selected value TokenA:", tokenAValue);


                    const tokenBSelect = document.querySelector('#create .form-group:nth-child(2) select');


                    // Get the currently selected value
                    const tokenBvalue = tokenBSelect.value;
                    console.log("Currently selected value TokenB:", tokenBvalue);

                    // Or get the selected option element itself
                    const selectedOptionA = tokenASelect.options[tokenASelect.selectedIndex];
                    const selectedOptionB = tokenBSelect.options[tokenBSelect.selectedIndex];
                    console.log("selectedOptionA option text:", selectedOptionA.text);
                    console.log("selectedOptionA option value:", selectedOptionA.value);
                    console.log("selectedOptionB option text:", selectedOptionB.text);
                    console.log("selectedOptionB option value:", selectedOptionB.value);

                    var tokenAinputAddress = tokenAddresses[selectedOptionA.value];
                    var tokenBinputAddress = tokenAddresses[selectedOptionB.value];
                    console.log("tokenA InputAddresstoken", tokenAinputAddress);
                    console.log("tokenB InputAddresstoken", tokenBinputAddress);

                    // Simple and reliable approach - select all number inputs in create page
                    const createInputs = document.querySelectorAll('#create input[type="number"]');
                    const amountInputA = createInputs[0]; // First number input (Amount A)
                    const amountInputB = createInputs[1]; // Second number input (Amount B)

                    // Add null checks to prevent errors
                    if (!amountInputA || !amountInputB) {
                        console.error("Could not find amount input fields");
                        return;
                    }

                    // Get the currently selected values
                    const tokenAInput = amountInputA.value;
                    const tokenBInput = amountInputB.value;

                    console.log("Currently amountInputA value:", tokenAInput);
                    console.log("Currently amountInputB value:", tokenBInput);


                    var amountAtoCreate = ethers.utils.parseUnits(tokenAInput, 18);  // Correctly represents 12 * 10^8

                    if (selectedOptionA.value == "0xBTC") {
                        console.log("LOGGED 0xBTC selected A Value CreatePositionA");
                        amountAtoCreate = ethers.utils.parseUnits(tokenAInput, 8);  // Correctly represents 12 * 10^8
                    }

                    console.log("Currently amountInputB value:", tokenBInput);
                    var amountBtoCreate = ethers.utils.parseUnits(tokenBInput, 18);  // Correctly represents 12 * 10^8

                    if (selectedOptionB.value == "0xBTC") {
                        console.log("LOGGED 0xBTC selected B Value CreatePositionA");
                        amountBtoCreate = ethers.utils.parseUnits(tokenBInput, 8);  // Correctly represents 12 * 10^8
                    }


                    let amountOut = 0;

                    await throttledGetSqrtRtAndPriceRatio();



                    let amountToDeposit = ethers.utils.parseEther("200");  // 200 * 10^18 for B0x token
                    var amountToDepositOfZer0X = ethers.utils.parseUnits("100", 8); // 0.01 * 10^8 for 0xBTC
                    var amountWith8Decimals0xBTC = 0n;
                    let liquiditySalt = 0; // Declare once outside the if/else

                    if (tokenAinputAddress === Address_ZEROXBTC_TESTNETCONTRACT) {
                        // TokenA is 0xBTC, calculate how much TokenB (B0x) is needed
                        console.log("TokenA is 0xBTC, calculating TokenB amount");
                        const calculatedPriceRatio = BigInt(ratioz);

                        const amountZer0XIn18Decimals = BigInt(amountAtoCreate) * 10n ** 10n;
                        amountWith8Decimals0xBTC = amountAtoCreate;

                        // Use the reverse of the B0x calculation logic
                        if (BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) < BigInt(tokenAddresses['B0x'].toLowerCase())) {
                            var priceIn18Decimals = calculatedPriceRatio / (10n ** 10n);
                            // 0xBTC < B0x: Use the inverse of what works for B0x → 0xBTC
                            amountToDeposit = (amountZer0XIn18Decimals * priceIn18Decimals) / (10n ** 18n);
                        } else {
                            // 0xBTC > B0x: Use the inverse of what works for B0x → 0xBTC  
                            amountToDeposit = (amountZer0XIn18Decimals * (10n ** 18n)) / (calculatedPriceRatio * 10n ** 10n);
                        }

                        console.log(`fTokenB (0xBTC) amount: ${ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8)}`);
                        console.log(`fCalculated TokenA (B0x) amount: ${ethers.utils.formatEther(amountToDeposit)}`);
                    } else {
                        // TokenB is B0x, calculate how much TokenA (0xBTC) is needed
                        console.log("TokenA is B0x, calculating TokenB amount");
                        const priceRatio = BigInt(ratioz);
                        amountToDeposit = BigInt(amountAtoCreate); // Fixed: Use amountBtoCreate and convert to BigInt

                        // Check token ordering to determine calculation method
                        if (BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) < BigInt(tokenAddresses['B0x'].toLowerCase())) {
                            // 0xBTC < B0x: Use direct calculation
                            amountWith8Decimals0xBTC = (amountToDeposit * (10n ** 18n)) / priceRatio;
                        } else {
                            // 0xBTC > B0x: Use inverted calculation
                            amountWith8Decimals0xBTC = (amountToDeposit * priceRatio) / (10n ** 18n);
                        }
                        console.log(`TokenB (B0x) amount: ${ethers.utils.formatEther(amountToDeposit)}`);
                        console.log(`Calculated TokenA (0xBTC) amount: ${ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8)}`);
                    }


                    console.log("walletBalances: ", walletBalances['0xBTC']);
                    var zeroxbtcdecimal = amountWith8Decimals0xBTC.toString();
                    var wallet_zeroxbtc = ethers.utils.parseUnits(walletBalances['0xBTC'], 8).toString();
                    console.log("amountWith8Decimals0xBTC: ", zeroxbtcdecimal);
                    console.log("wallet_zeroxbtc: ", wallet_zeroxbtc);

                    var b0xdecimal = amountToDeposit.toString();
                    var wallet_b0x = ethers.utils.parseUnits(walletBalances['B0x'], 18).toString();
                    console.log("amountWith b0xdecimal:  ", b0xdecimal);
                    console.log("wallet_b0x: ", wallet_b0x);

                    if (parseFloat(zeroxbtcdecimal) > parseFloat(wallet_zeroxbtc)) {
                        alert("too much 0xbtc u dont have lower it!.")
                        await getMaxCreatePosition();

                        return;
                    }

                    if (parseFloat(b0xdecimal) > parseFloat(wallet_b0x)) {
                        alert("too much b0x u dont have lower it!.")
                        await getMaxCreatePosition();
                        return;
                    }

                    /*
            
                        function createPositionWith2Tokens(
                            address token,
                            address token2,
                            uint256 amountIn,
                            uint256 amountIn2,
                            uint currentx96,        // Expected sqrtPriceX96 when user initiated tx
                            uint256 slippage,       // Slippage tolerance in basis points (e.g., 100 = 1%)
                            address hookAddress,
                            address toSendNFTto) public payable returns (bool)
                                {
                    */

                    const amountToDepositBN = ethers.BigNumber.from(amountToDeposit.toString());
                    const amountToDepositBN2 = ethers.BigNumber.from(amountWith8Decimals0xBTC.toString());


                    try {

                        console.log("tokenAddress: ", tokenAddress);

                        console.log("Address_ZEROXBTC_TESTNETCONTRACT: ", Address_ZEROXBTC_TESTNETCONTRACT.toString());

                        console.log("amountToDepositBN: ", amountToDepositBN.toString());
                        console.log("amountToDepositBN2: ", amountToDepositBN2.toString());
                        console.log("Current_getsqrtPricex96: ", Current_getsqrtPricex96.toString());
                        console.log("HookAddress: ", HookAddress.toString());


                        // Update ONLY TokenA input (don't touch TokenB since user is typing in it)
                        if (tokenAinputAddress === Address_ZEROXBTC_TESTNETCONTRACT) {
                            // TokenA is 0xBTC
                            amountInputA.value = ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8);
                            amountInputB.value = ethers.utils.formatUnits(amountToDeposit, 18);
                        } else {
                            // TokenA is B0x
                            amountInputA.value = ethers.utils.formatUnits(amountToDeposit, 18);
                            amountInputB.value = ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8);
                        }

                        ratiozToSave = 10000 * amountToDepositBN / amountToDepositBN2;


                    } catch (error) {
                        console.error(`Error  create Position :`, error);
                    }
                    // Update the UI to show total liquidity
                    updateTotalLiqIncreaseSTAKING();
                }






                // Enhanced function with proper priority token handling
                function calculateOptimalAmounts(tokenAValue, tokenBValue, tokenAAmount, tokenBAmount, walletBalances, ratioz, priorityToken = null, StakeSection = false) {
                    const tokenAinputAddress = tokenAddresses[tokenAValue];
                    const tokenBinputAddress = tokenAddresses[tokenBValue];

                    // Determine which amount to use as the base calculation based on priority
                    let baseAmount, baseTokenValue, baseTokenAddress, otherTokenValue;

                    if (priorityToken === 'A') {
                        // Use tokenA as the priority (base calculation)
                        baseAmount = tokenAAmount;
                        baseTokenValue = tokenAValue;
                        baseTokenAddress = tokenAinputAddress;
                        otherTokenValue = tokenBValue;
                    } else if (priorityToken === 'B') {
                        // Use tokenB as the priority (base calculation)
                        baseAmount = tokenBAmount;
                        baseTokenValue = tokenBValue;
                        baseTokenAddress = tokenBinputAddress;
                        otherTokenValue = tokenAValue;
                    }
                    // Parse the base amount with correct decimals
                    const baseAmountParsed = ethers.utils.parseUnits(baseAmount, baseTokenValue === "0xBTC" ? 8 : 18);

                    // Calculate the required amounts based on which token is the base
                    let amountToDeposit, amountWith8Decimals0xBTC;
                    if (baseTokenAddress === Address_ZEROXBTC_TESTNETCONTRACT) {
                        // Base token is 0xBTC, calculate the other token amount needed
                        const calculatedPriceRatio = BigInt(ratioz);
                        var priceIn18Decimals = 0n; // Fixed: Should be BigInt

                        if (BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) > BigInt(tokenAddresses['B0x'].toLowerCase())) {
                            console.log("This one here2");
                            // INVERTED: Use division instead of multiplication
                            priceIn18Decimals = (10n ** 36n) / (calculatedPriceRatio * (10n ** 10n)); // Invert the ratio
                            const amountZer0XIn18Decimals = BigInt(baseAmountParsed) * 10n ** 10n;
                            amountWith8Decimals0xBTC = baseAmountParsed;
                            amountToDeposit = (amountZer0XIn18Decimals * priceIn18Decimals) / (10n ** 18n);
                        } else {
                            console.log("This one here");
                            // Use direct ratio instead of inversion
                            priceIn18Decimals = calculatedPriceRatio / (10n ** 10n); // Convert 28 decimals to 18 decimals
                            const amountZer0XIn18Decimals = BigInt(baseAmountParsed) * 10n ** 10n;
                            amountWith8Decimals0xBTC = baseAmountParsed;
                            amountToDeposit = (amountZer0XIn18Decimals * priceIn18Decimals) / (10n ** 18n);
                            console.log("Depositing 0xBTC: ", amountWith8Decimals0xBTC.toString());
                            console.log("Depositing b0x: ", amountToDeposit.toString());
                        }

                    } else {
                        // Base token is B0x, calculate how much 0xBTC is needed
                        const calculatedPriceRatio = BigInt(ratioz);
                        var priceIn18Decimals = 0n; // Fixed: Should be BigInt
                        if (BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) > BigInt(tokenAddresses['B0x'].toLowerCase())) {
                            // INVERTED: Use division instead of multiplication
                            priceIn18Decimals = (10n ** 36n) / (calculatedPriceRatio * (10n ** 10n)); // Invert the ratio
                            amountToDeposit = baseAmountParsed;
                            // Calculate 0xBTC needed: B0x amount / inverted price ratio
                            amountWith8Decimals0xBTC = (BigInt(baseAmountParsed) * (10n ** 18n)) / priceIn18Decimals / (10n ** 10n);
                        } else {
                            // Use DIRECT ratio instead of inversion
                            priceIn18Decimals = calculatedPriceRatio / (10n ** 10n); // Convert 29 decimals to 18 decimals (no inversion)
                            amountToDeposit = baseAmountParsed;
                            // Calculate 0xBTC needed: B0x amount / direct price ratio
                            amountWith8Decimals0xBTC = (BigInt(baseAmountParsed) * (10n ** 18n)) / priceIn18Decimals / (10n ** 10n);
                        }
                        console.log("aa amountWith8Decimals0xBTC", amountWith8Decimals0xBTC);
                        console.log("aa baseAmountParsed: ", baseAmountParsed.toString());
                    }

                    // Get position data to include unclaimed fees
                    var positionSelect = document.querySelector('#increase select');
                    if (StakeSection == true) {
                        positionSelect = document.querySelector('#stake-increase select');
                    }
                    console.log("Test positionSelect ", positionSelect);
                    const selectedPositionId = positionSelect.value;
                    const position = positionData[selectedPositionId];

                    // Calculate total available amounts (wallet + unclaimed fees)
                    const zeroxbtcdecimal = amountWith8Decimals0xBTC.toString();
                    let total_available_zeroxbtc;

                    if (position && position.tokenA === tokenAddresses['0xBTC']) {
                        // 0xBTC is tokenA, add unclaimedFeesTokenA
                        const walletAmount = ethers.utils.parseUnits(walletBalances['0xBTC'], 8);
                        const unclaimedAmount = ethers.utils.parseUnits(position.unclaimedFeesTokenA.toString(), 8);
                        total_available_zeroxbtc = walletAmount.add(unclaimedAmount).toString();
                    } else if (position && position.tokenB === tokenAddresses['0xBTC']) {
                        // 0xBTC is tokenB, add unclaimedFeesTokenB
                        const walletAmount = ethers.utils.parseUnits(walletBalances['0xBTC'], 8);
                        const unclaimedAmount = ethers.utils.parseUnits(position.unclaimedFeesTokenB.toString(), 8);
                        total_available_zeroxbtc = walletAmount.add(unclaimedAmount).toString();
                    } else {
                        // No position or 0xBTC not in position, use wallet only
                        total_available_zeroxbtc = ethers.utils.parseUnits(walletBalances['0xBTC'], 8).toString();
                    }

                    const b0xdecimal = amountToDeposit.toString();
                    let total_available_b0x;

                    if (position && position.tokenA === tokenAddresses['B0x']) {
                        // B0x is tokenA, add unclaimedFeesTokenA
                        const walletAmount = ethers.utils.parseUnits(walletBalances['B0x'], 18);
                        const unclaimedAmount = ethers.utils.parseUnits(position.unclaimedFeesTokenA.toString(), 18);
                        total_available_b0x = walletAmount.add(unclaimedAmount).toString();
                    } else if (position && position.tokenB === tokenAddresses['B0x']) {
                        // B0x is tokenB, add unclaimedFeesTokenB
                        const walletAmount = ethers.utils.parseUnits(walletBalances['B0x'], 18);
                        const unclaimedAmount = ethers.utils.parseUnits(position.unclaimedFeesTokenB.toString(), 18);
                        total_available_b0x = walletAmount.add(unclaimedAmount).toString();
                    } else {
                        // No position or B0x not in position, use wallet only
                        total_available_b0x = ethers.utils.parseUnits(walletBalances['B0x'], 18).toString();
                    }

                    const zeroxbtcExceeded = parseFloat(zeroxbtcdecimal) > parseFloat(total_available_zeroxbtc);
                    const b0xExceeded = parseFloat(b0xdecimal) > parseFloat(total_available_b0x);
                    console.log("aazeroxbtcExceeded: ", zeroxbtcExceeded);
                    console.log("aab0xExceeded: ", b0xExceeded);
                    console.log("aaparseFloat(b0xdecimal): ", parseFloat(b0xdecimal));
                    console.log("aaparseFloat(total_available_b0x): ", parseFloat(total_available_b0x));
                    console.log("aaparseFloat(zeroxbtcdecimal): ", parseFloat(zeroxbtcdecimal));
                    console.log("aaparseFloat(total_available_zeroxbtc): ", parseFloat(total_available_zeroxbtc));
                    // If both are within limits, return as is
                    if (!zeroxbtcExceeded && !b0xExceeded) {
                        return {
                            amountToDeposit,
                            amountWith8Decimals0xBTC,
                            needsAdjustment: false,
                            priorityUsed: priorityToken,
                            debugInfo: {
                                baseToken: baseTokenValue,
                                baseAmount: baseAmount,
                                calculatedFrom: `${baseTokenValue} -> ${otherTokenValue}`
                            }
                        };
                    }

                    // If we exceed limits, calculate the optimal amounts within constraints
                    let maxZeroxbtc, maxB0x;

                    if (position && position.tokenA === tokenAddresses['0xBTC']) {
                        const walletAmount = ethers.utils.parseUnits(walletBalances['0xBTC'], 8);
                        const unclaimedAmount = ethers.utils.parseUnits(position.unclaimedFeesTokenA.toString(), 8);
                        maxZeroxbtc = walletAmount.add(unclaimedAmount);
                    } else if (position && position.tokenB === tokenAddresses['0xBTC']) {
                        const walletAmount = ethers.utils.parseUnits(walletBalances['0xBTC'], 8);
                        const unclaimedAmount = ethers.utils.parseUnits(position.unclaimedFeesTokenB.toString(), 8);
                        maxZeroxbtc = walletAmount.add(unclaimedAmount);
                    } else {
                        maxZeroxbtc = ethers.utils.parseUnits(walletBalances['0xBTC'], 8);
                    }

                    if (position && position.tokenA === tokenAddresses['B0x']) {
                        const walletAmount = ethers.utils.parseUnits(walletBalances['B0x'], 18);
                        const unclaimedAmount = ethers.utils.parseUnits(position.unclaimedFeesTokenA.toString(), 18);
                        maxB0x = walletAmount.add(unclaimedAmount);
                    } else if (position && position.tokenB === tokenAddresses['B0x']) {
                        const walletAmount = ethers.utils.parseUnits(walletBalances['B0x'], 18);
                        const unclaimedAmount = ethers.utils.parseUnits(position.unclaimedFeesTokenB.toString(), 18);
                        maxB0x = walletAmount.add(unclaimedAmount);
                    } else {
                        maxB0x = ethers.utils.parseUnits(walletBalances['B0x'], 18);
                    }


                    // Calculate what amounts would be needed if we max out each token
                    const calculatedPriceRatio = BigInt(ratioz);
                    var priceIn18Decimals = 0n; // Fixed: Should be BigInt


                    var amountZer0XIn18Decimals = 0;
                    var zeroxbtcNeededForMaxB0x = 0;
                    var b0xNeededForMax0xBTC = 0;
                    if (BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) > BigInt(tokenAddresses['B0x'].toLowerCase())) {
                        // INVERTED: Use division instead of multiplication
                        priceIn18Decimals = (10n ** 36n) / (calculatedPriceRatio * (10n ** 10n)); // Invert the ratio
                        // If we max out 0xBTC, how much B0x do we need?
                        amountZer0XIn18Decimals = BigInt(maxZeroxbtc) * 10n ** 10n;
                        b0xNeededForMax0xBTC = (amountZer0XIn18Decimals * priceIn18Decimals) / (10n ** 18n);

                        // If we max out B0x, how much 0xBTC do we need?
                        zeroxbtcNeededForMaxB0x = (BigInt(maxB0x) * (10n ** 18n)) / priceIn18Decimals / (10n ** 10n);
                        console.log("TIK TIK");
                    } else {
                        // INVERTED: Use division instead of multiplication  
                        priceIn18Decimals = calculatedPriceRatio / (10n ** 10n); // Convert 28 decimals to 18 decimals


                        // If we max out 0xBTC, how much B0x do we need?
                        amountZer0XIn18Decimals = BigInt(maxZeroxbtc) * 10n ** 10n;
                        b0xNeededForMax0xBTC = (amountZer0XIn18Decimals * priceIn18Decimals) / (10n ** 18n);

                        // If we max out B0x, how much 0xBTC do we need?
                        zeroxbtcNeededForMaxB0x = (BigInt(maxB0x) * (10n ** 18n)) / priceIn18Decimals / (10n ** 10n);
                        // Determine which scenario is actually possible
                        console.log("TIK 0000)");
                    }


                    // Determine which scenario is actually possible
                    const canMaxOut0xBTC = b0xNeededForMax0xBTC <= BigInt(maxB0x);
                    const canMaxOutB0x = zeroxbtcNeededForMaxB0x <= BigInt(maxZeroxbtc);

                    let actualLimitingFactor;
                    let finalAmountToDeposit, finalAmountWith8Decimals0xBTC;

                    // Priority-based selection with proper limiting factor detection
                    if (canMaxOut0xBTC && canMaxOutB0x) {
                        // Both are possible, choose based on priority
                        if (priorityToken === 'A') {
                            if (tokenAinputAddress === Address_ZEROXBTC_TESTNETCONTRACT) {
                                // Token A is 0xBTC, max it out
                                actualLimitingFactor = 'B0x';
                                finalAmountWith8Decimals0xBTC = maxZeroxbtc;
                                finalAmountToDeposit = b0xNeededForMax0xBTC;
                            } else {
                                // Token A is B0x, max it out
                                actualLimitingFactor = '0xBTC';
                                finalAmountToDeposit = maxB0x;
                                finalAmountWith8Decimals0xBTC = zeroxbtcNeededForMaxB0x;
                            }
                        } else if (priorityToken === 'B') {
                            if (tokenBinputAddress === Address_ZEROXBTC_TESTNETCONTRACT) {
                                // Token B is 0xBTC, max it out
                                actualLimitingFactor = 'B0x';
                                finalAmountWith8Decimals0xBTC = maxZeroxbtc;
                                finalAmountToDeposit = b0xNeededForMax0xBTC;
                            } else {
                                // Token B is B0x, max it out
                                actualLimitingFactor = '0xBTC';
                                finalAmountToDeposit = maxB0x;
                                finalAmountWith8Decimals0xBTC = zeroxbtcNeededForMaxB0x;
                            }
                        }
                    } else if (canMaxOut0xBTC) {
                        // Only 0xBTC can be maxed out
                        actualLimitingFactor = 'B0x';
                        finalAmountWith8Decimals0xBTC = maxZeroxbtc;
                        finalAmountToDeposit = b0xNeededForMax0xBTC;
                    } else if (canMaxOutB0x) {
                        // Only B0x can be maxed out
                        actualLimitingFactor = '0xBTC';
                        finalAmountToDeposit = maxB0x;
                        finalAmountWith8Decimals0xBTC = zeroxbtcNeededForMaxB0x;
                    } else {
                        // Neither can be maxed out - use the most limiting factor
                        const zeroxbtcRatio = parseFloat(total_available_zeroxbtc) / parseFloat(zeroxbtcdecimal);
                        const b0xRatio = parseFloat(total_available_b0x) / parseFloat(b0xdecimal);

                        if (zeroxbtcRatio < b0xRatio) {
                            actualLimitingFactor = '0xBTC';
                            finalAmountWith8Decimals0xBTC = maxZeroxbtc;
                            finalAmountToDeposit = b0xNeededForMax0xBTC;
                        } else {
                            actualLimitingFactor = 'B0x';
                            finalAmountToDeposit = maxB0x;
                            finalAmountWith8Decimals0xBTC = zeroxbtcNeededForMaxB0x;
                        }
                    }

                    return {
                        amountToDeposit: finalAmountToDeposit,
                        amountWith8Decimals0xBTC: finalAmountWith8Decimals0xBTC,
                        needsAdjustment: true,
                        limitingFactor: actualLimitingFactor,
                        priorityUsed: priorityToken,
                        debugInfo: {
                            baseToken: baseTokenValue,
                            baseAmount: baseAmount,
                            calculatedFrom: `${baseTokenValue} -> ${otherTokenValue}`,
                            canMaxOut0xBTC,
                            canMaxOutB0x,
                            b0xNeededForMax0xBTC: b0xNeededForMax0xBTC.toString(),
                            zeroxbtcNeededForMaxB0x: zeroxbtcNeededForMaxB0x.toString(),
                            maxZeroxbtc: maxZeroxbtc.toString(),
                            maxB0x: maxB0x.toString()
                        }
                    };
                }




                // Example of how to use this in your max button handlers
                function handleMaxButtonClick(tokenSymbol, inputElement) {
                    // Get current token configuration
                    const tokenALabel = document.querySelector('#increase #tokenALabel');
                    const tokenBLabel = document.querySelector('#increase #tokenBLabel');
                    const tokenAValue = tokenALabel.textContent;
                    const tokenBValue = tokenBLabel.textContent;

                    // Get position data for unclaimed fees
                    const positionSelect = document.querySelector('#increase select');
                    const selectedPositionId = positionSelect.value;
                    const position = positionData[selectedPositionId];
                    console.log(" handleMaxButtonClick position: ", position);
                    // Use the helper function to get proper max amounts
                    var useFees = true; //since we are using fees in this maxButtonClick
                    const result = getMaxAmountsWithProperLimiting(tokenAValue, tokenBValue, walletBalances, ratioz, tokenSymbol, position, useFees);

                    // Log what happened for debugging
                    if (!result.requestFulfilled) {
                        console.log(`Max ${tokenSymbol} request could not be fulfilled: ${result.reason}`);
                        console.log(`Using max amounts based on actual limiting factor: ${result.actualLimitingFactor}`);
                    }

                    // Update both inputs with the proper amounts
                    const createInputs = document.querySelectorAll('#increase input[type="number"]');
                    const amountInputA = createInputs[0];
                    const amountInputB = createInputs[1];

                    const tokenAinputAddress = tokenAddresses[tokenAValue];

                    if (tokenAinputAddress === Address_ZEROXBTC_TESTNETCONTRACT) {
                        // Token A is 0xBTC
                        amountInputA.value = ethers.utils.formatUnits(result.amountWith8Decimals0xBTC, 8);
                        amountInputB.value = ethers.utils.formatUnits(result.amountToDeposit, 18);
                    } else {
                        // Token B is 0xBTC
                        amountInputA.value = ethers.utils.formatUnits(result.amountToDeposit, 18);
                        amountInputB.value = ethers.utils.formatUnits(result.amountWith8Decimals0xBTC, 8);
                    }

                    // Update the UI to show total liquidity
                    updateTotalLiqIncrease();

                    return result;
                }



                // Example of how to use this in your max button handlers
                function handleMaxButtonClickStakeIncrease(tokenSymbol, inputElement) {
                    // Get current token configuration
                    const tokenALabel = document.querySelector('#stake-increase #tokenALabelINC');
                    const tokenBLabel = document.querySelector('#stake-increase #tokenBLabelINC');
                    const tokenAValue = tokenALabel.textContent;
                    const tokenBValue = tokenBLabel.textContent;

                    // Get position data for unclaimed fees
                    const positionSelect = document.querySelector('#stake-increase select');
                    const selectedPositionId = positionSelect.value;
                    const position = positionData[selectedPositionId];
                    console.log(" handleMaxButtonClick position: ", position);
                    // Use the helper function to get proper max amounts
                    var useFees = false; //since we are using fees in this maxButtonClick
                    const result = getMaxAmountsWithProperLimiting(tokenAValue, tokenBValue, walletBalances, ratioz, tokenSymbol, position, useFees);

                    // Log what happened for debugging
                    if (!result.requestFulfilled) {
                        console.log(`Max ${tokenSymbol} request could not be fulfilled: ${result.reason}`);
                        console.log(`Using max amounts based on actual limiting factor: ${result.actualLimitingFactor}`);
                    }

                    // Update both inputs with the proper amounts
                    const createInputs = document.querySelectorAll('#stake-increase input[type="number"]');
                    const amountInputA = createInputs[0];
                    const amountInputB = createInputs[1];

                    const tokenAinputAddress = tokenAddresses[tokenAValue];

                    if (tokenAinputAddress === Address_ZEROXBTC_TESTNETCONTRACT) {
                        // Token A is 0xBTC
                        amountInputA.value = ethers.utils.formatUnits(result.amountWith8Decimals0xBTC, 8);
                        amountInputB.value = ethers.utils.formatUnits(result.amountToDeposit, 18);
                    } else {
                        // Token B is 0xBTC
                        amountInputA.value = ethers.utils.formatUnits(result.amountToDeposit, 18);
                        amountInputB.value = ethers.utils.formatUnits(result.amountWith8Decimals0xBTC, 8);
                    }

                    // Update the UI to show total liquidity
                    updateTotalLiqIncreaseSTAKING();

                    return result;
                }



                // Helper function to determine true limiting factor for max buttons
                function getMaxAmountsWithProperLimiting(tokenAValue, tokenBValue, walletBalances, ratioz, requestedMaxToken, position = null, useFeesz) {
                    // Calculate what the maximum possible amounts would be for each token (wallet + unclaimed fees)
                    let maxZeroxbtc, maxB0x;

                    if (position && position.tokenA == '0xBTC') {
                        // 0xBTC is tokenA, add unclaimedFeesTokenA
                        const walletAmount = ethers.utils.parseUnits(walletBalances['0xBTC'], 8);
                        const unclaimedAmount = ethers.utils.parseUnits(position.unclaimedFeesTokenA.toString(), 8);
                        maxZeroxbtc = walletAmount.add(unclaimedAmount);
                        if (!useFeesz) {
                            maxZeroxbtc = walletAmount;
                        }
                    } else if (position && position.tokenB == '0xBTC') {
                        // 0xBTC is tokenB, add unclaimedFeesTokenB
                        const walletAmount = ethers.utils.parseUnits(walletBalances['0xBTC'], 8);
                        const unclaimedAmount = ethers.utils.parseUnits(position.unclaimedFeesTokenB.toString(), 8);
                        maxZeroxbtc = walletAmount.add(unclaimedAmount);

                        if (!useFeesz) {
                            maxZeroxbtc = walletAmount;
                        }
                    } else {
                        // No position or 0xBTC not in position, use wallet only
                        maxZeroxbtc = ethers.utils.parseUnits(walletBalances['0xBTC'], 8);
                    }

                    if (position && position.tokenA == 'B0x') {
                        // B0x is tokenA, add unclaimedFeesTokenA
                        const walletAmount = ethers.utils.parseUnits(walletBalances['B0x'], 18);
                        const unclaimedAmount = ethers.utils.parseUnits(position.unclaimedFeesTokenA.toString(), 18);
                        maxB0x = walletAmount.add(unclaimedAmount);

                        if (!useFeesz) {
                            maxB0x = walletAmount;
                        }
                    } else if (position && position.tokenB == 'B0x') {
                        // B0x is tokenB, add unclaimedFeesTokenB
                        const walletAmount = ethers.utils.parseUnits(walletBalances['B0x'], 18);
                        const unclaimedAmount = ethers.utils.parseUnits(position.unclaimedFeesTokenB.toString(), 18);
                        maxB0x = walletAmount.add(unclaimedAmount);

                        if (!useFeesz) {
                            maxB0x = walletAmount;
                        }
                    } else {
                        console.log("EUR EUR ");
                        // No position or B0x not in position, use wallet only
                        maxB0x = ethers.utils.parseUnits(walletBalances['B0x'], 18);
                    }

                    const calculatedPriceRatio = BigInt(ratioz);



                    var b0xNeededForMax0xBTC = 0;
                    var zeroxbtcNeededForMaxB0x = 0;
                    var priceIn18Decimals = 0n;
                    if (BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) > BigInt(tokenAddresses['B0x'].toLowerCase())) {
                        // INVERTED: Use division instead of multiplication
                        priceIn18Decimals = (10n ** 36n) / (calculatedPriceRatio * (10n ** 10n)); // Invert the ratio
                        // Calculate scenarios
                        const amountZer0XIn18Decimals = BigInt(maxZeroxbtc) * 10n ** 10n;
                        b0xNeededForMax0xBTC = (amountZer0XIn18Decimals * priceIn18Decimals) / (10n ** 18n);

                        // For 0xBTC needed from B0x, we divide by the inverted price
                        console.log("ffff this)");
                        zeroxbtcNeededForMaxB0x = (BigInt(maxB0x) * (10n ** 18n)) / priceIn18Decimals / (10n ** 10n);
                    } else {
                        // INVERTED: Use division instead of multiplication  
                        priceIn18Decimals = calculatedPriceRatio / (10n ** 10n); // Convert 28 decimals to 18 decimals
                        // Calculate scenarios
                        const amountZer0XIn18Decimals = BigInt(maxZeroxbtc) * 10n ** 10n;
                        b0xNeededForMax0xBTC = (amountZer0XIn18Decimals * priceIn18Decimals) / (10n ** 18n);

                        // For 0xBTC needed from B0x, we divide by the inverted price
                        zeroxbtcNeededForMaxB0x = (BigInt(maxB0x) * (10n ** 18n)) / priceIn18Decimals / (10n ** 10n);
                        console.log("ffff This this)");
                    }

                    console.log(`zzMax 0xBTC: ${ethers.utils.formatUnits(maxZeroxbtc, 8)}`);
                    console.log(`zzB0x needed for max 0xBTC: ${ethers.utils.formatEther(b0xNeededForMax0xBTC)}`);
                    console.log(`zzMax B0x: ${ethers.utils.formatEther(maxB0x)}`);
                    console.log(`zz0xBTC needed for max B0x: ${ethers.utils.formatUnits(zeroxbtcNeededForMaxB0x, 8)}`);
                    // Check which scenarios are feasible
                    const canMaxOut0xBTC = b0xNeededForMax0xBTC <= BigInt(maxB0x);
                    const canMaxOutB0x = zeroxbtcNeededForMaxB0x <= BigInt(maxZeroxbtc);
                    console.log("zzcanMaxOut0xBTC: ", canMaxOut0xBTC);
                    console.log("zzcanMaxOutB0x: ", canMaxOutB0x);

                    // Determine the actual amounts to use
                    let finalAmounts;

                    if (requestedMaxToken === '0xBTC' && canMaxOut0xBTC) {
                        // User wants max 0xBTC and it's possible
                        finalAmounts = {
                            amountWith8Decimals0xBTC: maxZeroxbtc,
                            amountToDeposit: b0xNeededForMax0xBTC,
                            actualLimitingFactor: 'none',
                            requestFulfilled: true
                        };
                    } else if (requestedMaxToken === 'B0x' && canMaxOutB0x) {
                        // User wants max B0x and it's possible
                        finalAmounts = {
                            amountWith8Decimals0xBTC: zeroxbtcNeededForMaxB0x,
                            amountToDeposit: maxB0x,
                            actualLimitingFactor: 'none',
                            requestFulfilled: true
                        };
                    } else {
                        // User's request can't be fulfilled, use the truly limiting factor
                        if (canMaxOut0xBTC && !canMaxOutB0x) {
                            finalAmounts = {
                                amountWith8Decimals0xBTC: maxZeroxbtc,
                                amountToDeposit: b0xNeededForMax0xBTC,
                                actualLimitingFactor: 'B0x',
                                requestFulfilled: false,
                                reason: `Cannot max out ${requestedMaxToken} because B0x is limiting`
                            };
                        } else if (!canMaxOut0xBTC && canMaxOutB0x) {
                            finalAmounts = {
                                amountWith8Decimals0xBTC: zeroxbtcNeededForMaxB0x,
                                amountToDeposit: maxB0x,
                                actualLimitingFactor: '0xBTC',
                                requestFulfilled: false,
                                reason: `Cannot max out ${requestedMaxToken} because 0xBTC is limiting`
                            };
                        } else {
                            // Neither can be maxed out independently, find the most limiting
                            const b0xRatio = parseFloat(maxB0x.toString()) / parseFloat(b0xNeededForMax0xBTC.toString());
                            const zeroxbtcRatio = parseFloat(maxZeroxbtc.toString()) / parseFloat(zeroxbtcNeededForMaxB0x.toString());

                            if (b0xRatio < zeroxbtcRatio) {
                                finalAmounts = {
                                    amountWith8Decimals0xBTC: zeroxbtcNeededForMaxB0x,
                                    amountToDeposit: maxB0x,
                                    actualLimitingFactor: 'B0x',
                                    requestFulfilled: requestedMaxToken === 'B0x',
                                    reason: 'B0x is the most limiting factor'
                                };
                            } else {
                                finalAmounts = {
                                    amountWith8Decimals0xBTC: maxZeroxbtc,
                                    amountToDeposit: b0xNeededForMax0xBTC,
                                    actualLimitingFactor: '0xBTC',
                                    requestFulfilled: requestedMaxToken === '0xBTC',
                                    reason: '0xBTC is the most limiting factor'
                                };
                            }
                        }
                    }

                    return finalAmounts;
                }



                // Alternative: Separate functions for specific behaviors
                function calculateOptimalAmountsWithTokenAPriority(tokenAValue, tokenBValue, tokenAAmount, tokenBAmount, walletBalances, ratioz) {
                    return calculateOptimalAmounts(tokenAValue, tokenBValue, tokenAAmount, tokenBAmount, walletBalances, ratioz, 'A', false);
                }

                function calculateOptimalAmountsWithTokenBPriority(tokenAValue, tokenBValue, tokenAAmount, tokenBAmount, walletBalances, ratioz) {
                    return calculateOptimalAmounts(tokenAValue, tokenBValue, tokenAAmount, tokenBAmount, walletBalances, ratioz, 'B', false);
                }

                // Alternative: Separate functions for specific behaviors
                function calculateOptimalAmountsWithTokenAPrioritySTAKESECTIONI(tokenAValue, tokenBValue, tokenAAmount, tokenBAmount, walletBalances, ratioz) {
                    console.log("Calling Token A calculateOptimalAmounts");
                    return calculateOptimalAmounts(tokenAValue, tokenBValue, tokenAAmount, tokenBAmount, walletBalances, ratioz, 'A', true);
                }

                function calculateOptimalAmountsWithTokenBPrioritySTAKESECTIONI(tokenAValue, tokenBValue, tokenAAmount, tokenBAmount, walletBalances, ratioz) {
                    console.log("Calling Token B calculateOptimalAmounts");
                    return calculateOptimalAmounts(tokenAValue, tokenBValue, tokenAAmount, tokenBAmount, walletBalances, ratioz, 'B', true);
                }








                // Modified getRatioIncreasePositiontokenB function
                async function getRatioStakeIncreasePositiontokenB() {

                    if (!walletConnected) {
                        await connectWallet();
                    }
                    const tokenALabel = document.querySelector('#stake-increase #tokenALabelINC');
                    const tokenBLabel = document.querySelector('#stake-increase #tokenBLabelINC');
                    const tokenAInput = document.querySelector('#stake-increase #tokenAAmount');
                    const tokenBInput = document.querySelector('#stake-increase #tokenBAmount');

                    const tokenAValue = tokenALabel.textContent;
                    const tokenBValue = tokenBLabel.textContent;
                    const tokenAAmount = tokenAInput ? tokenAInput.value : '0';
                    const tokenBAmount = tokenBInput ? tokenBInput.value : '0';

                    const createInputs = document.querySelectorAll('#stake-increase input[type="number"]');
                    const amountInputA = createInputs[0];
                    const amountInputB = createInputs[1];

                    if (!amountInputA || !amountInputB) {
                        console.error("Could not find amount input fields");
                        return;
                    }

                    await throttledGetSqrtRtAndPriceRatio();

                    // Use the helper function to calculate optimal amounts
                    const result = calculateOptimalAmountsWithTokenBPrioritySTAKESECTIONI(
                        tokenAValue, tokenBValue,
                        tokenAAmount, tokenBAmount,
                        walletBalances, ratioz
                    );

                    const { amountToDeposit, amountWith8Decimals0xBTC, needsAdjustment, limitingFactor } = result;

                    console.log("!!!!!!!calculateOptimalAmounts amountToDeposit: ", amountToDeposit);
                    console.log("!!!!!!!calculateOptimalAmounts amountWith8Decimals0xBTC: ", amountWith8Decimals0xBTC);
                    console.log("!!!!!!!calculateOptimalAmounts needsAdjustment: ", needsAdjustment);
                    console.log("!!!!!!!calculateOptimalAmounts limitingFactor: ", limitingFactor);
                    console.log("!!!!!!!");

                    try {
                        const amountToDepositBN = ethers.BigNumber.from(amountToDeposit.toString());
                        const amountToDepositBN2 = ethers.BigNumber.from(amountWith8Decimals0xBTC.toString());

                        isProgrammaticUpdatB = true;

                        const tokenAinputAddress = tokenAddresses[tokenAValue];

                        // Update input fields based on token configuration
                        if (tokenAinputAddress === Address_ZEROXBTC_TESTNETCONTRACT) {
                            amountInputA.value = ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8);
                            //commented out because we dont update B in B.
                            //  amountInputB.value = ethers.utils.formatUnits(amountToDeposit, 18);
                        } else {
                            amountInputA.value = ethers.utils.formatUnits(amountToDeposit, 18);
                            //  amountInputB.value = ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8);
                        }

                        ratiozToSave = 10000 * amountToDepositBN / amountToDepositBN2;

                        // Only handle max amount setting if we needed adjustment
                        if (needsAdjustment) {
                            console.log(`Adjusted amounts due to ${limitingFactor} being limiting factor`);

                            const positionSelect = document.querySelector('#stake-increase select');
                            const selectedPositionId = positionSelect.value;
                            const position = stakingPositionData[selectedPositionId];
                            console.log("Position Stake Increase: ", position);
                            if (!position) return;

                            // Determine which token we're working with
                            const label = amountInputB.closest('.form-group').querySelector('label');
                            let currentTokenSymbol = label.textConten;
                            console.log("Label: ", label);
                            let maxAmount = 0;

                            if (label && label.textContent.includes(position.tokenB)) {
                                currentTokenSymbol = position.tokenB;
                                console.log("Worked");
                                handleMaxButtonClickStakeIncrease(currentTokenSymbol, amountInputB);

                            }
                        }


                    } catch (error) {
                        console.error(`Error in create Position:`, error);
                    }

                    // Update the UI to show total liquidity
                    updateTotalLiqIncreaseSTAKING();
                    isProgrammaticUpdateB = false;
                }



                // Modified getRatioIncreasePositiontokenA function
                async function getRatioStakeIncreasePositiontokenA() {
                    console.log("running: getRatioStakeIncreasePositiontokenA");

                    if (!walletConnected) {
                        await connectWallet();
                    }

                    isProgrammaticUpdate = true;


                    // Get token types from labels within increase page
                    const tokenALabel = document.querySelector('#stake-increase #tokenALabelINC');
                    const tokenBLabel = document.querySelector('#stake-increase #tokenBLabelINC');
                    const tokenAInput = document.querySelector('#stake-increase #tokenAAmount');
                    const tokenBInput = document.querySelector('#stake-increase #tokenBAmount');

                    // Get the token values from the label text content
                    const tokenAValue = tokenALabel.textContent;
                    const tokenBValue = tokenBLabel.textContent;

                    console.log("Currently selected value TokenA:", tokenAValue);
                    console.log("Currently selected value TokenB:", tokenBValue);

                    const tokenAAmount = tokenAInput ? tokenAInput.value : '0';
                    const tokenBAmount = tokenBInput ? tokenBInput.value : '0';

                    console.log("Token A Amount:", tokenAAmount);
                    console.log("Token B Amount:", tokenBAmount);

                    const tokenAinputAddress = tokenAddresses[tokenAValue];
                    const tokenBinputAddress = tokenAddresses[tokenBValue];

                    console.log("tokenA InputAddresstoken", tokenAinputAddress);
                    console.log("tokenB InputAddresstoken", tokenBinputAddress);

                    // Simple and reliable approach - select all number inputs in increase page
                    const createInputs = document.querySelectorAll('#stake-increase input[type="number"]');
                    const amountInputA = createInputs[0]; // First number input (Amount A)
                    const amountInputB = createInputs[1]; // Second number input (Amount B)

                    // Add null checks to prevent errors
                    if (!amountInputA || !amountInputB) {
                        console.error("Could not find amount input fields");
                        return;
                    }

                    console.log("Currently amountInputA value:", tokenAAmount);
                    console.log("Currently amountInputB value:", tokenBAmount);

                    await throttledGetSqrtRtAndPriceRatio();

                    // Use the helper function to calculate optimal amounts
                    const result = calculateOptimalAmountsWithTokenAPrioritySTAKESECTIONI(
                        tokenAValue, tokenBValue,
                        tokenAAmount, tokenBAmount,
                        walletBalances, ratioz
                    );

                    const { amountToDeposit, amountWith8Decimals0xBTC, needsAdjustment, limitingFactor } = result;


                    console.log("!!!!!!!calculateOptimalAmounts amountToDeposit: ", amountToDeposit);
                    console.log("!!!!!!!calculateOptimalAmounts amountWith8Decimals0xBTC: ", amountWith8Decimals0xBTC);
                    console.log("!!!!!!!calculateOptimalAmounts needsAdjustment: ", needsAdjustment);
                    console.log("!!!!!!!calculateOptimalAmounts limitingFactor: ", limitingFactor);
                    console.log("!!!!!!!");

                    try {
                        const amountToDepositBN = ethers.BigNumber.from(amountToDeposit.toString());
                        const amountToDepositBN2 = ethers.BigNumber.from(amountWith8Decimals0xBTC.toString());

                        console.log("tokenAddress: ", tokenAddress);
                        console.log("Address_ZEROXBTC_TESTNETCONTRACT: ", Address_ZEROXBTC_TESTNETCONTRACT.toString());
                        console.log("amountToDepositBN: ", amountToDepositBN.toString());
                        console.log("amountToDepositBN2: ", amountToDepositBN2.toString());
                        console.log("Current_getsqrtPricex96: ", Current_getsqrtPricex96.toString());
                        console.log("HookAddress: ", HookAddress.toString());

                        // Update input fields based on token configuration
                        if (tokenAinputAddress === Address_ZEROXBTC_TESTNETCONTRACT) {
                            //Commented out because we dont update A in A only B in A.
                            // amountInputA.value = ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8);
                            amountInputB.value = ethers.utils.formatUnits(amountToDeposit, 18);
                            amountInputA.value = ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8);
                        } else {
                            //   amountInputA.value = ethers.utils.formatUnits(amountToDeposit, 18);
                            amountInputB.value = ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8);
                            amountInputA.value = ethers.utils.formatUnits(amountToDeposit, 18);
                        }

                        ratiozToSave = 10000 * amountToDepositBN / amountToDepositBN2;

                        // Only handle max amount setting if we needed adjustment
                        if (needsAdjustment) {
                            console.log(`Adjusted amounts due to ${limitingFactor} being limiting factor`);

                            const positionSelect = document.querySelector('#stake-increase select');
                            const selectedPositionId = positionSelect.value;
                            const position = stakingPositionData[selectedPositionId];
                            console.log("Position Stake Increase: ", position);
                            if (!position) return;

                            // Determine which token we're working with
                            const label = amountInputA.closest('.form-group').querySelector('label');
                            let currentTokenSymbol = label.textConten;
                            console.log("Label: ", label);
                            let maxAmount = 0;

                            if (label && label.textContent.includes(position.tokenB)) {
                                currentTokenSymbol = position.tokenB;
                                console.log("Worked");
                                handleMaxButtonClickStakeIncrease(currentTokenSymbol, amountInputB);

                            }
                        }


                        updateTotalLiqIncreaseSTAKING();

                    } catch (error) {
                        console.error(`Error in create Position:`, error);
                    }

                    isProgrammaticUpdate = false;
                }



                // Modified getRatioIncreasePositiontokenB function
                async function getRatioIncreasePositiontokenB() {
                    console.log("running: getRatioStakeIncreasePositiontokenB");

                    if (!walletConnected) {
                        await connectWallet();
                    }

                    isProgrammaticUpdate = true;


                    // Get token types from labels within increase page
                    const tokenALabel = document.querySelector('#increase #tokenALabel');
                    const tokenBLabel = document.querySelector('#increase #tokenBLabel');
                    const tokenAInput = document.querySelector('#increase #tokenAAmount');
                    const tokenBInput = document.querySelector('#increase #tokenBAmount');

                    // Get the token values from the label text content
                    const tokenAValue = tokenALabel.textContent;
                    const tokenBValue = tokenBLabel.textContent;

                    console.log("Currently selected value TokenA:", tokenAValue);
                    console.log("Currently selected value TokenB:", tokenBValue);

                    const tokenAAmount = tokenAInput ? tokenAInput.value : '0';
                    const tokenBAmount = tokenBInput ? tokenBInput.value : '0';

                    console.log("Token A Amount:", tokenAAmount);
                    console.log("Token B Amount:", tokenBAmount);

                    const tokenAinputAddress = tokenAddresses[tokenAValue];
                    const tokenBinputAddress = tokenAddresses[tokenBValue];

                    console.log("tokenA InputAddresstoken", tokenAinputAddress);
                    console.log("tokenB InputAddresstoken", tokenBinputAddress);

                    // Simple and reliable approach - select all number inputs in increase page
                    const createInputs = document.querySelectorAll('#increase input[type="number"]');
                    const amountInputA = createInputs[0]; // First number input (Amount A)
                    const amountInputB = createInputs[1]; // Second number input (Amount B)

                    // Add null checks to prevent errors
                    if (!amountInputA || !amountInputB) {
                        console.error("Could not find amount input fields");
                        return;
                    }

                    console.log("Currently amountInputA value:", tokenAAmount);
                    console.log("Currently amountInputB value:", tokenBAmount);

                    await throttledGetSqrtRtAndPriceRatio();

                    // Use the helper function to calculate optimal amounts
                    const result = calculateOptimalAmountsWithTokenBPrioritySTAKESECTIONI(
                        tokenAValue, tokenBValue,
                        tokenAAmount, tokenBAmount,
                        walletBalances, ratioz
                    );

                    const { amountToDeposit, amountWith8Decimals0xBTC, needsAdjustment, limitingFactor } = result;


                    console.log("!!!!!!!calculateOptimalAmounts amountToDeposit: ", amountToDeposit);
                    console.log("!!!!!!!calculateOptimalAmounts amountWith8Decimals0xBTC: ", amountWith8Decimals0xBTC);
                    console.log("!!!!!!!calculateOptimalAmounts needsAdjustment: ", needsAdjustment);
                    console.log("!!!!!!!calculateOptimalAmounts limitingFactor: ", limitingFactor);
                    console.log("!!!!!!!");

                    try {
                        const amountToDepositBN = ethers.BigNumber.from(amountToDeposit.toString());
                        const amountToDepositBN2 = ethers.BigNumber.from(amountWith8Decimals0xBTC.toString());

                        console.log("tokenAddress: ", tokenAddress);
                        console.log("Address_ZEROXBTC_TESTNETCONTRACT: ", Address_ZEROXBTC_TESTNETCONTRACT.toString());
                        console.log("amountToDepositBN: ", amountToDepositBN.toString());
                        console.log("amountToDepositBN2: ", amountToDepositBN2.toString());
                        console.log("Current_getsqrtPricex96: ", Current_getsqrtPricex96.toString());
                        console.log("HookAddress: ", HookAddress.toString());

                        // Update input fields based on token configuration
                        if (tokenAinputAddress === Address_ZEROXBTC_TESTNETCONTRACT) {
                            //Commented out because we dont update A in A only B in A.
                            // amountInputA.value = ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8);
                            amountInputA.value = ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8);

                        } else {
                            //   amountInputA.value = ethers.utils.formatUnits(amountToDeposit, 18);
                            amountInputA.value = ethers.utils.formatUnits(amountToDeposit, 18);
                        }

                        ratiozToSave = 10000 * amountToDepositBN / amountToDepositBN2;

                        // Only handle max amount setting if we needed adjustment
                        if (needsAdjustment) {
                            console.log(`Adjusted amounts B due to ${limitingFactor} being limiting factor`);

                            const positionSelect = document.querySelector('#increase select');
                            const selectedPositionId = positionSelect.value;
                            const position = positionData[selectedPositionId];
                            console.log("Position Stake Increase: ", position);
                            if (!position) return;

                            // Determine which token we're working with
                            const label = amountInputB.closest('.form-group').querySelector('label');
                            let currentTokenSymbol = label.textConten;
                            console.log("Label: ", label);
                            let maxAmount = 0;

                            if (label && label.textContent.includes(position.tokenB)) {
                                currentTokenSymbol = position.tokenB;
                                console.log("Worked");
                                handleMaxButtonClick(currentTokenSymbol, amountInputB);
                            }
                        }





                        updateTotalLiqIncreaseSTAKING();

                    } catch (error) {
                        console.error(`Error in create Position:`, error);
                    }

                    isProgrammaticUpdate = false;
                }




                // Modified getRatioIncreasePositiontokenA function
                async function getRatioIncreasePositiontokenA() {
                    console.log("running: getRatioIncreasePositiontokenA");

                    if (!walletConnected) {
                        await connectWallet();
                    }

                    isProgrammaticUpdate = true;

                    // Get token types from labels within increase page
                    const tokenALabel = document.querySelector('#increase #tokenALabel');
                    const tokenBLabel = document.querySelector('#increase #tokenBLabel');
                    const tokenAInput = document.querySelector('#increase #tokenAAmount');
                    const tokenBInput = document.querySelector('#increase #tokenBAmount');

                    // Get the token values from the label text content
                    const tokenAValue = tokenALabel.textContent;
                    const tokenBValue = tokenBLabel.textContent;

                    console.log("Currently selected value TokenA:", tokenAValue);
                    console.log("Currently selected value TokenB:", tokenBValue);

                    const tokenAAmount = tokenAInput ? tokenAInput.value : '0';
                    const tokenBAmount = tokenBInput ? tokenBInput.value : '0';

                    console.log("Token A Amount:", tokenAAmount);
                    console.log("Token B Amount:", tokenBAmount);

                    const tokenAinputAddress = tokenAddresses[tokenAValue];
                    const tokenBinputAddress = tokenAddresses[tokenBValue];

                    console.log("tokenA InputAddresstoken", tokenAinputAddress);
                    console.log("tokenB InputAddresstoken", tokenBinputAddress);

                    // Simple and reliable approach - select all number inputs in increase page
                    const createInputs = document.querySelectorAll('#increase input[type="number"]');
                    const amountInputA = createInputs[0]; // First number input (Amount A)
                    const amountInputB = createInputs[1]; // Second number input (Amount B)

                    // Add null checks to prevent errors
                    if (!amountInputA || !amountInputB) {
                        console.error("Could not find amount input fields");
                        return;
                    }

                    console.log("Currently amountInputA value:", tokenAAmount);
                    console.log("Currently amountInputB value:", tokenBAmount);

                    await throttledGetSqrtRtAndPriceRatio();

                    // Use the helper function to calculate optimal amounts
                    const result = calculateOptimalAmountsWithTokenAPriority(
                        tokenAValue, tokenBValue,
                        tokenAAmount, tokenBAmount,
                        walletBalances, ratioz
                    );

                    const { amountToDeposit, amountWith8Decimals0xBTC, needsAdjustment, limitingFactor } = result;


                    console.log("!!!!!!!calculateOptimalAmounts amountToDeposit: ", amountToDeposit);
                    console.log("!!!!!!!calculateOptimalAmounts amountWith8Decimals0xBTC: ", amountWith8Decimals0xBTC.toString());
                    console.log("!!!!!!!calculateOptimalAmounts needsAdjustment: ", needsAdjustment);
                    console.log("!!!!!!!calculateOptimalAmounts limitingFactor: ", limitingFactor);
                    console.log("!!!!!!!");

                    try {
                        const amountToDepositBN = ethers.BigNumber.from(amountToDeposit.toString());
                        const amountToDepositBN2 = ethers.BigNumber.from(amountWith8Decimals0xBTC.toString());

                        console.log("tokenAddress: ", tokenAddress);
                        console.log("Address_ZEROXBTC_TESTNETCONTRACT: ", Address_ZEROXBTC_TESTNETCONTRACT.toString());
                        console.log("amountToDepositBN: ", amountToDepositBN.toString());
                        console.log("amountToDepositBN2: ", amountToDepositBN2.toString());
                        console.log("Current_getsqrtPricex96: ", Current_getsqrtPricex96.toString());
                        console.log("HookAddress: ", HookAddress.toString());

                        // Update input fields based on token configuration
                        if (tokenAinputAddress === Address_ZEROXBTC_TESTNETCONTRACT) {
                            amountInputA.value = ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8);
                            amountInputB.value = ethers.utils.formatUnits(amountToDeposit, 18);
                        } else {
                            amountInputA.value = ethers.utils.formatUnits(amountToDeposit, 18);
                            amountInputB.value = ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8);
                        }

                        ratiozToSave = 10000 * amountToDepositBN / amountToDepositBN2;

                        // Only handle max amount setting if we needed adjustment
                        // Only handle max amount setting if we needed adjustment
                        if (needsAdjustment) {
                            console.log(`Adjusted amounts A due to ${limitingFactor} being limiting factor`);

                            const positionSelect = document.querySelector('#increase select');
                            const selectedPositionId = positionSelect.value;
                            const position = positionData[selectedPositionId];
                            console.log("Position Stake Increase: ", position);
                            if (!position) return;

                            // Determine which token we're working with
                            const label = amountInputA.closest('.form-group').querySelector('label');
                            let currentTokenSymbol = label.textConten;
                            console.log("Label: ", label);
                            let maxAmount = 0;

                            if (label && label.textContent.includes(position.tokenA)) {
                                currentTokenSymbol = position.tokenA;
                                console.log("Worked");
                                handleMaxButtonClick(currentTokenSymbol, amountInputA);

                            }
                        }




                        updateTotalLiqIncrease();

                    } catch (error) {
                        console.error(`Error in create Position:`, error);
                    }

                    isProgrammaticUpdate = false;
                }


                // Solution 1: Using ethers.js BigNumber for precision arithmetic
                function addWithPrecision(value1, value2, decimals = 18) {
                    // Convert to BigNumber, add, then format back
                    console.log("Value1 : ", value1.toString());
                    console.log("Value2 : ", value2.toString());
                    const parts = value1.toString().split('.');
                    const truncatedValue = parts.length > 1
                        ? parts[0] + '.' + parts[1].substring(0, decimals)
                        : value1.toString();

                    const bigNum1 = ethers.utils.parseUnits(truncatedValue, decimals);

                    const parts2 = value2.toString().split('.');
                    const truncatedValue2 = parts2.length > 1
                        ? parts2[0] + '.' + parts2[1].substring(0, decimals)
                        : value2.toString();

                    const bigNum2 = ethers.utils.parseUnits(truncatedValue2, decimals);

                    const sum = bigNum1.add(bigNum2);

                    // Convert back to string with proper decimals
                    return ethers.utils.formatUnits(sum, decimals);
                }
// Track enabled state for each button ID
const buttonStates = {};

function isEnabled(id, bool = null) {
    if (bool !== null) {
        // Setter: set the state
        buttonStates[id] = bool;
        return bool;
    } else {
        // Getter: return the state (default to true if not set)
        return buttonStates[id] !== false;
    }
}


                function disableButtonWithSpinner(ID, msg = '<span class="spinner"></span> Approve transactions in wallet...') {
    // Check if already disabled
    if (!isEnabled(ID)) {
        console.log(`Button ${ID} is already disabled`);
        return;
    }
    
    // Set state to disabled
    isEnabled(ID, false);
                    inFunctionDontRefresh = true;
                    console.log("inFunctionDontRefresh disableButtonwith Spinner: ",inFunctionDontRefresh);

                    const btn = document.getElementById(ID);
                    if (!btn) {
                        console.error(`Button with ID '${ID}' not found`);
                        return;
                    }

                    // Store original text and onclick attribute
                    if (!btn.dataset.originalText) {
                        btn.dataset.originalText = btn.innerHTML;
                    }
                    if (!btn.dataset.originalOnclick) {
                        btn.dataset.originalOnclick = btn.getAttribute('onclick') || '';
                    }

                    // Disable the button
                    btn.disabled = true;
                    btn.setAttribute('disabled', 'disabled');
                    btn.style.pointerEvents = 'none';  // Prevents any click events
                    btn.style.opacity = '0.6';         // Visual feedback that it's disabled
                    btn.innerHTML = msg;

                    // Add a class for styling and identification
                    btn.classList.add('btn-disabled-spinner');
                }

                function enableButton(ID, originalText = null) {

                      // Check if already enabled
    if (isEnabled(ID)) {
        console.log(`Button ${ID} is already enabled`);
        return;
    }
    
    // Set state to enabled
    isEnabled(ID, true);
                    inFunctionDontRefresh = false;
                    console.log("inFunctionDontRefresh enableButton: ",inFunctionDontRefresh);

                    const btn = document.getElementById(ID);
                    if (!btn) {
                        console.error(`Button with ID '${ID}' not found`);
                        return;
                    }

                    // Re-enable the button
                    btn.disabled = false;
                    btn.removeAttribute('disabled');
                    btn.style.pointerEvents = '';      // Restore click events
                    btn.style.opacity = '';            // Restore original opacity

                    // Restore original text
                    if (originalText) {
                        btn.innerHTML = originalText;
                    } else if (btn.dataset.originalText) {
                        btn.innerHTML = btn.dataset.originalText;
                    }

                    // Restore original onclick attribute if it existed
                    if (btn.dataset.originalOnclick && btn.dataset.originalOnclick !== '') {
                        btn.setAttribute('onclick', btn.dataset.originalOnclick);
                    }

                    // Clean up stored data
                    delete btn.dataset.originalText;
                    delete btn.dataset.originalOnclick;

                    // Remove the disabled class
                    btn.classList.remove('btn-disabled-spinner');
                }



                async function getCreatePosition() {
                    if (!walletConnected) {
                        await connectWallet();
                    }
                    disableButtonWithSpinner('getCreatePositionBtn');

                    var selectSlippage = document.getElementById('slippageToleranceCreate');
                    var selectSlippageValue = selectSlippage.value; // Returns: "0.1", "0.5", "1.0", or "2.0"
                    numberValueSlippage = parseFloat(selectSlippageValue.replace('%', ''));
                    // Divide by 100 to get decimal
                    const decimalValueSlippage = numberValueSlippage / 100;
                    console.log("selectSlippageValue: ", selectSlippageValue);
                    console.log("decimalValueSlippage: ", decimalValueSlippage);

                    const tokenASelect = document.querySelector('#create .form-group:nth-child(1) select');


                    // Get the currently selected value
                    const tokenAValue = tokenASelect.value;
                    console.log("Currently selected value TokenA:", tokenAValue);


                    const tokenBSelect = document.querySelector('#create .form-group:nth-child(2) select');


                    // Get the currently selected value
                    const tokenBvalue = tokenBSelect.value;
                    console.log("Currently selected value TokenB:", tokenBvalue);

                    // Or get the selected option element itself
                    const selectedOptionA = tokenASelect.options[tokenASelect.selectedIndex];
                    const selectedOptionB = tokenBSelect.options[tokenBSelect.selectedIndex];
                    console.log("selectedOptionA option text:", selectedOptionA.text);
                    console.log("selectedOptionA option value:", selectedOptionA.value);
                    console.log("selectedOptionB option text:", selectedOptionB.text);
                    console.log("selectedOptionB option value:", selectedOptionB.value);

                    var tokenAinputAddress = tokenAddresses[selectedOptionA.value];
                    var tokenBinputAddress = tokenAddresses[selectedOptionB.value];
                    console.log("tokenA InputAddresstoken", tokenAinputAddress);
                    console.log("tokenB InputAddresstoken", tokenBinputAddress);

                    // Simple and reliable approach - select all number inputs in create page
                    const createInputs = document.querySelectorAll('#create input[type="number"]');
                    const amountInputA = createInputs[0]; // First number input (Amount A)
                    const amountInputB = createInputs[1]; // Second number input (Amount B)

                    // Add null checks to prevent errors
                    if (!amountInputA || !amountInputB) {
                        console.error("Could not find amount input fields");
                        return;
                    }

                    // Get the currently selected values
                    const tokenAInput = amountInputA.value;
                    const tokenBInput = amountInputB.value;

                    console.log("Currently amountInputA value:", tokenAInput);
                    console.log("Currently amountInputB value:", tokenBInput);


                    var amountAtoCreate = ethers.utils.parseUnits(tokenAInput, 18);  // Correctly represents 12 * 10^8

                    if (selectedOptionA.value == "0xBTC") {
                        console.log("LOGGED 0xBTC selected A Value, createPosition");
                        amountAtoCreate = ethers.utils.parseUnits(tokenAInput, 8);  // Correctly represents 12 * 10^8
                    }

                    console.log("Currently amountInputB value:", tokenBInput);
                    var amountBtoCreate = ethers.utils.parseUnits(tokenBInput, 18);  // Correctly represents 12 * 10^8

                    if (selectedOptionB.value == "0xBTC") {
                        console.log("LOGGED 0xBTC selected B Valu, createPositione");
                        amountBtoCreate = ethers.utils.parseUnits(tokenBInput, 8);  // Correctly represents 12 * 10^8
                    }


                    let amountOut = 0;

                    await throttledGetSqrtRtAndPriceRatio();



                    let amountToDeposit = ethers.utils.parseEther("200");  // 200 * 10^18 for B0x token
                    var amountToDepositOfZer0X = ethers.utils.parseUnits("100", 8); // 0.01 * 10^8 for 0xBTC
                    var amountWith8Decimals0xBTC = 0n;
                    let liquiditySalt = 0; // Declare once outside the if/else


                    if (tokenAinputAddress == Address_ZEROXBTC_TESTNETCONTRACT) {
                        // TokenB is 0xBTC, calculate how much TokenA (B0x) is needed
                        console.log("TokenA is 0xBTC, calculating TokenB amount");

                        const calculatedPriceRatio = BigInt(ratioz);
                        var priceIn18Decimals = 0n;
                        if (BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) > BigInt(tokenAddresses['B0x'].toLowerCase())) {
                            // INVERTED: Use division instead of multiplication
                            priceIn18Decimals = (10n ** 36n) / (calculatedPriceRatio * (10n ** 10n)); // Invert the ratio
                            const amountZer0XIn18Decimals = BigInt(amountAtoCreate) * 10n ** 10n;
                            amountToDeposit = (amountZer0XIn18Decimals * priceIn18Decimals) / (10n ** 18n);
                            console.log("0xBTC bigger than b0x.  b0x smaller than 0xBTC");
                        } else {
                            // 0xBTC > B0x: Use direct multiplication instead of complex inversion
                            const amountZer0XIn18Decimals = BigInt(amountAtoCreate) * 10n ** 10n;
                            priceIn18Decimals = calculatedPriceRatio / (10n ** 10n); // Convert 29 decimals to 18 decimals (29-18=11)
                            amountToDeposit = (amountZer0XIn18Decimals * priceIn18Decimals) / (10n ** 18n); // Standard division
                            console.log("B0x bigger than 0xBTC. 0xBTC smaller than B0x");
                        }


                        amountWith8Decimals0xBTC = amountAtoCreate;

                        console.log(`fTokenA (0xBTC) amount: ${ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8)}`);
                        console.log(`fCalculated TokenB (B0x) amount: ${ethers.utils.formatEther(amountToDeposit)}`);



                    } else {
                        // Start with b0x amount (this could be user input or calculated value)
                        var amountB0x = BigInt(amountAtoCreate); // Your b0x input
                        console.log("Amount B0x input: ", amountB0x.toString());
                        const priceRatio2 = BigInt(ratioz);
                        console.log(`priceRatio: ${priceRatio2}`);

                        // Apply the same address comparison logic for ratio handling
                        var adjustedPriceRatio = 0n;
                        if (BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) > BigInt(tokenAddresses['B0x'].toLowerCase())) {
                            adjustedPriceRatio = (10n ** 36n) / (priceRatio2 * (10n ** 10n)); // Invert the ratio
                            amountAtoCreate = (amountB0x * (10n ** 18n)) / adjustedPriceRatio / (10n ** 10n); // Divide by 10^10 to convert from 18 to 8 decimals

                            console.log("22 0xBTC bigger than b0x.  b0x smaller than 0xBTC");
                        } else {
                            const b0xInput = BigInt(amountAtoCreate); // Your B0x input
                            const priceRatio = BigInt(ratioz);

                            console.log("22 B0x bigger than 0xBTC. 0xBTC smaller than B0x");
                            console.log(`B0x input: ${b0xInput}`);
                            console.log(`Price ratio: ${priceRatio}`);

                            // Calculate 0xBTC needed from B0x amount
                            // Formula: 0xBTC = B0x / price_ratio
                            // Since priceRatio is in 29 decimals, and B0x is in 18 decimals
                            amountB0x = (b0xInput * 10n ** 28n) / priceRatio / 10n ** 10n; // Convert to 8 decimals for 0xBTC

                            // Keep the original B0x amount
                            amountAtoCreate = b0xInput;

                            console.log(`Calculated 0xBTC: ${amountB0x}`);
                            console.log(`Original B0x: ${amountAtoCreate}`);
                        }

                        amountWith8Decimals0xBTC = amountB0x;
                        amountToDeposit = amountAtoCreate;
                    }


                    console.log("walletBalances: ", walletBalances['0xBTC']);
                    var zeroxbtcdecimal = amountWith8Decimals0xBTC.toString();
                    var wallet_zeroxbtc = ethers.utils.parseUnits(walletBalances['0xBTC'], 8).toString();
                    console.log("amountWith8Decimals0xBTC: ", zeroxbtcdecimal);
                    console.log("wallet_zeroxbtc: ", wallet_zeroxbtc);
                    if (parseFloat(zeroxbtcdecimal) > parseFloat(wallet_zeroxbtc)) {
                        alert("too much 0xbtc u dont have lower it!.")
                        await getMaxCreatePosition();
                        return;
                    }

                    var b0xdecimal = amountToDeposit.toString();
                    var wallet_b0x = ethers.utils.parseUnits(walletBalances['B0x'], 18).toString();
                    console.log("amountWith b0xdecimal:  ", b0xdecimal);
                    console.log("wallet_b0x: ", wallet_b0x);

                    if (parseFloat(b0xdecimal) > parseFloat(wallet_b0x)) {
                        alert("too much b0x u dont have lower it!.")
                        await getMaxCreatePosition();
                        return;
                    }


                    const amountToDepositBN = ethers.BigNumber.from(amountToDeposit.toString());
                    const amountToDepositBN2 = ethers.BigNumber.from(amountWith8Decimals0xBTC.toString());


                    try {

                        console.log("tokenAddress: ", tokenAddress);

                        console.log("Address_ZEROXBTC_TESTNETCONTRACT: ", Address_ZEROXBTC_TESTNETCONTRACT.toString());

                        console.log("amountToDepositBN: ", amountToDepositBN.toString());
                        console.log("amountToDepositBN2: ", amountToDepositBN2.toString());
                        console.log("Current_getsqrtPricex96: ", Current_getsqrtPricex96.toString());
                        console.log("HookAddress: ", HookAddress.toString());
                        alert("approving tokens for create position!");
                        await approveIfNeeded(tokenAddress, contractAddress_Swapper, amountToDepositBN);
                        await approveIfNeeded(Address_ZEROXBTC_TESTNETCONTRACT, contractAddress_Swapper, amountToDepositBN2);

                        var slippage = Math.floor(numberValueSlippage * 100);
                        console.log("Slippage = ", slippage);
                        console.log("Slippage % = ", (slippage / 100), "%");

                        showInfoNotification('Confirm Create Position', 'Confirm the create position transaction in your wallet');
                        const tx = await tokenSwapperContract.createPositionWith2Tokens(
                            tokenAddress,
                            Address_ZEROXBTC_TESTNETCONTRACT,
                            amountToDepositBN,
                            amountToDepositBN2,
                            Current_getsqrtPricex96,
                            slippage,
                            HookAddress,
                            userAddress
                        );

                        /*
                        
                        const amountToSwapBN = ethers.BigNumber.from(amountToSwap.toString());
                        const minAmountOutBN = ethers.BigNumber.from(MinamountOut.toFixed(0).toString());
                        
                        
                        
                                    try {
                                        // Call the swap function
                                        const tx = await tokenSwapperContract.swapTokenTWOTOKENS(
                                            tokenAddress, 
                                            Address_ZEROXBTC_TESTNETCONTRACT, 
                                            tokenAddress, 
                                            Address_ZEROXBTC_TESTNETCONTRACT, 
                                            amountToSwapBN, 
                                            minAmountOutBN, 
                                            HookAddress, 
                                            userAddress
                                        );
                                        */

                        if (tokenAinputAddress == Address_ZEROXBTC_TESTNETCONTRACT) {
                            amountInputB.value = ethers.utils.formatUnits(amountToDeposit, 18);
                            amountInputA.value = ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8);
                        } else {
                            amountInputB.value = ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8);
                            amountInputA.value = ethers.utils.formatUnits(amountToDeposit, 18);
                        }

                        ratiozToSave = 10000 * amountToDepositBN / amountToDepositBN2;

                        showInfoNotification();
                        await tx.wait();
                        console.log("Transaction confirmed!");
                        //alert("Successful Swap!");
                        showSuccessNotification('Create Position!', 'Transaction confirmed you have created a liquidity position', tx.hash);

                        console.log("create Position transaction sent:", tx.hash);
                        console.log("Transaction confirmed!");
                        //alert("Successfully created position!");
                        new Promise(resolve => setTimeout(resolve, 2000));

                        enableButton('getCreatePositionBtn', 'Create Position');
                        fetchBalances();

                        getTokenIDsOwnedByMetamask();
                    } catch (error) {
                        console.error(`Error  create Position :`, error);

                        enableButton('getCreatePositionBtn', 'Create Position');
                    }
                }






                let maxCreatedWhen = Date.now() - 5000;



                async function getMaxCreatePosition() {
                    maxCreatedWhen = Date.now(); // Save current timestamp in milliseconds

                    if (!walletConnected) {
                        await connectWallet();
                    }

                    const tokenASelect = document.querySelector('#create .form-group:nth-child(1) select');


                    // Get the currently selected value
                    const tokenAValue = tokenASelect.value;
                    console.log("Currently selected value TokenA:", tokenAValue);


                    const tokenBSelect = document.querySelector('#create .form-group:nth-child(2) select');


                    // Get the currently selected value
                    const tokenBvalue = tokenBSelect.value;
                    console.log("Currently selected value TokenB:", tokenBvalue);

                    // Or get the selected option element itself
                    const selectedOptionA = tokenASelect.options[tokenASelect.selectedIndex];
                    const selectedOptionB = tokenBSelect.options[tokenBSelect.selectedIndex];
                    console.log("selectedOptionA option text:", selectedOptionA.text);
                    console.log("selectedOptionA option value:", selectedOptionA.value);
                    console.log("selectedOptionB option text:", selectedOptionB.text);
                    console.log("selectedOptionB option value:", selectedOptionB.value);

                    var tokenAinputAddress = tokenAddresses[selectedOptionA.value];
                    var tokenBinputAddress = tokenAddresses[selectedOptionB.value];
                    console.log("tokenA InputAddresstoken", tokenAinputAddress);
                    console.log("tokenB InputAddresstoken", tokenBinputAddress);

                    // Simple and reliable approach - select all number inputs in create page
                    const createInputs = document.querySelectorAll('#create input[type="number"]');
                    const amountInputA = createInputs[0]; // First number input (Amount A)
                    const amountInputB = createInputs[1]; // Second number input (Amount B)

                    // Add null checks to prevent errors
                    if (!amountInputA || !amountInputB) {
                        console.error("Could not find amount input fields");
                        return;
                    }

                    // Get the currently selected values
                    const tokenAInput = amountInputA.value;
                    const tokenBInput = amountInputB.value;

                    console.log("Currently amountInputA value:", tokenAInput);
                    console.log("Currently amountInputB value:", tokenBInput);


                    var amountAtoCreate = 0;  // Correctly represents 12 * 10^8

                    if (selectedOptionA.value == "0xBTC") {
                        console.log("LOGGED 0xBTC selected A Value, getMaxCreate");
                        amountAtoCreate = ethers.utils.parseUnits(walletBalances['0xBTC'], 8);  // Correctly represents 12 * 10^8
                    } else {
                        amountAtoCreate = ethers.utils.parseUnits(walletBalances['B0x'], 18);  // Correctly represents 12 * 10^8
                    }

                    //console.log("Currently amountInputB value:", tokenBInput);
                    var amountBtoCreate = 0;  // Correctly represents 12 * 10^8

                    if (selectedOptionB.value == "0xBTC") {
                        console.log("LOGGED 0xBTC selected B Value, getMaxCreate");
                        amountBtoCreate = ethers.utils.parseUnits(walletBalances['0xBTC'], 8);  // Correctly represents 12 * 10^8
                    } else {
                        amountBtoCreate = ethers.utils.parseUnits(walletBalances['B0x'], 18);  // Correctly represents 12 * 10^8
                    }


                    let amountOut = 0;
                    await throttledGetSqrtRtAndPriceRatio();


                    let amountToDeposit = ethers.utils.parseEther("200");  // 200 * 10^18 for B0x token
                    var amountToDepositOfZer0X = ethers.utils.parseUnits("100", 8); // 0.01 * 10^8 for 0xBTC
                    var amountWith8Decimals0xBTC = 0n;
                    let liquiditySalt = 0; // Declare once outside the if/else


                    /*
                      
                        if(tokenAinputAddress == Address_ZEROXBTC_TESTNETCONTRACT) {
                            console.log(`Found valid Ratio: ${ratioz.toString()}`);
                            console.log("TokenA == zer0x Token (0xBTC is token0, B0x is token1)");
                            calculatedPriceRatio = BigInt(ratioz);
                            amountWith8Decimals0xBTC = amountAtoCreate;
                            console.log("amountWith8Decimals0xBTCamountWith8Decimals0xBTC: ",amountWith8Decimals0xBTC.toString());
                                
                            var priceIn18Decimals = 0n;
                            if(BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) > BigInt(tokenAddresses['B0x'].toLowerCase())){
                                    // INVERTED: Use division instead of multiplication
                                    priceIn18Decimals = (10n**36n) / (calculatedPriceRatio * (10n**10n)); // Invert the ratio
                                } else {
                                    // INVERTED: Use division instead of multiplication  
                                    priceIn18Decimals = (10n**36n) / (calculatedPriceRatio / (10n**10n)); // Invert the ratio
                                }
                                console.log("Price in 18-decimal format:", priceIn18Decimals.toString());
                                
                                const amountZer0XIn18Decimals = BigInt(amountAtoCreate) * 10n**10n; // Convert 8-decimal to 18-decimal
                                amountToDeposit = (amountZer0XIn18Decimals * priceIn18Decimals) / (10n**18n);
                                
                                console.log(`Estimated Deposit B0x amount: ${ethers.utils.formatEther(amountToDeposit)}`);
                                console.log(`Estimated Deposit 0xBTC amount: ${ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8)}`);
                                console.log(`amountWith8Decimals0xBTC: ${amountWith8Decimals0xBTC}`);
                                console.log(`amountToDeposit: ${amountToDeposit}`);
                    } else { 
                                            // Start with b0x amount (this could be user input or calculated value)
                        var amountB0x = BigInt(amountAtoCreate); // Your b0x input
                        console.log("Amount B0x input: ", amountB0x.toString());
                        const priceRatio2 = BigInt(ratioz);
                        console.log(`priceRatio: ${priceRatio2}`);
            
                        // Apply the same address comparison logic for ratio handling
                        var adjustedPriceRatio = 0n;
                        if(BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) > BigInt(tokenAddresses['B0x'].toLowerCase())){
                            adjustedPriceRatio = (10n**36n) / (priceRatio2 * (10n**10n)); // Invert the ratio
                        } else {
                            adjustedPriceRatio =(10n**36n) / (priceRatio2 / (10n**10n)); // Invert the ratio
                        }
                        console.log(`Adjusted Price ratio: ${adjustedPriceRatio}`);
            
                        // Calculate 0xBTC amount by DIVIDING B0x amount by price ratio
                        // Need to account for decimal differences: B0x is 18 decimals, 0xBTC is 8 decimals
                        amountAtoCreate = (amountB0x * (10n**18n)) / adjustedPriceRatio / (10n**10n); // Divide by 10^10 to convert from 18 to 8 decimals
            
                        var temp = amountB0x;
                        amountB0x = amountAtoCreate;
                        amountAtoCreate = temp;
            
                        console.log(`Estimated Deposit 0xBTC amount: ${amountB0x}`);
                        console.log(`Estimated Deposit B0x amount: ${amountAtoCreate}`);
                        console.log(`Estimated Deposit 0xBTC amount: ${ethers.utils.formatUnits(amountB0x, 8)}`);
                        console.log(`Estimated Deposit B0x amount: ${ethers.utils.formatEther(amountAtoCreate)}`);
                        amountToDeposit = amountAtoCreate;
                        amountWith8Decimals0xBTC = amountB0x;
            
                                
                    }*/

                    if (tokenAinputAddress == Address_ZEROXBTC_TESTNETCONTRACT) {
                        // TokenB is 0xBTC, calculate how much TokenA (B0x) is needed
                        console.log("TokenA is 0xBTC, calculating TokenB amount");

                        const calculatedPriceRatio = BigInt(ratioz);
                        var priceIn18Decimals = 0n;
                        if (BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) > BigInt(tokenAddresses['B0x'].toLowerCase())) {
                            // INVERTED: Use division instead of multiplication
                            priceIn18Decimals = (10n ** 36n) / (calculatedPriceRatio * (10n ** 10n)); // Invert the ratio
                            const amountZer0XIn18Decimals = BigInt(amountAtoCreate) * 10n ** 10n;
                            amountToDeposit = (amountZer0XIn18Decimals * priceIn18Decimals) / (10n ** 18n);
                            console.log("0xBTC bigger than b0x.  b0x smaller than 0xBTC");
                        } else {
                            // 0xBTC > B0x: Use direct multiplication instead of complex inversion
                            const amountZer0XIn18Decimals = BigInt(amountAtoCreate) * 10n ** 10n;
                            priceIn18Decimals = calculatedPriceRatio / (10n ** 10n); // Convert 29 decimals to 18 decimals (29-18=11)
                            amountToDeposit = (amountZer0XIn18Decimals * priceIn18Decimals) / (10n ** 18n); // Standard division
                            console.log("B0x bigger than 0xBTC. 0xBTC smaller than B0x");
                        }


                        amountWith8Decimals0xBTC = amountAtoCreate;

                        console.log(`fTokenA (0xBTC) amount: ${ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8)}`);
                        console.log(`fCalculated TokenB (B0x) amount: ${ethers.utils.formatEther(amountToDeposit)}`);



                    } else {
                        // Start with b0x amount (this could be user input or calculated value)
                        var amountB0x = BigInt(amountAtoCreate); // Your b0x input
                        console.log("Amount B0x input: ", amountB0x.toString());
                        const priceRatio2 = BigInt(ratioz);
                        console.log(`priceRatio: ${priceRatio2}`);

                        // Apply the same address comparison logic for ratio handling
                        var adjustedPriceRatio = 0n;
                        if (BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) > BigInt(tokenAddresses['B0x'].toLowerCase())) {
                            adjustedPriceRatio = (10n ** 36n) / (priceRatio2 * (10n ** 10n)); // Invert the ratio
                            amountAtoCreate = (amountB0x * (10n ** 18n)) / adjustedPriceRatio / (10n ** 10n); // Divide by 10^10 to convert from 18 to 8 decimals

                            console.log("22 0xBTC bigger than b0x.  b0x smaller than 0xBTC");
                        } else {
                            const b0xInput = BigInt(amountAtoCreate); // Your B0x input
                            const priceRatio = BigInt(ratioz);

                            console.log("22 B0x bigger than 0xBTC. 0xBTC smaller than B0x");
                            console.log(`B0x input: ${b0xInput}`);
                            console.log(`Price ratio: ${priceRatio}`);

                            // Calculate 0xBTC needed from B0x amount
                            // Formula: 0xBTC = B0x / price_ratio
                            // Since priceRatio is in 29 decimals, and B0x is in 18 decimals
                            amountB0x = (b0xInput * 10n ** 28n) / priceRatio / 10n ** 10n; // Convert to 8 decimals for 0xBTC

                            // Keep the original B0x amount
                            amountAtoCreate = b0xInput;

                            console.log(`Calculated 0xBTC: ${amountB0x}`);
                            console.log(`Original B0x: ${amountAtoCreate}`);

                            var temp = amountB0x;
                            amountB0x = amountAtoCreate;
                            amountAtoCreate = temp;

                        }


                        console.log(`Adjusted Price ratio: ${adjustedPriceRatio}`);

                        // Calculate 0xBTC amount by DIVIDING B0x amount by price ratio
                        // Need to account for decimal differences: B0x is 18 decimals, 0xBTC is 8 decimals


                        console.log(`Estimated Deposit 0xBTC amount: ${amountAtoCreate}`);
                        console.log(`Estimated Deposit B0x amount: ${amountB0x}`);
                        console.log(`Estimated Deposit 0xBTC amount: ${ethers.utils.formatUnits(amountAtoCreate, 8)}`);
                        console.log(`Estimated Deposit B0x amount: ${ethers.utils.formatEther(amountB0x)}`);
                        amountToDeposit = amountB0x;
                        amountWith8Decimals0xBTC = amountAtoCreate;


                    }


                    console.log("walletBalances: ", walletBalances['0xBTC']);
                    var zeroxbtcdecimal = amountWith8Decimals0xBTC.toString();
                    var wallet_zeroxbtc = ethers.utils.parseUnits(walletBalances['0xBTC'], 8).toString();
                    console.log("amountWith8Decimals0xBTC: ", zeroxbtcdecimal);
                    console.log("wallet_zeroxbtc: ", wallet_zeroxbtc);
                    const calculatedPriceRatio = BigInt(ratioz);
                    if (parseFloat(zeroxbtcdecimal) > parseFloat(wallet_zeroxbtc)) {


                        console.log("too much 0xbtc u dont have lower it!.");

                        // Case 2: B0x first - FIXED CALCULATION
                        console.log(`Found valid Ratio: ${ratioz.toString()}`);
                        console.log("TokenA == B0x Token (B0x is token0, 0xBTC is token1)");

                        // If you're starting with 0xBTC amount and want to calculate B0x needed:
                        amountWith8Decimals0xBTC = BigInt(wallet_zeroxbtc); // 0xBTC amount (8 decimals)

                        console.log("Amount 0xBTC to use: ", amountWith8Decimals0xBTC.toString());
                        const priceRatio = BigInt(ratioz);
                        console.log(`priceRatio: ${priceRatio}`);

                        /*Apply the same address comparison logic for ratio handling
                        var adjustedPriceRatio = 0n;
                        if(BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) > BigInt(tokenAddresses['B0x'].toLowerCase())){
                            adjustedPriceRatio = (10n**36n) / (priceRatio * (10n**10n)); // Invert the ratio
                        } else {
                            adjustedPriceRatio = (10n**36n) / (priceRatio / (10n**10n)); // Invert the ratio
                        }
        */

                        if (BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) > BigInt(tokenAddresses['B0x'].toLowerCase())) {
                            // INVERTED: Use division instead of multiplication
                            priceIn18Decimals = (10n ** 36n) / (calculatedPriceRatio * (10n ** 10n)); // Invert the ratio
                            const amountZer0XIn18Decimals = BigInt(amountWith8Decimals0xBTC) * 10n ** 10n;
                            amountToDeposit = (amountZer0XIn18Decimals * priceIn18Decimals) / (10n ** 18n);
                            console.log("0xBTC bigger than b0x.  b0x smaller than 0xBTC");
                        } else {
                            // 0xBTC > B0x: Use direct multiplication instead of complex inversion
                            const amountZer0XIn18Decimals = BigInt(amountWith8Decimals0xBTC) * 10n ** 10n;
                            priceIn18Decimals = calculatedPriceRatio / (10n ** 10n); // Convert 29 decimals to 18 decimals (29-18=11)
                            amountToDeposit = (amountZer0XIn18Decimals * priceIn18Decimals) / (10n ** 18n); // Standard division
                            console.log("B0x bigger than 0xBTC. 0xBTC smaller than B0x");
                        }

                    }


                    var b0xdecimal = amountToDeposit.toString();
                    var wallet_b0x = ethers.utils.parseUnits(walletBalances['B0x'], 18).toString();
                    console.log("amountWith b0xdecimal:  ", b0xdecimal);
                    console.log("wallet_b0x: ", wallet_b0x);

                    if (parseFloat(b0xdecimal) > parseFloat(wallet_b0x)) {
                        console.log("too much b0x u dont have lower it!.");
                        console.log(`Found valid Ratio: ${ratioz.toString()}`);
                        console.log("Using available B0x balance to calculate 0xBTC needed");

                        // Start with available B0x amount (18 decimals)
                        amountToDeposit = BigInt(wallet_b0x); // B0x amount (18 decimals)
                        console.log("Available B0x amount to use: ", amountToDeposit.toString());

                        const priceRatio = BigInt(ratioz);
                        console.log(`priceRatio: ${priceRatio}`);


                        var amountB0x = amountToDeposit; // Your b0x input
                        console.log("Amount B0x input: ", amountB0x.toString());
                        const priceRatio2 = BigInt(ratioz);
                        console.log(`priceRatio: ${priceRatio2}`);

                        // Apply the same address comparison logic for ratio handling
                        var adjustedPriceRatio = 0n;
                        if (BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) > BigInt(tokenAddresses['B0x'].toLowerCase())) {
                            adjustedPriceRatio = (10n ** 36n) / (priceRatio2 * (10n ** 10n)); // Invert the ratio
                            amountAtoCreate = (amountB0x * (10n ** 18n)) / adjustedPriceRatio / (10n ** 10n); // Divide by 10^10 to convert from 18 to 8 decimals

                            console.log("22 0xBTC bigger than b0x.  b0x smaller than 0xBTC");

                            amountWith8Decimals0xBTC = amountAtoCreate;

                        } else {
                            const b0xInput = BigInt(wallet_b0x); // Your B0x input
                            const priceRatio = BigInt(ratioz);

                            console.log("22 B0x bigger than 0xBTC. 0xBTC smaller than B0x");
                            console.log(`B0x input: ${b0xInput}`);
                            console.log(`Price ratio: ${priceRatio}`);

                            // Calculate 0xBTC needed from B0x amount
                            // Formula: 0xBTC = B0x / price_ratio
                            // Since priceRatio is in 29 decimals, and B0x is in 18 decimals
                            amountB0x = (b0xInput * 10n ** 28n) / priceRatio / 10n ** 10n; // Convert to 8 decimals for 0xBTC

                            // Keep the original B0x amount
                            amountAtoCreate = b0xInput;

                            console.log(`Calculated 0xBTC: ${amountB0x}`);
                            console.log(`Original B0x: ${amountAtoCreate}`);

                            amountWith8Decimals0xBTC = amountB0x;
                        }


                        /*
                                        // Apply the same address comparison logic for ratio handling
                                        var adjustedPriceRatio = 0n;
                                        if(BigInt(Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase()) > BigInt(tokenAddresses['B0x'].toLowerCase())){
                                            adjustedPriceRatio = (10n**36n) / (priceRatio * (10n**10n)); // Invert the ratio
                                            const amountZer0XIn18Decimals = (amountToDeposit * (10n**18n)) / adjustedPriceRatio;
                                            amountWith8Decimals0xBTC = amountZer0XIn18Decimals / (10n**10n); // Convert 18→8 decimals
                                        } else {
                                            adjustedPriceRatio = (10n**36n) / (priceRatio / (10n**10n)); // Invert the ratio
                                        }
                                        console.log(`Adjusted Price ratio: ${adjustedPriceRatio}`);
                                        */
                        // Calculate 0xBTC needed from B0x amount

                        console.log(`Estimated Deposit B0x amount: ${ethers.utils.formatEther(amountToDeposit)}`);
                        console.log(`Estimated Deposit 0xBTC amount: ${ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8)}`);
                        console.log(`B0x amount raw: ${amountToDeposit}`);
                        console.log(`0xBTC amount raw: ${amountWith8Decimals0xBTC}`);
                    }
                    /*
                    
                        function createPositionWith2Tokens(
                            address token,
                            address token2,
                            uint256 amountIn,
                            uint256 amountIn2,
                            uint currentx96,        // Expected sqrtPriceX96 when user initiated tx
                            uint256 slippage,       // Slippage tolerance in basis points (e.g., 100 = 1%)
                            address hookAddress,
                            address toSendNFTto) public payable returns (bool)
                                {
                    */

                    const amountToDepositBN = ethers.BigNumber.from(amountToDeposit.toString());
                    const amountToDepositBN2 = ethers.BigNumber.from(amountWith8Decimals0xBTC.toString());


                    try {

                        console.log("tokenAddress: ", tokenAddress);

                        console.log("Address_ZEROXBTC_TESTNETCONTRACT: ", Address_ZEROXBTC_TESTNETCONTRACT.toString());

                        console.log("amountToDepositBN: ", amountToDepositBN.toString());
                        console.log("amountToDepositBN2: ", amountToDepositBN2.toString());
                        console.log("Current_getsqrtPricex96: ", Current_getsqrtPricex96.toString());
                        console.log("HookAddress: ", HookAddress.toString());


                        /*
                        
                        const amountToSwapBN = ethers.BigNumber.from(amountToSwap.toString());
                        const minAmountOutBN = ethers.BigNumber.from(MinamountOut.toFixed(0).toString());
                        
                        
                        
                                    try {
                                        // Call the swap function
                                        const tx = await tokenSwapperContract.swapTokenTWOTOKENS(
                                            tokenAddress, 
                                            Address_ZEROXBTC_TESTNETCONTRACT, 
                                            tokenAddress, 
                                            Address_ZEROXBTC_TESTNETCONTRACT, 
                                            amountToSwapBN, 
                                            minAmountOutBN, 
                                            HookAddress, 
                                            userAddress
                                        );
                                        */

                        if (tokenAinputAddress == Address_ZEROXBTC_TESTNETCONTRACT) {
                            console.log("Check this out: ");
                            console.log("Check this out amountToDeposit: ", amountToDeposit);
                            console.log("Check this out amountWith8Decimals0xBTC: ", amountWith8Decimals0xBTC);
                            amountInputB.value = ethers.utils.formatUnits(amountToDeposit, 18);
                            amountInputA.value = ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8);
                            console.log("THISRIGHT HUR");
                            ratiozToSave = 10 ** 16 * amountInputB.value / amountInputA.value;
                        } else {
                            amountInputB.value = ethers.utils.formatUnits(amountWith8Decimals0xBTC, 8);
                            amountInputA.value = ethers.utils.formatUnits(amountToDeposit, 18);
                            ratiozToSave = 10 ** 16 / amountInputB.value / amountInputA.value;
                        }


                    } catch (error) {
                        console.error(`Error  create Position :`, error);
                    }
                }








                let Current_getsqrtPricex96 = toBigNumber(0);

                let firstRun = false;
                let ratioz = toBigNumber(0);


                async function getSqrtRtAndPriceRatio(nameOfFunction) {

                    if (!walletConnected) {
                        await connectWallet();
                    }

                    const tokenSwapperABI = [
                        // Your existing createPosition function
                        { "inputs": [{ "name": "token", "type": "address" }, { "name": "token2", "type": "address" }, { "name": "amountIn", "type": "uint256" }, { "name": "amountIn2", "type": "uint256" }, { "name": "currentx96", "type": "uint256" }, { "name": "slippage", "type": "uint256" }, { "name": "hookAddress", "type": "address" }, { "name": "toSendNFTto", "type": "address" }], "name": "createPositionWith2Tokens", "outputs": [{ "name": "", "type": "bool" }], "stateMutability": "payable", "type": "function" },
                        //get sqrtx96price for us
                        , { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address", "name": "token2", "type": "address" }, { "internalType": "address", "name": "hookAddress", "type": "address" }], "name": "getsqrtPricex96", "outputs": [{ "internalType": "uint160", "name": "", "type": "uint160" }], "stateMutability": "view", "type": "function" }

                        , { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address", "name": "token2", "type": "address" }, { "internalType": "address", "name": "hookAddress", "type": "address" }], "name": "getPriceRatio", "outputs": [{ "internalType": "uint256", "name": "ratio", "type": "uint256" }, { "internalType": "address", "name": "token0z", "type": "address" }, { "internalType": "address", "name": "token1z", "type": "address" }, { "internalType": "uint8", "name": "token0decimals", "type": "uint8" }, { "internalType": "uint8", "name": "token1decimals", "type": "uint8" }], "stateMutability": "view", "type": "function" }
                    ];


                    tokenSwapperContract = new ethers.Contract(
                        contractAddress_Swapper, // your tokenSwapper contract address
                        tokenSwapperABI,
                        signer // Use signer since the function isn't view/pure
                    );

                    let oldratioz = ratioz;
                    try {
                        // Call the view function
                        const result = await tokenSwapperContract.callStatic.getPriceRatio(tokenAddress, Address_ZEROXBTC_TESTNETCONTRACT, HookAddress);




                        // First debug what we're getting back
                        console.log("Raw result type:", typeof result);
                        console.log("Raw result structure:", Object.keys(result).join(", "));
                        ratioz = result[0];



                        console.log(`Found valid Ratio x10**18: ${ratioz.toString()}`);
                        // Format to display as a readable number
                        readableAmountOut = ethers.utils.formatEther(ratioz);
                        ratioAsWei = ethers.utils.parseEther(readableAmountOut);
                        console.log(`Found valid Ratio x10**18: ${readableAmountOut} mutliplier`);
                    } catch (error) {
                        console.error(`Error finding valid getPriceRatio for swap:`, error);
                    }


                    let oldsqrtPricex96 = Current_getsqrtPricex96;

                    try {
                        let oldresult = Current_getsqrtPricex96;
                        // Call the view function
                        const result = await tokenSwapperContract.getsqrtPricex96(tokenAddress, Address_ZEROXBTC_TESTNETCONTRACT, HookAddress);



                        // First debug what we're getting back
                        console.log("Raw result type:", typeof result);
                        console.log("Raw result structure:", Object.keys(result).join(", "));

                        if (typeof result === 'bigint' || typeof result === 'number') {
                            // If it's already a primitive value
                            Current_getsqrtPricex96 = result;
                        } else if (result._isBigNumber || result instanceof ethers.BigNumber) {
                            // For ethers v5 BigNumber
                            Current_getsqrtPricex96 = result;
                        } else if (typeof result === 'object' && result !== null) {
                            // For objects, try to extract the value
                            // With ethers v6, we might get the value directly
                            if (typeof result.toString === 'function' && result.toString().match(/^[0-9]+$/)) {
                                Current_getsqrtPricex96 = result;
                            } else {
                                // Attempt to extract value based on common patterns
                                Current_getsqrtPricex96 = result[0] || result.amountOut || result._hex || result.value || result;
                            }
                        }

                        console.log(`Found valid Current_getsqrtPricex96 x10**18: ${Current_getsqrtPricex96.toString()}`);
                        // Format to display as a readable number
                    } catch (error) {
                        console.error(`Error finding valid Current_getsqrtPricex96 for swap:`, error);
                    }


                    if (!oldsqrtPricex96.eq(Current_getsqrtPricex96)) {
                        console.log("Calling oldsqrtPricex96 != Current_getsqrtPricex96  changed");
                    }
                    if (!oldratioz.eq(ratioz)) {
                        console.log("Calling oldratioz != ratioz  changed");
                        console.log("Calling oldratioz: ", oldratioz, " &&&&  ratioz: ", ratioz);
                    }
                    if ((!oldsqrtPricex96.eq(Current_getsqrtPricex96) || !oldratioz.eq(ratioz)) && firstRun) {
                        console.log("Value changed calling getEstimate, getMaxCreate and getRatio");
                        console.log("Value changed and called from: ", nameOfFunction);
                        if (nameOfFunction != "SwapFunction") {

                            await getEstimate();
                        }
                        await getRatioCreatePositiontokenA();
                        await getRatioIncreasePositiontokenA();
                        await getRatioStakeIncreasePositiontokenA();
                    }
                    oldsqrtPricex96 = Current_getsqrtPricex96;
                    oldratioz = ratioz;
                    firstRun = true;

                }





                async function withdrawStake() {

                    if (!walletConnected) {
                        await connectWallet();
                    }

                    disableButtonWithSpinner('withdrawNFTStakeBtn');
                    const positionSelect = document.querySelector('#staking-main-page .form-group2 select');
                    const selectedPositionId = positionSelect.value;

                    var positionStaking = stakingPositionData[selectedPositionId];
                    if (positionStaking) {
                        console.log("Withdrawing Position: ", positionStaking.id)

                        console.log("Withdrawing Position: ", positionStaking.id);
                        var id = positionStaking.id.replace('stake_position_', '');
                    }





                    const withdrawNFTabi = [
                        {
                            "inputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "tokenId",
                                    "type": "uint256"
                                }
                            ],
                            "name": "withdraw",
                            "outputs": [
                                {
                                    "internalType": "bool",
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        }
                    ];

                    //
                    LPStakingContract = new ethers.Contract(
                        contractAddressLPRewardsStaking, // your tokenSwapper contract address
                        withdrawNFTabi,
                        signer // Use signer since the function isn't view/pure
                    );



                    try {
                        console.log(`Withdrawing this NFT token ${id}...`);


                        showInfoNotification('Withdrawing NFT tokenID ' + id, 'Please confirm transaction in the wallet');


                        // Step 2: Stake the NFT
                        const stakeTx = await LPStakingContract.withdraw(id);

                        showInfoNotification();
                        console.log("Staking transaction sent:", stakeTx.hash);
                        await stakeTx.wait(); // Wait for confirmation
                        console.log("NFT withdrew successfully!");
                        enableButton('withdrawNFTStakeBtn', 'Withraw NFT from Staking');

                        await new Promise(resolve => setTimeout(resolve, 3000));
                        await getRewardStats();
                        showSuccessNotification('Withdrew Uniswap ID: ' + approveThisToken + ' successfully!', 'Transaction confirmed on blockchain', tx.hash)
                        //  alert("NFT withdrew success!");
                        if (WhereToStartSearch > id) {
                            WhereToStartSearch = id - 1;
                            if (WhereToStartSearch < 0) {
                                WhereToStartSearch = 0;
                            }
                        }
                        fetchBalances();
                        getTokenIDsOwnedByMetamask();

                    } catch (error) {
                        enableButton('withdrawNFTStakeBtn', 'Withraw NFT from Staking');

                        console.error("Error approving/staking NFT:", error);
                    }

                    const amount = document.getElementById('stakeAmount').value;
                    if (!amount || amount <= 0) {
                        alert('Please enter a valid amount to withdraw.');
                        return;
                    }
                }





















                async function fetchTokenBalanceWithEthers(tokenAddress, decimals) {

                    if (!walletConnected) {
                        await connectWallet();
                    }

                    console.log("Fetching token Address: ", tokenAddress);
                    if (!window.ethereum) {
                        console.error("MetaMask not detected");
                        return '0';
                    }

                    try {

                        const walletAddress = await signer.getAddress();

                        if (tokenAddress === '0x0000000000000000000000000000000000000000') {
                            const balance = await provider.getBalance(walletAddress);
                            return formatBalanceExact(balance, 18);
                        }

                        const abi = ["function balanceOf(address) view returns (uint256)"];
                        const tokenContract = new ethers.Contract(tokenAddress, abi, provider);
                        const balance = await tokenContract.balanceOf(walletAddress);
                        console.log("Token balance 4, ", tokenAddress, " = ", balance.toString());
                        return formatBalanceExact(balance, decimals);
                    } catch (error) {
                        console.error(`Error fetching token balance for ${tokenAddress}:`, error);
                        return '0';
                    }
                }



                async function fetchTokenBalanceWithEthersETH(tokenAddress, decimals) {

                    if (!walletConnected) {
                        await connectWallet();
                    }

                    console.log("Fetching token Address: ", tokenAddress);
                    if (!window.ethereum) {
                        console.error("MetaMask not detected");
                        return '0';
                    }

                    try {

                        const walletAddress = await signerETH.getAddress();

                        if (tokenAddress === '0x0000000000000000000000000000000000000000') {
                            const balance = await providerETH.getBalance(walletAddress);
                            return formatBalanceExact(balance, 18);
                        }

                        const abi = ["function balanceOf(address) view returns (uint256)"];
                        const tokenContract = new ethers.Contract(tokenAddress, abi, providerETH);
                        const balance = await tokenContract.balanceOf(walletAddress);
                        console.log("Token balance 4, ", tokenAddress, " = ", balance.toString());
                        return formatBalanceExact(balance, decimals);
                    } catch (error) {
                        console.error(`Error fetching token balance for ${tokenAddress}:`, error);
                        return '0';
                    }
                }

                // NEW: Exact formatting function that preserves precision
                function formatBalanceExact(balance, decimals) {
                    // Convert BigNumber to string to avoid precision loss
                    const balanceString = balance.toString();

                    // If decimals is 0, return the raw value
                    if (decimals === 0) {
                        return balanceString;
                    }

                    // For tokens with decimals, we need to handle the decimal point
                    if (balanceString.length <= decimals) {
                        // If the balance is smaller than the decimal places, pad with zeros
                        const padded = balanceString.padStart(decimals, '0');
                        return '0.' + padded;
                    } else {
                        // Insert decimal point at the right position
                        const integerPart = balanceString.slice(0, balanceString.length - decimals);
                        const decimalPart = balanceString.slice(balanceString.length - decimals);

                        // Remove trailing zeros from decimal part for cleaner display
                        const trimmedDecimal = decimalPart.replace(/0+$/, '');

                        if (trimmedDecimal === '') {
                            return integerPart;
                        } else {
                            return integerPart + '.' + trimmedDecimal;
                        }
                    }
                }



                async function fetchBalances() {
                    const walletAddress = userAddress;
                    if (!walletAddress) {
                        showStatus('Please enter a wallet address', 'error');
                        return;
                    }

                    if (!walletAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
                        showStatus('Please enter a valid Ethereum address', 'error');
                        return;
                    }

                    // const fetchBtn = document.getElementById('fetchBtn');
                    //fetchBtn.disabled = true;
                    //fetchBtn.textContent = 'Fetching...';

                    // showStatus('Fetching balances from blockchain...', 'loading');
                    walletBalances = {};
                    console.log("test");

                    try {
                        const promises = Object.entries(tokenAddresses).map(async ([symbol, address]) => {
                            // Skip RightsTo0xBTC
                            if (symbol === 'RightsTo0xBTC') {
                                return;
                            }
                            if (symbol === 'USDC') {
                                return;
                            }

                            const balance = await fetchTokenBalanceWithEthers(address, tokenAddressesDecimals[symbol]);
                            walletBalances[symbol] = balance;
                        });

                        await Promise.all(promises);
                        displayWalletBalances();
                        // showStatus('Balances fetched successfully!', 'success');
                    } catch (error) {
                        console.log("Error is : ", error);
                        // showStatus(`Error fetching balances: ${error.message}`, 'error');
                    } finally {
                        //fetchBtn.disabled = false;
                        // fetchBtn.textContent = 'Check Balances';
                    }
                }



                async function fetchBalancesETH() {

                    const walletAddress = userAddress;
                    if (!walletAddress) {
                        showStatus('Please enter a wallet address', 'error');
                        return;
                    }

                    if (!walletAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
                        showStatus('Please enter a valid Ethereum address', 'error');
                        return;
                    }

                    // const fetchBtn = document.getElementById('fetchBtn');
                    //fetchBtn.disabled = true;
                    //fetchBtn.textContent = 'Fetching...';

                    // showStatus('Fetching balances from blockchain...', 'loading');
                    walletBalancesETH = {};
                    console.log("test");

                    try {
                        const promises = Object.entries(tokenAddressesETH).map(async ([symbol, address]) => {
                            const balance = await fetchTokenBalanceWithEthersETH(address, tokenAddressesDecimalsETH[symbol]);
                            walletBalancesETH[symbol] = balance;

                        });

                        await Promise.all(promises);
                        displayWalletBalancesETH();
                        // showStatus('Balances fetched successfully!', 'success');
                    } catch (error) {
                        console.log("Error is : ", error);
                        // showStatus(`Error fetching balances: ${error.message}`, 'error');
                    } finally {
                        //fetchBtn.disabled = false;
                        // fetchBtn.textContent = 'Check Balances';
                    }
                }



                async function getCurrentPoolFee() {


                    if (!walletConnected) {
                        await connectWallet();
                    }


                    var hookABI = [
                        {
                            "type": "function",
                            "name": "getCurrentPoolFee",
                            "inputs": [
                                {
                                    "name": "poolKey",
                                    "type": "tuple",
                                    "components": [
                                        {
                                            "name": "currency0",
                                            "type": "address"
                                        },
                                        {
                                            "name": "currency1",
                                            "type": "address"
                                        },
                                        {
                                            "name": "fee",
                                            "type": "uint24"
                                        },
                                        {
                                            "name": "tickSpacing",
                                            "type": "int24"
                                        },
                                        {
                                            "name": "hooks",
                                            "type": "address"
                                        }
                                    ]
                                }
                            ],
                            "outputs": [
                                {
                                    "name": "currentFee",
                                    "type": "uint24"
                                }
                            ],
                            "stateMutability": "view"
                        }
                    ];


                    var HookContract = new ethers.Contract(
                        HookAddress, // your tokenSwapper contract address
                        hookABI,
                        signer // Use signer since the function isn't view/pure
                    );

                    var tokencheck = Address_ZEROXBTC_TESTNETCONTRACT;
                    var tokencheck2 = tokenAddresses['B0x'];
                    console.log("tokenCheck: ", tokencheck);
                    console.log("tokencheck2: ", tokencheck2);
                    // Simple string comparison (addresses as hex strings)
                    let currency0, currency1;

                    if (tokencheck.toLowerCase() < tokencheck2.toLowerCase()) {
                        currency0 = tokencheck;
                        currency1 = tokencheck2;
                    } else {
                        currency0 = tokencheck2;
                        currency1 = tokencheck;
                    }

                    console.log("currency0: ", currency0);
                    console.log("currency1: ", currency1);
                    // Define the PoolKey_Hook struct
                    const poolKey = {
                        currency0: currency0,
                        currency1: currency1,
                        fee: 0x800000,        // uint24
                        tickSpacing: 60,   // int24
                        hooks: hookAddress
                    };



                    try {
                        const result = await HookContract.getCurrentPoolFee(poolKey);
                        const infoCard = document.querySelector('#admin-functions .info-card2');
                        infoCard.innerHTML = `
                    <h3>Current Selected Position</h3>
                    <p>Current Fee: ${result / 10000} %</p>
                `;
                    } catch (error) {
                        console.error('Error fetching current fee:', error);
                        const infoCard = document.querySelector('.info-card2');
                        infoCard.innerHTML = `
                    <h3>Current Selected Position</h3>
                    <p>Error loading fee data</p>
                `;
                    }
                }




                async function updateAdminFeeForPool() {

                    if (!walletConnected) {
                        await connectWallet();
                    }


                    var feeValue = document.getElementById('UpdateAdminFee').value;
                    feeValue = Math.floor(feeValue * 10000)
                    var hookABI = [{
                        "inputs": [
                            {
                                "components": [
                                    {
                                        "internalType": "address",
                                        "name": "currency0",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "currency1",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "uint24",
                                        "name": "fee",
                                        "type": "uint24"
                                    },
                                    {
                                        "internalType": "int24",
                                        "name": "tickSpacing",
                                        "type": "int24"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "hooks",
                                        "type": "address"
                                    }
                                ],
                                "internalType": "struct PoolKey_Hook",
                                "name": "key",
                                "type": "tuple"
                            },
                            {
                                "internalType": "uint24",
                                "name": "newFee",
                                "type": "uint24"
                            }
                        ],
                        "name": "forceUpdateLPFee",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }];


                    var HookContract = new ethers.Contract(
                        HookAddress, // your tokenSwapper contract address
                        hookABI,
                        signer // Use signer since the function isn't view/pure
                    );


                    var tokencheck = Address_ZEROXBTC_TESTNETCONTRACT;
                    var tokencheck2 = tokenAddresses['B0x'];
                    console.log("tokenCheck: ", tokencheck);
                    console.log("tokencheck2: ", tokencheck2);
                    // Simple string comparison (addresses as hex strings)
                    let currency0, currency1;

                    if (tokencheck.toLowerCase() < tokencheck2.toLowerCase()) {
                        currency0 = tokencheck;
                        currency1 = tokencheck2;
                    } else {
                        currency0 = tokencheck2;
                        currency1 = tokencheck;
                    }

                    console.log("currency0: ", currency0);
                    console.log("currency1: ", currency1);
                    // Define the PoolKey_Hook struct
                    const poolKey = {
                        currency0: currency0,
                        currency1: currency1,
                        fee: 0x800000,        // uint24
                        tickSpacing: 60,   // int24
                        hooks: hookAddress
                    };



                    const tx = await HookContract.forceUpdateLPFee(poolKey, feeValue);


                    console.log("forceUpdateLPFee transaction sent:", tx.hash);
                    console.log("Waiting for transaction confirmation...");

                    // Wait for the transaction to be mined
                    const receipt = await tx.wait();
                    console.log("Confirmed forceUpdateLPFee Token")
                }





                var addressValue = document.getElementById('UpdateAdminFee').value;


                async function addERC20ToStakingContract() {
                    if (!walletConnected) {
                        await connectWallet();
                    }

                    var addressValue = document.getElementById('basic-address-add').value;
                    console.log(addressValue);

                    var abiAddRewardToken = [{
                        "inputs": [
                            {
                                "internalType": "contract IERC20",
                                "name": "token",
                                "type": "address"
                            }
                        ],
                        "name": "addRewardToken",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }];




                    var LPRewardsStakingContract = new ethers.Contract(
                        contractAddressLPRewardsStaking, // your tokenSwapper contract address
                        abiAddRewardToken,
                        signer // Use signer since the function isn't view/pure
                    );

                    const tx = await LPRewardsStakingContract.addRewardToken(addressValue);

                    console.log("AddRewardToken transaction sent:", tx.hash);
                    console.log("Waiting for transaction confirmation...");

                    // Wait for the transaction to be mined
                    const receipt = await tx.wait();
                    console.log("Confirmed AddReward Token")
                    await getRewardStats();

                }




                async function removeERC20FromStakingContract() {
                    if (!walletConnected) {
                        await connectWallet();
                    }

                    var addressValueRemove = document.getElementById('basic-address-remove').value;
                    console.log(addressValueRemove);

                    var abiAddRewardToken = [{
                        "inputs": [
                            {
                                "internalType": "contract IERC20",
                                "name": "token",
                                "type": "address"
                            }
                        ],
                        "name": "removeRewardToken",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }];




                    var LPRewardsStakingContract = new ethers.Contract(
                        contractAddressLPRewardsStaking, // your tokenSwapper contract address
                        abiAddRewardToken,
                        signer // Use signer since the function isn't view/pure
                    );

                    const tx = await LPRewardsStakingContract.removeRewardToken(addressValueRemove);

                    console.log("removeRewardToken transaction sent:", tx.hash);
                    console.log("Waiting for transaction confirmation...");

                    // Wait for the transaction to be mined
                    const receipt = await tx.wait();
                    console.log("Confirmed Remove Token")

                    await getRewardStats();

                }



                async function addRewardToken() {

                    if (!walletConnected) {
                        await connectWallet();
                    }
                    var inputtedTokenAddress = document.getElementById("rewardTokenAddress").value;
                    console.log("INPUTED ADDRESS = ", inputtedTokenAddress);
                    const startRewardABI = [{
                        "inputs": [
                            {
                                "internalType": "contract IERC20",
                                "name": "token",
                                "type": "address"
                            }
                        ],
                        "name": "addRewardToken",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }
                    ];


                    await approveIfNeeded(USDCToken, contractAddressLPRewardsStaking, 30 * 10 ** 6);

                    var LPRewarsdStakingContract = new ethers.Contract(
                        contractAddressLPRewardsStaking, // your tokenSwapper contract address
                        startRewardABI,
                        signer // Use signer since the function isn't view/pure
                    );
                    const tx = await LPRewarsdStakingContract.addRewardToken(inputtedTokenAddress);

                    console.log("Transaction sent:", tx.hash);
                    const receipt12 = await tx.wait();
                    console.log("addRewardToken with USDC for public Confirmed@!")

                    await getRewardStats();
                }




                async function startRewardPeriod() {


                    if (!walletConnected) {
                        await connectWallet();
                    }
                    var inputtedTokenAddress = document.getElementById("selectedRewardToken").value;
                    console.log("INPUTED ADDRESS = ", inputtedTokenAddress);
                    const startRewardABI = [{
                        "inputs": [
                            {
                                "internalType": "contract IERC20",
                                "name": "token",
                                "type": "address"
                            }
                        ],
                        "name": "setRewardParams",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }
                    ];



                    var LPRewarsdStakingContract = new ethers.Contract(
                        contractAddressLPRewardsStaking, // your tokenSwapper contract address
                        startRewardABI,
                        signer // Use signer since the function isn't view/pure
                    );
                    try {
                        const tx = await LPRewarsdStakingContract.setRewardParams(inputtedTokenAddress);

                        console.log("Transaction sent:", tx.hash);
                        const receipt12 = await tx.wait();
                        console.log("setRewardParamsTransaction Confirmed!");

                    } catch (e) {
                        if (e.message && e.message.includes("Reward must be positive")) {
                            const symbol = mockRewardTokens.find(token => token.address === inputtedTokenAddress)?.symbol;

                            alert("Token Reward Amount is Zero for token: " + symbol + "   address: " + inputtedTokenAddress + " \nCant start new Reward Period with zero rewards");
                        } else {
                            // Handle other errors
                            console.error("Transaction failed:", e.message || e);
                            alert("Transaction failed: " + (e.message || "Unknown error"));
                        }
                    }
                    await getRewardStats();

                }

















                /**
                 * Formats hashrate to the most appropriate unit with proper precision
                 * @param {number} hashrate - Raw hashrate in H/s
                 * @returns {string} Formatted hashrate string (e.g., "5.5 GH/s", "10 MH/s")
                 */
                function formatHashrate(hashrate) {
                    const units = [
                        { suffix: 'EH/s', divisor: 1e18 },  // Exahash
                        { suffix: 'PH/s', divisor: 1e15 },  // Petahash
                        { suffix: 'TH/s', divisor: 1e12 },  // Terahash
                        { suffix: 'GH/s', divisor: 1e9 },   // Gigahash
                        { suffix: 'MH/s', divisor: 1e6 },   // Megahash
                        { suffix: 'KH/s', divisor: 1e3 },   // Kilohash
                        { suffix: 'H/s', divisor: 1 }       // Hash
                    ];

                    // Find the appropriate unit
                    for (const unit of units) {
                        const value = hashrate / unit.divisor;
                        if (value >= 1) {
                            // Format with appropriate decimal places
                            let formatted;
                            if (value >= 100) {
                                formatted = Math.round(value).toString();
                            } else if (value >= 10) {
                                formatted = value.toFixed(1);
                            } else {
                                formatted = value.toFixed(2);
                            }

                            // Remove trailing zeros and decimal point if not needed
                            formatted = formatted.replace(/\.?0+$/, '');

                            return `${formatted} ${unit.suffix}`;
                        }
                    }

                    // Fallback for very small values
                    return `${hashrate.toFixed(6)} H/s`;
                }

                /**
                 * Calculates hashrate based on mining difficulty and time per epoch
                 * Formula: time to solve a block = 2^22 * difficulty / hashrate
                 * Rearranged to: hashrate = 2^22 * difficulty / time
                 */

                /**
                 * Calculate hashrate from mining parameters
                 * @param {number} timePerEpoch - Average time in seconds per epoch (from inflationMined())
                 * @param {number} miningDifficulty - Current mining difficulty (from getMiningDifficulty())
                 * @returns {number} Calculated hashrate
                 */
                function calculateHashrate(timePerEpoch, miningDifficulty) {
                    // Constants
                    const POWER_OF_22 = Math.pow(2, 22); // 2^22 = 4,194,304
                    const DIVISOR = 524_288; // Given divisor

                    // Validate inputs
                    if (timePerEpoch <= 0) {
                        throw new Error("TimePerEpoch must be greater than 0");
                    }
                    if (miningDifficulty <= 0) {
                        throw new Error("MiningDifficulty must be greater than 0");
                    }

                    // Calculate adjusted difficulty
                    const adjustedDifficulty = miningDifficulty / DIVISOR;

                    // Calculate hashrate using the formula: hashrate = 2^22 * difficulty / time
                    const hashrate = (POWER_OF_22 * adjustedDifficulty) / timePerEpoch;

                    return hashrate;
                }

                /**
                 * Example usage and helper function to format results
                 * @param {number} timePerEpoch - Time per epoch in seconds
                 * @param {number} miningDifficulty - Raw mining difficulty
                 */
                var formattedHashrate = 0;
                async function calculateAndDisplayHashrate() {
                    var timePerEpoch = 0;
                    try {


                        let amountOut = 0;
                        const hashrateABI = [{
                            "inputs": [],
                            "name": "inflationMined",
                            "outputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "YearlyInflation",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "EpochsPerYear",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "RewardsAtTime",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "TimePerEpoch",
                                    "type": "uint256"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        }];


                        hashrateMiningContract = new ethers.Contract(
                            ProofOfWorkAddresss, // your tokenSwapper contract address
                            hashrateABI,
                            signer // Use signer since the function isn't view/pure
                        );


                        /*
                        console.log("EERRROR HERE");
                        console.log("EERRROR Address_ZEROXBTC_TESTNETCONTRACT: ",Address_ZEROXBTC_TESTNETCONTRACT);
                        console.log("EERRROR tokenAddress: ",tokenAddress);
                        console.log("EERRROR tokenInputAddress: ",tokenInputAddress);
                        console.log("EERRROR HookAddress: ",HookAddress);
                        console.log("EERRROR amountToSwap: ",amountToSwap);
                        console.log("EERRROR amountToSwap: ",amountToSwap);
                        console.log("EERRROR contractAddress_Swapper: ",contractAddress_Swapper);
                        */

                        var tokenInputAddress = tokenAddress;
                        amountToSwap = BigInt(10 ** 18);
                        // Call the view function
                        var result = 0;

                        try {

                            result = await hashrateMiningContract.inflationMined();


                        } catch (error) {
                            console.error('Error calling inflationMined on hashrateMiningContract in calculateAndDisplayHashrate:', error);
                        }
                        timePerEpoch = result[3];
                        console.log("TImePerEpoch: ", timePerEpoch);


                    } catch (error) {
                        console.error("Error calculating hashrate:", error.message);
                        return null;
                    }

                    console.log("Done finding timePerEpoch: ", timePerEpoch);



                    var miningDifficulty = 0;

                    try {


                        const hashrateABI = [{
                            "inputs": [],
                            "name": "getMiningDifficulty",
                            "outputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        }];


                        hashrateMiningContract = new ethers.Contract(
                            ProofOfWorkAddresss, // your tokenSwapper contract address
                            hashrateABI,
                            signer // Use signer since the function isn't view/pure
                        );


                        /*
                        console.log("EERRROR HERE");
                        console.log("EERRROR Address_ZEROXBTC_TESTNETCONTRACT: ",Address_ZEROXBTC_TESTNETCONTRACT);
                        console.log("EERRROR tokenAddress: ",tokenAddress);
                        console.log("EERRROR tokenInputAddress: ",tokenInputAddress);
                        console.log("EERRROR HookAddress: ",HookAddress);
                        console.log("EERRROR amountToSwap: ",amountToSwap);
                        console.log("EERRROR amountToSwap: ",amountToSwap);
                        console.log("EERRROR contractAddress_Swapper: ",contractAddress_Swapper);
                        */

                        // Call the view function
                        var result = 0;

                        try {

                            result = await hashrateMiningContract.getMiningDifficulty();


                        } catch (error) {
                            console.error('Error calling getMiningDifficulty in calculateAndDispalyHashrate:', error);
                        }
                        miningDifficulty = result;
                        console.log("getMiningDifficulty: ", miningDifficulty);


                    } catch (error) {
                        console.error("Error calculating hashrate:", error.message);
                        return null;
                    }



                    console.log("miningDifficulty = miningDifficulty = ", miningDifficulty);


                    try {
                        const hashrate = calculateHashrate(timePerEpoch, miningDifficulty);

                        console.log("=== Hashrate Calculation ===");
                        console.log(`Time Per Epoch: ${timePerEpoch} seconds`);
                        console.log(`Mining Difficulty: ${miningDifficulty}`);
                        console.log(`Adjusted Difficulty: ${miningDifficulty / 524_288}`);
                        console.log(`Calculated Hashrate: ${hashrate.toLocaleString()} H/s`);

                        // Convert to appropriate unit and format
                        formattedHashrate = formatHashrate(hashrate);

                        console.log("\n=== Formatted Hashrate ===");
                        console.log(formattedHashrate);

                        return hashrate;
                    } catch (error) {
                        console.error("Error calculating hashrate:", error.message);
                        return null;
                    }
                }




                // Mock data update function (replace with actual API calls)
                function updateWidget() {
                    // Set loading state
                    document.getElementById('usd-price').textContent = 'Loading...';
                    document.getElementById('btc-price').textContent = 'Loading...';
                    document.getElementById('hashrate').textContent = 'Loading...';

                    // Simulate API calls (replace with actual implementations)
                    setTimeout(() => {
                        // Mock USD price
                        const usdPrice = 0.0045; // Replace with actual price fetch
                        document.getElementById('usd-price').textContent = `$${usdCostB0x.toFixed(4)}`;

                        // Mock 0xBTC price ratio
                        const btcPrice = 0.000012; // Replace with actual price calculation
                        document.getElementById('btc-price').textContent = ratioB0xTo0xBTC.toFixed(6);

                        // Mock hashrate calculation
                        const timePerEpoch = 300; // Replace with contract call
                        const miningDifficulty = 1000000; // Replace with contract call
                        const hashrate = calculateHashrate(timePerEpoch, miningDifficulty);
                        document.getElementById('hashrate').textContent = formattedHashrate
                    }, 1000);


                }























                function addMaxButtonToField(inputElement, tokenSymbol) {
                    // Create MAX button
                    const maxButton = document.createElement('button');
                    maxButton.type = 'button';
                    maxButton.textContent = 'MAX';
                    maxButton.className = 'max-button';
                    maxButton.style.cssText = `
                position: absolute;
                right: 2px;
                top: 2px;
                bottom: 2px;
                background: #007bff;
                color: white;
                border: none;
                padding: 0 12px;
                border-radius: 0 2px 2px 0;
                font-size: 12px;
                cursor: pointer;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
            `;

                    // Add hover effect
                    maxButton.addEventListener('mouseenter', () => {
                        maxButton.style.background = '#0056b3';
                    });
                    maxButton.addEventListener('mouseleave', () => {
                        maxButton.style.background = '#007bff';
                    });

                    // Add click handler with proper context
                    maxButton.addEventListener('click', function () {
                        const positionSelect = document.querySelector('#stake-increase select');
                        const selectedPositionId = positionSelect.value;
                        const position = stakingPositionData[selectedPositionId];

                        const swapSection = document.getElementById('stakeincrease');
                        if (!swapSection || !swapSection.contains(inputElement)) {
                            console.log("Not in stake-increase section, returning early");
                            return;
                        }

                        if (!position) return;

                        // Determine which token we're working with
                        const label = inputElement.closest('.form-group').querySelector('label');
                        let currentTokenSymbol = tokenSymbol;
                        let maxAmount = 0;

                        if (label && label.textContent.includes(position.tokenA)) {
                            currentTokenSymbol = position.tokenA;

                            handleMaxButtonClickStakeIncrease(currentTokenSymbol, inputElement);
                        } else if (label && label.textContent.includes(position.tokenB)) {
                            currentTokenSymbol = position.tokenB;
                            handleMaxButtonClickStakeIncrease(currentTokenSymbol, inputElement);
                        } else {
                            maxAmount = getMaxAmountForToken(position, currentTokenSymbol);
                        }

                    });


                    // Add click handler with proper context
                    maxButton.addEventListener('click', function () {
                        const positionSelect = document.querySelector('#increase select');

                        const swapSection = document.getElementById('increase');
                        if (!swapSection || !swapSection.contains(inputElement)) {
                            console.log("Not in increase section, returning early");
                            return;
                        }
                        const selectedPositionId = positionSelect.value;
                        const position = positionData[selectedPositionId];
                        if (!position) return;

                        // Determine which token we're working with
                        const label = inputElement.closest('.form-group').querySelector('label');
                        let currentTokenSymbol = tokenSymbol;
                        let maxAmount = 0;
                        if (label && label.textContent.includes(position.tokenA)) {
                            currentTokenSymbol = position.tokenA;
                            handleMaxButtonClick(currentTokenSymbol, inputElement);
                        } else if (label && label.textContent.includes(position.tokenB)) {
                            currentTokenSymbol = position.tokenB;

                            handleMaxButtonClick(currentTokenSymbol, inputElement);
                        } else {
                            maxAmount = getMaxAmountForToken(position, currentTokenSymbol);

                            console.log("tokenC max selected :", maxAmount);
                        }

                    });

                    // Add click handler with proper context
                    maxButton.addEventListener('click', function () {

                        const swapSection = document.getElementById('swap');
                        if (!swapSection || !swapSection.contains(inputElement)) {
                            console.log("Not in swap section, returning early");
                            return;
                        }
                        console.log("this!")
                        // Get the currently selected token from the dropdown
                        const fromTokenSelect = document.getElementById('fromToken');
                        const tokenSelected = fromTokenSelect.value; // This will be 'ETH', 'USDC', etc.

                        // Get the wallet balance for the selected token
                        const maxAmount = getMaxAmountForTokenList(tokenSelected);

                        // Set the max amount in the input field
                        setMaxAmount2(inputElement, tokenSelected, maxAmount);

                        console.log("this! !: ", maxAmount);
                    });



                    // Add click handler for MAX button
                    maxButton.addEventListener('click', function () {


                        const createSection = document.getElementById('create');
                        if (!createSection || !createSection.contains(inputElement)) {
                            console.log("Not in create section, returning early");
                            return;
                        }

                        // Get the Token A select element specifically inside the #create page
                        const tokenSelect = document.querySelector('#create .form-row .form-group:nth-child(1) select');
                        //const label = inputElement.closest('form-group').querySelector('label');
                        const label = inputElement.closest('.form-group').querySelector('label');
                        // Extract the text from the label element
                        const labelText = label.textContent;

                        // Now split the string
                        const token = labelText.split(' ').pop();

                        // Now tokenSelect is the correct <select> element for Token A or Token B
                        console.log('Selected token:', tokenSelect.value);

                        const selectedToken = tokenSelect.value.split(' - ')[0]; // Gets "ETH" from "ETH - Ethereum"
                        const walletBalance = walletBalances[selectedToken] || 0;

                        // Format based on token type
                        const formattedValue = ['ETH', 'WBTC'].includes(selectedToken)
                            ? parseFloat(walletBalance).toFixed(6)
                            : parseFloat(walletBalance).toFixed(2);

                        const maxAmount = getMaxAmountForTokenList(selectedToken);

                        if (label && label.textContent.trim() === 'Amount A') {
                            console.log("Amount A Activated!");
                            // Set the max amount in the input field
                            //setMaxAmount2(inputElement, selectedToken, maxAmount);
                            getMaxCreatePosition();
                        }
                    });



                    maxButton.addEventListener('click', function () {



                        const createSection = document.getElementById('create');
                        if (!createSection || !createSection.contains(inputElement)) {
                            console.log("Not in create section, returning early");
                            return;
                        }



                        // Get the Token A select element specifically inside the #create page
                        const tokenSelect = document.querySelector('#create .form-row .form-group:nth-child(2) select');

                        const label = inputElement.closest('.form-group').querySelector('label');
                        // Now tokenSelect is the correct <select> element for Token A or Token B
                        console.log('Selected token:', tokenSelect.value);

                        const selectedToken = tokenSelect.value.split(' - ')[0]; // Gets "ETH" from "ETH - Ethereum"
                        const walletBalance = walletBalances[selectedToken] || 0;

                        // Format based on token type
                        const formattedValue = ['ETH', 'WBTC'].includes(selectedToken)
                            ? parseFloat(walletBalance).toFixed(6)
                            : parseFloat(walletBalance).toFixed(2);

                        const maxAmount = getMaxAmountForTokenList(selectedToken);

                        if (label && label.textContent.trim() === 'Amount B') {
                            console.log("Amount B Activated!");
                            // Set the max amount in the input field
                            //setMaxAmount2(inputElement, selectedToken, maxAmount);

                            getMaxCreatePosition();
                        }
                        // Set the max amount in the input field
                    });


                    maxButton.addEventListener('click', function () {



                        const createSection = document.getElementById('create');
                        if (!createSection || !createSection.contains(inputElement)) {
                            console.log("Not in create section, returning early");
                            return;
                        }



                        // Get the Token A select element specifically inside the #create page
                        const tokenSelect = document.querySelector('#create .form-row .form-group:nth-child(2) select');

                        const label = inputElement.closest('.form-group').querySelector('label');
                        // Now tokenSelect is the correct <select> element for Token A or Token B
                        console.log('Selected token:', tokenSelect.value);

                        const selectedToken = tokenSelect.value.split(' - ')[0]; // Gets "ETH" from "ETH - Ethereum"
                        const walletBalance = walletBalances[selectedToken] || 0;

                        // Format based on token type
                        const formattedValue = ['ETH', 'WBTC'].includes(selectedToken)
                            ? parseFloat(walletBalance).toFixed(6)
                            : parseFloat(walletBalance).toFixed(2);

                        const maxAmount = getMaxAmountForTokenList(selectedToken);

                        if (label && label.textContent.trim() === 'Amount B') {
                            console.log("Amount B Activated!");
                            // Set the max amount in the input field
                            //setMaxAmount2(inputElement, selectedToken, maxAmount);

                            getMaxCreatePosition();
                        }
                        // Set the max amount in the input field
                    });




                    maxButton.addEventListener('click', function () {



                        const createSection = document.getElementById('convert');
                        if (!createSection || !createSection.contains(inputElement)) {
                            console.log("Not in convert section, returning early");
                            return;
                        }
                        const inputElement3 = document.querySelector('#convert .input-class');
                        console.log("inputElement3: ", inputElement3); // Returns null

                        const fromTokenSelect = document.querySelector('#convert #fromToken');


                        const label = fromTokenSelect.querySelector('label');
                        // Now tokenSelect is the correct <select> element for Token A or Token B
                        console.log('Selected token:', fromTokenSelect.value);



                        const selectedToken = fromTokenSelect.value.split(' - ')[0]; // Gets "ETH" from "ETH - Ethereum"

                        const walletBalance = walletBalancesETH[selectedToken] || 0;
                        var maxAmount = 0;
                        if (selectedToken == 'B0x') {
                            const walletBalance = walletBalancesETH[selectedToken] || 0;


                            const maxAmount2 = getMaxAmountForTokenListETH('RightsTo0xBTC');
                            const maxAmount1 = getMaxAmountForTokenListETH('B0x');
                            console.log("RightsTo0xABTC Max : ", maxAmount2);
                            console.log("B0x Max : ", maxAmount1);

                            if (maxAmount2 > maxAmount1) {
                                console.log("max is B0x")
                                maxAmount = maxAmount1;
                            } else {

                                console.log("max is RightsTo0xBTC")
                                maxAmount = maxAmount2;
                            }
                        } else {
                            console.log("0xbtc max");
                            maxAmount = getMaxAmountForTokenListETH(selectedToken);
                            console.log("0xbtc max: ", maxAmount);
                        }
                        // Format based on token type
                        const formattedValue = ['ETH', 'WBTC'].includes(selectedToken)
                            ? parseFloat(maxAmount).toFixed(6)
                            : parseFloat(maxAmount).toFixed(2);


                        console.log("Calling setmaxAmount2");
                        // Set the max amount in the input field
                        setMaxAmount2(inputElement3, selectedToken, formattedValue);



                        getConvertTotal(false);
                        // Set the max amount in the input field
                    });
                    // Make input element relative positioned
                    inputElement.style.position = 'relative';

                    // Create wrapper just for input and button
                    const wrapper = document.createElement('div');
                    wrapper.style.cssText = 'position: relative; display: inline-block; width: 100%;';

                    // Insert wrapper before input
                    inputElement.parentNode.insertBefore(wrapper, inputElement);

                    // Move input into wrapper
                    wrapper.appendChild(inputElement);

                    // Add padding to input to make room for button and remove input's border radius on right
                    inputElement.style.paddingRight = '60px';
                    inputElement.style.borderTopRightRadius = '0';
                    inputElement.style.borderBottomRightRadius = '0';

                    // Append button to wrapper (not the form-group container)
                    wrapper.appendChild(maxButton);

                }






                // Helper function to get max amount for different token types
                // Simplified function to get max amount based on selected token
                function getMaxAmountForTokenList(tokenSymbol) {
                    // Return the wallet balance for the selected token
                    return walletBalances[tokenSymbol] || 0;
                }


                // Helper function to get max amount for different token types
                // Simplified function to get max amount based on selected token
                function getMaxAmountForTokenListETH(tokenSymbol) {
                    // Return the wallet balance for the selected token
                    return walletBalancesETH[tokenSymbol] || 0;
                }



                // Modified setMaxAmount function
                function setMaxAmount2(inputElement, tokenSymbol, amount) {
                    if (!inputElement) return;
                    console.log("successess amt: ", amount);
                    // Format amount based on token type
                    let formattedAmount = amount;

                    inputElement.value = formattedAmount;
                    inputElement.dispatchEvent(new Event('input')); // Trigger any calculations


                }



                // Helper function to get max amount for different token types
                function getMaxAmountForToken(position, tokenSymbol) {
                    // Check wallet balances first (from your earlier implementation)
                    const walletBalance = walletBalances[tokenSymbol] || 0;


                    // Default case (for ETH or other tokens)
                    return walletBalance;
                }



                // Modified setMaxAmount function
                function setMaxAmount(inputElement, tokenSymbol, amount) {
                    if (!inputElement) return;

                    // Format amount based on token type
                    let formattedAmount;
                    if (['WBTC', 'ETH'].includes(tokenSymbol)) {
                        formattedAmount = parseFloat(amount).toFixed(6);
                    } else {
                        formattedAmount = parseFloat(amount).toFixed(4);
                    }

                    inputElement.value = amount;
                    inputElement.dispatchEvent(new Event('input'));
                }



                function initializeMaxButtons() {
                    // SWAP PAGE - Amount field
                    const swapAmountInput = document.querySelector('#swap input[type="number"][placeholder="0.0"]');
                    if (swapAmountInput) {
                        // Get the selected token from From Token dropdown
                        const getSwapToken = () => {
                            const fromSelect = document.querySelector('#swap .form-group:nth-child(3) select');
                            return fromSelect ? fromSelect.value : 'ETH';
                        };

                        addMaxButtonToField(swapAmountInput, getSwapToken());

                        // Update when From Token changes
                        const fromSelect = document.querySelector('#swap .form-group:nth-child(3) select');
                        if (fromSelect) {
                            fromSelect.addEventListener('change', () => {
                                // Remove old button
                                const oldButton = swapAmountInput.parentElement.querySelector('.max-button');
                                if (oldButton) oldButton.remove();

                                // Add new button with updated token
                                addMaxButtonToField(swapAmountInput, getSwapToken());
                            });
                        }
                    }

                    // CREATE POSITION PAGE - Amount A and Amount B
                    const createAmountInputs = document.querySelectorAll('#create input[type="number"][placeholder="0.0"]');
                    createAmountInputs.forEach((input, index) => {
                        const getCreateToken = (inputIndex) => {
                            const selects = document.querySelectorAll('#create .token-selector select');
                            return selects[inputIndex] ? selects[inputIndex].value : (inputIndex === 0 ? 'ETH' : 'USDC');
                        };

                        addMaxButtonToField(input, getCreateToken(index));

                        // Update when token selection changes
                        const tokenSelect = document.querySelectorAll('#create .token-selector select')[index];
                        if (tokenSelect) {
                            tokenSelect.addEventListener('change', () => {
                                // Remove old button
                                const oldButton = input.parentElement.querySelector('.max-button');
                                if (oldButton) oldButton.remove();

                                // Add new button with updated token
                                addMaxButtonToField(input, getCreateToken(index));
                            });
                        }
                    });




                    console.log("hereherehere");

                    // CREATE POSITION PAGE - Amount A and Amount B
                    const convertInputs = document.querySelectorAll('#convert input[type="number"][placeholder="0.0"]');
                    convertInputs.forEach((input, index) => {
                        const getCreateToken = (inputIndex) => {
                            const selects = document.querySelectorAll('#convert .token-selector select');
                            return selects[inputIndex] ? selects[inputIndex].value : (inputIndex === 0 ? 'ETH' : 'USDC');
                        };

                        console.log("hereherehere111");

                        console.log("hereherehere input: ", input);
                        addMaxButtonToField(input, getCreateToken(index));

                        // Update when token selection changes
                        const tokenSelect = document.querySelectorAll('#convert .token-selector select')[index];
                        if (tokenSelect) {
                            tokenSelect.addEventListener('change', () => {
                                // Remove old button
                                const oldButton = input.parentElement.querySelector('.max-button');
                                if (oldButton) oldButton.remove();

                                // Add new button with updated token
                                addMaxButtonToField(input, getCreateToken(index));
                            });
                        }
                    });




                    // INCREASE LIQUIDITY PAGE - The two token amount fields
                    const increaseInputs = document.querySelectorAll('#increase .form-row input[type="number"]');
                    increaseInputs.forEach((input, index) => {
                        const getIncreaseToken = (inputIndex) => {
                            const labels = document.querySelectorAll('#increase .form-row label');
                            if (labels[inputIndex]) {
                                const labelText = labels[inputIndex].textContent;
                                return labelText.replace('Add ', '');
                            }
                            return inputIndex === 0 ? 'ETH' : 'USDC';
                        };

                        addMaxButtonToField(input, getIncreaseToken(index));

                        // Update when position changes (since tokens change based on selected position)
                        const positionSelect = document.querySelector('#increase select');
                        if (positionSelect) {
                            positionSelect.addEventListener('change', () => {
                                // Small delay to let the labels update first
                                setTimeout(() => {
                                    // Remove old button
                                    const oldButton = input.parentElement.querySelector('.max-button');
                                    if (oldButton) oldButton.remove();

                                    // Add new button with updated token
                                    addMaxButtonToField(input, getIncreaseToken(index));
                                }, 100);
                            });
                        }
                    });




                    // INCREASE LIQUIDITY PAGE - The two token amount fields
                    const increaseInputsStaking = document.querySelectorAll('#stake-increase .form-row input[type="number"]');
                    increaseInputsStaking.forEach((input, index) => {
                        const getIncreaseToken = (inputIndex) => {
                            const labels = document.querySelectorAll('#stake-increase .form-row label');
                            if (labels[inputIndex]) {
                                const labelText = labels[inputIndex].textContent;
                                return labelText.replace('Add ', '');
                            }
                            return inputIndex === 0 ? 'ETH' : 'USDC';
                        };

                        addMaxButtonToField(input, getIncreaseToken(index));

                        // Update when position changes (since tokens change based on selected position)
                        const positionSelect = document.querySelector('#stake-increase select');
                        if (positionSelect) {
                            positionSelect.addEventListener('change', () => {
                                // Small delay to let the labels update first
                                setTimeout(() => {
                                    // Remove old button
                                    const oldButton = input.parentElement.querySelector('.max-button');
                                    if (oldButton) oldButton.remove();

                                    // Add new button with updated token
                                    addMaxButtonToField(input, getIncreaseToken(index));
                                }, 100);
                            });
                        }
                    });







                    // INCREASE LIQUIDITY PAGE - The two token amount fields
                    const createPositionField = document.querySelectorAll('#create .form-row input[type="number"]');
                    createPositionField.forEach((input, index) => {
                        const getIncreaseToken = (inputIndex) => {
                            const labels = document.querySelectorAll('#create .form-row label');
                            if (labels[inputIndex]) {
                                const labelText = labels[inputIndex].textContent;
                                return labelText.replace('Add ', '');
                            }
                            return inputIndex === 0 ? 'ETH' : 'USDC';
                        };

                        addMaxButtonToField(input, getIncreaseToken(index));

                        // Update when position changes (since tokens change based on selected position)
                        const positionSelect = document.querySelector('#create select');
                        if (positionSelect) {
                            positionSelect.addEventListener('change', () => {
                                // Small delay to let the labels update first
                                setTimeout(() => {
                                    // Remove old button
                                    const oldButton = input.parentElement.querySelector('.max-button');
                                    if (oldButton) oldButton.remove();

                                    // Add new button with updated token
                                    addMaxButtonToField(input, getIncreaseToken(index));
                                }, 100);
                            });
                        }
                    });

                }






















                // Initialize when DOM is loaded
                document.addEventListener('DOMContentLoaded', function () {
                    filterTokenOptionsSwap();
                    filterTokenOptionsSwapETH();
                    // Small delay to ensure other scripts have run first
                    setTimeout(initializeMaxButtons, 2100);
                });



                // Also run when called manually (in case DOM is already loaded)
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', initializeMaxButtons);
                } else {
                    setTimeout(initializeMaxButtons, 2100);
                }


                // Update token icon and handle dropdown filtering
                function updateTokenSelection(selectId, iconId) {
                    const select = document.getElementById(selectId);
                    const icon = document.getElementById(iconId);
                    const selectedValue = select.value;

                    // Get the icon URL
                    const iconURL = tokenIconsBase[selectedValue];

                    const tokenIcons = {
                        'ETH': 'E',
                        'USDC': 'U',
                        'DAI': 'D',
                        'WBTC': 'W'
                    };

                    // Update icon with URL if available, otherwise use text fallback
                    if (iconURL) {
                        icon.innerHTML = `<img src="${iconURL}" alt="${selectedValue}" class="token-icon222" onerror="this.parentElement.textContent='${tokenIcons[selectedValue] || selectedValue.charAt(0)}'">`;
                    } else {
                        icon.textContent = tokenIcons[selectedValue] || selectedValue.charAt(0);
                    }
                }


                // Filter options to hide selected tokenA in tokenB dropdown only
                function filterTokenOptionsCreate() {
                    const tokenA = document.getElementById('tokenA');
                    const tokenB = document.getElementById('tokenB');
                    const tokenAValue = tokenA.value;
                    const tokenBValue = tokenB.value;

                    // Reset all tokenB options to visible first
                    Array.from(tokenB.options).forEach(option => {
                        option.style.display = '';
                        option.disabled = false;
                    });

                    // Hide the selected tokenA option in tokenB dropdown only
                    Array.from(tokenB.options).forEach(option => {
                        if (option.value === tokenAValue) {
                            option.style.display = 'none';
                            option.disabled = true;
                        }
                    });

                    // If current tokenB selection matches tokenA, change it to first available option
                    if (tokenBValue === tokenAValue) {
                        const availableOptions = Array.from(tokenB.options).filter(option =>
                            option.value !== tokenAValue && option.style.display !== 'none'
                        );
                        if (availableOptions.length > 0) {
                            tokenB.value = availableOptions[0].value;
                            updateTokenSelection('tokenB', 'tokenBIcon');
                        }
                    }
                }


                // Filter options to hide selected fromToken in toToken dropdown only
                function filterTokenOptionsSwap() {

                    const fromToken = document.querySelector('#swap #fromToken22');
                    const toToken = document.querySelector('#swap #toToken22');
                    const fromValue = fromToken.value;
                    const toValue = toToken.value;

                    // Reset all toToken options to visible first
                    Array.from(toToken.options).forEach(option => {
                        option.style.display = '';
                        option.disabled = false;
                    });

                    // Hide the selected fromToken option in toToken dropdown only
                    Array.from(toToken.options).forEach(option => {
                        if (option.value === fromValue) {
                            option.style.display = 'none';
                            option.disabled = true;
                        }
                    });

                    // If current toToken selection matches fromToken, change it to first available option
                    if (toValue === fromValue) {
                        const availableOptions = Array.from(toToken.options).filter(option =>
                            option.value !== fromValue && option.style.display !== 'none'
                        );
                        if (availableOptions.length > 0) {
                            toToken.value = availableOptions[0].value;
                            updateTokenIcon('toToken22', 'toTokenIcon11');
                        }
                    }
                }



                // Filter options to hide selected fromToken in toToken dropdown only
                function filterTokenOptionsSwapETH() {

                    const fromToken = document.querySelector('#convert #fromToken');
                    const toToken = document.querySelector('#convert #toToken');
                    const fromValue = fromToken.value;
                    const toValue = toToken.value;
                    // console.log("fromToken", fromToken);
                    // Reset all toToken options to visible first
                    Array.from(toToken.options).forEach(option => {
                        option.style.display = '';
                        option.disabled = false;
                    });

                    // Hide the selected fromToken option in toToken dropdown only
                    Array.from(toToken.options).forEach(option => {
                        if (option.value === fromValue) {
                            option.style.display = 'none';
                            option.disabled = true;
                        }
                    });

                    // If current toToken selection matches fromToken, change it to first available option
                    if (toValue === fromValue) {
                        const availableOptions = Array.from(toToken.options).filter(option =>
                            option.value !== fromValue && option.style.display !== 'none'
                        );
                        if (availableOptions.length > 0) {
                            toToken.value = availableOptions[0].value;
                            updateTokenIcon('toToken', 'toTokenIcon');
                        }
                    }
                }



                // Function to update token icon and clear amount field
                function updateTokenIcon(selectId, iconId) {
                    // Get the selected token
                    const select = document.getElementById(selectId);
                    const token = select.value;

                    // Update the icon with image URL
                    const icon = document.getElementById(iconId);
                    const iconURL = tokenIconsBase[token]; // Get the icon URL

                    if (iconURL) {
                        // Use image if URL exists
                        icon.innerHTML = `<img src="${iconURL}" alt="${token}" class="token-icon222" onerror="this.parentElement.textContent='${token.charAt(0)}'">`;
                    } else {
                        // Fallback to first letter if no URL
                        icon.textContent = token.charAt(0);
                    }

                    // Clear the amount input field in the same form group
                    const formGroup = select.closest('.form-group').nextElementSibling;
                    if (formGroup && formGroup.classList.contains('form-group')) {
                        const amountInput = formGroup.querySelector('input[type="number"]');
                        if (amountInput) {
                            amountInput.value = '0.0';
                        }
                    }

                    filterTokenOptionsSwap();
                }



                // Add event listener to token selector
                document.getElementById('fromToken').addEventListener('change', function () {
                    updateTokenIcon('fromToken', 'fromTokenIcon');
                });


                // Function to update token icon and clear amount field
                function updateTokenIconETH(selectId, iconId) {
                    // Get the selected token
                    const select = document.getElementById(selectId);
                    const token = select.value;

                    // Update the icon with image URL
                    const icon = document.getElementById(iconId);
                    const iconURL = tokenIconsETH[token]; // Get the icon URL

                    if (iconURL) {
                        // Use image if URL exists
                        icon.innerHTML = `<img src="${iconURL}" alt="${token}" class="token-icon222" onerror="this.parentElement.textContent='${token.charAt(0)}'">`;
                    } else {
                        // Fallback to first letter if no URL
                        icon.textContent = token.charAt(0);
                    }

                    // Clear the amount input field in the same form group
                    const formGroup = select.closest('.form-group').nextElementSibling;
                    if (formGroup && formGroup.classList.contains('form-group')) {
                        const amountInput = formGroup.querySelector('input[type="number"]');
                        if (amountInput) {
                            amountInput.value = '0.0';
                        }
                    }

                    filterTokenOptionsSwapETH();
                    getConvertTotal(false);
                }


                // Add event listener to token selector
                document.getElementById('fromToken').addEventListener('change', function () {
                    updateTokenIconETH('fromToken', 'fromTokenIcon');
                });


                async function swapTokensConvert() {
                    const formGroups = document.querySelectorAll('#convert .form-group');
                    let fromSelect, toSelect, fromIcon, toIcon;

                    formGroups.forEach(group => {
                        const label = group.querySelector('label');
                        if (label && label.textContent === 'From Token') {
                            fromSelect = group.querySelector('select');
                            fromIcon = group.querySelector('.token-icon');
                        } else if (label && label.textContent === 'To Token') {
                            toSelect = group.querySelector('select');
                            toIcon = group.querySelector('.token-icon');
                        }
                    });

                    if (fromSelect && toSelect && fromIcon && toIcon) {
                        // Swap the select values
                        const fromValue = fromSelect.value;
                        const toValue = toSelect.value;

                        fromSelect.value = toValue;
                        toSelect.value = fromValue;

                        // Helper function to update icon
                        function updateIcon(icon, tokenValue) {
                            const tokenIcons = {
                                'ETH': 'E',
                                'USDC': 'U',
                                'DAI': 'D',
                                'WBTC': 'W',
                                '0xBTC': '0',
                                'B0x': 'B+R'
                            };

                            if (tokenValue === 'B0x') {
                                // Make container wider and adjust styling for B0x
                                icon.style.width = '80px';
                                icon.style.borderRadius = '18px';
                                icon.classList.add('b0x-token');

                                const b0xURL = tokenIconsETH['B0x'];
                                const rightsURL = tokenIconsETH['RightsTo0xBTC'];

                                if (b0xURL && rightsURL) {
                                    icon.innerHTML = `
                        <img src="${b0xURL}" alt="B0x" class="token-icon222" style="width: 36px; height: 36px;">
                        <span style="margin: 0 4px; color: white; font-size: 12px;">+</span>
                        <img src="${rightsURL}" alt="Rights" class="token-icon222" style="width: 36px; height: 36px;">
                    `;
                                } else {
                                    icon.textContent = 'B+R';
                                }
                            } else {
                                // Reset to normal circle styling
                                icon.style.width = '36px';
                                icon.style.borderRadius = '50%';
                                icon.classList.remove('b0x-token');

                                const iconURL = tokenIconsETH[tokenValue];

                                if (iconURL) {
                                    icon.innerHTML = `<img src="${iconURL}" alt="${tokenValue}" class="token-icon222" onerror="this.parentElement.textContent='${tokenIcons[tokenValue] || tokenValue.charAt(0)}'">`;
                                } else {
                                    icon.textContent = tokenIcons[tokenValue] || tokenValue.charAt(0);
                                }
                            }
                        }

                        // Update both icons
                        updateIcon(fromIcon, fromSelect.value);
                        updateIcon(toIcon, toSelect.value);
                        await getConvertTotal(false);
                        await getMax();
                    }
                }

                async function getMax() {



                    const createSection = document.getElementById('convert');
                    if (!createSection) {
                        console.log("Not in convert section, returning early");
                        return;
                    }
                    const inputElement3 = document.querySelector('#convert .input-class');
                    console.log("inputElement3: ", inputElement3); // Returns null

                    const fromTokenSelect = document.querySelector('#convert #fromToken');


                    const label = fromTokenSelect.querySelector('label');
                    // Now tokenSelect is the correct <select> element for Token A or Token B
                    console.log('Selected token:', fromTokenSelect.value);



                    const selectedToken = fromTokenSelect.value.split(' - ')[0]; // Gets "ETH" from "ETH - Ethereum"

                    const walletBalance = walletBalancesETH[selectedToken] || 0;
                    var maxAmount = 0;
                    if (selectedToken == 'B0x') {
                        const walletBalance = walletBalancesETH[selectedToken] || 0;


                        const maxAmount2 = getMaxAmountForTokenListETH('RightsTo0xBTC');
                        const maxAmount1 = getMaxAmountForTokenListETH('B0x');
                        console.log("RightsTo0xABTC Max : ", maxAmount2);
                        console.log("B0x Max : ", maxAmount1);

                        if (maxAmount2 > maxAmount1) {
                            console.log("max is B0x")
                            maxAmount = maxAmount1;
                        } else {

                            console.log("max is RightsTo0xBTC")
                            maxAmount = maxAmount2;
                        }
                    } else {
                        console.log("0xbtc max");
                        maxAmount = getMaxAmountForTokenListETH(selectedToken);
                        console.log("0xbtc max: ", maxAmount);
                    }
                    // Format based on token type
                    const formattedValue = ['ETH', 'WBTC'].includes(selectedToken)
                        ? parseFloat(maxAmount).toFixed(6)
                        : parseFloat(maxAmount).toFixed(2);


                    console.log("Calling setmaxAmount2");
                    // Set the max amount in the input field
                    setMaxAmount2(inputElement3, selectedToken, formattedValue);


                    getConvertTotal(false);
                    // Set the max amount in the input field


                }

                function swapTokens() {
                    const formGroups = document.querySelectorAll('#swap .form-group');
                    let fromSelect, toSelect, fromIcon, toIcon;

                    formGroups.forEach(group => {
                        const label = group.querySelector('label');
                        if (label && label.textContent === 'From Token') {
                            fromSelect = group.querySelector('select');
                            fromIcon = group.querySelector('.token-icon');
                        } else if (label && label.textContent === 'To Token') {
                            toSelect = group.querySelector('select');
                            toIcon = group.querySelector('.token-icon');
                        }
                    });

                    if (fromSelect && toSelect && fromIcon && toIcon) {
                        // Swap the select values
                        const fromValue = fromSelect.value;
                        const toValue = toSelect.value;

                        fromSelect.value = toValue;
                        toSelect.value = fromValue;

                        // Update icons based on new values using the token mapping
                        const tokenIcons = {
                            'ETH': 'E',
                            'USDC': 'U',
                            'DAI': 'D',
                            'WBTC': 'W',
                            '0xBTC': '0',
                            'B0x': 'B'
                        };

                        const iconUrlfrom = tokenIconsETH[fromSelect.value] || ''; // Get icon URL or empty string if not found
                        const iconUrlto = tokenIconsETH[toSelect.value] || ''; // Get icon URL or empty string if not found

                        // Use innerHTML for HTML content, and handle both icons consistently
                        fromIcon.innerHTML = iconUrlfrom ? `<img src="${iconUrlfrom}" alt="${fromSelect.value}" class="token-icon222" onerror="this.style.display='none'">` : '';
                        toIcon.innerHTML = iconUrlto ? `<img src="${iconUrlto}" alt="${toSelect.value}" class="token-icon222" onerror="this.style.display='none'">` : '';

                    }
                    getEstimate();
                }



                const createSection = document.getElementById('create');

                if (createSection) {
                    const tokenASelect = createSection.querySelector('#tokenA');
                    const tokenBSelect = createSection.querySelector('#tokenB');
                    const amountAInput = createSection.querySelector('#amountA');
                    const amountBInput = createSection.querySelector('#amountB');

                    if (tokenASelect && tokenBSelect && amountAInput && amountBInput) {
                        // Function to swap amount values
                        function swapAmounts() {
                            const currentAmountA = amountAInput.value;
                            const currentAmountB = amountBInput.value;

                            amountAInput.value = currentAmountB;
                            amountBInput.value = currentAmountA;

                            console.log('Swapped amounts - A:', currentAmountB, 'B:', currentAmountA);
                        }

                        // Listen for Token A changes
                        tokenASelect.addEventListener('change', function () {
                            console.log('Token A changed to:', this.value);
                            swapAmounts();
                        });

                    } else {
                        console.log('Could not find token selects or amount inputs in create section');
                    }
                } else {
                    console.log('Create section not found');
                }
















                /*begin stats sections*/





                // Function to get URL parameters
                function getURLParameter(name) {
                    const urlParams = new URLSearchParams(window.location.search);
                    return urlParams.get(name);
                }

                // Function to switch tab on page load based on URL parameter
                function initializeTabFromURL() {
                    console.log("THIS THIS THIS");
                    // Check for 'tab' parameter in URL (e.g., ?tab=convert)
                    const tabParam = getURLParameter('tab');

                    if (tabParam) {
                        // List of valid tab names to prevent invalid tab switching
                        const validTabs = [
                            'swap',
                            'create',
                            'increase',
                            'decrease',
                            'staking-main-page',
                            'staking',
                            'stake-increase',
                            'stake-decrease',
                            'convert',
                            'settings',
                            'staking-management',
                            'testnet-faucet',
                            'contract-info',
                            'stats',
                            'socials',
                            'staking-main-page',
                            'stats-graphs',
                            'staking-rich-list',
                            'stats-mining-calc',
                            'stats-home',
                            'stats-staking-rich-list',
                            'whitepaper',
                            'stats-rich-list',
                            'rich-list',
                            'miner'
                        ];



                        // Check if the tab parameter is valid
                        if (validTabs.includes(tabParam)) {
                            var tabName = tabParam;
                            if (tabName == 'staking-rich-list') {
                                tabName = 'stats-staking-rich-list';
                            }
                            if (tabName == 'rich-list') {
                                tabName = 'stats-rich-list';
                                loadData();
                            }
                            if (tabName == 'staking') {
                                tabName = 'staking-main-page';
                            }

                            if (tabName == 'staking-rich-list' || tabName == 'stats-graphs' || tabName == 'stats-mining-calc' || tabName == 'stats-staking-rich-list' || tabName == 'stats-rich-list') {
                                console.log("Switch tab: ", tabName);
                                switchTabForStats();
                                switchTab2(tabName);
                            } else {
                                console.log("Switch tab: ", tabName);

                                switchTab(tabName);
                            }
                        } else {
                            console.warn(`Invalid tab parameter: ${tabParam}`);
                            // Optionally switch to default tab
                            switchTab('swap');
                        }
                    }
                    // If no tab parameter, the default active tab will remain (swap)
                }



                // Alternative function if you prefer to use just the parameter name without 'tab='
                // For URLs like ?convert instead of ?tab=convert
                function initializeTabFromDirectParam() {
                    const urlParams = new URLSearchParams(window.location.search);

                    // Valid tab names
                    const validTabs = [
                        'swap',
                        'create',
                        'increase',
                        'decrease',
                        'staking-main-page',
                        'stake-increase',
                        'stake-decrease',
                        'staking',
                        'convert',
                        'settings',
                        'staking-management',
                        'testnet-faucet',
                        'contract-info',
                        'stats',
                        'socials',
                        'staking-main-page',
                        'stats-graphs',
                        'staking-rich-list',
                        'stats-mining-calc',
                        'stats-home',
                        'stats-staking-rich-list',
                        'whitepaper',
                        'stats-rich-list',
                        'rich-list',
                        'miner'
                    ];


                    // Check if any of the valid tab names exist as parameters
                    for (const tab of validTabs) {
                        if (urlParams.has(tab)) {
                            var tabname = tab;
                            console.log("Switch tab: ", tabname);
                            if (tab == 'staking-rich-list') {

                                tabname = 'stats-staking-rich-list';

                            }
                            if (tab == 'rich-list') {

                                tabname = 'stats-rich-list';

                                loadData();
                            }                 
                             if (tabname == 'staking') {
                                tabname = 'staking-main-page';
                            }
                            if (tabname == 'staking-rich-list' || tabname == 'stats-graphs' || tabname == 'stats-home' || tabname == 'stats-mining-calc' || tabname == 'stats-staking-rich-list' || tabname == 'stats-rich-list') {

                                switchTabForStats();
                                switchTab2(tabname);
                            } else {
                                console.log("Switch tab: ", tabname);

                                switchTab(tabname);
                            }
                            return; // Exit after first match to prevent multiple tab switches
                        }
                    }
                }

              
                
            document.addEventListener('DOMContentLoaded', async function () {
                await initializeDApp();
                initializeTabFromURL();
                initializeTabFromDirectParam();
            });



                function updateURL(tabName) {
                    if (tabName == "staking-main-page") {
                        tabName = 'staking';
                    }
                    if (tabName == "stats-home") {
                        tabName = 'stats';
                    }
                    if (tabName == "stats-staking-rich-list") {
                        tabName = 'staking-rich-list';
                    }
                    if (tabName == "stats-rich-list") {

                        tabName = 'rich-list';
                    }

                    if (tabName == "staking-main-page") {
                        tabName = 'staking';
                    }
                    const baseUrl = window.location.origin + window.location.pathname;
                    // Add a valueless parameter
                    const newUrl = `${baseUrl}?${tabName}`;
                    window.history.replaceState(null, '', newUrl);
                }


                let PreviousTabName = "";




                async function switchTab(tabName) {

                    if (tabName == "staking") {
                        tabName == "staking-main-page";
                    }
                    // Hide all pages
                    const pages = document.querySelectorAll('.page');
                    pages.forEach(page => {
                        page.classList.remove('active');
                        // Remove inline styles to let CSS classes control display
                        page.style.display = '';
                    });

                    // Remove active class from all tabs
                    const tabs = document.querySelectorAll('.nav-tab');
                    tabs.forEach(tab => tab.classList.remove('active'));

                    // Show selected page
                    const selectedPage = document.getElementById(tabName);
                    const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);

                    if (selectedTab) selectedTab.classList.add('active');
                    if (selectedPage) {
                        selectedPage.classList.add('active');
                        // Don't set inline display style - let CSS handle it
                    }



                    console.log("tabanem: ", tabName);
                    updateURL(tabName);
                    console.log("PREVIOUS TAB NAME");

                    if (tabName == "staking") {
                        tabName == "staking-main-page";
                    }
                    if (tabName == 'miner') {
                        console.log("Scrooll to top");
                        setTimeout(() => {
                            document.body.scrollTop = 0;
                            document.documentElement.scrollTop = 0;
                        }, 100);
                    }
                    if (tabName == 'stats' && PreviousTabName != 'stats') {
                        switchTab2('stats-home');
                        await GetContractStats();
                        await updateAllMinerInfoFirst();

                    } else {


                        // Remove active class from all sub-tabs and sub-pages
                        document.querySelectorAll('.nav-tab2').forEach(tab => {
                            tab.classList.remove('active');
                        });
                        document.querySelectorAll('.stats-page').forEach(page => {
                            page.classList.remove('active');
                            page.style.display = 'none'; // Force hide
                        });
                    }
                    PreviousTabName = tabName;
                    console.log("PREVIOUS TAB NAME: ", PreviousTabName);
                    if (tabName === 'stats') {
                        // Remove padding when switching to stats
                        document.querySelector('.content').style.padding = '0px';
                    } else {
                        // Restore padding for other tabs
                        setPadding();
                    }

                }
                // Option 1: JavaScript with resize listener
                function setPadding() {


                    // Find the active tab before removing the class
                    const activeTab = document.querySelector('.nav-tab.active');


                    if (activeTab == 'stats') {



                        const contentEl = document.querySelector('.content');
                        if (window.innerWidth < 1000) {
                            contentEl.style.padding = '0px';
                        } else {
                            contentEl.style.padding = '25px';
                        }

                    } else {

                        const contentEl = document.querySelector('.content');
                        if (window.innerWidth < 1000) {
                            contentEl.style.padding = '3px';
                        } else {
                            contentEl.style.padding = '25px';
                        }


                    }
                }

                // Set initial padding
                setPadding();

                // Update padding on window resize
                window.addEventListener('resize', setPadding);


                async function switchTabForStats() {
                    var tabName = 'stats';
                    // Hide all pages
                    const pages = document.querySelectorAll('.page');
                    pages.forEach(page => {
                        page.classList.remove('active');
                        // Remove inline styles to let CSS classes control display
                        page.style.display = '';
                    });

                    // Remove active class from all tabs
                    const tabs = document.querySelectorAll('.nav-tab');
                    tabs.forEach(tab => tab.classList.remove('active'));

                    // Show selected page
                    const selectedPage = document.getElementById(tabName);
                    const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);

                    if (selectedTab) selectedTab.classList.add('active');
                    if (selectedPage) {
                        selectedPage.classList.add('active');
                        // Don't set inline display style - let CSS handle it
                    }




                    console.log("PREVIOUS TAB NAME");
                    if (tabName == 'stats' && PreviousTabName != 'stats') {
                        switchTab2('stats-home');
                        await GetContractStats();
                        await updateAllMinerInfoFirst();

                    } else {


                        // Remove active class from all sub-tabs and sub-pages
                        document.querySelectorAll('.nav-tab2').forEach(tab => {
                            tab.classList.remove('active');
                        });
                        document.querySelectorAll('.stats-page').forEach(page => {
                            page.classList.remove('active');
                            page.style.display = 'none'; // Force hide
                        });
                    }
                    PreviousTabName = tabName;
                    console.log("PREVIOUS TAB NAME: ", PreviousTabName);
                    if (tabName === 'stats') {
                        // Remove padding when switching to stats
                        document.querySelector('.content').style.padding = '0px';
                    } else {
                        // Restore padding for other tabs
                        document.querySelector('.content').style.padding = '40px';
                    }




                }

                // Sub-navigation function for stats section
                async function switchTab2(tabName) {
                    if (tabName == 'stats-staking-rich-list') {

                        loadData2();
                    } else if (tabName == 'stats-rich-list') {

                        loadData();
                    } else if (tabName == 'rich-list') {

                        loadData();
                    }
                    updateURL(tabName);
                    console.log('switchTab2 called with:', tabName); // Debug log

                    // Remove active class from all sub-tabs and sub-pages
                    document.querySelectorAll('.nav-tab2').forEach(tab => {
                        tab.classList.remove('active');
                    });
                    document.querySelectorAll('.stats-page').forEach(page => {
                        page.classList.remove('active');
                        page.style.display = 'none'; // Force hide
                    });



                    // Add active class to selected sub-tab and sub-page
                    const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
                    const selectedPage = document.getElementById(tabName);

                    console.log('Selected tab:', selectedTab); // Debug log
                    console.log('Selected page:', selectedPage); // Debug log

                    if (selectedTab) selectedTab.classList.add('active');
                    if (selectedPage) {
                        selectedPage.classList.add('active');
                        selectedPage.style.display = 'block'; // Force show
                    }

                    if (tabName == "stats-graphs") {
                        await initEthers();
                        // Automatically load 30 days of data
                        updateGraphData(30, 30);

                    }
                }




                function hideLoadingScreen() {
                    document.getElementById('loading-screen').style.display = 'none';
                    document.getElementById('main-content').style.display = 'block';
                }


                function showLoadingScreen() {
                    const loadingScreen = document.getElementById('loading-screen');
                    const loadingContent = loadingScreen.querySelector('.loading-content');

                    const loadingSubtitle = loadingScreen.querySelector('.loading-status');
                    // Reset all animations by removing and re-adding the loading content
                    loadingSubtitle.textContent = 'Now loading the data'; // Use textContent, not text
                    const parent = loadingContent.parentNode;
                    const newContent = loadingContent.cloneNode(true);
                    parent.removeChild(loadingContent);
                    parent.appendChild(newContent);

                    // Show the loading screen
                    loadingScreen.style.display = 'flex';
                    document.getElementById('main-content').style.display = 'none';
                }

                // Loading screen management
                function updateLoadingStatus(message) {
                    document.getElementById('loading-status').textContent = message;
                }

                /* Simulate your dApp initialization*/
                async function initializeDApp() {
                    try {
                    showLoadingScreen();
                        updateLoadingStatus('Connecting to blockchain...');
                        await new Promise(resolve => setTimeout(resolve, 3000));

                        updateLoadingStatus('Loading smart contracts...');
                        await new Promise(resolve => setTimeout(resolve, 1500));

                        updateLoadingStatus('Fetching data...');
                        await new Promise(resolve => setTimeout(resolve, 1500));

                        updateLoadingStatus('Initializing interface...');
                        await new Promise(resolve => setTimeout(resolve, 1000));

                        updateLoadingStatus('Ready!');
                        await new Promise(resolve => setTimeout(resolve, 500));

                        hideLoadingScreen();
                    } catch (error) {
                        console.error('Failed to initialize dApp:', error);
                        updateLoadingStatus('Error loading dApp. Please refresh.');
                    }
                }





                // Configuration constants
                const _MAXIMUM_TARGET_STR_OLD = "27606985387162255149739023449108101809804435888681546220650096895197184";  // 2**234
                const BWORK_RPC = 'https://gateway.tenderly.co/public/base';
                const BWORK_CONTRACT_ADDRESS = '0x2f38B1a516239739CdCD2C228D1Eb96E29800975';
                const BWORK_LAST_DIFF_START_BLOCK_INDEX = '4';
                const BWORK_ERA_INDEX = '5';
                const BWORK_TOKENS_MINTED_INDEX = '11';
                const BWORK_MINING_TARGET_INDEX = '6';

                const _SECONDS_PER_ETH_BLOCK = 2;
                const _IDEAL_BLOCK_TIME_SECONDS = 600;
                const _HASHRATE_MULTIPLIER = 2 ** 22;
                const _CONTRACT_NAME = 'BWORK';

                // These will be initialized after ethers is ready
                let ethblockstart = 30489059;
                let adjustAverageRewardTimeGraph = 8;
                let searchPoints2 = 120;
                let latest_eth_block = null;
                let BWORK_latest_eth_block = null;
                let ethersProvider = null;
                let ethersSigner = null;
                let _ZERO_BN;
                let _MAXIMUM_TARGET_BN_OLD;
                let retryAt = 0;

                // Helper functions
                function el(selector) {
                    return document.querySelector(selector);
                }

                function log(...args) {
                    console.log(...args);
                }

                function sleep(ms) {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }

                function toReadableThousands(num) {
                    if (num >= 1000000) {
                        return (num / 1000000).toFixed(1) + 'M';
                    } else if (num >= 1000) {
                        return (num / 1000).toFixed(1) + 'K';
                    }
                    return num.toString();
                }

                function toReadableThousandsLong(num) {
                    return num.toLocaleString();
                }

                function toReadableHashrate(hashrate) {
                    if (hashrate >= 1e12) {
                        return (hashrate / 1e12).toFixed(2) + ' TH/s';
                    } else if (hashrate >= 1e9) {
                        return (hashrate / 1e9).toFixed(2) + ' GH/s';
                    } else if (hashrate >= 1e6) {
                        return (hashrate / 1e6).toFixed(2) + ' MH/s';
                    } else if (hashrate >= 1e3) {
                        return (hashrate / 1e3).toFixed(2) + ' KH/s';
                    }
                    return hashrate.toFixed(2) + ' H/s';
                }

                function ethBlockNumberToTimestamp(blockNumber) {
                    // Use a more recent reference point for Base network
                    // Block 34966000 ≈ December 2024 (adjust this based on current date)
                    const referenceBlock = 34966000;
                    const referenceTimestamp = Date.now() / 1000; // Current timestamp
                    const avgBlockTime = 2; // Base network block time

                    const blockDifference = blockNumber - referenceBlock;
                    const timeDifference = blockDifference * avgBlockTime;
                    const blockTimestamp = referenceTimestamp + timeDifference;

                    return new Date(blockTimestamp * 1000).toLocaleDateString();
                }

                function ethBlockNumberToTimestamp2(blockNumber) {
                    const referenceBlock = 34966000;
                    const referenceTimestamp = Date.now() / 1000;
                    const avgBlockTime = 2;

                    const blockDifference = blockNumber - referenceBlock;
                    const timeDifference = blockDifference * avgBlockTime;
                    const blockTimestamp = referenceTimestamp + timeDifference;

                    return new Date(blockTimestamp * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }

                function BWORKethBlockNumberToDateStr(blockNumber) {
                    return ethBlockNumberToTimestamp2(blockNumber);
                }

                function goToURLAnchor() {
                    // Placeholder function
                }

                // Alternative approach - always try to add first, then switch
                async function switchToBaseMainnet() {
                    const baseMainnetConfig = {
                        chainId: '0x2105', // 8453 in hex (Base mainnet)
                        chainName: 'Base',
                        nativeCurrency: {
                            name: 'Ethereum',
                            symbol: 'ETH',
                            decimals: 18
                        },
                        rpcUrls: ['https://mainnet.base.org'],
                        blockExplorerUrls: ['https://basescan.org/']
                    };

                    try {
                        // Try to add the network first (this will do nothing if it already exists)
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [baseMainnetConfig]
                        });
                        console.log('Base Mainnet network added/confirmed');

                        // Then switch to it
                        await window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: baseMainnetConfig.chainId }]
                        });
                        console.log('Switched to Base Mainnet network');

                    } catch (error) {
                        console.error('Error with Base Mainnet network:', error);
                        throw new Error(`Failed to setup Base Mainnet network: ${error.message}`);
                    }
                }

                var retryAt1123123123 = 0;
                // Initialize Ethers connection
                async function initEthers() {
                    try {
                        if (false) {
                            //if (window.ethereum) {
                            //no metamask for Graphs
                            // await window.ethereum.request({ method: 'eth_requestAccounts' });
                            // await switchToBaseMainnet();
                            // ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
                            // ethersSigner = ethersProvider.getSigner();
                        } else {
                            ethersProvider = new ethers.providers.JsonRpcProvider(BWORK_RPC);
                        }

                        // Initialize BigNumber constants after ethers is ready
                        _ZERO_BN = ethers.BigNumber.from(0);
                        _MAXIMUM_TARGET_BN_OLD = ethers.BigNumber.from(_MAXIMUM_TARGET_STR_OLD);

                        // Get latest block
                        const latestBlock = await ethersProvider.getBlockNumber();
                        BWORK_latest_eth_block = latestBlock;
                        latest_eth_block = BWORK_latest_eth_block;

                        log('Connected to Base Mainnet. Latest block:', BWORK_latest_eth_block);
                    } catch (error) {
                        console.error('Failed to connect to Ethereum:', error);
                        // Initialize fallback values
                        ethersProvider = new ethers.providers.JsonRpcProvider(BWORK_RPC);
                        _ZERO_BN = ethers.BigNumber.from(0);
                        _MAXIMUM_TARGET_BN_OLD = ethers.BigNumber.from(_MAXIMUM_TARGET_STR_OLD);
                        // Use a fallback block number if connection fails
                        try {
                            BWORK_latest_eth_block = await ethersProvider.getBlockNumber();
                            latest_eth_block = BWORK_latest_eth_block;
                        } catch (error) {
                            console.log("ERROR : ", error);
                            await sleep(2000 * retryAt1123123123 ** 2);
                            await initEthers();
                            retryAt1123123123 += 1;
                            if (retryAt1123123123 > 3) {
                                return;
                            }
                        }
                        retryAt1123123123 = 0;
                    }
                }

                class contractValueOverTime {
                    constructor(ethersProviderInstance, contract_address, storage_index, descriptor) {
                        this.WAIT_DELAY_FIXED_MS = 120;
                        this.WAIT_DELAY_ON_TIMEOUT_MS = 1500;
                        this.ethersProvider = ethersProviderInstance;
                        this.contract_address = contract_address;
                        this.storage_index = storage_index;
                        this.descriptor = descriptor;
                        this.sorted = false;
                        this.states = [];
                        this.expected_state_length = 0;
                        this.pending_requests = [];
                    }

                    get getValues() {
                        return this.states;
                    }

                    printValuesToLog() {
                        this.states.forEach((value) => {
                            log('block #', value[0], 'ts', value[2], 'value[1]:', value[1].toString());
                        });
                    }

                    // Load cached blocks in range
                    loadFromCache(startBlock, endBlock, timeRangeLabel) {
                        const contractPrefix = BWORK_CONTRACT_ADDRESS.slice(0, 7); // Includes '0x' + 5 hex chars

                        const key = `${this.descriptor}_${timeRangeLabel}_${contractPrefix}`;
                        let cache = JSON.parse(localStorage.getItem(key)) || {};
                        let results = [];

                        for (let blockStr in cache) {
                            let block = parseInt(blockStr, 10);
                            if (block >= startBlock && block <= endBlock) {
                                let value_bn = ethers.BigNumber.from('0x' + cache[blockStr]);
                                results.push([block, value_bn, '']);
                            }
                        }

                        results.sort((a, b) => a[0] - b[0]);
                        this.states.push(...results);
                        this.expected_state_length += results.length;

                        return results;
                    }

                    async addValuesInRange(start_eth_block, end_eth_block, num_search_points, tolerance = 100) {
                        // Calculate step size
                        const stepsize = Math.floor((end_eth_block - start_eth_block) / num_search_points);
                        console.log('stepsize', stepsize, 'num_search_points', num_search_points);

                        // Load cached blocks using num_search_points as the label
                        const cached = this.loadFromCache(start_eth_block, end_eth_block, num_search_points);
                        if (cached.length > 0) {
                            console.log(`Loaded ${cached.length} cached blocks for ${this.descriptor}_${num_search_points}`);
                        }

                        // Track loaded blocks globally
                        const loadedBlocks = Array.from(this.states.map(s => s[0]));

                        // Align end block to UTC midnight
                        const d = new Date();
                        const secondsSinceMidnight = (d.getTime() - d.setUTCHours(0, 0, 0, 0)) / 1000;
                        const blocksSinceMidnight = Math.floor(secondsSinceMidnight / _SECONDS_PER_ETH_BLOCK);
                        const alignedEndBlock = end_eth_block - blocksSinceMidnight;

                        // Collect blocks to fetch
                        const blocks_to_fetch = [];
                        for (let i = 0; i < num_search_points; i++) {
                            const block_num = alignedEndBlock - (stepsize * i);

                            // Reuse cached blocks within tolerance
                            const exists = loadedBlocks.some(b => Math.abs(b - block_num) <= tolerance);
                            if (!exists) {
                                blocks_to_fetch.push(block_num);
                            }
                        }

                        if (blocks_to_fetch.length > 0) {
                            await this.batchGetStorageAt(blocks_to_fetch);
                        }
                    }

                    async batchGetStorageAt(blockNumbers, batchSize = 20) {
                        blockNumbers = blockNumbers.filter(block => block >= ethblockstart);
                        if (blockNumbers.length === 0) return;

                        // Precompute storage slot once
                        let storageSlot;
                        if (this.storage_index?.slice(0, 2) == '0x') {
                            if (this.storage_index.length > 10) {
                                storageSlot = this.storage_index;
                            } else {
                                storageSlot = '0x' + ethers.BigNumber.from(this.storage_index.slice(2)).toHexString().slice(2);
                            }
                        } else {
                            storageSlot = '0x' + ethers.BigNumber.from(this.storage_index).toHexString().slice(2);
                        }

                        for (let i = 0; i < blockNumbers.length; i += batchSize) {
                            const batch = blockNumbers.slice(i, i + batchSize);
                            const batchNumber = Math.floor(i / batchSize) + 1;
                            const totalBatches = Math.ceil(blockNumbers.length / batchSize);

                            log(`Processing batch ${batchNumber}/${totalBatches} for ${this.descriptor}`);

                            try {
                                // Create all promises for the batch
                                const promises = batch.map(blockNum =>
                                    this.ethersProvider.getStorageAt(
                                        this.contract_address,
                                        storageSlot,
                                        Math.round(blockNum)
                                    )
                                        .then(value => this.processStorageValue(Math.round(blockNum), value))
                                        .catch(error => {
                                            console.error('Error fetching block', blockNum, ':', error);
                                            // Fallback: add default value
                                            return this.addValueAtEthBlock(blockNum);
                                        })
                                );

                                // Execute all requests concurrently
                                await Promise.all(promises);

                                this.expected_state_length += batch.length;

                                await sleep(200);
                                // Rate limiting between batches
                                if (i + batchSize < blockNumbers.length) {
                                    await sleep(400);
                                }

                            } catch (error) {
                                console.error('Batch request failed:', error);

                                // Fallback: process each block individually with retries
                                for (const blockNum of batch) {
                                    try {
                                        const value = await this.ethersProvider.getStorageAt(
                                            this.contract_address,
                                            storageSlot,
                                            Math.round(blockNum)
                                        );
                                        await this.processStorageValue(Math.round(blockNum), value);
                                    } catch (individualError) {
                                        console.error('Individual request also failed for block', blockNum, ':', individualError);
                                        await this.addValueAtEthBlock(blockNum);
                                    }
                                    await sleep(200);
                                }
                            }
                        }
                    }

                    async processStorageValue(eth_block_num, value) {
                        if (!value || value == '0x') {
                            log('Got bad value for block', eth_block_num, ', retrying...');
                            await sleep(this.WAIT_DELAY_ON_TIMEOUT_MS);
                            return this.addValueAtEthBlock(eth_block_num, true);
                        }

                        var hex_str = value.substr(2, 64).replace(/[^0-9a-fA-F]/g, '').padStart(64, '0');

                        try {
                            let value_bn;
                            if (this.storage_index.slice(0, 2) == '0x' && this.storage_index == '0xd66bf39be2869094cf8d2d31edffab51dc8326eadf3c7611d397d156993996da') {
                                var sqrtPriceX96 = BigInt('0x' + hex_str.slice(-40));
                                var Q96 = BigInt('79228162514264337593543950336');
                                value_bn = ethers.BigNumber.from(((sqrtPriceX96 * sqrtPriceX96) / (Q96 * Q96)).toString());
                            } else if (this.storage_index.slice(0, 2) == '0x') {
                                var sqrtPriceX96 = BigInt('0x' + hex_str.slice(-40));
                                var temp = Number(sqrtPriceX96) / (2 ** 96);
                                var final_price = Math.floor((temp ** 2) * 10 ** 12);
                                value_bn = ethers.BigNumber.from(final_price.toString());
                            } else {
                                value_bn = ethers.BigNumber.from('0x' + hex_str);
                            }
                            this.states.push([eth_block_num, value_bn, '']);
                        } catch (error) {
                            console.error('Error processing storage value:', hex_str, 'Error:', error);
                        }
                    }

                    addValueAtEthBlock(eth_block_num, is_retry, retry_delay = 600) {
                        if (eth_block_num < ethblockstart) return;

                        let cv_obj = this;
                        if (!is_retry) this.expected_state_length++;

                        let storageSlot;
                        if (this.storage_index.slice(0, 2) == '0x') {
                            storageSlot = this.storage_index.length > 10 ? this.storage_index :
                                '0x' + ethers.BigNumber.from(this.storage_index.slice(2)).toHexString().slice(2);
                        } else {
                            storageSlot = '0x' + ethers.BigNumber.from(this.storage_index).toHexString().slice(2);
                        }

                        this.ethersProvider.getStorageAt(this.contract_address, storageSlot, eth_block_num)
                            .then(this._getSaveStateFunction(this.states, eth_block_num, retry_delay))
                            .catch(async (error) => {
                                log('Error reading block storage:', error);
                                await sleep(retry_delay);
                                cv_obj.addValueAtEthBlock(eth_block_num, true, retry_delay * 2);
                            });
                    }

                    _getSaveStateFunction(block_states, eth_block_num, retry_delay) {
                        let cv_obj = this;
                        if (!retry_delay) retry_delay = cv_obj.WAIT_DELAY_ON_TIMEOUT_MS;

                        return async function (value) {
                            if (!value || value == '0x') {
                                log('Bad value, retrying block', eth_block_num);
                                await sleep(retry_delay);
                                cv_obj.addValueAtEthBlock(eth_block_num, true, retry_delay * 2);
                                return;
                            }
                            await cv_obj.processStorageValue(eth_block_num, value);
                        }
                    }

                    areAllValuesLoaded() {
                        log("Expected:", this.expected_state_length, " vs cur Length:", this.states.length);
                        return this.expected_state_length === this.states.length;
                    }

                    async waitUntilLoaded() {
                        while (!this.areAllValuesLoaded()) await sleep(500);
                    }

                    sortValues() {
                        log('sorting values..');
                        this.states.sort((a, b) => a[0] - b[0]);
                        this.sorted = true;
                    }

                    // Save states to localStorage for a given time range
                    saveToLocalStorage(timeRangeLabel) {
                        if (this.states.length === 0) return;
                        const contractPrefix = BWORK_CONTRACT_ADDRESS.slice(0, 7); // Includes '0x' + 5 hex chars

                        const key = `${this.descriptor}_${timeRangeLabel}_${contractPrefix}`;
                        let cache = JSON.parse(localStorage.getItem(key)) || {};

                        // Merge new states
                        for (const [block, bnValue] of this.states) {
                            cache[block] = bnValue.toHexString().slice(2);
                        }

                        try {
                            localStorage.setItem(key, JSON.stringify(cache));
                            console.log(`Saved ${Object.keys(cache).length} unique blocks to ${key}`);
                        } catch (error) {
                            console.error(`Failed to save ${key} to localStorage:`, error);
                        }
                    }

                    // Compute UTC midnight block
                    getMidnightBlock() {
                        const d = new Date();
                        d.setUTCHours(0, 0, 0, 0);
                        const secondsSinceEpoch = Math.floor(d.getTime() / 1000);
                        return ethblockstart + Math.floor(secondsSinceEpoch / _SECONDS_PER_ETH_BLOCK);
                    }
                }

                function getHashrateDataFromDifficultyAndErasPerBlockData(difficulty_data, eras_per_block_data) {
                    var expected_eras_per_block = 1 / 80; //76.5/* should be 40 times slower than ethereum (with 15-second eth blocks) */
                    var difficulty_data_index = 0;
                    var difficulty_change_block_num = 0;
                    var chart_data = []
                    for (var step = 0; step < eras_per_block_data.length; step++) {
                        var current_eth_block = eras_per_block_data[step].x;
                        var current_eras_per_block = eras_per_block_data[step].y;

                        while (difficulty_data_index < difficulty_data.length - 1
                            && difficulty_data[difficulty_data_index + 1].x < current_eth_block) {
                            difficulty_change_block_num = difficulty_data[difficulty_data_index + 1].x;
                            difficulty_data_index += 1;
                        }

                        //console.log('diff chg @', difficulty_change_block_num);
                        var difficulty = 0
                        try {
                            var difficulty = parseFloat(difficulty_data[difficulty_data_index].y.toString());
                        } catch {
                        }
                        /* if difficulty change occurs within this step window */
                        if (step != 0
                            && difficulty_data_index != 0
                            && eras_per_block_data[step].x > difficulty_change_block_num
                            && eras_per_block_data[step - 1].x < difficulty_change_block_num) {

                            /* make a new half-way difficulty that takes the duration of each 
                               seperate difficulty into accout  */

                            var step_size_in_eth_blocks = eras_per_block_data[step].x - eras_per_block_data[step - 1].x;
                            var diff1_duration = eras_per_block_data[step].x - difficulty_change_block_num;
                            var diff2_duration = difficulty_change_block_num - eras_per_block_data[step - 1].x;
                            var current_difficulty = 0
                            try {
                                current_difficulty = parseFloat(difficulty_data[difficulty_data_index].y.toString());
                            } catch {
                            }
                            /* NOTE: since the data is stored kind-of oddly (two values per
                               difficulty: both the first and last known block at that value), we
                               index difficulty_data as step-1 instead of step-2, skipping a
                               value. */
                            var last_difficulty = parseFloat(difficulty_data[difficulty_data_index - 1].y.toString());
                            difficulty = (current_difficulty * (diff1_duration / step_size_in_eth_blocks))
                                + (last_difficulty * (diff2_duration / step_size_in_eth_blocks));
                        }

                        var unadjusted_network_hashrate = difficulty * _HASHRATE_MULTIPLIER / _IDEAL_BLOCK_TIME_SECONDS;
                        var network_hashrate = unadjusted_network_hashrate * (current_eras_per_block / expected_eras_per_block);
                        //log('for block', current_eth_block, 'diff', difficulty.toFixed(1), 'uhr', unadjusted_network_hashrate, 'hr', network_hashrate)
                        if (current_eth_block > ethblockstart) {
                            chart_data.push({
                                x: current_eth_block,
                                y: network_hashrate,
                            })
                        }
                    }
                    return chart_data;
                }

                function generateHashrateAndBlocktimeGraph(ethersProviderInstance, target_cv_obj, era_cv_obj, price_cv_obj, price_cv_obj3, tokens_minted_cv_obj) {
                    el('#difficultystats').innerHTML = '<canvas id="chart-hashrate-difficulty"></canvas>';
                    el('#blocktimestats').innerHTML = '<canvas id="chart-rewardtime"></canvas>';
                    el('#priceOverTimestats').innerHTML = '<canvas id="chart-pricetime"></canvas>';
                    el('#avgRevenue').innerHTML = '<canvas id="chart-AvgRevenue"></canvas>';
                    var target_values = target_cv_obj.getValues;
                    var era_values = era_cv_obj.getValues;
                    var tokens_minted_values = tokens_minted_cv_obj.getValues;
                    var tokens_price_values = price_cv_obj.getValues;
                    var tokens_price_values3 = price_cv_obj3.getValues;

                    function convertValuesToChartData(values, value_mod_function) {
                        var chart_data = []
                        for (var i = 0; i < values.length; i++) {
                            if (values[i][1].isZero && values[i][1].isZero()) {
                                continue;
                            }
                            if (value_mod_function == undefined) {
                                value_mod_function = function (v) { return v };
                            }
                            if (values[i][0] > ethblockstart) {
                                chart_data.push({
                                    x: values[i][0],
                                    y: value_mod_function(values[i][1]),
                                })
                            }
                        }
                        return chart_data;
                    }

                    function getErasPerBlockFromEraData(era_values) {
                        var chart_data = []
                        for (var step = 1; step < era_values.length; step++) {
                            var eth_blocks_passed = era_values[step][0] - era_values[step - 1][0];
                            var eras_passed = parseFloat(era_values[step][1].toString()) - parseFloat(era_values[step - 1][1].toString());

                            if (eth_blocks_passed == 0) {
                                continue;
                            }

                            var eras_per_eth_block = eras_passed / eth_blocks_passed * 7;

                            chart_data.push({
                                x: era_values[step][0],
                                y: eras_per_eth_block,
                            })
                        }
                        return chart_data;
                    }

                    var difficulty_data = convertValuesToChartData(target_values,
                        (x) => { return parseFloat(_MAXIMUM_TARGET_BN_OLD.div(x).toString()) });

                    // Set Chart.js defaults for dark theme
                    Chart.defaults.color = '#f2f2f2';

                    var era_data = convertValuesToChartData(era_values);
                    var total_supply_data = convertValuesToChartData(tokens_minted_values,
                        (x) => { return parseFloat(ethers.utils.formatEther(x)) });
                    var total_price_data = convertValuesToChartData(tokens_price_values,
                        (x) => { return 1 / parseFloat(x.toString()) });
                    var total_price_data3 = convertValuesToChartData(tokens_price_values3,
                        (x) => { return parseFloat(x.toString()) });

                    const scaleFactor = 10000000;
                    let resultGraph = total_price_data.map((item, index) => {
                        if (total_price_data[index].y === 0) {
                            console.error("Division by zero at index " + index);
                            return null;
                        }
                        return {
                            x: item.x,
                            y: (item.y) * scaleFactor
                        };
                    });

                    let result2 = total_price_data.map((item, index) => {
                        if (total_price_data[index].y === 0) {
                            console.error("Division by zero at index " + index);
                            return null;
                        }
                        return {
                            x: item.x,
                            y: item.y
                        };
                    });

                    let avgPriceAtTime = total_price_data3.map((item, index) => {
                        if (result2[index] && result2[index].y !== 0) {
                            return {
                                x: item.x,
                                y: item.y * result2[index].y
                            };
                        }
                        return null;
                    }).filter(item => item !== null);

                    var eras_per_block_data = getErasPerBlockFromEraData(era_values);
                    var average_reward_time_data = [];
                    for (var i = 0; i < eras_per_block_data.length; i += 1) {
                        if (eras_per_block_data[i].x > ethblockstart) {
                            average_reward_time_data.push({
                                x: eras_per_block_data[i].x,
                                y: 1 / (eras_per_block_data[i].y * adjustAverageRewardTimeGraph),
                            })
                        }
                    }

                    var hashrate_data = getHashrateDataFromDifficultyAndErasPerBlockData(difficulty_data, eras_per_block_data);

                    console.log("hashrate_data :", hashrate_data);
                    var max_hashrate_value = 0

                    for (var i = 0; i < hashrate_data.length; i += 1) {
                        /* get max hashrate data, note - not a BN */
                        if (hashrate_data[i].y > max_hashrate_value) {
                            console.log("max_hashrate_value ", hashrate_data[i].y)
                            max_hashrate_value = hashrate_data[i].y;
                        }
                    }
                    // Check if the last value in hashrate_data is 0 and remove it if true
                    if (hashrate_data.length > 0 && hashrate_data[hashrate_data.length - 1].y === 0) {
                        hashrate_data.pop();
                    }

                    var datasetCopy = [
                        average_reward_time_data.slice(0, 1)[0],
                        average_reward_time_data.slice(average_reward_time_data.length - 1, average_reward_time_data.length)[0],
                    ]
                    if (datasetCopy[0]) {
                        datasetCopy[0] = Object.assign({}, datasetCopy[0]);
                        datasetCopy[1] = Object.assign({}, datasetCopy[1]);
                        datasetCopy[0].y = _IDEAL_BLOCK_TIME_SECONDS / 60;
                        datasetCopy[1].y = _IDEAL_BLOCK_TIME_SECONDS / 60;
                    }

                    // Calculate revenue data
                    let avgRevenue = [];
                    if (avgPriceAtTime.length > 0 && difficulty_data.length > 0) {
                        for (let i = 0; i < Math.min(avgPriceAtTime.length, difficulty_data.length); i++) {
                            if (avgPriceAtTime[i] && difficulty_data[i] && difficulty_data[i].y) {
                                let difficultyValue = difficulty_data[i].y;

                                let revenue = (31000000000 * 4320000 * 8 / (10 * difficultyValue * 2 ** 22)) * avgPriceAtTime[i].y;
                                avgRevenue.push({
                                    x: difficulty_data[i].x,
                                    y: revenue
                                });
                            }
                        }
                    }


                    // Create Difficulty Chart
                    // Create Difficulty Chart
                    const difficultyCtx = document.getElementById('chart-hashrate-difficulty').getContext('2d');
                    var hr_diff_chart = new Chart(difficultyCtx, {
                        type: 'line',
                        data: {
                            datasets: [{
                                label: "Difficulty",
                                stepped: 'before',
                                backgroundColor: 'rgb(255, 99, 132)',
                                borderColor: 'rgb(255, 99, 132)',
                                data: difficulty_data,
                                fill: false,
                                tension: 0,
                                pointRadius: 1,
                                pointHoverRadius: 3,
                                borderWidth: 1,
                                yAxisID: 'y'
                            }, {
                                label: "B0x Token Hashrate",
                                backgroundColor: 'rgb(156, 204, 101)',
                                borderColor: 'rgb(156, 204, 101)',
                                data: hashrate_data,
                                fill: false,
                                tension: 0,
                                pointRadius: 1,
                                pointHoverRadius: 3,
                                borderWidth: 1,
                                yAxisID: 'y1'
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            parsing: {
                                xAxisKey: 'x',
                                yAxisKey: 'y'
                            },
                            interaction: {
                                intersect: false,
                                mode: 'index'
                            },
                            scales: {
                                x: {
                                    type: 'linear',
                                    display: true,
                                    position: 'bottom',
                                    grid: {
                                        display: true,
                                        color: 'rgba(255, 255, 255, 0.1)',
                                        drawOnChartArea: true
                                    },
                                    ticks: {
                                        color: '#f2f2f2',
                                        maxRotation: 45,
                                        maxTicksLimit: 8,
                                        callback: function (value, index, values) {
                                            return BWORKethBlockNumberToDateStr(Math.floor(value));
                                        }
                                    },
                                    title: {
                                        display: true,
                                        text: 'Block Number',
                                        color: '#f2f2f2',
                                        font: {
                                            size: 11,
                                            weight: 'normal'
                                        }
                                    }
                                },
                                y: {
                                    type: 'linear',
                                    position: 'left',
                                    display: true,
                                    beginAtZero: true,
                                    grace: '5%',
                                    grid: {
                                        display: true,
                                        color: 'rgba(255, 255, 255, 0.1)',
                                        drawOnChartArea: true
                                    },
                                    title: {
                                        display: true,
                                        text: 'Difficulty',
                                        color: 'rgb(255, 99, 132)',
                                        font: {
                                            size: 11,
                                            weight: 'bold'
                                        }
                                    },
                                    ticks: {
                                        color: '#f2f2f2',
                                        maxTicksLimit: 6,
                                        callback: function (value, index, values) {
                                            return toReadableThousandsLong(value);
                                        }
                                    }
                                },
                                y1: {
                                    type: 'linear',
                                    position: 'right',
                                    display: true,
                                    beginAtZero: true,
                                    grace: '5%',
                                    grid: {
                                        drawOnChartArea: false
                                    },
                                    title: {
                                        display: true,
                                        text: 'Hashrate (MH/s)',
                                        color: 'rgb(156, 204, 101)',
                                        font: {
                                            size: 11,
                                            weight: 'bold'
                                        }
                                    },
                                    ticks: {
                                        color: '#f2f2f2',
                                        maxTicksLimit: 6,
                                        callback: function (value, index, values) {
                                            return toReadableHashrate(value);
                                        }
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    display: true,
                                    labels: {
                                        color: '#f2f2f2',
                                        usePointStyle: true
                                    }
                                },
                                tooltip: {
                                    mode: 'index',
                                    intersect: false,
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    titleColor: '#f2f2f2',
                                    bodyColor: '#f2f2f2',
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                    borderWidth: 1,
                                    callbacks: {
                                        title: function (context) {
                                            return 'Block: ' + Math.floor(context[0].parsed.x);
                                        }
                                    }
                                }
                            }
                        }
                    });
                    // Solution 1: Set canvas size before creating chart
                    const rewardTimeCanvas = document.getElementById('chart-rewardtime');
                    const container = rewardTimeCanvas.parentElement;

                    // Calculate the actual size you want
                    const containerHeight = window.innerHeight * 0.35; // 35vh in pixels
                    const containerWidth = container.offsetWidth;

                    // Set canvas size explicitly
                    rewardTimeCanvas.style.width = containerWidth + 'px';
                    rewardTimeCanvas.style.height = containerHeight + 'px';



                    // Create Block Time & Supply Chart
                    const rewardTimeCtx = document.getElementById('chart-rewardtime').getContext('2d');
                    var rewardtime_chart = new Chart(rewardTimeCtx, {
                        type: 'line',
                        data: {
                            datasets: [{
                                label: "Average Reward Time",
                                backgroundColor: 'rgb(79, 195, 247)',
                                borderColor: 'rgb(79, 195, 247)',
                                data: average_reward_time_data,
                                fill: false,
                                tension: 0,
                                pointRadius: 1,
                                pointHoverRadius: 3,
                                borderWidth: 1,
                                yAxisID: 'y'
                            }, {
                                label: 'Target Reward Time',
                                backgroundColor: 'rgb(0, 255, 0)',
                                borderColor: 'rgb(0, 255, 0)',
                                borderDash: [5, 15],
                                data: datasetCopy,
                                fill: false,
                                tension: 0,
                                pointRadius: 0,
                                pointHoverRadius: 3,
                                borderWidth: 1,
                                yAxisID: 'y'
                            }, {
                                label: "Total Supply",
                                backgroundColor: 'rgb(255, 152, 0)',
                                borderColor: 'rgb(255, 152, 0)',
                                data: total_supply_data,
                                fill: false,
                                tension: 0,
                                pointRadius: 1,
                                pointHoverRadius: 3,
                                borderWidth: 1,
                                yAxisID: 'y1'
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            parsing: {
                                xAxisKey: 'x',
                                yAxisKey: 'y'
                            },
                            interaction: {
                                intersect: false,
                                mode: 'index'
                            },
                            scales: {
                                x: {
                                    type: 'linear',
                                    display: true,
                                    position: 'bottom',
                                    grid: {
                                        display: true,
                                        color: 'rgba(255, 255, 255, 0.1)',
                                        drawOnChartArea: true
                                    },
                                    ticks: {
                                        color: '#f2f2f2',
                                        maxRotation: 45,
                                        maxTicksLimit: 8,
                                        callback: function (value, index, values) {
                                            return BWORKethBlockNumberToDateStr(Math.floor(value));
                                        }
                                    },
                                    title: {
                                        display: true,
                                        text: 'Block Number',
                                        color: '#f2f2f2',
                                        font: {
                                            size: 11,
                                            weight: 'normal'
                                        }
                                    }
                                },
                                y: {
                                    type: 'linear',
                                    position: 'left',
                                    display: true,
                                    beginAtZero: true,
                                    grace: '5%',
                                    grid: {
                                        display: true,
                                        color: 'rgba(255, 255, 255, 0.1)',
                                        drawOnChartArea: true
                                    },
                                    title: {
                                        display: true,
                                        text: 'Reward Time (Minutes)',
                                        color: 'rgb(79, 195, 247)',
                                        font: {
                                            size: 11,
                                            weight: 'bold'
                                        }
                                    },
                                    ticks: {
                                        color: '#f2f2f2',
                                        maxTicksLimit: 6,
                                        callback: function (value, index, values) {
                                            return value.toFixed(1) + ' min';
                                        }
                                    }
                                },
                                y1: {
                                    type: 'linear',
                                    position: 'right',
                                    display: true,
                                    beginAtZero: false,
                                    grace: '5%',
                                    grid: {
                                        drawOnChartArea: false
                                    },
                                    title: {
                                        display: true,
                                        text: 'Total Supply (BWORK)',
                                        color: 'rgb(255, 152, 0)',
                                        font: {
                                            size: 11,
                                            weight: 'bold'
                                        }
                                    },
                                    ticks: {
                                        color: '#f2f2f2',
                                        maxTicksLimit: 6,
                                        callback: function (value, index, values) {
                                            return toReadableThousands(value);
                                        }
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    display: true,
                                    labels: {
                                        color: '#f2f2f2',
                                        usePointStyle: true
                                    }
                                },
                                tooltip: {
                                    mode: 'index',
                                    intersect: false,
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    titleColor: '#f2f2f2',
                                    bodyColor: '#f2f2f2',
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                    borderWidth: 1,
                                    callbacks: {
                                        title: function (context) {
                                            return 'Block: ' + Math.floor(context[0].parsed.x);
                                        }
                                    }
                                }
                            }
                        }
                    });






                    // Create Price Chart
                    const priceTimeCtx = document.getElementById('chart-pricetime').getContext('2d');
                    var price_chart = new Chart(priceTimeCtx, {
                        type: 'line',
                        data: {
                            datasets: [{
                                label: "USD Price of 1 BWORK",
                                backgroundColor: 'rgb(50, 205, 50)',
                                borderColor: 'rgb(50, 205, 50)',
                                data: avgPriceAtTime,
                                fill: false,
                                tension: 0,
                                pointRadius: 1,
                                pointHoverRadius: 3,
                                borderWidth: 1,
                                yAxisID: 'y'
                            }, {
                                label: "ETH Price of 1 BWORK",
                                backgroundColor: 'rgb(158, 168, 219)',
                                borderColor: 'rgb(158, 168, 219)',
                                data: resultGraph,
                                fill: false,
                                tension: 0,
                                pointRadius: 1,
                                pointHoverRadius: 3,
                                borderWidth: 1,
                                yAxisID: 'y1'
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            parsing: {
                                xAxisKey: 'x',
                                yAxisKey: 'y'
                            },
                            interaction: {
                                intersect: false,
                                mode: 'index'
                            },
                            scales: {
                                x: {
                                    type: 'linear',
                                    display: true,
                                    position: 'bottom',
                                    grid: {
                                        display: true,
                                        color: 'rgba(255, 255, 255, 0.1)',
                                        drawOnChartArea: true
                                    },
                                    ticks: {
                                        color: '#f2f2f2',
                                        maxRotation: 45,
                                        maxTicksLimit: 8,
                                        callback: function (value, index, values) {
                                            return BWORKethBlockNumberToDateStr(Math.floor(value));
                                        }
                                    },
                                    title: {
                                        display: true,
                                        text: 'Block Number',
                                        color: '#f2f2f2',
                                        font: {
                                            size: 11,
                                            weight: 'normal'
                                        }
                                    }
                                },
                                y: {
                                    type: 'linear',
                                    position: 'left',
                                    display: true,
                                    beginAtZero: false,
                                    grace: '5%',
                                    grid: {
                                        display: true,
                                        color: 'rgba(255, 255, 255, 0.1)',
                                        drawOnChartArea: true
                                    },
                                    title: {
                                        display: true,
                                        text: 'USD Price',
                                        color: 'rgb(50, 205, 50)',
                                        font: {
                                            size: 11,
                                            weight: 'bold'
                                        }
                                    },
                                    ticks: {
                                        color: '#f2f2f2',
                                        maxTicksLimit: 6,
                                        callback: function (value, index, values) {
                                            return '$' + value.toFixed(4);
                                        }
                                    }
                                },
                                y1: {
                                    type: 'linear',
                                    position: 'right',
                                    display: true,
                                    beginAtZero: false,
                                    grace: '5%',
                                    grid: {
                                        drawOnChartArea: false
                                    },
                                    title: {
                                        display: true,
                                        text: 'ETH Price',
                                        color: 'rgb(158, 168, 219)',
                                        font: {
                                            size: 11,
                                            weight: 'bold'
                                        }
                                    },
                                    ticks: {
                                        color: '#f2f2f2',
                                        maxTicksLimit: 6,
                                        callback: function (value, index, values) {
                                            return (value / scaleFactor).toFixed(8) + ' ETH';
                                        }
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    display: true,
                                    labels: {
                                        color: '#f2f2f2',
                                        usePointStyle: true
                                    }
                                },
                                tooltip: {
                                    mode: 'index',
                                    intersect: false,
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    titleColor: '#f2f2f2',
                                    bodyColor: '#f2f2f2',
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                    borderWidth: 1,
                                    callbacks: {
                                        title: function (context) {
                                            return 'Block: ' + Math.floor(context[0].parsed.x);
                                        }
                                    }
                                }
                            }
                        }
                    });






                    // Create Average Revenue Chart
                    const revenueCtx = document.getElementById('chart-AvgRevenue').getContext('2d');
                    var revenue_chart = new Chart(revenueCtx, {
                        type: 'line',
                        data: {
                            datasets: [{
                                label: "24 Hour Revenue @ 31 Gh/s",
                                backgroundColor: 'rgb(50, 205, 50)',
                                borderColor: 'rgb(50, 205, 50)',
                                data: avgRevenue,
                                fill: false,
                                tension: 0,
                                pointRadius: 1,
                                pointHoverRadius: 3,
                                borderWidth: 1,
                                yAxisID: 'y'
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            parsing: {
                                xAxisKey: 'x',
                                yAxisKey: 'y'
                            },
                            interaction: {
                                intersect: false,
                                mode: 'index'
                            },
                            scales: {
                                x: {
                                    type: 'linear',
                                    display: true,
                                    position: 'bottom',
                                    grid: {
                                        display: true,
                                        color: 'rgba(255, 255, 255, 0.1)',
                                        drawOnChartArea: true
                                    },
                                    ticks: {
                                        color: '#f2f2f2',
                                        maxRotation: 45,
                                        maxTicksLimit: 8,
                                        callback: function (value, index, values) {
                                            return BWORKethBlockNumberToDateStr(Math.floor(value));
                                        }
                                    },
                                    title: {
                                        display: true,
                                        text: 'Block Number',
                                        color: '#f2f2f2',
                                        font: {
                                            size: 11,
                                            weight: 'normal'
                                        }
                                    }
                                },
                                y: {
                                    type: 'linear',
                                    position: 'left',
                                    display: true,
                                    beginAtZero: true,
                                    grace: '5%',
                                    grid: {
                                        display: true,
                                        color: 'rgba(255, 255, 255, 0.1)',
                                        drawOnChartArea: true
                                    },
                                    title: {
                                        display: true,
                                        text: 'Daily Revenue (USD)',
                                        color: 'rgb(50, 205, 50)',
                                        font: {
                                            size: 11,
                                            weight: 'bold'
                                        }
                                    },
                                    ticks: {
                                        color: '#f2f2f2',
                                        maxTicksLimit: 6,
                                        callback: function (value, index, values) {
                                            return '$' + value.toFixed(2);
                                        }
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    display: true,
                                    labels: {
                                        color: '#f2f2f2',
                                        usePointStyle: true
                                    }
                                },
                                tooltip: {
                                    mode: 'index',
                                    intersect: false,
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    titleColor: '#f2f2f2',
                                    bodyColor: '#f2f2f2',
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                    borderWidth: 1,
                                    callbacks: {
                                        title: function (context) {
                                            return 'Block: ' + Math.floor(context[0].parsed.x);
                                        }
                                    }
                                }
                            }
                        }
                    });





                    goToURLAnchor();
                }

                async function show_progress(value) {
                    log('updating progress.. (', value, ')');
                    el('#difficultystats').innerHTML = '<div class="">Loading info from the blockchain... <span style="font-weight:600;">' + value + '</span></div>';
                    el('#blocktimestats').innerHTML = '<div class="">Loading info from the blockchain... <span style="font-weight:600;">' + value + '</span></div>';
                    el('#priceOverTimestats').innerHTML = '<div class="">Loading info from the blockchain... <span style="font-weight:600;">' + value + '</span></div>';
                    el('#avgRevenue').innerHTML = '<div class="">Loading info from the blockchain... <span style="font-weight:600;">' + value + '</span></div>';
                }

                async function updateHashrateAndBlocktimeGraph(ethersProviderInstance, start_eth_block, end_eth_block, num_search_points) {
                    console.log("123123Start search at: ", start_eth_block);
                    console.log("123123end_eth_block: ", end_eth_block);

                    // Create contract value trackers
                    var last_diff_start_blocks = new contractValueOverTime(ethersProviderInstance, BWORK_CONTRACT_ADDRESS, BWORK_LAST_DIFF_START_BLOCK_INDEX, 'diffStartBlocks2');
                    var era_values = new contractValueOverTime(ethersProviderInstance, BWORK_CONTRACT_ADDRESS, BWORK_ERA_INDEX, 'eraValues2');
                    var tokens_minted_values = new contractValueOverTime(ethersProviderInstance, BWORK_CONTRACT_ADDRESS, BWORK_TOKENS_MINTED_INDEX, 'tokensMinted2');
                    var tokens_price_values = new contractValueOverTime(ethersProviderInstance, '0x498581fF718922c3f8e6A244956aF099B2652b2b', '0xd66bf39be2869094cf8d2d31edffab51dc8326eadf3c7611d397d156993996da', 'BWORKETHPrice');
                    var tokens_price_values3 = new contractValueOverTime(ethersProviderInstance, '0x498581fF718922c3f8e6A244956aF099B2652b2b', '0xe570f6e770bf85faa3d1dbee2fa168b56036a048a7939edbcd02d7ebddf3f948', 'USDCETHPrice');
                    var mining_target_values = new contractValueOverTime(ethersProviderInstance, BWORK_CONTRACT_ADDRESS, BWORK_MINING_TARGET_INDEX, 'miningTargets2');

                    // Load data with progress updates
                    await tokens_price_values.addValuesInRange(start_eth_block, end_eth_block, num_search_points);
                    await sleep(500);
                    show_progress('10% [42 / 420]');

                    await tokens_price_values3.addValuesInRange(start_eth_block, end_eth_block, num_search_points);
                    await sleep(200);
                    show_progress('20% [84 / 420]');

                    await last_diff_start_blocks.addValuesInRange(start_eth_block, end_eth_block, num_search_points);
                    await sleep(200);

                    // Wait for completion with progress tracking
                    while (!last_diff_start_blocks.areAllValuesLoaded() || !tokens_price_values.areAllValuesLoaded() || !tokens_price_values3.areAllValuesLoaded()) {
                        let numerator = tokens_price_values.states.length + tokens_price_values3.states.length + last_diff_start_blocks.states.length;
                        let denominator = tokens_price_values.expected_state_length + tokens_price_values3.expected_state_length + last_diff_start_blocks.expected_state_length;
                        show_progress((50 * (numerator / denominator)).toFixed(0) + '% [' + (0.5 * numerator).toFixed(0) + ' / ' + denominator.toFixed(0) + ']');
                        await sleep(1000);
                    }

                    await sleep(3000);

                    await era_values.addValuesInRange(start_eth_block, end_eth_block, num_search_points);
                    await sleep(500);
                    show_progress('60% [250 / 420]');

                    await tokens_minted_values.addValuesInRange(start_eth_block, end_eth_block, num_search_points);
                    await sleep(500);
                    show_progress('70% [350 / 420]');

                    await mining_target_values.addValuesInRange(start_eth_block, end_eth_block, num_search_points);

                    // Wait for all to complete
                    await last_diff_start_blocks.waitUntilLoaded();
                    await mining_target_values.waitUntilLoaded();
                    await tokens_minted_values.waitUntilLoaded();
                    await era_values.waitUntilLoaded();
                    await tokens_price_values3.waitUntilLoaded();
                    await tokens_price_values.waitUntilLoaded();

                    // Sort and save data
                    last_diff_start_blocks.sortValues();
                    mining_target_values.sortValues();
                    era_values.sortValues();
                    tokens_minted_values.sortValues();
                    tokens_price_values.sortValues();
                    tokens_price_values3.sortValues();

                    generateHashrateAndBlocktimeGraph(ethersProviderInstance, mining_target_values, era_values, tokens_price_values, tokens_price_values3, tokens_minted_values);

                    document.getElementById('topText').style.display = 'none';
                    document.getElementById('topText2').style.display = 'none';

                    // Save to localStorage
                    era_values.saveToLocalStorage(num_search_points);
                    mining_target_values.saveToLocalStorage(num_search_points);
                    last_diff_start_blocks.saveToLocalStorage(num_search_points);
                    tokens_minted_values.saveToLocalStorage(num_search_points);
                    tokens_price_values.saveToLocalStorage(num_search_points);
                    tokens_price_values3.saveToLocalStorage(num_search_points);
                }

                function updateGraphData(history_days, num_search_points) {
                    show_progress('0% [0 / 0]');

                    setTimeout(async () => {
                        while (BWORK_latest_eth_block == null) {
                            log('waiting for BWORK_latest_eth_block...');
                            await sleep(300);
                        }

                        const eth_blocks_per_day = 24 * 60 * (60 / _SECONDS_PER_ETH_BLOCK);
                        log("_SECONDS_PER_ETH_BLOCK..." + eth_blocks_per_day);

                        let max_blocks = history_days * eth_blocks_per_day;
                        if (max_blocks / num_search_points > eth_blocks_per_day) {
                            log("WARNING: search points are greater than 1 day apart. Make sure you know what you are doing...");
                        }

                        num_search_points = history_days;
                        searchPoints2 = num_search_points
                        let start_eth_block = (BWORK_latest_eth_block - max_blocks);
                        if (start_eth_block < 30413732) {
                            start_eth_block = 30413732;
                        }

                        log("latest_eth_block..." + latest_eth_block);
                        log("BWORK_latest_eth_block..." + BWORK_latest_eth_block);
                        log("USING BWORK_LATEST_ETH_BLOCK RIGHT NOW BWORK_latest_eth_block..." + BWORK_latest_eth_block);
                        log("latest_eth_block max_blocks..." + max_blocks);
                        log("latest_eth_block...=" + (latest_eth_block - max_blocks));
                        log("latest_eth_block max_blocks..." + start_eth_block);
                        let end_eth_block = BWORK_latest_eth_block - 8;

                        console.log("zz123123Start search at: ", start_eth_block);
                        console.log("zz123123end_eth_block: ", end_eth_block);
                        updateHashrateAndBlocktimeGraph(ethersProvider, start_eth_block, end_eth_block, num_search_points);

                    }, 0);
                }

























                function getTimeUnits(seconds) {
                    // Handle edge cases
                    if (seconds < 0) {
                        return { avgTime: 0, units: "seconds" };
                    }

                    // Define time conversion constants
                    const MINUTE = 60;
                    const HOUR = 60 * 60;
                    const DAY = 24 * 60 * 60;
                    const YEAR = 365.25 * 24 * 60 * 60; // Including leap years

                    let avgTime, units;

                    if (seconds < MINUTE) {
                        // Less than 1 minute - show in seconds
                        avgTime = parseFloat(seconds.toFixed(1));
                        units = avgTime === 1 ? "second" : "seconds";
                    }
                    else if (seconds < HOUR) {
                        // Less than 1 hour - show in minutes
                        avgTime = parseFloat((seconds / MINUTE).toFixed(1));
                        units = avgTime === 1 ? "minute" : "minutes";
                    }
                    else if (seconds < DAY) {
                        // Less than 1 day - show in hours
                        avgTime = parseFloat((seconds / HOUR).toFixed(1));
                        units = avgTime === 1 ? "hour" : "hours";
                    }
                    else if (seconds < YEAR) {
                        // Less than 1 year - show in days
                        avgTime = parseFloat((seconds / DAY).toFixed(1));
                        units = avgTime === 1 ? "day" : "days";
                    }
                    else {
                        // 1 year or more - show in years
                        avgTime = parseFloat((seconds / YEAR).toFixed(1));
                        units = avgTime === 1 ? "year" : "years";
                    }

                    return {
                        avgTime: avgTime,
                        units: units
                    };
                }


                async function getCurrentPrice() {


                    return 1.00;
                }


                async function getAvgRewardTime() {


                    return 1000;
                }


                function convertHashRateToReadable(hashratez) {
                    const units = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s'];
                    let unitIndex = 0;
                    let value = parseFloat(hashratez);

                    while (value >= 1000 && unitIndex < units.length - 1) {
                        value /= 1000;
                        unitIndex++;
                    }

                    return {
                        value: value.toFixed(2),
                        units: units[unitIndex]
                    }
                }

                function convertHashRateToReadable2(hashratez) {
                    const units = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s'];
                    let unitIndex = 0;
                    let value = parseFloat(hashratez);

                    while (value >= 1000 && unitIndex < units.length - 1) {
                        value /= 1000;
                        unitIndex++;
                    }

                    return value.toFixed(2) + ' ' + units[unitIndex];
                }


                async function getHashrate(diffz, avgRewardTimez) {
                    var hashrate = (2 ** 22 * diffz) / avgRewardTimez;
                    console.log("hashrate: ", hashrate);

                    return hashrate;
                }


                async function getTarget(providera) {
                    const contractABI = [{ "inputs": [], "name": "miningTarget", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
                    const contract = new ethers.Contract(ProofOfWorkAddresss, contractABI, providera);
                    const miningTarget = await contract.miningTarget();
                    return miningTarget.toString();
                }


                async function getDifficulty(providera) {
                    var target = parseFloat(await getTarget(providera));
                    var difficulty = ((2 ** 253) / target) / 524_288;

                    var difficultyInput = document.getElementById("difficulty-input");

                    // Set its value to the new difficulty
                    difficultyInput.value = difficulty;
                    return difficulty.toString();
                }
                var epochCount = 0;
                async function getEpochCount(providera) {
                    const contractABI = [{ "inputs": [], "name": "epochCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
                    const contract = new ethers.Contract(ProofOfWorkAddresss, contractABI, providera);
                    epochCount = await contract.epochCount();
                    console.log("epochCount: ",epochCount);
                    return epochCount.toString();
                }


                async function getAvgRewardTime(providera) {
                    const contractABI = [{ "inputs": [], "name": "inflationMined", "outputs": [{ "internalType": "uint256", "name": "YearlyInflation", "type": "uint256" }, { "internalType": "uint256", "name": "EpochsPerYear", "type": "uint256" }, { "internalType": "uint256", "name": "RewardsAtTime", "type": "uint256" }, { "internalType": "uint256", "name": "TimePerEpoch", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
                    const contract = new ethers.Contract(ProofOfWorkAddresss, contractABI, providera);
                    const result = await contract.inflationMined();
                    return {
                        YearlyInflation: result[0].toString(),
                        EpochsPerYear: result[1].toString(),
                        RewardsAtTime: result[2].toString(),
                        TimePerEpoch: result[3].toString()
                    };
                }

                async function getRewardPerSolve() {


                    return 2511;
                }

                async function getBlocksToReadjust(providera) {
                    const contractABI = [{ "inputs": [], "name": "blocksToReadjust", "outputs": [{ "internalType": "uint256", "name": "blocks", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
                    const contract = new ethers.Contract(ProofOfWorkAddresss, contractABI, providera);
                    const blocks = await contract.blocksToReadjust();
                    return blocks.toString();
                }

                async function getTimeEmergency(providera) {
                    const contractABI = [{ "inputs": [], "name": "seconds_Until_adjustmentSwitch", "outputs": [{ "internalType": "uint256", "name": "secs", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
                    const contract = new ethers.Contract(ProofOfWorkAddresss, contractABI, providera);
                    const secs = await contract.seconds_Until_adjustmentSwitch();
                    return secs.toString();
                }



                async function getLastDiffStartBlock(providera) {

                    const contractABI = [{ "inputs": [], "name": "latestDifficultyPeriodStarted", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
                    const contract = new ethers.Contract(ProofOfWorkAddresss, contractABI, providera);
                    const latestDifficultyPeriodStarted2 = await contract.latestDifficultyPeriodStarted();
                    return latestDifficultyPeriodStarted2.toString();
                }


                async function getLastDiffStartime(providera) {


                    const contractABI = [{ "inputs": [], "name": "latestDifficultyPeriodStarted2", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
                    const contract = new ethers.Contract(ProofOfWorkAddresss, contractABI, providera);
                    const latestDifficultyPeriodStarted2 = await contract.latestDifficultyPeriodStarted2();
                    return latestDifficultyPeriodStarted2.toString();
                    return 130;
                }


                async function getRemainingSupplyINERA(providera, totalDistributedMining, maxperEra) {

                    return maxperEra - totalDistributedMining;


                }
                async function getRemainingBlocksInEra(rewardPerSolve, totalDistributedMining, maxperEra) {

                    return (maxperEra - totalDistributedMining) / rewardPerSolve;


                }


                async function getTransfers(providera) {

                    return 330;

                }


                async function getTotalOperations(providera) {

                    return 123123;

                }


                async function getLastBaseBlock(providera) {
                    const blockNumber = await providera.getBlockNumber();
                    return blockNumber;
                }


                async function getRewardEra(providera) {
                    const contractABI = [{ "inputs": [], "name": "rewardEra", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
                    const contract = new ethers.Contract(ProofOfWorkAddresss, contractABI, providera);
                    const rewardEra = await contract.rewardEra();
                    return rewardEra.toString();
                }



                async function getTokenHolders(providera) {

                    return 1000;
                }



                async function getNextDifficulty(providera) {

                    const contractABI = [{ "inputs": [], "name": "readjustsToWhatDifficulty", "outputs": [{ "internalType": "uint256", "name": "newDifficulty", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
                    const contract = new ethers.Contract(ProofOfWorkAddresss, contractABI, providera);
                    var newDifficulty = await contract.readjustsToWhatDifficulty();
                    newDifficulty = newDifficulty / 524288;

                    var difficultyInput = document.getElementById("difficulty-input");

                    // Set its value to the new difficulty
                    difficultyInput.value = newDifficulty;


                    return newDifficulty.toString();

                }

                async function getAvgBlocksRemainingInEra(providera) {

                    return 313131313113131;
                }


                async function getTimestampFromBlock(blockNumber, providera) {
                    console.log("Block Number = ", blockNumber);

                    // Convert to number if it's a string, or ensure it's an integer
                    const blockNum = parseInt(blockNumber);

                    const block = await providerTempStats.getBlock(blockNum);
                    const timestamp = block.timestamp;

                    // Convert to milliseconds and create Date object
                    const date = new Date(timestamp * 1000);

                    // Return formatted timestamp
                    return date.toLocaleString();
                }
                async function getDaysUntilNextEra(providera) {

                    return {
                        daysUntil: 123123,
                        MintSpeed: 33333
                    };
                }
                async function getTokensMinted(providera) {
                    const contractABI = [{ "inputs": [], "name": "tokensMinted", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
                    const contract = new ethers.Contract(ProofOfWorkAddresss, contractABI, providera);
                    const tokensMinted = await contract.tokensMinted() / 1e18;
                    return tokensMinted.toString();
                }
                async function getMaxSupplyForEra(providera) {
                    const contractABI = [{ "inputs": [], "name": "maxSupplyForEra", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
                    const contract = new ethers.Contract(ProofOfWorkAddresss, contractABI, providera);
                    const maxSupplyForEra = await contract.maxSupplyForEra() / 1e18;
                    return maxSupplyForEra.toString();
                }








                /* colors used by pool names. todo: move to css, still use them for chart.js */
                var pool_colors = {
                    orange: "#C64500",
                    purple: "#4527A0", // note: purple looks a lot like blue
                    blue: "#0277BD",
                    green: "#2E7D32",
                    yellow: "#997500",
                    darkpurple: "#662354",
                    darkred: "hsl(356, 48%, 30%)",
                    teal: "#009688",
                    red: "#f44336",
                    slate: "#34495e",
                    brightred: "#C62828",
                    royal: "#0070bc",
                    pink: "#EC407A",
                    grey: "#78909c",

                    /* colors below here are not assigned yet */
                    lightpurple: "#9c27b0",
                    lime: "#cddc39",
                    brown: "#8d6e63",
                }





                async function fetchTransactionsData(miner_blk_cnt) {
                    try {
                        // Fetching the transactions data from the GitHub API
                        const response = await fetch('https://raw.githubusercontent.com/BasedWorkToken/Based-Work-Token-General/main/api/CostScript/saveFiles/BWORK_transaction_analysis_cost_summary.json');
                        const transactionsData = await response.json();
                        console.log("API DATA: ", transactionsData);
                        const combinedData = combineWithMinerData(miner_blk_cnt, transactionsData);
                        console.log("Combined Data: ", combinedData);
                        return combinedData;
                    } catch (error) {
                        console.error("Error fetching transaction data: ", error);
                        throw error; // Rethrow if you want to handle it elsewhere
                    }
                }

                function combineWithMinerData(miner_blk_cnt, transactionsData) {
                    // Prepare a new data structure to hold combined data
                    var combinedData = [];
                    console.log("Miner Block Count: ", miner_blk_cnt);
                    console.log("Transactions Data: ", transactionsData);

                    // Loop through the miner_blk_cnt array to find matches with transactions data
                    for (const address of miner_blk_cnt) {
                        // Convert the miner address to lowercase for comparison
                        const lowerCaseAddress = address.toLowerCase();

                        // Find corresponding transaction entry for the address
                        const transactionEntry = transactionsData.find(entry => entry.from.toLowerCase() === lowerCaseAddress);

                        if (transactionEntry) {
                            combinedData.push({
                                address: address,
                                totalValue: transactionEntry.total_value,
                                totalCost: transactionEntry.total_cost,
                                transactionCount: transactionEntry.transaction_count
                            });
                        } else {
                            // If no match found, still store the miner data with nulls for the transaction data
                            combinedData.push({
                                address: address,
                                totalValue: null,
                                totalCost: null,
                                transactionCount: null
                            });
                        }
                    }

                    // Example of how to use the combined data
                    console.log("Combined Data: ", combinedData);
                    return combinedData;
                }

                function showBlockDistributionPieChart(piechart_dataset, piechart_labels) {
                    //console.log('dataset', piechart_dataset);
                    document.querySelector('#row-miners').style.display = 'block';
                    document.querySelector('#blockdistributionpiechart').innerHTML = '<canvas id="chart-block-distribution" width="2rem" height="2rem"></canvas>';

                    if (piechart_dataset.length == 0 || piechart_labels.length == 0) {
                        return;
                    }

                    //Chart.defaults.global.elements.arc.backgroundColor = 'rgba(255,0,0,1)';
                    Chart.defaults.elements.arc.borderColor = 'rgb(32, 34, 38)';
                    Chart.defaults.elements.arc.borderWidth = 3;

                    /* hashrate and difficulty chart */
                    var hr_diff_chart = new Chart(document.getElementById('chart-block-distribution').getContext('2d'), {
                        type: 'doughnut',

                        data: {
                            datasets: [piechart_dataset],
                            labels: piechart_labels,
                        },

                        options: {
                            legend: {
                                display: false,
                            },
                        },
                    });
                }

                function showBlockDistributionPieChart2(piechart_dataset, piechart_labels) {
                    //console.log('dataset', piechart_dataset);
                    document.querySelector('#row-miners2').style.display = 'block';
                    document.querySelector('#blockdistributionpiechart2').innerHTML = '<canvas id="chart-block-distribution2"></canvas>';


                    if (piechart_dataset.length == 0 || piechart_labels.length == 0) {
                        return;
                    }

                    //Chart.defaults.global.elements.arc.backgroundColor = 'rgba(255,0,0,1)';
                    Chart.defaults.elements.arc.borderColor = 'rgb(32, 34, 38)';
                    Chart.defaults.elements.arc.borderWidth = 3;

                    /* hashrate and difficulty chart */
                    var hr_diff_chart = new Chart(document.getElementById('chart-block-distribution2').getContext('2d'), {
                        type: 'doughnut',

                        data: {
                            datasets: [piechart_dataset],
                            labels: piechart_labels,
                        },

                        options: {
                            legend: {
                                display: false,
                            },
                        },
                    });
                }

                function getMinerColor(address, known_miners) {
                    function simpleHash(seed, string) {
                        var h = seed;
                        for (var i = 0; i < string.length; i++) {
                            h = ((h << 5) - h) + string[i].codePointAt();
                            h &= 0xFFFFFFFF;
                        }
                        return h;
                    }

                    if (known_miners[address] !== undefined) {
                        var hexcolor = known_miners[address][2];
                    } else {
                        var test = (simpleHash(2, address) % 360)
                        if ((simpleHash(2, address) % 360) < 0) {
                            test = (simpleHash(2, address) % 360) + 360

                        }
                        hexcolor = 'hsl(' + test + ', 48%, 30%)';
                    }
                    if (address == "0xfaf20e5ca7e39d43a3aabc450602b4147c3aa62e") {
                        //console.log("hex color: ", hexcolor);
                    }
                    return hexcolor;
                }



                var known_miners = {
                    "0x49228d306754af5d16d477149ee50bef5ca286be": ["BWORK Mining Pool", "http://pool.basedworktoken.org/", pool_colors.orange], // mint helper contract (old)
                    "0x98181a5f3b91117426331b54e2a47e8fa74f56b0": ["BWORK Mining Pool", "http://pool.basedworktoken.org/", pool_colors.orange], // mint helper contract (old)
                    "0xce2e772f8bcf36901bacf31dfc67e38954e15754": ["Mineable Token Pool", "https://pool.0xmt.com/", pool_colors.orange], // mint helper contract (old)
                    "0xeabe48908503b7efb090f35595fb8d1a4d55bd66": ["ABAS Mining Pool", "http://pool.abastoken.org/", pool_colors.orange], // mint helper contract
                    "0x53ce57325c126145de454719b4931600a0bd6fc4": ["0xPool", "http://0xPool.io", pool_colors.purple], // closed sometime 2018
                    "0x98b155d9a42791ce475acc336ae348a72b2e8714": ["0xBTCpool", "http://0xBTCpool.com", pool_colors.blue],
                    "0x363b5534fb8b5f615583c7329c9ca8ce6edaf6e6": ["mike.rs pool", "http://mike.rs", pool_colors.green],
                    "0x50212e78d96a183f415e1235e56e64416d972e93": ["mike.rs pool", "http://mike.rs", pool_colors.green], // mint helper contract
                    "0x02c8832baf93380562b0c8ce18e2f709d6514c60": ["mike.rs pool B", "http://b.mike.rs", pool_colors.green],
                    "0x8dcee1c6302232c4cc5ce7b5ee8be16c1f9fd961": ["Mine0xBTC", "http://mine0xbtc.eu", pool_colors.darkpurple],
                    "0x20744acca6966c0f45a80aa7baf778f4517351a4": ["PoolOfD32th", "http://0xbtc.poolofd32th.club", pool_colors.darkred],
                    "0xd4ddfd51956c19f624e948abc8619e56e5dc3958": ["0xMiningPool", "http://0xminingpool.com/", pool_colors.teal],
                    "0x88c2952c9e9c56e8402d1b6ce6ab986747336b30": ["0xbtc.wolfpool.io", "http://wolfpool.io/", pool_colors.red],
                    "0x540d752a388b4fc1c9deeb1cd3716a2b7875d8a6": ["tosti.ro", "http://0xbtc.tosti.ro/", pool_colors.slate],
                    "0xbbdf0402e51d12950bd8bbd50a25ed1aba5615ef": ["ExtremeHash", "http://0xbtc.extremehash.io/", pool_colors.brightred],
                    "0x7d28994733e6dbb93fc285c01d1639e3203b54e4": ["Wutime.com", "http://wutime.com/", pool_colors.royal],
                    "0x02e03db268488716c161721663501014fa031250": ["xb.veo.network", "https://xb.veo.network:2096/", pool_colors.pink],
                    "0xbf39de3c506f1e809b4e10e00dd22eb331abf334": ["xb.veo.network", "https://xb.veo.network:2096/", pool_colors.pink],
                    "0x5404bd6b428bb8e326880849a61f0e7443ef5381": ["666pool", "http://0xbtc.666pool.cn/", pool_colors.grey],
                    "0x7d3ebd2b56651d164fc36180050e9f6f7b890e9d": ["MVIS Mining Pool", "http://mvis.ca", pool_colors.blue],  // added 2020-02-23
                    "0xd3e89550444b7c84e18077b9cbe3d4e3920f257d": ["0xPool", "https://0xpool.me/", pool_colors.purple], // added 2021-12-28, its a combo 0xBTC + BNBTC pool
                    "0x6917035f1deecc51fa475be4a2dc5528b92fd6b0": ["PiZzA pool", "http://gpu.PiZzA", pool_colors.yellow],
                    "0x693d59285fefbd6e7be1b87be959eade2a4bf099": ["PiZzA pool", "http://gpu.PiZzA", pool_colors.yellow],
                    "0x697f698dd492d71734bcaec77fd5065fa7a95a63": ["PiZzA pool", "http://gpu.PiZzA", pool_colors.yellow],
                    "0x69ebd94944f0dba3e9416c609fbbe437b45d91ab": ["PiZzA pool", "http://gpu.PiZzA", pool_colors.yellow],
                    "0x69b85604799d16d938835852e497866a7b280323": ["PiZzA pool", "http://gpu.PiZzA", pool_colors.yellow],
                    "0x69ded73bd88a72bd9d9ddfce228eadd05601edd7": ["PiZzA pool", "http://gpu.PiZzA", pool_colors.yellow],
                }




                function getMinerName(address, known_miners) {
                    if (known_miners[address] !== undefined) {
                        return known_miners[address][0];
                    } else {
                        return address.substr(0, 14) + '...';
                    }
                }

                function getMinerNameLinkHTML(address, known_miners) {
                    var hexcolor = getMinerColor(address, known_miners);
                    if (address == "0xfaf20e5ca7e39d43a3aabc450602b4147c3aa62e") {
                        //console.log("Link HTML Color: ", hexcolor);
                    }
                    var poolstyle = '<span style="background-color: ' + hexcolor + ';" class="miner-name">';

                    if (known_miners[address] !== undefined) {
                        var readable_name = known_miners[address][0];
                        var address_url = known_miners[address][1];
                    } else {
                        var readable_name = address.substr(0, 14) + '...';
                        var address_url = _BLOCK_EXPLORER_ADDRESS_URL + address;
                    }

                    return '<a href="' + address_url + '" target="_blank">' + poolstyle + readable_name + '</span></a>';
                }

                function getMinerAddressFromTopic(topic) {
                    return '0x' + topic.substr(26, 41);
                }



                const _MINT_TOPIC = "0xcf6fbb9dcea7d07263ab4f5c3a92f53af33dffc421d9d121e1c74b307e68189d";

                var _BLOCK_EXPLORER_ADDRESS_URL = 'https://sepolia.basescan.org/address/';
                var _BLOCK_EXPLORER_TX_URL = 'https://sepolia.basescan.org/tx/';
                var _BLOCK_EXPLORER_BLOCK_URL = 'https://sepolia.basescan.org/block/';

                /* TODO use hours_into_past */
                async function updateAllMinerInfoFirst() {
                    if (!walletConnected) {
                        await connectTempRPCforStats();
                    }
                    var provids = provider;
                    if (!walletConnected) {
                        provids = providerTempStats;
                    }
                    updateAllMinerInfo(provids);



                }


                /* sleep for given number of milliseconds. note: must be called with 'await' */
                function sleep(ms) {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }

                let previousEpochCount = null; // Initialize outside the loop

                async function updateAllMinerInfo(provider) {
                    console.log('updateAllMinerInfo');

                    var previousChallenge = "0x0";
                    var totalZKBTC_Mined = [];
                    /* array of arrays of type [eth_block, txhash, miner_addr] */
                    var mined_blocks = [];
                    var totalZKTC_Calculated = 0;
                    var totalZKBTC_Mined_HASH = {};
                    /* dict where key=miner_addr and value=total_mined_block_count */
                    var miner_block_count = {};
                    var miner_block_count2 = {};
                    var miner_block_countHASH = {};
                    /* total number of blocks mined since last difficulty adjustment */
                    var total_mint_count_HASH = {};
                    var total_block_count = 0;
                    var total_tx_count = 0;
                    var last_imported_mint_block = 0;
                    var total_TOTAL_mint_count_HASH = 0;


                    var provids = provider;
                    if (!walletConnected) {
                        provids = providerTempStats;
                    }
                    console.log("Connect done");


                    console.log("Connect done");

                    // Alchemy recommends concurrent requests, so let's use them!
                    // Group into logical batches under 50 requests each

                      var epochCountsss = await getEpochCount(provids);


                        console.log("EOCH COUNTZ : ",epochCountsss);
                    var EpochCountBeforeCall = parseInt(epochCountsss);
                    console.log("Before call epochCount: ",EpochCountBeforeCall);
                    var last_reward_eth_block = lastBaseBlock;
                    var current_eth_block = currentBlock;
                    var estimated_network_hashrate = estHashrate;
                    var last_difficulty_start_block = lastDifficultyStartBlock;
                    console.log("last_difficulty_start_block: ", last_difficulty_start_block);
                    // check to see if the browser has any data in localStorage we can use.
                    // don't use the data, though, if it's from an old difficulty period
                    try {
                        // Load local storage data first
                        var last_diff_block_storage = Number(localStorage.getItem('lastDifficultyStartBlock_EraBitcoin2_afbRAFFABC_B0x1'));
                        last_imported_mint_block = Number(localStorage.getItem('lastMintBlock_EraBitcoin2_afbRAFFABC_B0x1'));
                        previousChallenge = JSON.parse(localStorage.getItem('mintData_GreekWedding2_B0x1'));
                        console.log("previous ended challenge is this, starting here");
                        var mint_data = localStorage.getItem('mintData_EraBitcoin2_afbRAFFABC_B0x1');

                        console.log('last_imported_mint_block: ', last_imported_mint_block);
                        let localMinedBlocks = [];
                        let localLatestBlock = 0;

                        if (mint_data !== null) {
                            localMinedBlocks = JSON.parse(mint_data);
                            // Find the highest block number in local data
                            localLatestBlock = last_imported_mint_block;
                            console.log('Local storage has', localMinedBlocks.length, 'blocks, latest:', localLatestBlock);
                        }

                        // Fetch remote data
                        let remoteMinedBlocks = [];
                        let remoteLatestBlock = 0;







// Primary and backup URLs
const primaryUrl = customDataSource+'uu_mined_blocks_testnet.json';
const backupUrl = customBACKUPDataSource+'uu_mined_blocks_testnet.json';

try {
    console.log('Attempting to fetch from primary source...');
    const response = await fetch(primaryUrl);
    
    if (response.ok) {
        const remoteData = await response.json();
        remoteMinedBlocks = remoteData.mined_blocks;
        remoteLatestBlock = remoteData.latest_block_number;
        console.log('✅ Primary source: Remote data has', remoteMinedBlocks.length, 'blocks, latest:', remoteLatestBlock);

        // Update previousChallenge if available in remote data
        if (remoteData.previous_challenge) {
            previousChallenge = remoteData.previous_challenge;
        }
    } else {
        throw new Error(`Primary source failed with status: ${response.status}`);
    }
} catch (primaryError) {
    console.warn('⚠️ Primary source failed:', primaryError.message);
    console.log('🔄 Falling back to GitHub backup...');
    
    try {
        const backupResponse = await fetch(backupUrl);
        
        if (backupResponse.ok) {
            const remoteData = await backupResponse.json();
            remoteMinedBlocks = remoteData.mined_blocks;
            remoteLatestBlock = remoteData.latest_block_number;
            console.log('✅ Backup source: Remote data has', remoteMinedBlocks.length, 'blocks, latest:', remoteLatestBlock);

            // Update previousChallenge if available in remote data
            if (remoteData.previous_challenge) {
                previousChallenge = remoteData.previous_challenge;
            }
        } else {
            throw new Error(`Backup source failed with status: ${backupResponse.status}`);
        }
    } catch (backupError) {
        console.error('❌ Both primary and backup sources failed!');
        console.error('Primary error:', primaryError.message);
        console.error('Backup error:', backupError.message);
        
        // Handle the case when both sources fail
        // You might want to use cached data or show an error message
        throw new Error('All data sources unavailable');
    }
}





                        // Compare and choose the best dataset
                        if (remoteLatestBlock > localLatestBlock) {
                            console.log('Using REMOTE data (more recent)');
                            mined_blocks = remoteMinedBlocks;
                            last_imported_mint_block = remoteLatestBlock;

                            // Update localStorage with remote data
                            localStorage.setItem('mintData_EraBitcoin2_afbRAFFABC_B0x1', JSON.stringify(remoteMinedBlocks));
                            localStorage.setItem('lastMintBlock_EraBitcoin2_afbRAFFABC_B0x1', remoteLatestBlock.toString());
                            if (previousChallenge) {
                                localStorage.setItem('mintData_GreekWedding2_B0x1', JSON.stringify(previousChallenge));
                            }
                        } else {
                            console.log('Using LOCAL data');
                            mined_blocks = localMinedBlocks;
                            last_imported_mint_block = localLatestBlock;
                        }

                        // Process the chosen mined_blocks array
                        console.log('imported', mined_blocks.length, 'transactions');

                        var index2 = 0;
                        var allepochs = 0;
                        var maxMinedBlocksEpoch = 0;
                        mined_blocks.forEach(function (mintData) {
                            //  console.log("Mint data stuff mintData: ",mintData);
                            // console.log("Mint data stuff mined_blocks[index + 1][4]: ",mined_blocks[index2 + 1][4]);

                            maxMinedBlocksEpoch = mined_blocks[0][4];
                            // Get the next block's epoch count
                            var epochCount = mintData[4];
                            var nextEpochCnt = null;
                            if (index2 + 1 < mined_blocks.length && mined_blocks[index2 + 1][4] != undefined) {
                                nextEpochCnt = mined_blocks[index2 + 1][4];
                                //  console.log("Mint data stuff mined_blocks[index + 1][4]: ", nextEpochCnt);
                            } else {
                                console.log("Mint data stuff mined_blocks[index + 1][4]: No next element, mined_blocks[index2]: ", mined_blocks[index2]);
                            }

                            if (nextEpochCnt !== null) {  // Added check for nextEpochCnt !== 0
                                // Use next transaction's epoch count
                                epchCount = epochCount - nextEpochCnt;
                            } else {
                                epchCount = epochCount;
                            }
                            index2 = index2 + 1;

                            var epochsMined = epchCount;

                            //  console.log("\n\n\n\n\nEpochs Mined : ", epochsMined);
                            allepochs = allepochs + epochsMined;
                            //   console.log("Epochs Mined allepochs: ", allepochs);
                            //console.log("Epochs Mined allepochs: ", allepochs,"\n\n");
                            try {
                                // console.log("Epochs Mined miner_block_countHASH[mintData[2]]: ",miner_block_countHASH[mintData[2]]);
                                // console.log("Epochs Mined totalZKBTC_Mined_HASH[mintData[2]]: ",totalZKBTC_Mined_HASH[mintData[2]]);

                                miner_block_count[mintData[2]]
                            } catch (err) {
                                console.log('err: ', err);
                            }
                            //  console.log("EpochMined: ",epochsMined);
                            // console.log("Previous Total Epochs = ",previousEpochCount );

                            if (mintData[3] == -1) {





                                if (miner_block_count[mintData[2]] === undefined) {
                                    miner_block_count[mintData[2]] = epochsMined;
                                    if (miner_block_count2[mintData[2]] === undefined && mintData[3] != 0) {
                                        miner_block_count2[mintData[2]] = 1;
                                    } else if (mintData[3] != 0) {
                                        miner_block_count2[mintData[2]] += 1;
                                    }
                                } else {
                                    miner_block_count[mintData[2]] += epochsMined;
                                    if (miner_block_count2[mintData[2]] === undefined && mintData[3] != 0) {
                                        miner_block_count2[mintData[2]] = 1;
                                    } else if (mintData[3] != 0) {
                                        miner_block_count2[mintData[2]] += 1;
                                    }
                                }
                                if (mintData[3] != 0) {
                                    total_tx_count += 1;
                                }

                                if (total_block_count == 0) {
                                    total_block_count = epochsMined;
                                } else {
                                    total_block_count += epochsMined;
                                }







                                console.log("mint data3 = -1");
                                totalZKBTC_Mined_HASH[mintData[2]]

                                if (mintData[3] != 0 && mintData[0] > last_difficulty_start_block) {

                                    if (total_mint_count_HASH[mintData[2]] === undefined) {
                                        total_mint_count_HASH[mintData[2]] = 1;
                                    } else {
                                        total_mint_count_HASH[mintData[2]] += 1;
                                    }
                                    total_TOTAL_mint_count_HASH += epochsMined;

                                    // It should be:
                                    if (totalZKBTC_Mined_HASH[mintData[2]] === undefined) {
                                        totalZKBTC_Mined_HASH[mintData[2]] = epochsMined;
                                    } else {
                                        totalZKBTC_Mined_HASH[mintData[2]] += epochsMined;
                                    }


                                    //totalZKBTC_Mined_HASH[mintData[2]] += epochsMined;
                                }


                                //   console.log("Last diff start block: ",last_difficulty_start_block, "    Vs mintDataBlock: ",mintData[0])

                            } else {

                                //   console.log("Last diff start block: ",last_difficulty_start_block, "    Vs mintDataBlock: ",mintData[0])
                                if (mintData[3] != 0 && mintData[0] > last_difficulty_start_block) {
                                    if (miner_block_countHASH[mintData[2]] === undefined) {
                                        miner_block_countHASH[mintData[2]] = mintData[3];
                                    } else {
                                        miner_block_countHASH[mintData[2]] += mintData[3];
                                    }
                                    if (total_mint_count_HASH[mintData[2]] === undefined) {
                                        total_mint_count_HASH[mintData[2]] = 1;
                                    } else {
                                        total_mint_count_HASH[mintData[2]] += 1;
                                    }
                                    total_TOTAL_mint_count_HASH += epochsMined;

                                    // It should be:
                                    if (totalZKBTC_Mined_HASH[mintData[2]] === undefined) {
                                        totalZKBTC_Mined_HASH[mintData[2]] = epochsMined;
                                    } else {
                                        totalZKBTC_Mined_HASH[mintData[2]] += epochsMined;
                                    }


                                    //totalZKBTC_Mined_HASH[mintData[2]] += epochsMined;
                                }

                                if (miner_block_count[mintData[2]] === undefined) {
                                    miner_block_count[mintData[2]] = epochsMined;
                                    if (miner_block_count2[mintData[2]] === undefined && mintData[3] != 0) {
                                        miner_block_count2[mintData[2]] = 1;
                                    } else if (mintData[3] != 0) {
                                        miner_block_count2[mintData[2]] += 1;
                                    }
                                } else {
                                    miner_block_count[mintData[2]] += epochsMined;
                                    if (miner_block_count2[mintData[2]] === undefined && mintData[3] != 0) {
                                        miner_block_count2[mintData[2]] = 1;
                                    } else if (mintData[3] != 0) {
                                        miner_block_count2[mintData[2]] += 1;
                                    }
                                }
                                if (mintData[3] != 0) {
                                    total_tx_count += 1;
                                }

                                if (total_block_count == 0) {
                                    total_block_count = epochsMined;
                                } else {
                                    total_block_count += epochsMined;
                                }

                                if (totalZKBTC_Mined[mintData[2]] === undefined) {
                                    totalZKBTC_Mined[mintData[2]] = mintData[3];
                                    totalZKTC_Calculated += mintData[3];
                                } else {
                                    totalZKBTC_Mined[mintData[2]] += mintData[3];
                                    totalZKTC_Calculated += mintData[3];
                                }
                            }

                            //   console.log(" totalZKBTC_Mined_HASH[mintData[2]]: ", totalZKBTC_Mined_HASH[mintData[2]]);
                            //     console.log("Epochs Mined miner_block_count[mintData[2]]: ",  miner_block_count[mintData[2]]);

                            //console.log("miner_block_count[miner_address]",miner_block_count[mintData[2]], " vs epochsMined",epochsMined)


                        });

                    } catch (err) {
                        console.log('error reading from localStorage:', err.message);
                        last_imported_mint_block = 0;
                        mined_blocks.length = 0;
                    }

                    var start_log_search_at = Math.max(ethblockstart + 1, last_imported_mint_block + 1);
                    last_reward_eth_block = last_reward_eth_block

                    console.log("searching lastlast_difficulty_start_block", last_difficulty_start_block, "blocks");
                    console.log("searching last_imported_mint_block", last_imported_mint_block, "blocks");
                    console.log("searching start_log_search_at", start_log_search_at, "blocks");
                    console.log("searching last_reward_eth_block", last_reward_eth_block, "blocks");
                    console.log("searching last", last_reward_eth_block - start_log_search_at, "blocks");

                    var blocks_to_search = (current_eth_block - start_log_search_at);
                    console.log('blocks to search', blocks_to_search);

                    if (blocks_to_search < 1) {
                        console.log("Only 1 block or less to search abandoning");
                        
                    }

                    var iterations = Math.ceil((blocks_to_search / 500));
                    if (iterations <= 0) {
                        iterations = 1;
                    }

                    console.log('do', iterations, 'runs');

                    let lastProcessedEpochCount = 0;
                    previousEpochCount = maxMinedBlocksEpoch;
                    console.log("Epoch Count before Log call", previousEpochCount);

                    var run = 0;
                    let runInProgress = false;
                    var getLogs = false;
                    var lastrun = 0;
                    while (run < iterations) {

                        gotLogs = false;  // ✅ guard to ensure only one getLogs call
                        const runId = `Run-${run + 1}`;
                        lastrun = run;
                        const start = start_log_search_at + (run * 500);
                        const stop = start + 499;
                        if (runInProgress) {
                            console.log('Previous run still in progress, waiting...');
                            await sleep(100);
                            continue; // Skip this iteration and check again
                        }

                        runInProgress = true; // Lock the run


                        if (run + 1 == iterations) {
                            console.log("Last run call EpochCount");
                        }

                        // Calculate block range for this run
                        var start_log_search_at_loop = start_log_search_at + (run * 500);
                        var stop_log_search_at_loop = start_log_search_at_loop + 499;

                        if (stop_log_search_at_loop > current_eth_block) {
                            console.log("Search too long trimmed");
                            stop_log_search_at_loop = current_eth_block;
                        }

                        console.log('searching from block', start_log_search_at_loop, 'to block', stop_log_search_at_loop);

                        // Retry logic for this specific run
                        let success = false;
                        let runAttempts = 0;
                        const maxAttemptsPerRun = 5;

                        while (!success && runAttempts < maxAttemptsPerRun && lastrun == run) {
                            /*   console.log('=== ABOUT TO CALL GETLOGS ===');
                               console.log('fromBlock:', start_log_search_at_loop);
                               console.log('toBlock:', stop_log_search_at_loop);
                               console.log('address:', ProofOfWorkAddresss);
                               console.log('topics:', [_MINT_TOPIC]);
                               console.log('Attempt:', runAttempts + 1, 'of', maxAttemptsPerRun);
                       console.log('=== DEBUG BLOCK CALCULATION ===');
                       console.log('run value:', run);
                       console.log('start_log_search_at:', start_log_search_at);
                       console.log('calculation: start_log_search_at + (run * 500):', start_log_search_at, '+', '(', run, '* 500) =', start_log_search_at + (run * 500));
                       console.log('final start_log_search_at_loop:', start_log_search_at_loop);
                       console.log('final stop_log_search_at_loop:', stop_log_search_at_loop);
                       console.log('================================');*/
                            try {
                                if (!getLogs) {
                                    getLogs = true;
                                    console.log(`${runId}: About to call getLogs`);
                                    const result = await provider.getLogs({
                                        fromBlock: start_log_search_at_loop,
                                        toBlock: stop_log_search_at_loop,
                                        address: ProofOfWorkAddresss,
                                        topics: [_MINT_TOPIC],
                                    });


                                    console.log(`${runId}: Processing results`);

                                    let runInProgress = false;
                                    lastrun = run + 1;
                                    getLogs = false; // Reset for next run
                                    run = run + 1;
                                    success = true;
                                    // Success - process the results
                                    //  console.log("Starting new run, previousEpochCount was:", previousEpochCount);
                                    console.log("got filter results:", result.length, "transactions");


                                    for (const [index, transaction] of result.entries()) {
                                        var tx_hash = transaction['transactionHash'];
                                        var block_number = parseInt(transaction['blockNumber'].toString());
                                        var miner_address = getMinerAddressFromTopic(transaction['topics'][1].toString());
                                        var data3345345 = transaction['data'];
                                        var dataAmt = parseInt(data3345345.substring(2, 66), 16) / (10.0 ** 18);

                                        // epochCount (next 64 chars)
                                        var epochCount = parseInt(data3345345.substring(66, 130), 16);

                                        var epochsMined = epochCount; // Default value

                                        // Calculate epochs mined
                                        if (index === 0) {
                                            // First transaction in this batch
                                            if (previousEpochCount !== null && previousEpochCount !== undefined) {
                                                epochsMined = epochCount - previousEpochCount;
                                            } else {
                                                // Very first transaction ever
                                                epochsMined = epochCount;
                                            }
                                        } else {
                                            // Not the first transaction, use previous transaction in this batch
                                            var prevTransaction = result[index - 1];
                                            var prevData = prevTransaction['data'];
                                            var prevEpochCount = parseInt(prevData.substring(66, 130), 16);
                                            epochsMined = epochCount - prevEpochCount;
                                        }

                                        if (epochsMined < 0) {
                                            console.log("THIS HASH:", tx_hash);
                                            console.log("NEGATIVE EPOCHS MINED:", epochsMined);
                                        }

                                        // console.log("epoch mined: epochsMined", epochsMined);
                                        // console.log("epoch mined previousEpochCount:", previousEpochCount);
                                        // console.log("epoch mined epochCount:", epochCount);

                                        var savePrevoiusCount = previousEpochCount;

                                        // Update previous epoch count for next iteration
                                        previousEpochCount = epochCount;
                                        lastProcessedEpochCount += epochsMined;


                                        // One shift to define a challenge change then another for the actual amount mined after the chal change

                                        var Challengerz = data3345345.substring(130, 194);
                                        if (previousChallenge != Challengerz) {
                                            var previousChallenge2 = previousChallenge;
                                            console.log("Old challenge:", previousChallenge, "new challenge:", Challengerz);
                                            previousChallenge = Challengerz;
                                            if (previousChallenge2 !== undefined && previousChallenge2 !== null) {
                                                var newBlock = [
                                                    mined_blocks[0] && mined_blocks[0][0] !== undefined ? mined_blocks[0][0] : block_number,
                                                    mined_blocks[0] && mined_blocks[0][1] !== undefined ? mined_blocks[0][1] : tx_hash,
                                                    mined_blocks[0] && mined_blocks[0][2] !== undefined ? mined_blocks[0][2] : miner_address,
                                                    -1,
                                                    mined_blocks[0] && mined_blocks[0][4] !== undefined ? mined_blocks[0][4] : 0
                                                ];
                                                mined_blocks.unshift(newBlock);
                                            }
                                        }
                                        mined_blocks.unshift([block_number, tx_hash, miner_address, dataAmt, previousEpochCount]);


                                        if (dataAmt != 0 && block_number > last_difficulty_start_block) {
                                            total_TOTAL_mint_count_HASH += epochsMined;
                                            if (miner_block_countHASH[miner_address] === undefined) {
                                                miner_block_countHASH[miner_address] = dataAmt;
                                            } else {
                                                miner_block_countHASH[miner_address] += dataAmt;
                                            }

                                            if (total_mint_count_HASH[miner_address] === undefined) {
                                                total_mint_count_HASH[miner_address] = 1;
                                            } else {
                                                total_mint_count_HASH[miner_address] += 1;
                                            }

                                            if (totalZKBTC_Mined_HASH[miner_address] === undefined) {
                                                totalZKBTC_Mined_HASH[miner_address] = epochsMined;
                                            } else {
                                                totalZKBTC_Mined_HASH[miner_address] += epochsMined;
                                            }
                                        } else if (dataAmt == 0 && block_number > last_difficulty_start_block) {
                                            if (totalZKBTC_Mined_HASH[miner_address] === undefined) {
                                                totalZKBTC_Mined_HASH[miner_address] = epochsMined;
                                            } else {
                                                totalZKBTC_Mined_HASH[miner_address] += epochsMined;
                                            }
                                            console.log("miner_block_count[miner_address]", miner_block_count[miner_address], "vs epochsMined", epochsMined);
                                        }

                                        if (miner_block_count[miner_address] === undefined) {
                                            miner_block_count[miner_address] = epochsMined;
                                            if (dataAmt != 0) {
                                                miner_block_count2[miner_address] = 1;
                                            } else {
                                                miner_block_count2[miner_address] = 0;
                                            }
                                            totalZKBTC_Mined[miner_address] = dataAmt;
                                            totalZKTC_Calculated += dataAmt;
                                        } else {
                                            miner_block_count[miner_address] += epochsMined;
                                            if (dataAmt != 0) {
                                                miner_block_count2[miner_address] += 1;
                                            }
                                            totalZKBTC_Mined[miner_address] += dataAmt;
                                            totalZKTC_Calculated += dataAmt;
                                        }

                                        if (dataAmt != 0) {
                                            total_tx_count += 1;
                                            total_block_count += epochsMined;
                                        }

                                        if (epochCount != miner_block_count[miner_address]) {
                                            // console.log("epoch Count Special:", epochCount, "=!= miner_block_count[miner_address]:", miner_block_count[miner_address], "also savePrevoiusCount:", savePrevoiusCount, "= epochsMined:", epochsMined);
                                        } else {
                                            // console.log("epoch Count:", epochCount, "vs savePrevoiusCount:", savePrevoiusCount, "= epochsMined:", epochsMined);
                                        }

                                        // Add a small yield every 10 transactions to prevent blocking
                                        if (index % 10 === 0 && index > 0) {
                                            await new Promise(resolve => setTimeout(resolve, 0)); // Yield to event loop
                                        }
                                    };

                                    success = true; // Mark as successful
                                } else {
                                    console.log("Dup log detected");
                                    run++;
                                    continue;
                                }

                            } catch (error) {
                                console.log('=== ERROR CAUGHT ===');
                                console.log('Error type:', typeof error);
                                console.log('Error message:', error ? error.message : 'No error message');
                                console.log('Error stack:', error ? error.stack : 'No error stack');
                                console.log('Full error object:', error);
                                console.log('Run:', run + 1, 'Attempt:', runAttempts + 1);
                                console.log('==================');

                                runAttempts++;

                                run = run - 1;

                                if (runAttempts < maxAttemptsPerRun) {
                                    console.log('Retrying in', 1000 * runAttempts, 'ms...');
                                    await sleep(1000 * runAttempts); // Exponential backoff
                                }
                            } finally {
                            }

                            // Only increment after this run is COMPLETELY finished
                            console.log(`=== COMPLETED ${runId} ===`);
                            runInProgress = false; // Always unlock, even on error

                        }
                        runInProgress = false;
                        success = true;
                        // run++;

                        if (!success) {
                            console.log('Failed after', maxAttemptsPerRun, 'attempts, skipping this range and continuing to next');
                        }


                        // Add delay between runs
                        if (run < iterations) {
                            await sleep(200);
                        }
                    }

                    console.log("lastProcessedEpochCount: ", lastProcessedEpochCount);

                    console.log("RUn = ", run);
                    console.log("RUn = ", mined_blocks[0]);
                    console.log("RUn = ", mined_blocks);
                    if (run > 0) {
                        localStorage.setItem('mintData_EraBitcoin2_afbRAFFABC_B0x1', JSON.stringify(mined_blocks));
                        localStorage.setItem('mintData_GreekWedding2_B0x1', JSON.stringify(previousChallenge));
                        if (mined_blocks[0] !== undefined) {
                            console.log("RUNWorked");
                            console.log("Setting Currentethblock to it: ", current_eth_block);
                            localStorage.setItem('lastMintBlock_EraBitcoin2_afbRAFFABC_B0x1', current_eth_block);
                        }
                        localStorage.setItem('lastDifficultyStartBlock_EraBitcoin2_afbRAFFABC_B0x1', last_difficulty_start_block.toString());
                    }

                    console.log("processed blocks:",
                        Object.keys(miner_block_count).length,
                        "unique miners");
                    var gotthis = {};
                    //console.log("miner_block_count123: ",miner_block_count);
                    // Get the addresses as an array
                    const addresses = Object.keys(miner_block_count);
                    var combinedAddresses = await fetchTransactionsData(addresses);
                    //console.log("miner_block_count123 addresses: ",addresses);
                    //console.log("My Addresses: ", combinedAddresses);

                    // Call the function with your tettttt array
                    //combineKnownMiners(tettttt);
                    // Logging the result
                    console.log("Combined Known Miners: ", combinedAddresses);
                    // Assuming miner_block_count, miner_block_count2, and totalZKBTC_Mined are all initialized properly


                    // Assuming combinedAddresses is an array of objects
                    for (var m1 = 0; m1 < combinedAddresses.length; m1++) {
                        const addressData1 = combinedAddresses[m1].address;

                        //	console.log("fsdfsdfsdf: ",combinedAddresses[m1].address);
                        //	console.log("address 1 known miner: ",known_miners[combinedAddresses[m1].address]);
                        // Skip if m1 is not a known miner
                        if (known_miners[combinedAddresses[m1].address] === undefined) continue;

                        for (var m2 = m1; m2 < combinedAddresses.length; m2++) {
                            if (m1 === m2) continue; // Skip self-comparison

                            //console.log("address 2222 known miner: ",known_miners[combinedAddresses[m2].address]);

                            const addressData2 = combinedAddresses[m2].address;
                            //console.log("addysss : ",addressData2);
                            // Skip if m2 is not a known miner
                            if (known_miners[combinedAddresses[m2].address] === undefined) continue;
                            //console.log("address 1 known miner: ",known_miners[combinedAddresses[m1].address]);
                            //	console.log("address 2 known miner: ",known_miners[combinedAddresses[m2].address]);
                            //console.log("address 1 known miner00000: ",known_miners[combinedAddresses[m1].address][0]);
                            //	console.log("address 2 known miner0000: ",known_miners[combinedAddresses[m2].address][0]);
                            // Check if the miners are in the same group
                            if (known_miners[combinedAddresses[m1].address][0] === known_miners[combinedAddresses[m2].address][0]) {
                                // Combine values
                                console.log("known miner match");
                                combinedAddresses[m2].totalValue += combinedAddresses[m1].totalValue; // Sum totalValue
                                combinedAddresses[m2].totalCost += combinedAddresses[m1].totalCost; // Sum totalValue
                                combinedAddresses[m2].transactionCount += combinedAddresses[m1].transactionCount; // Sum totalValue

                                console.log("combining  : ", addressData1, addressData2);
                                // Reset m2's values to indicate it's been combined
                                combinedAddresses[m1].totalValue = 0
                                combinedAddresses[m1].totalCost = 0
                                combinedAddresses[m1].transactionCount = 0
                            }
                        }
                    }

                    // Optionally, filter out the combined entries (where totalCost is 0)
                    combinedAddresses = combinedAddresses.filter(addressData => addressData.totalCost > 0);

                    // Logging the result
                    console.log("Combined Addresses: ", combinedAddresses);


                    /* collapse miner_block_count using known_miners who have multiple
                       address into a single address */
                    for (var m1 in miner_block_count) {
                        for (var m2 in miner_block_count) {
                            if (m1 === m2) {
                                continue;
                            }
                            if (known_miners[m1] !== undefined
                                && known_miners[m2] !== undefined
                                && known_miners[m1][0] == known_miners[m2][0]) {
                                miner_block_count[m1] += miner_block_count[m2];
                                miner_block_count2[m1] += miner_block_count2[m2];
                                miner_block_count[m2] = 0;
                                miner_block_count2[m2] = 0;
                                totalZKBTC_Mined[m1] += totalZKBTC_Mined[m2];
                                totalZKBTC_Mined[m2] = 0;
                            }
                        }
                    }

                    /* delete miners with zero blocks (due to collapse op above) */
                    Object.keys(miner_block_count).forEach((miner_addr) => {
                        if (miner_block_count[miner_addr] == 0) {
                            delete miner_block_count[miner_addr]
                        }
                    });

                    console.log("processed Recent miner blocks:",
                        Object.keys(miner_block_countHASH).length,
                        "unique miners");

                    /* collapse miner_block_count using known_miners who have multiple
                       address into a single address */
                    for (var m1 in miner_block_countHASH) {
                        for (var m2 in miner_block_countHASH) {
                            if (m1 === m2) {
                                continue;
                            }
                            if (known_miners[m1] !== undefined
                                && known_miners[m2] !== undefined
                                && known_miners[m1][0] == known_miners[m2][0]) {
                                miner_block_countHASH[m1] += miner_block_countHASH[m2];
                                total_mint_count_HASH[m1] += total_mint_count_HASH[m2];
                                total_mint_count_HASH[m2] = 0;
                                miner_block_countHASH[m2] = 0;
                            }
                        }
                    }

                    /* delete miners with zero blocks (due to collapse op above) */
                    Object.keys(miner_block_countHASH).forEach((miner_addr) => {
                        if (miner_block_countHASH[miner_addr] == 0) {
                            delete miner_block_countHASH[miner_addr]
                        }
                    });
                    /* delete miners with zero blocks (due to collapse op above) */
                    Object.keys(total_mint_count_HASH).forEach((miner_addr) => {
                        if (total_mint_count_HASH[miner_addr] == 0) {
                            delete total_mint_count_HASH[miner_addr]
                        }
                    });







                    /* delete miners with zero blocks (due to collapse op above) */
                    Object.keys(miner_block_count2).forEach((miner_addr) => {
                        if (miner_block_count2[miner_addr] == 0) {
                            delete miner_block_count2[miner_addr]
                        }
                    });

                    /* delete miners with zero blocks (due to collapse op above) */
                    Object.keys(miner_block_count2).forEach((miner_addr) => {
                        if (miner_block_count2[miner_addr] == 0) {
                            delete miner_block_count2[miner_addr]
                        }
                    });
                    /* delete miners with zero blocks (due to collapse op above) */
                    Object.keys(totalZKBTC_Mined).forEach((miner_addr) => {
                        if (totalZKBTC_Mined[miner_addr] == 0) {
                            delete totalZKBTC_Mined[miner_addr]
                        }
                    });

                    /* create sorted list of RECENT miners */
                    sorted_miner_block_count_recent_hash = []
                    for (var m in miner_block_countHASH) {
                        console.log("m: ", m, " totalZKBTC_Mined_HASH", totalZKBTC_Mined_HASH[m]);
                        console.log("m: ", m, "  miner_block_countHASH[m]", miner_block_countHASH[m]);
                        sorted_miner_block_count_recent_hash.push([m, totalZKBTC_Mined_HASH[m], miner_block_countHASH[m], total_mint_count_HASH[m]]);
                    }
                    /* descending */
                    // Updated JavaScript to match the existing HTML structure with styled CSS classes

                    sorted_miner_block_count_recent_hash.sort((a, b) => { return b[1] - a[1]; });

                    console.log('done sorting Recent miner info');

                    var totalBlockszzz = 0;
                    var a_formattedNumberfffff2 = 0;
                    var totalblockz = 0;

                    /* fill in miner info */
                    var piechart_labels2 = [];
                    var piechart_dataset2 = {
                        data: [],
                        backgroundColor: [],
                        label: 'miner-data2'
                    };

                    // Updated innerHTML generation for recent mining stats - no thead/tbody since your CSS expects direct table content
                    var innerhtml_buffer2 = '<tr><th style="font-size: 1.75em;">Miner</th><th>Recent Epochs Minted Count</th>'
                        + '<th>% of Minted</th><th>Recent Miner Hashrate</th><th>Transaction Count</th><th>Recent B0x Mined By User</th></tr>';

                    sorted_miner_block_count_recent_hash.forEach(function (miner_info) {
                        var addr = miner_info[0];
                        var blocks = miner_info[1];
                        var RewardAmount = miner_info[2].toFixed(0);
                        var TotalBlocksPerReward = miner_info[3].toFixed(0);

                        var miner_name_link = getMinerNameLinkHTML(addr, known_miners);
                        var percent_of_total_blocks = blocks / total_TOTAL_mint_count_HASH;
                        var test = getMinerColor(addr, known_miners);

                        piechart_dataset2.data.push(blocks);
                        piechart_dataset2.backgroundColor.push(test);
                        piechart_labels2.push(getMinerName(addr, known_miners));

                        totalBlockszzz += parseFloat(TotalBlocksPerReward);
                        totalblockz += parseFloat(blocks);
                        a_formattedNumberfffff2 += parseFloat(RewardAmount);

                        const formattedNumberfffff2 = new Intl.NumberFormat(navigator.language).format(RewardAmount);

                        // Generate styled HTML for each miner row
                        var minerColorClass = getMinerColor(addr, known_miners);
                        var minerName = getMinerName(addr, known_miners);

                        innerhtml_buffer2 += '<tr class="miner-row"><td class="miner-col">'
                            + '<span class="miner-indicator ' + minerColorClass + '"></span>'
                            + '<span class="miner-name">' + miner_name_link + '</span>'
                            + '</td><td class="stat-value">'
                            + blocks + '</td><td class="stat-value">'
                            + (100 * percent_of_total_blocks).toFixed(2) + '%' + '</td><td class="stat-secondary" style="white-space: nowrap;">'
                            + convertHashRateToReadable2(percent_of_total_blocks * estimated_network_hashrate) + '</td><td class="stat-value">'
                            + TotalBlocksPerReward + '</td><td class="stat-value">' + formattedNumberfffff2 + ' B0x</td></tr>';
                    });

                    const formattedNumberfffff2FFFF = new Intl.NumberFormat(navigator.language).format(a_formattedNumberfffff2);

                    // Add totals row with proper styling
                    innerhtml_buffer2 += '<tr class="miner-row"><td style="border-bottom: 0rem;">TOTAL:'
                        + '</td><td class="stat-value" style="border-bottom: 0rem;">'
                        + totalblockz + '</td><td class="stat-value" style="border-bottom: 0rem;">'
                        + '100%' + '</td><td class="stat-secondary" style="border-bottom: 0rem;">'
                        + convertHashRateToReadable2(estimated_network_hashrate) + '</td><td class="stat-value" style="border-bottom: 0rem;">'
                        + totalBlockszzz + '</td><td class="stat-value" style="border-bottom: 0rem;">'
                        + formattedNumberfffff2FFFF + ' B0x</td></tr>';

                    document.querySelector('#row-miners2').style.display = 'block';
                    document.querySelector('#minerstats2').style.display = 'block';
                    document.querySelector('#minerstats2').innerHTML = innerhtml_buffer2;

                    console.log('done populating RECENT miner stats');
                    showBlockDistributionPieChart2(piechart_dataset2, piechart_labels2);

                    /* create sorted list of ALL MINTS of miners */
                    sorted_miner_block_count = []
                    for (var m in miner_block_count) {
                        sorted_miner_block_count.push([m, miner_block_count[m], totalZKBTC_Mined[m], miner_block_count2[m]]);
                    }
                    sorted_miner_block_count.sort((a, b) => { return b[1] - a[1]; });

                    console.log('done sorting miner info');

                    /* fill in miner info */
                    var piechart_labels = [];
                    var piechart_dataset = {
                        data: [],
                        backgroundColor: [],
                        label: 'miner-data'
                    };

                    var totalSpentINUSD = 0;

                    // Updated innerHTML generation for all-time mining stats
                    var innerhtml_buffer = '<tr><th style="font-size: 1.75em;">Miner</th><th>Total Epochs Minted Count</th>'
                        + '<th>% of Minted</th><th>Transaction Count</th><th>TOTAL B0x Mined</th></tr>';

                    sorted_miner_block_count.forEach(function (miner_info) {
                        var addr = miner_info[0];

                        // Find the matching address in combinedAddresses
                        const matchingAddressData = combinedAddresses.find(addressData => addressData.address === addr);
                        var totalCostForUser = 0;
                        if (matchingAddressData) {
                            const totalCost = matchingAddressData.totalCost;
                            totalCostForUser = totalCost / 1e18;
                        }

                        var total_WETH_USD_Price = 0.01;
                        totalCostForUser = totalCostForUser * total_WETH_USD_Price;
                        totalSpentINUSD += totalCostForUser;

                        var blocks = miner_info[1];
                        var RewardAmount = miner_info[2].toFixed(0);
                        var TotalBlocksPerReward = miner_info[3].toFixed(0);
                        var miner_name_link = getMinerNameLinkHTML(addr, known_miners);
                        var percent_of_total_blocks = blocks / total_block_count;

                        piechart_dataset.data.push(blocks);
                        piechart_dataset.backgroundColor.push(getMinerColor(addr, known_miners));
                        piechart_labels.push(getMinerName(addr, known_miners));

                        const formattedNumberfffff2 = new Intl.NumberFormat(navigator.language).format(RewardAmount);

                        // Generate styled HTML for each miner row
                        var minerColorClass = getMinerColor(addr, known_miners);
                        var minerName = getMinerName(addr, known_miners);

                        innerhtml_buffer += '<tr class="miner-row"><td class="miner-col">'
                            + '<span class="miner-indicator ' + minerColorClass + '"></span>'
                            + '<span class="miner-name">' + miner_name_link + '</span>'
                            + '</td><td class="stat-value">'
                            + blocks + '</td><td class="stat-value">'
                            + (100 * percent_of_total_blocks).toFixed(2) + '%' + '</td><td class="stat-value">'
                            + TotalBlocksPerReward + '</td><td class="stat-value" style="white-space: nowrap">'
                            + formattedNumberfffff2 + ' B0x</td></tr>';
                    });

                    const formattedNumberfffff23 = new Intl.NumberFormat(navigator.language).format(totalZKTC_Calculated.toFixed(0));

                    document.querySelector('.SuccessfulMintTransactions').innerHTML = "<b> " + (total_tx_count).toLocaleString() + " </b> txs";

                    /* add the last row (totals) with proper styling */
                    innerhtml_buffer += '<tr class="miner-row"><td style="border-bottom: 0rem;">TOTAL:</td><td class="stat-value" style="border-bottom: 0rem;">'
                        + total_block_count + '</td><td class="stat-value" style="border-bottom: 0rem;">100%</td><td class="stat-value" style="border-bottom: 0rem;">'
                        + total_tx_count + '</td><td class="stat-value" style="border-bottom: 0rem;">'
                        + formattedNumberfffff23 + ' B0x</td></tr>';

                    document.querySelector('#minerstats').innerHTML = innerhtml_buffer;
                    document.querySelector('#row-miners').style.display = 'block';

                    console.log('done populating miner stats');
                    showBlockDistributionPieChart(piechart_dataset, piechart_labels);

                    var blocks_since_last_reward = current_eth_block - last_reward_eth_block;
                    var date_now = new Date();
                    var date_of_last_mint = new Date(date_now.getTime() - blocks_since_last_reward * _SECONDS_PER_ETH_BLOCK * 1000)

                    function get_date_from_eth_block(eth_block) {
                        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, milliseconds: false };
                        return new Date(date_of_last_mint.getTime() - ((last_reward_eth_block - eth_block) * _SECONDS_PER_ETH_BLOCK * 1000)).toLocaleString('en-US', options);
                    }

                    var totalzkBTCMinted = 0.0;
                    var previousBlock = 0;
                    var index = 0;
                    var dt = new Date();

                    // Updated innerHTML generation for blocks table
                    var innerhtml_buffer = '<tr><th>Time (Approx)</th><th>Base Block #</th>'
                        + '<th>Transaction Hash</th><th style="width: 200px;">Miner</th><th>Reward Amount</th></tr>';

                    mined_blocks.forEach(function (block_info) {
                        var eth_block = parseInt(block_info[0]);
                        var tx_hash = block_info[1];
                        var addr = block_info[2];
                        var dataF = block_info[3].toFixed(4);
                        var epochCnt = block_info[4];

                        // Get the next block's epoch count
                        var nextEpochCnt = null;
                        if (index + 1 < mined_blocks.length) {
                            nextEpochCnt = mined_blocks[index + 1][4];
                        }

                        if (nextEpochCnt !== null) {
                            epchCount = epochCnt - nextEpochCnt;
                        }else{
                            epochCount = epochCnt;
                        }
                        index = index + 1;

                        const formattedNumberfffff = new Intl.NumberFormat(navigator.language).format(dataF);
                        var miner_name_link = getMinerNameLinkHTML(addr, known_miners);
                        var minerName = getMinerName(addr, known_miners);

                        var transaction_url = _BLOCK_EXPLORER_TX_URL + tx_hash;
                        var block_url = _BLOCK_EXPLORER_BLOCK_URL + eth_block;
                       // console.log("EPOCH COUNT ADDING ", epchCount);
                        totalzkBTCMinted += parseFloat(epchCount);

                    if (formattedNumberfffff == -1) {
                        var parzedint = parseInt(totalzkBTCMinted);
                        totalzkBTCMinted = 0.0;
                        
                        if (parzedint > 2016) {
                            // parzedint = 2016;
                        }

                        const formattedNumberparzedint = new Intl.NumberFormat(navigator.language).format(parzedint);
                        
                        // Update the PREVIOUS "New Challenge" row with this period's count
                        var finalstr = "";
                        const searchString = "PeriodNumberperiod";
                        str = innerhtml_buffer;
                        const lastIndex = str.lastIndexOf(searchString);
                        if (lastIndex === -1) {
                            finalstr = str;
                        } else {
                            const before = str.substring(0, lastIndex);
                            const after = str.substring(lastIndex + searchString.length);
                            finalstr = before + formattedNumberparzedint + after;
                        }
                        innerhtml_buffer = finalstr;

                        // Add the new period row with placeholder for next update
                        if (eth_block > 25990908) {
                            innerhtml_buffer += '<tr><td align="right" style="text-overflow:ellipsis;white-space: nowrap;overflow: hidden;">'
                                + get_date_from_eth_block(eth_block) + '</td><td>'
                                + '<b>New difficulty period</b>' + '</td><td>'
                                + '<b>New Challenge</b>'
                                + '</td><td><b> Previous Period had</b></td><td class="stat-value"><b>PeriodNumberperiod Mints</b></td></tr>';
                        } else {
                            innerhtml_buffer += '<tr><td align="right" style="text-overflow:ellipsis;white-space: nowrap;overflow: hidden;">'
                                + get_date_from_eth_block(eth_block) + '</td><td>'
                                + '<b>New difficulty period</b>' + '</td><td>'
                                + '<b>New Challenge</b>'
                                + '</td><td><b> Previous Period had</b></td><td class="stat-value"><b>PeriodNumberperiod Mints</b></td></tr>';
                        }
                    } else {
                            // Generate styled HTML for blocks with proper CSS classes
                            innerhtml_buffer += '<tr><td align="right" style="width: 200px;">'
                                + get_date_from_eth_block(eth_block) + '</td><td class="hash2">'
                                + '<a href="' + block_url + '" target="_blank">' + eth_block + '</a></td><td class="hash">'
                                + '<a href="' + transaction_url + '" title="' + tx_hash + '" target="_blank">'
                                + tx_hash.substr(0, 16) + '...</a></td><td align="right" style="text-overflow:ellipsis;white-space: nowrap;overflow: hidden;">'
                                + '<span class="miner-cell">' + miner_name_link + '</span></td><td class="stat-value">'
                                + formattedNumberfffff + " B0x</td></tr>";
                        }
                    });

                    document.querySelector('#row-blocks').style.display = 'block';
                    document.querySelector('#blockstats').style.display = 'block';
                    document.querySelector('#blockstats').innerHTML = innerhtml_buffer;

                    console.log('done populating block stats');



                    document.querySelectorAll('#stats .blocks-table th:nth-child(2), #stats .blocks-table td:nth-child(2)').forEach(element => {
                        element.style.width = '10vw';
                        element.style.maxWidth = '10vw';
                        element.style.overflow = 'hidden';
                        element.style.textOverflow = 'ellipsis';
                        element.style.whiteSpace = 'nowrap';
                    });



                }
































                var lastBaseBlock = 0;
                var currentBlock = 0;
                var estHashrate = 0;
                var lastDifficultyStartBlock = 0;

                async function GetContractStats() {
                    if (!walletConnected) {
                        await connectTempRPCforStats();
                    }
                    var provids = provider;
                    if (!walletConnected) {
                        provids = providerTempStats;
                    }
                    console.log("Connect done");


                    console.log("Connect done");

                    // Alchemy recommends concurrent requests, so let's use them!
                    // Group into logical batches under 50 requests each

                    // Batch 1: Core mining stats (6 calls)
                    const [price, Era, EpochCount, nextDiff, target, diff] = await Promise.all([
                        getCurrentPrice(provids),
                        getRewardEra(provids),
                        getEpochCount(provids),
                        getNextDifficulty(provids),
                        getTarget(provids),
                        getDifficulty(provids)
                    ]);

                    // Batch 2: Timing & reward stats (6 calls)  
                    const [avgRewardTimeTotals, blocksToGo, timeEmergency, lastDiffStartBlock, lastDiffStartTime, lastBaseBlock2] = await Promise.all([
                        getAvgRewardTime(provids),
                        getBlocksToReadjust(provids),
                        getTimeEmergency(provids),
                        getLastDiffStartBlock(provids),
                        getLastDiffStartime(provids),
                        getLastBaseBlock(provids)
                    ]);
                    lastBaseBlock = lastBaseBlock2;

                    // Batch 3: Supply & social stats (5 calls)
                    const [totalDistributedMining, maxperEra, TokenHolders, Transfers, TotalOperations] = await Promise.all([
                        getTokensMinted(provids),
                        getMaxSupplyForEra(provids),
                        getTokenHolders(provids),
                        getTransfers(provids),
                        getTotalOperations(provids)
                    ]);


                    /*  var price =  await getCurrentPrice(provids);
                      var Era =  await getRewardEra(provids);
                      var EpochCount =  await getEpochCount(provids);
                      var nextDiff =  await getNextDifficulty(provids);
                      var target =  await getTarget(provids);
                      var diff = await  getDifficulty(provids);
                  
                  */



                    // var avgRewardTimeTotals =  await getAvgRewardTime(provids);

                    var avgRewardTime = avgRewardTimeTotals.TimePerEpoch;

                    // Convert back to number before passing to getTimeUnits
                    var avgTime = await getTimeUnits(parseInt(avgRewardTime));

                    console.log("AvgRewardTime: ", avgRewardTime.toString());

                    var avgReardTime1 = avgTime.avgTime;
                    var avgReardTimeUnits = avgTime.units;

                    var currentRewardPerSolve = avgRewardTimeTotals.RewardsAtTime;


                    var rewardPerSolve = currentRewardPerSolve / 1e18;


                    // var blocksToGo =  await getBlocksToReadjust(provids);

                    //  var timeEmergency =  await getTimeEmergency(provids);
                    var timeEmergencyBreakdown = await getTimeUnits(timeEmergency);
                    var timeEmergencyTime = timeEmergencyBreakdown.avgTime;
                    var timeEmergencyTimeUnits = timeEmergencyBreakdown.units;

                    // var lastDiffStartBlock=  await getLastDiffStartBlock(provids);
                    lastDifficultyStartBlock = lastDiffStartBlock;
                    //  var lastDiffStartTime=  await getLastDiffStartime(provids);
                    //  var totalDistributedMining = await getTokensMinted(provids);
                    //
                    //  var maxperEra = await getMaxSupplyForEra(provids);
                    var remainingSupplyINERA = await getRemainingSupplyINERA(provids, totalDistributedMining, maxperEra);
                    var avgBlocksRemainingInEra = await getRemainingBlocksInEra(rewardPerSolve, totalDistributedMining, maxperEra);
                    //  var TokenHolders=  await getTokenHolders(provids);
                    //   var Transfers=  await getTransfers(provids);
                    //   var TotalOperations= await  getTotalOperations(provids);
                    lastBaseBlock = await getLastBaseBlock(provids);
                    currentBlock = lastBaseBlock;
                    var nextEraInfo = await getDaysUntilNextEra(provids);
                    var daysUntilNextEra = nextEraInfo.daysUntil;
                    var mintSpeedUntilNextEra = nextEraInfo.MintSpeed;

                    var mintSpeed = await getTimeUnits(mintSpeedUntilNextEra);
                    var mintSpeedNextEraTime = mintSpeed.avgTime;
                    var mintSpeedUnits = mintSpeed.units;
                    console.log("TIME LEFT: blocksToGo: ", blocksToGo);
                    console.log("TIME LEFT: avgTime: ", avgTime);
                    var timeLeftBeforeAdjustment = parseFloat(blocksToGo) * parseInt(avgRewardTime);
                    console.log("TIME LEFT : ", timeLeftBeforeAdjustment);
                    var timeBeforeAdjustz = await getTimeUnits(timeLeftBeforeAdjustment);
                    timeBeforeAdjust = timeBeforeAdjustz.avgTime;
                    timeBeforeAdjustUnits = timeBeforeAdjustz.units;


                    var hashrate = await getHashrate(diff, avgRewardTime);
                    estHashrate = hashrate;
                    var hashrateFormatted = convertHashRateToReadable(hashrate);
                    var hashrateunit = hashrateFormatted.units;
                    var hashRates = hashrateFormatted.value;


                    var timeBeforenewEra = await getTimeUnits(avgRewardTime * avgBlocksRemainingInEra);
                    timeBeforeEra = timeBeforenewEra.avgTime;
                    timeBeforeEraUnits = timeBeforenewEra.units;
                    var timestampLastDiffStart = await getTimestampFromBlock(lastDiffStartBlock, provids);


                    // Update the HTML elements with the retrieved values
                    document.querySelector('.stat-value-price').innerHTML = `${price} <span class="unit">$</span>`;
                    document.querySelector('.stat-value-currentEra').innerHTML = `${Era} <span class="detail">/ 55 (next era: ${timeBeforeEra} ${timeBeforeEraUnits} @ ${avgReardTime1} ${avgReardTimeUnits} per block)</span>`;
                    document.querySelector('.stat-value-epochCount').textContent = EpochCount;
                    document.querySelector('.stat-value-difficulty').innerHTML = `${diff} <span class="detail">(next: ${nextDiff})</span>`;
                    document.querySelector('.stat-value-hashrate').innerHTML = `${hashRates} <span class="detail eestHashRateUnit">${hashrateunit}</span>`;
                    document.querySelector('.stat-value-averageRewardTime').innerHTML = `${avgReardTime1} <span class="detail avgRewardUnit">${avgReardTimeUnits}</span>`;
                    document.querySelector('.stat-value-rewardPerSolve').innerHTML = `${rewardPerSolve} <span class="detail rewardPerSolveUnit">B0x per solve</span>`;
                    document.querySelector('.stat-value-blocksToGo').innerHTML = `${blocksToGo} <span class="detail blocksToGoUnit">(~${timeBeforeAdjust} ${timeBeforeAdjustUnits})</span>`;
                    document.querySelector('.stat-value-emergency').innerHTML = `${timeEmergencyTime} <span class="detail emergencyUnit">${timeEmergencyTimeUnits}</span>`;
                    document.querySelector('.stat-value-lastDiffBlock').innerHTML = `${lastDiffStartBlock} <span class="detail lastDiffBlockDetail">(${timestampLastDiffStart})</span>`;
                    document.querySelector('.stat-value-lastDiffTime').innerHTML = `${lastDiffStartTime} <span class="detail lastDiffBlockDetail2">(${timestampLastDiffStart})</span>`;
                    document.querySelector('.stat-value-remainingSupply').innerHTML = `${remainingSupplyINERA.toLocaleString()} <span class="unit">B0x <span class="detail">(~${avgBlocksRemainingInEra} blocks or ~${timeBeforeEra} ${timeBeforeEraUnits} @ ${avgReardTime1} ${avgReardTimeUnits} per block)</span></span>`;
                    document.querySelector('.stat-value-tokenHolders').innerHTML = `${TokenHolders.toLocaleString()} <span class="unit">holders</span>`;
                    document.querySelector('.stat-value-tokenTransfers').innerHTML = `${Transfers.toLocaleString()} <span class="unit">transfers</span>`;
                    document.querySelector('.stat-value-contractOps').innerHTML = `${TotalOperations.toLocaleString()} <span class="unit">txs</span>`;
                    document.querySelector('.stat-value-lastBaseBlock').textContent = lastBaseBlock;

                    document.querySelector('.stat-value-distMining').innerHTML = `${parseFloat(totalDistributedMining).toLocaleString()}  <span class="unit">B0x</span></span>`;
                    document.querySelector('.stat-value-MAxSupply').innerHTML = `${parseFloat(maxperEra).toLocaleString()}  <span class="unit">B0x</span></span>`;

                    // Initial calculation
                    calculateMining();
                }




                var providerTempStats = "";
                var signerTempStats = "";

                async function connectTempRPCforStats() {
                    // Create provider from the existing eth instance

                    providerTempStats = new ethers.providers.JsonRpcProvider(customRPC);

                    // Create a random wallet and connect to provider
                    const randomWallet = ethers.Wallet.createRandom();
                    signerTempStats = randomWallet.connect(providerTempStats);
                }



                async function useCurrentDiff() {

                    if (!walletConnected) {
                        await connectTempRPCforStats();
                    }
                    var provids = provider;
                    if (!walletConnected) {
                        provids = providerTempStats;
                    }
                    console.log("Connect done");


                    console.log("Connect done");

                    var diffzzfzfz = await getDifficulty(provids);



                    calculateMining();

                }

                async function useNextDiff() {
                    if (!walletConnected) {
                        await connectTempRPCforStats();
                    }
                    var provids = provider;
                    if (!walletConnected) {
                        provids = providerTempStats;
                    }
                    console.log("Connect done");


                    console.log("Connect done");

                    var diffzzfzfz = await getNextDifficulty(provids);



                    calculateMining();

                }


                // Constants

                // Constants from the formula
                const POW_2_22 = Math.pow(2, 22); // 4,194,304
                const SECONDS_PER_DAY = 86400;
                const MIN_REWARD = 6.25; // tokens per block
                const MAX_REWARD = 25; // tokens per block

                // Sample difficulty values for demo
                const CURRENT_DIFFICULTY = 0.24995304;
                const NEXT_DIFFICULTY = 0.28234567;

                // Get DOM elements
                const hashrateInput = document.getElementById('hashrate-input');
                const hashrateUnit = document.getElementById('hashrate-unit');
                const difficultyInput = document.getElementById('difficulty-input');
                const currentDiffBtn = document.getElementById('current-diff-btn');
                const nextDiffBtn = document.getElementById('next-diff-btn');

                // Result elements
                const avgBlockTimeEl = document.getElementById('avg-block-time');
                const realisticBlockTimeEl = document.getElementById('realistic-block-time');
                const maxTokensEl = document.getElementById('max-tokens');

                // Calculate mining results based on the formula in HTML
                function calculateMining() {
                    // Get input values
                    const hashrate = parseFloat(hashrateInput.value) || 0;
                    const unitMultiplier = parseFloat(hashrateUnit.value) || 1;
                    console.log("unit Multiplier = ", unitMultiplier);
                    const difficulty = parseFloat(difficultyInput.value) || 0.00000001; // Avoid division by zero

                    // Convert hashrate to H/s
                    const hashrateHps = hashrate * unitMultiplier;

                    if (hashrateHps <= 0) {
                        // Reset display if no valid hashrate
                        avgBlockTimeEl.textContent = '∞';
                        realisticBlockTimeEl.textContent = '∞';
                        minTokensEl.textContent = '0.00';
                        maxTokensEl.textContent = '0.00';
                        return;
                    }

                    // Calculate average time to solve a block (in seconds)
                    // Formula from HTML: time = (2^22 × difficulty) / hashrate
                    const avgBlockTime = (POW_2_22 * difficulty) / hashrateHps;

                    // Calculate time for 10 blocks (more realistic estimate)
                    const realistic10BlockTime = avgBlockTime * 10;

                    // Calculate blocks per day
                    const blocksPerDay = SECONDS_PER_DAY / avgBlockTime;

                    var blocksPerDay2 = SECONDS_PER_DAY / 600;


                    // Calculate rewards based on block time rules:
                    // Fast blocks (< 10 min): reward = 25 × (block_time / 600)
                    // Slow blocks (≥ 10 min): reward = 25 tokens
                    let rewardPerBlock;
                    if (avgBlockTime >= 600) {
                        // Slow blocks: ≥10 minutes = fixed 25 tokens
                        rewardPerBlock = 25;

                    } else {
                        // Fast blocks: reward inversely proportional to speed
                        rewardPerBlock = 25 * (avgBlockTime / 600);
                        if (rewardPerBlock < 6.25) {
                            rewardPerBlock = 6.25;
                        }

                    }

                    // Calculate tokens per day
                    // Since reward is now calculated based on block time, min = max
                    const tokensPerDayMax = blocksPerDay * rewardPerBlock;
                    // Since reward is now calculated based on block time, min = max
                    const tokensPerDayMax2 = blocksPerDay2 * rewardPerBlock;


                    if (avgBlockTime < 600) {


                        maxTokensEl.textContent = tokensPerDayMax.toFixed(2);
                    } else {

                        maxTokensEl.textContent = tokensPerDayMax2.toFixed(2);

                    }

                    // Update the UI with calculated values
                    avgBlockTimeEl.textContent = formatTime(avgBlockTime);
                    realisticBlockTimeEl.textContent = formatTime(realistic10BlockTime);

                    // Update additional display elements if they exist
                    if (document.getElementById('display-hashrate')) {
                        document.getElementById('display-hashrate').textContent = hashrateHps.toLocaleString();
                    }
                    if (document.getElementById('display-difficulty')) {
                        document.getElementById('display-difficulty').textContent = difficulty.toFixed(8);
                    }
                }

                // Format time display
                function formatTime(seconds) {
                    if (seconds < 1) {
                        return (seconds * 1000).toFixed(1) + 'ms';
                    } else if (seconds < 60) {
                        return seconds.toFixed(1);
                    } else if (seconds < 3600) {
                        const minutes = Math.floor(seconds / 60);
                        const remainingSeconds = (seconds % 60).toFixed(1);
                        return `${minutes}m ${remainingSeconds}s`;
                    } else if (seconds < 86400) {
                        const hours = Math.floor(seconds / 3600);
                        const minutes = Math.floor((seconds % 3600) / 60);
                        return `${hours}h ${minutes}m`;
                    } else {
                        const days = Math.floor(seconds / 86400);
                        const hours = Math.floor((seconds % 86400) / 3600);
                        return `${days}d ${hours}h`;
                    }
                }

                // Use current difficulty
                function useCurrentDiff() {
                    difficultyInput.value = CURRENT_DIFFICULTY;
                    calculateMining();
                }

                // Use next difficulty
                function useNextDiff() {
                    difficultyInput.value = NEXT_DIFFICULTY;
                    calculateMining();
                }

                // Event Listeners
                hashrateInput.addEventListener('input', calculateMining);
                hashrateUnit.addEventListener('change', calculateMining);
                difficultyInput.addEventListener('input', calculateMining);
                currentDiffBtn.addEventListener('click', useCurrentDiff);
                nextDiffBtn.addEventListener('click', useNextDiff);

                // Initial calculation
                calculateMining();


                /*
                
                        <div class="stat-row">
                                        <span class="stat-label2">Price of 1 B ZERO X in USD</span>
                                        <span class="stat-value2 stat-value-price">NaN <span class="unit">$</span></span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Current Reward Era</span>
                                        <span class="stat-value2 stat-value-currentEra">0 <span class="detail">/ 39 (next era: ~8.1 days @ 3.6 seconds a mint)</span></span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Epoch Count</span>
                                        <span class="stat-value2 stat-value-epochCount">4030</span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Mining Difficulty</span>
                                        <span class="stat-value2 stat-value-difficulty">0.250 <span class="detail">(next: ~1.000)</span></span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Mining Target</span>
                                        <span class="stat-value2">2.1058608453327367e+65</span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Estimated Hashrate</span>
                                        <span class="stat-value2 stat-value-hashrate">292.47 <span class="eestHashRateUnit">Kh/s</span></span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Current Average Reward Time</span>
                                        <span class="stat-value2 stat-value-averageRewardTime">0.060 <span class="avgRewardUnit">minutes</span></span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Reward per Solve</span>
                                        <span class="stat-value2 stat-value-rewardPerSolve">25 <span class="rewardPerSolveUnit">B0x per solve</span></span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Rewards Until Readjustment</span>
                                        <span class="stat-value2 stat-value-blocksToGo">2 <span class="blocksToGoUnit">(~7.2 seconds)</span></span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Time Until Emergency Adjustment Activated if all rewards not solved</span>
                                        <span class="stat-value2 stat-value-emergency">13.9 <span class="emergencyUnit">days</span></span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Last Difficulty Start Block</span>
                                        <span class="stat-value2 stat-value-lastDiffBlock">30230154 <span class="lastDiffBlockDetail">(08-26-2025 12:16:36)</span></span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Last Difficulty Time</span>
                                        <span class="stat-value2 stat-value-lastDiffTime">1756228596</span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Target Time</span>
                                        <span class="stat-value2">10 <span class="unit">minutes</span></span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Mined Supply Remaining in Era</span>
                                        <span class="stat-value2 stat-value-remainingSupply">4,888,693 <span class="unit">B0x <span class="detail">(~195548 blocks)</span></span></span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Tokens distributed via Mining</span>
                                        <span class="stat-value2 stat-value-distMining">10,861,306 <span class="unit">B0x</span></span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Max Mined Supply for Current Era</span>
                                        <span class="stat-value2 stat-value-MAxSupply">15,750,000 <span class="unit">B0x</span></span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Token Holders</span>
                                        <span class="stat-value2 stat-value-tokenHolders">128 <span class="unit">holders</span></span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Token Transfers</span>
                                        <span class="stat-value2 stat-value-tokenTransfers">10,720 <span class="unit">transfers</span></span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Total Contract Operations</span>
                                        <span class="stat-value2 stat-value-contractOps">10,481 <span class="unit">txs</span></span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Last Base Block Number</span>
                                        <span class="stat-value2 stat-value-lastBaseBlock">30233764</span>
                                    </div>
                                    
                                    <div class="stat-row">
                                        <span class="stat-label2">Total Supply</span>
                                        <span class="stat-value2 stat-value-AbsoluteMaxSupply">31,165,100 <span class="unit">B0x</span></span>
                                    </div>
                                </div>
                
                                        <button class="btn-secondary" onclick="GetContractStats()">GetContractStats</button>
                */

                /*ENd of stats javascript*/











































                class MobileNotificationWidget {
                    constructor(position = 'bottom-right') {
                        this.container = document.getElementById('notificationContainer');
                        this.notifications = new Map();
                        this.counter = 0;
                        this.position = position;
                        this.setPosition(position);
                    }

                    setPosition(position) {
                        this.position = position;
                        this.container.className = `notification-container ${position}`;
                    }

                    show(type = 'info', title = '', message = '', duration = 10000) { //10000 = 10 sec
                        const id = ++this.counter;

                        const notification = document.createElement('div');
                        notification.className = `notification ${type}`;
                        notification.setAttribute('data-id', id);

                        const icons = {
                            success: '✓',
                            error: '✕',
                            warning: '!',
                            info: 'i'
                        };

                        notification.innerHTML = `
                    <div class="notification-icon">${icons[type] || icons.info}</div>
                    <div class="notification-content">
                        <div class="notification-title">${title}</div>
                        ${message ? `<div class="notification-message">${message}</div>` : ''}
                    </div>
                    <button class="notification-close" onclick="notificationWidget.hide(${id})">&times;</button>
                    <div class="notification-progress"></div>
                `;
                        this.container.appendChild(notification);
                        this.notifications.set(id, notification);

                        // Trigger animation
                        requestAnimationFrame(() => {
                            notification.classList.add('show');
                        });

                        // Auto dismiss after 10 seconds
                        setTimeout(() => {
                            this.hide(id);
                        }, duration);

                        return id;
                    }

                    hide(id) {
                        const notification = this.notifications.get(id);
                        if (notification) {
                            notification.classList.remove('show');
                            setTimeout(() => {
                                if (notification.parentNode) {
                                    notification.parentNode.removeChild(notification);
                                }
                                this.notifications.delete(id);
                            }, 400);
                        }
                    }

                    success(title, message = '') {
                        return this.show('success', title, message);
                    }

                    error(title, message = '') {
                        return this.show('error', title, message);
                    }

                    warning(title, message = '') {
                        return this.show('warning', title, message);
                    }

                    info(title, message = '') {
                        return this.show('info', title, message);
                    }
                }

                // Initialize the notification widget
                const notificationWidget = new MobileNotificationWidget('bottom-right');

                // Demo functions
                function setPosition(position) {
                    notificationWidget.setPosition(position);

                    // Update active button
                    document.querySelectorAll('.position-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    event.target.classList.add('active');
                }


                // Enhanced success notification with transaction hash and 30-second duration
                function showSuccessNotification(msg = 'Swap Complete!', msg2 = 'Transaction confirmed on blockchain', txHash = null) {
                    // If txHash is provided, add explorer link to the message and make it larger
                    let enhancedMessage = msg2;
                    let notificationId;

                    if (txHash) {
                        enhancedMessage = `${msg2} <br><a href="https://sepolia.basescan.org/tx/${txHash}" target="_blank" style="color: #10b981; text-decoration: underline; font-weight: 600;">View on Explorer →</a>`;
                    }

                    // Show notification for 30 seconds (30000ms)
                    notificationId = notificationWidget.show('success', msg, enhancedMessage, 30000);

                    // If txHash is provided, make the notification 1.7x larger
                    if (txHash) {
                        setTimeout(() => {
                            const notification = document.querySelector(`[data-id="${notificationId}"]`);
                            if (notification) {
                                notification.style.transform = 'scale(1.7)';
                                notification.style.zIndex = '10001'; // Bring it to front
                                notification.style.transformOrigin = 'bottom right'; // Scale from bottom-right corner
                            }
                        }, 50); // Small delay to ensure notification is rendered
                    }

                    return notificationId;
                }



                function showErrorNotification(msg = 'Transaction Failed', msg2 = 'Please check wallet and try again') {
                    notificationWidget.error(msg, msg2);
                }

                function showWarningNotification(msg = 'High Gas Fees', msg2 = 'Network congestion detected') {
                    notificationWidget.warning(msg, msg2);
                }

                function showInfoNotification(msg = 'Processing...', msg2 = 'Please wait for confirmation') {
                    notificationWidget.info(msg, msg2);
                }















               

                let stakingData = null;
                let filteredData = [];
                let currentPage = 1;
                let pageSize = 25;

                // Format large numbers
                function formatNumber(num) {
                    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
                    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
                    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
                    return num.toLocaleString();
                }

                // Format balance with decimals
                function formatBalance(balance) {
                    return (balance / 1e18).toFixed(4);
                }

                // Truncate address for display
                function truncateAddress(address) {
                    return `${address.slice(0, 6)}...${address.slice(-4)}`;
                }

                // Load data from API// Load data from API with failover
                    async function loadData2() {
                        const primaryUrl = customDataSource+'B0x_Staking_Rich_List_logs_testnet.json';
                        const backupUrl = customBACKUPDataSource+'B0x_Staking_Rich_List_logs_testnet.json';
                        
                        try {
                            document.getElementById('tableContent55').innerHTML = '<div class="loading55">Loading staking data...</div>';

                            console.log('Fetching staking data from primary source...');
                            const response = await fetch(primaryUrl);

                            if (!response.ok) {
                                throw new Error(`Primary source failed with status: ${response.status}`);
                            }

                            stakingData = await response.json();
                            console.log('✅ Primary source successful for staking data');

                            // Update stats
                            updateStats55();

                            // Convert users object to array for easier handling
                            filteredData = Object.entries(stakingData.users).map(([address, data]) => ({
                                address,
                                ...data
                            }));

                            // Initial render
                            currentPage = 1;
                            renderTable2();
                            renderPagination2();

                        } catch (primaryError) {
                            console.warn('⚠️ Primary source failed for staking data:', primaryError.message);
                            console.log('🔄 Falling back to GitHub backup for staking data...');
                            
                            try {
                                document.getElementById('tableContent55').innerHTML = '<div class="loading55">Loading staking data from backup...</div>';
                                
                                const backupResponse = await fetch(backupUrl);

                                if (!backupResponse.ok) {
                                    throw new Error(`Backup source failed with status: ${backupResponse.status}`);
                                }

                                stakingData = await backupResponse.json();
                                console.log('✅ Backup source successful for staking data');

                                // Update stats
                                updateStats55();

                                // Convert users object to array for easier handling
                                filteredData = Object.entries(stakingData.users).map(([address, data]) => ({
                                    address,
                                    ...data
                                }));

                                // Initial render
                                currentPage = 1;
                                renderTable2();
                                renderPagination2();

                                // Optional: Show user that backup data is being used
                                const tableHeader = document.querySelector('#tableContent55');
                                if (tableHeader) {
                                    const backupNotice = document.createElement('div');
                                    backupNotice.className = 'backup-notice';
                                    backupNotice.style.cssText = 'background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 8px; margin-bottom: 10px; border-radius: 4px; font-size: 12px;';
                                    backupNotice.innerHTML = '⚠️ Using backup data source - some data may be slightly delayed';
                                    tableHeader.insertBefore(backupNotice, tableHeader.firstChild);
                                }

                            } catch (backupError) {
                                console.error('❌ Both primary and backup sources failed for staking data!');
                                console.error('Primary error:', primaryError.message);
                                console.error('Backup error:', backupError.message);
                                
                                document.getElementById('tableContent55').innerHTML = 
                                    '<div class="error">Failed to load data from all sources. Please check your connection and try again.</div>';
                            }
                        }
                    }

                // Update statistics
                function updateStats55() {
                    document.getElementById('lastBlock').textContent = stakingData.last_block;
                    document.getElementById('totalUsers').textContent = formatNumber(stakingData.user_addresses.length);

                    // Calculate totals
                    const users = Object.values(stakingData.users);
                    const totalB0xStaked = users.reduce((sum, user) => sum + user.B0xStaked, 0);
                    const total0xBTCStaked = users.reduce((sum, user) => sum + user['0xBTCStaked'], 0);

                    document.getElementById('totalB0xStaked').textContent = formatNumber(totalB0xStaked / 1e18);
                    document.getElementById('total0xBTCStaked').textContent = formatNumber(total0xBTCStaked / 1e8);
                }

                // Filter data based on search
                function filterData() {
                    const searchTerm = document.getElementById('searchBox').value.toLowerCase();

                    if (!searchTerm) {
                        filteredData = Object.entries(stakingData.users).map(([address, data]) => ({
                            address,
                            ...data
                        }));
                    } else {
                        filteredData = Object.entries(stakingData.users)
                            .filter(([address]) => address.toLowerCase().includes(searchTerm))
                            .map(([address, data]) => ({
                                address,
                                ...data
                            }));
                    }

                    currentPage = 1;
                    renderTable2();
                    renderPagination2();
                }

                // Render table
                function renderTable2() {
                    const start = (currentPage - 1) * pageSize;
                    const end = start + pageSize;
                    const pageData = filteredData.slice(start, end);

                    let tableHTML = `
                <table>
                    <thead>
                        <tr>
                        <th style="font-size: 1em; padding: 3px 4px;">Rank</th>
                        <th style="font-size: 3em; padding: 12px 16px;">Address</th>
                        <th style="font-size: 3em; padding: 12px 16px;">B0x Staked</th>
                        <th style="font-size: 3em; padding: 12px 16px;">0xBTC Staked</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
                    var numspot = 0;
                    pageData.forEach(user => {
                        numspot = numspot + 1;
                        tableHTML += `
                    <tr>
                        <td class="rank55">${numspot}</td>
                        <td><span class="address55" title="${user.address}">${user.address}</span></td>
                        <td class="balance55">${formatBalance(user.B0xStaked)}</td>
                        <td class="balance55">${formatNumber(user['0xBTCStaked'] / 1e8)}</td>
                    </tr>
                `;
                    });

                    tableHTML += '</tbody></table>';
                    document.getElementById('tableContent55').innerHTML = tableHTML;


                    // Apply responsive styles
                    adjustTableForScreenSize();

                }

                // Function to get responsive styles based on screen width
                function getResponsiveTableStyles() {
                    const width = window.innerWidth;

                    if (width <= 500) {
                        return {
                            rankPadding: '1px 2px',
                            rankFontSize: '0.7em',
                            cellPadding: '2px 3px',
                            cellFontSize: '0.8em'
                        };
                    } else if (width <= 768) {
                        return {
                            rankPadding: '2px 3px',
                            rankFontSize: '0.9em',
                            cellPadding: '6px 8px',
                            cellFontSize: '1.5em'
                        };
                    } else if (width <= 1000) {
                        return {
                            rankPadding: '3px 4px',
                            rankFontSize: '1em',
                            cellPadding: '8px 10px',
                            cellFontSize: '2em'
                        };
                    } else {
                        return {
                            rankPadding: '3px 4px',
                            rankFontSize: '1em',
                            cellPadding: '12px 16px',
                            cellFontSize: '3em'
                        };
                    }
                }

                // Generate table with responsive styles
                function createResponsiveTable() {

                    const activeTab = document.querySelector('.nav-tab.active');
                    if (activeTab == "stats-staking-rich-list") {
                        console.log('Active tab:', activeTab.textContent.trim());

                        const styles = getResponsiveTableStyles();



                        const start = (currentPage - 1) * pageSize;
                        const end = start + pageSize;
                        const pageData = filteredData.slice(start, end);


                        let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th style="font-size: ${styles.rankFontSize}; padding: ${styles.rankPadding};">Rank</th>
                    <th style="font-size: ${styles.cellFontSize}; padding: ${styles.cellPadding};">Address</th>
                    <th style="font-size: ${styles.cellFontSize}; padding: ${styles.cellPadding};">B0x Staked</th>
                    <th style="font-size: ${styles.cellFontSize}; padding: ${styles.cellPadding};">0xBTC Staked</th>
                </tr>
            </thead>
            <tbody>
    `;

                        var numspot = 0;
                        pageData.forEach(user => {
                            numspot = numspot + 1;
                            tableHTML += `
                    <tr>
                        <td class="rank55">${numspot}</td>
                        <td><span class="address55" title="${user.address}">${user.address}</span></td>
                        <td class="balance55">${formatBalance(user.B0xStaked)}</td>
                        <td class="balance55">${formatNumber(user['0xBTCStaked'] / 1e8)}</td>
                    </tr>
                `;
                        });

                        tableHTML += '</tbody></table>';
                        document.getElementById('tableContent55').innerHTML = tableHTML;

                        var numspot = 0;


                    } else {
                        console.log("not in stats-staking-rich-list");
                    }
                }

                window.addEventListener('resize', () => {
                    // Regenerate table if needed
                    tableHTML = createResponsiveTable();
                    // Update DOM if table is already rendered
                });


                // Listen for window resize
                window.addEventListener('resize', adjustTableForScreenSize);


                // Make table responsive based on screen size
                function adjustTableForScreenSize() {
                
                    const activeTab = document.querySelector('.nav-tab2.active');
                    const activeTab2 =  activeTab?.getAttribute('data-tab')
                    console.log("active Tab: ", activeTab?.getAttribute('data-tab'));
                    if (activeTab && activeTab2 == 'stats-staking-rich-list') {

                        const table = document.querySelector('#tableContent55 table');
                        const screenWidth = window.innerWidth;

                        if (screenWidth <= 768) {
                            // Mobile styles
                            table.style.fontSize = '0.8rem';
                            const headers = table.querySelectorAll('th');
                            const cells = table.querySelectorAll('td');

                            headers.forEach(header => {
                                if (header.textContent === 'Rank') {
                                    header.style.fontSize = '0.8em';
                                    header.style.padding = '2px 3px';
                                } else {
                                    header.style.fontSize = '1em';
                                    header.style.padding = '8px 10px';
                                }
                            });

                            cells.forEach(cell => {
                                cell.style.padding = '8px 6px';
                            });
                        } else if (screenWidth <= 1024) {
                            // Tablet styles
                            table.style.fontSize = '0.9rem';
                            const headers = table.querySelectorAll('th');

                            headers.forEach(header => {
                                if (header.textContent === 'Rank') {
                                    header.style.fontSize = '0.9em';
                                    header.style.padding = '3px 4px';
                                } else {
                                    header.style.fontSize = '2.2em';
                                    header.style.padding = '10px 14px';
                                }
                            });
                        } else {
                            // Desktop styles (keep original)
                            table.style.fontSize = '1rem';
                            const headers = table.querySelectorAll('th');

                            headers.forEach(header => {
                                if (header.textContent === 'Rank') {
                                    header.style.fontSize = '1em';
                                    header.style.padding = '3px 4px';
                                } else {
                                    header.style.fontSize = '3em';
                                    header.style.padding = '12px 16px';
                                }
                            });
                        }

                    } else {
                        console.log("not in the staking rich list for stats")
                    }
                }



                // Render pagination
                function renderPagination2() {
                    const totalPages = Math.ceil(filteredData.length / pageSize);
                    const pagination = document.getElementById('pagination55');

                    if (totalPages <= 1) {
                        pagination.style.display = 'none';
                        return;
                    }

                    pagination.style.display = 'flex';

                    let paginationHTML = `
                <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
                    Previous
                </button>
            `;

                    // Page numbers
                    const startPage = Math.max(1, currentPage - 2);
                    const endPage = Math.min(totalPages, startPage + 4);

                    for (let i = startPage; i <= endPage; i++) {
                        paginationHTML += `
                    <button onclick="changePage(${i})" class="${i === currentPage ? 'active' : ''}">
                        ${i}
                    </button>
                `;
                    }

                    paginationHTML += `
                <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
                    Next
                </button>
                <span class="pagination55-info">
                    Showing ${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, filteredData.length)} 
                    of ${filteredData.length} users
                </span>
            `;

                    pagination.innerHTML = paginationHTML;
                }

                // Change page
                function changePage(page) {
                    const totalPages = Math.ceil(filteredData.length / pageSize);
                    if (page < 1 || page > totalPages) return;

                    currentPage = page;
                    renderTable2();
                    renderPagination2();
                }

                // Event listeners
                document.getElementById('searchBox').addEventListener('input', filterData);

                document.getElementById('pageSize').addEventListener('change', function () {
                    pageSize = parseInt(this.value);
                    currentPage = 1;
                    renderTable2();
                    renderPagination2();
                });





                /*Whitepaper stuff below*/


                // Scroll progress indicator
                window.addEventListener('scroll', function () {
                    const scrollProgress = document.getElementById('bxScrollProgress');
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const scrollPercentage = (scrollTop / scrollHeight) * 100;
                    scrollProgress.style.width = scrollPercentage + '%';
                });

                // Fade in animation on scroll
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -100px 0px'
                };

                const observer = new IntersectionObserver(function (entries) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('bx-visible');
                        }
                    });
                }, observerOptions);

                // Observe all fade-in elements
                document.addEventListener('DOMContentLoaded', function () {
                    const fadeElements = document.querySelectorAll('.bx-fade-in');
                    fadeElements.forEach(element => {
                        observer.observe(element);
                    });
                });

                // Smooth scrolling for internal links
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', function (e) {
                        e.preventDefault();
                        const target = document.querySelector(this.getAttribute('href'));
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    });
                });

                // Add some interactive hover effects
                document.querySelectorAll('.bx-feature-card').forEach(card => {
                    card.addEventListener('mouseenter', function () {
                        this.style.transform = 'translateY(-5px) scale(1.02)';
                    });

                    card.addEventListener('mouseleave', function () {
                        this.style.transform = 'translateY(0) scale(1)';
                    });
                });

                //whiteapper stuff above
                /*Rich List b0x and mainnet b0x stuff below*/



                let baseData = [];
                let ethData = [];
                let combinedData = [];
                let filteredData2 = [];
                let currentPage2 = 1;
                let pageSize2 = 25;
                let currentSort = 'b0x';

              async function loadData() {
                    const primaryUrls = {
                        base: customDataSource+'RichList_B0x_testnet.json',
                        eth: customDataSource+'RichList_B0x_testnet.json' // Will be different when you have separate file
                    };
                    
                    const backupUrls = {
                        base: customBACKUPDataSource+'RichList_B0x_testnet.json',
                        eth: customBACKUPDataSource+'RichList_B0x_testnet.json' // Will be different when you have separate file
                    };

                    try {
                        console.log("Load data called");
                        document.getElementById('tableContent').innerHTML = '<div class="loading-rich">Loading rich list data...</div>';

                        console.log('Fetching rich list data from primary sources...');
                        
                        // Try primary sources first
                        const [baseResponse, ethResponse] = await Promise.all([
                            fetch(primaryUrls.base),
                            fetch(primaryUrls.eth)
                        ]);

                        if (!baseResponse.ok || !ethResponse.ok) {
                            throw new Error(`Primary sources failed - Base: ${baseResponse.status}, ETH: ${ethResponse.status}`);
                        }

                        baseData = await baseResponse.json();
                        ethData = await ethResponse.json();
                        
                        console.log('✅ Primary sources successful for rich list data');

                        combineData();
                        updateStats();
                        renderTable();

                    } catch (primaryError) {
                        console.warn('⚠️ Primary sources failed for rich list data:', primaryError.message);
                        console.log('🔄 Falling back to GitHub backup for rich list data...');
                        
                        try {
                            document.getElementById('tableContent').innerHTML = '<div class="loading-rich">Loading rich list data from backup...</div>';
                            
                            // Try backup sources
                            const [baseBackupResponse, ethBackupResponse] = await Promise.all([
                                fetch(backupUrls.base),
                                fetch(backupUrls.eth)
                            ]);

                            if (!baseBackupResponse.ok || !ethBackupResponse.ok) {
                                throw new Error(`Backup sources failed - Base: ${baseBackupResponse.status}, ETH: ${ethBackupResponse.status}`);
                            }

                            baseData = await baseBackupResponse.json();
                            ethData = await ethBackupResponse.json();
                            
                            console.log('✅ Backup sources successful for rich list data');

                            combineData();
                            updateStats();
                            renderTable();

                            // Optional: Show user that backup data is being used
                            const tableContainer = document.querySelector('#tableContent');
                            if (tableContainer) {
                                const backupNotice = document.createElement('div');
                                backupNotice.className = 'backup-notice-rich';
                                backupNotice.style.cssText = 'background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 8px; margin-bottom: 10px; border-radius: 4px; font-size: 12px;';
                                backupNotice.innerHTML = '⚠️ Using backup data source - data may be slightly delayed';
                                tableContainer.insertBefore(backupNotice, tableContainer.firstChild);
                            }

                        } catch (backupError) {
                            console.error('❌ Both primary and backup sources failed for rich list data!');
                            console.error('Primary error:', primaryError.message);
                            console.error('Backup error:', backupError.message);
                            
                            document.getElementById('tableContent').innerHTML = '<div class="error-rich">Error loading data from all sources. Please try again.</div>';
                        }
                    }
                }


                var rankETHb0x = 0;
                var rankBaseb0x = 0;
                function combineData() {
                    const addressMap = new Map();

                    rankETHb0x = 0;
                    rankBaseb0x = 0;
                    // Process Base data
                    baseData.holders.forEach(holder => {
                        rankBaseb0x = rankBaseb0x + 1;
                        addressMap.set(holder.address, {
                            address: holder.address,
                            b0xBalance: parseFloat(holder.balanceFormatted) || 0,
                            b0xBalanceRaw: holder.balance,
                            ethB0xBalance: 0,
                            ethB0xBalanceRaw: '0',
                            RankBaseB0x: rankBaseb0x,

                        });
                    });

                    // Process ETH data
                    ethData.holders.forEach(holder => {
                        rankETHb0x = rankETHb0x + 1;
                        const existing = addressMap.get(holder.address);
                        if (existing) {
                            existing.ethB0xBalance = parseFloat(holder.balanceFormatted) || 0;
                            existing.ethB0xBalanceRaw = holder.balance;
                            existing.rankETHb0x = rankETHb0x;
                        } else {
                            rankBaseb0x = rankBaseb0x + 1;
                            addressMap.set(holder.address, {
                                address: holder.address,
                                b0xBalance: 0,
                                b0xBalanceRaw: '0',
                                ethB0xBalance: parseFloat(holder.balanceFormatted) || 0,
                                ethB0xBalanceRaw: holder.balance,
                                RankETHB0x: rankETHb0x,
                                RankBaseB0x: rankBaseb0x


                            });
                        }
                    });
                    combinedData = Array.from(addressMap.values());

                    // Filter out addresses with zero balances for both tokens
                    combinedData = combinedData.filter(holder =>
                        holder.b0xBalance > 0 || holder.ethB0xBalance > 0
                    );

                    sortData();
                    filteredData2 = [...combinedData];
                }

                var sortByB0xBaseChain = true;
                function sortData() {
                    combinedData.sort((a, b) => {
                        if (currentSort === 'b0x') {
                            sortByB0xBaseChain = true;
                            return b.b0xBalance - a.b0xBalance;

                        } else {
                            sortByB0xBaseChain = false;
                            return b.ethB0xBalance - a.ethB0xBalance;
                        }
                    });
                }

                function updateStats() {
                    const totalHolders = combinedData.length;
                    const totalBaseB0x = combinedData.reduce((sum, holder) => sum + holder.b0xBalance, 0);
                    const totalETHB0x = combinedData.reduce((sum, holder) => sum + holder.ethB0xBalance, 0);

                    console.log("TOTAL ETH B0x: ", totalETHB0x);
                    const lastUpdated = new Date(baseData.lastUpdated).toLocaleString();

                    document.getElementById('totalHolders').textContent = totalHolders.toLocaleString();
                    document.getElementById('totalBaseB0x').textContent = totalBaseB0x.toLocaleString(undefined, { maximumFractionDigits: 2 });
                    document.getElementById('totalETHB0x').textContent = totalETHB0x.toLocaleString(undefined, { maximumFractionDigits: 2 });
                    document.getElementById('lastUpdated').textContent = lastUpdated;
                }


                // Add window resize listener (add this outside the function, only once)
                // Add window resize listener (add this outside the function, only once)
              // Add window resize listener (add this outside the function, only once)
window.addEventListener('resize', fixsize);

function fixsize(){
    const activeTab = document.querySelector('.nav-tab2.active');
    
    // Fix the tab check - compare the text content or ID/class
    if (activeTab && (activeTab.textContent.trim().includes('Rich List') || activeTab.id === 'stats-rich-list' || activeTab.classList.contains('stats-rich-list'))) {
        console.log('Active tab:', activeTab.textContent.trim());

        // Add a small delay to ensure table is rendered
        setTimeout(() => {
            const table = document.querySelector('#tableContent .table-rich');
            console.log("Table found:", !!table);
            
            if (table) {
                console.log("Processing table with class:", table.className);
                const screenWidth = window.innerWidth;
                
                if (screenWidth <= 650) {
                    // Extra small screens - aggressive compression
                    table.style.fontSize = '0.5rem';
                    table.style.width = '100%';
                    table.style.tableLayout = 'fixed';
                    
                    const headers = table.querySelectorAll('th');
                    const cells = table.querySelectorAll('td');
                    
                    console.log("Headers found:", headers.length);
                    console.log("Cells found:", cells.length);
                    
                    headers.forEach(header => {
                        header.style.wordBreak = 'break-word';
                        header.style.hyphens = 'auto';
                        
                        if (header.classList.contains('balance-th-rank')) {
                            header.style.fontSize = '0.5em';
                            header.style.padding = '1px 1px';
                            header.style.width = '5%';
                            header.textContent = 'Rank';
                        } else if (header.classList.contains('balance-th')) {
                            header.style.fontSize = '0.7em';
                            header.style.padding = '2px 2px';
                            header.style.width = '15%';
                            header.textContent = 'Address';
                        } else if (header.classList.contains('balance-th-balance')) {
                            header.style.fontSize = '0.6em';
                            header.style.padding = '2px 2px';
                            header.style.width = '27.5%';
                            if (header.textContent.includes('ETH B0x')) {
                                header.textContent = 'ETH B0x';
                            } else if (header.textContent.includes('Base B0x')) {
                                header.textContent = 'Base B0x';
                            }
                        }
                    });
                    
                    cells.forEach(cell => {
                        cell.style.padding = '2px 1px';
                        cell.style.wordBreak = 'break-all';
                        cell.style.overflow = 'hidden';
                        
                        if (cell.classList.contains('balance-rich')) {
                            cell.style.fontSize = '1.5em';
                        }
                        if (cell.classList.contains('address-rich')) {
                            cell.style.fontSize = '0.6em';
                            const link = cell.querySelector('a');
                            if (link) {
                                const address = link.textContent;
                                if (address.length > 20 && !address.includes('...')) {
                                    link.textContent = address.slice(0, 6) + '...' + address.slice(-6);
                                }
                            }
                        }
                    });
                    
                } else if (screenWidth <= 875) {
                    table.style.fontSize = '0.6rem';
                    table.style.tableLayout = 'auto';
                    
                    const headers = table.querySelectorAll('th');
                    const cells = table.querySelectorAll('td');
                    
                    headers.forEach(header => {
                        if (header.classList.contains('balance-th-rank')) {
                            header.style.fontSize = '0.6em';
                            header.style.padding = '2px 2px';
                            header.style.width = 'auto';
                        } else if (header.classList.contains('balance-th')) {
                            header.style.fontSize = '0.9em';
                            header.style.padding = '4px 6px';
                            header.style.width = 'auto';
                            header.textContent = 'Address';
                        } else if (header.classList.contains('balance-th-balance')) {
                            header.style.fontSize = '0.8em';
                            header.style.padding = '4px 4px';
                            header.style.width = 'auto';
                            if (header.textContent === 'ETH B0x') {
                                header.textContent = 'ETH B0x Balance';
                            } else if (header.textContent === 'Base B0x') {
                                header.textContent = 'Base B0x Balance';
                            }
                        }
                    });
                    
                    cells.forEach(cell => {
                        cell.style.padding = '4px 2px';
                        cell.style.wordBreak = 'normal';
                        cell.style.overflow = 'visible';
                        
                        if (cell.classList.contains('balance-rich')) {
                            cell.style.fontSize = '2em';
                        }
                        if (cell.classList.contains('address-rich')) {
                            cell.style.fontSize = '0.75em';
                            const link = cell.querySelector('a');
                            if (link) {
                                const fullAddress = cell.getAttribute('data-full-address') || link.textContent;
                                if (fullAddress.length > 30 && !fullAddress.includes('...')) {
                                    link.textContent = fullAddress.slice(0, 10) + '...' + fullAddress.slice(-10);
                                }
                            }
                        }
                    });
                    
                } else if (screenWidth <= 1024) {
                    table.style.fontSize = '0.9rem';
                    table.style.tableLayout = 'auto';
                    
                    const cells = table.querySelectorAll('td');
                    const headers = table.querySelectorAll('th');
                    
                    headers.forEach(header => {
                        if (header.classList.contains('balance-th-rank')) {
                            header.style.fontSize = '0.9em';
                            header.style.padding = '3px 4px';
                        } else if (header.classList.contains('balance-th')) {
                            header.style.fontSize = '2.2em';
                            header.style.padding = '10px 14px';
                        } else if (header.classList.contains('balance-th-balance')) {
                            header.style.fontSize = '2.2em';
                            header.style.padding = '10px 14px';
                        }
                    });

                    cells.forEach(cell => {
                        cell.style.padding = '4px 2px';
                        if (cell.classList.contains('balance-rich')) {
                            cell.style.fontSize = '2.3em';
                        }
                        if (cell.classList.contains('address-rich')) {
                            cell.style.fontSize = '0.85em';
                            const link = cell.querySelector('a');
                            if (link) {
                                const fullAddress = cell.getAttribute('data-full-address');
                                if (fullAddress) {
                                    // Always use full address and truncate to 12+12 for tablets
                                    link.textContent = fullAddress.slice(0, 12) + '...' + fullAddress.slice(-12);
                                }
                            }
                        }
                    });
                    
                } else {
                    table.style.fontSize = '1rem';
                    table.style.tableLayout = 'auto';
                    
                    const cells = table.querySelectorAll('td');
                    const headers = table.querySelectorAll('th');
                    
                    headers.forEach(header => {
                        if (header.classList.contains('balance-th-rank')) {
                            header.style.fontSize = '1em';
                            header.style.padding = '3px 4px';
                        } else if (header.classList.contains('balance-th')) {
                            header.style.fontSize = '2.5em';
                            header.style.padding = '12px 16px';
                        } else if (header.classList.contains('balance-th-balance')) {
                            header.style.fontSize = '2.5em';
                            header.style.padding = '12px 16px';
                        }
                    });

                    cells.forEach(cell => {
                        cell.style.padding = '4px 2px';
                        if (cell.classList.contains('balance-rich')) {
                            cell.style.fontSize = '2.753em';
                        }
                        if (cell.classList.contains('address-rich')) {
                            cell.style.fontSize = '1em';
                            const link = cell.querySelector('a');
                            if (link) {
                                const fullAddress = cell.getAttribute('data-full-address');
                                if (fullAddress && link.textContent.includes('...')) {
                                    link.textContent = fullAddress;
                                }
                            }
                        }
                    });
                }
            } else {
                console.log("Table not found. Available elements:");
                console.log("tableContent:", document.getElementById('tableContent'));
                console.log("All tables:", document.querySelectorAll('table'));
            }
        }, 100); // 100ms delay to ensure DOM is updated
        
    } else {
        console.log("Not in rich-list tab");
        if (activeTab) {
            console.log("Current tab:", activeTab.textContent.trim());
        }
    }
}

// Updated renderTable function
// Updated renderTable function
function renderTable() {
    const start = (currentPage2 - 1) * pageSize2;
    const end = start + pageSize2;
    const pageData = filteredData2.slice(start, end);

    let tableHTML = `
        <table class="table-rich">
            <thead>
                <tr>
                    <th class="balance-th-rank">Rank</th>
                    <th class="balance-th">Address</th>
                    <th class="balance-th-balance">ETH B0x Balance</th>
                    <th class="balance-th-balance">Base B0x Balance</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Determine decimal places based on screen width
    const screenWidth = window.innerWidth;
    const maxDecimals = screenWidth <= 650 ? 1 : 6;

    pageData.forEach((holder, index) => {
        var rank = ""
        if(sortByB0xBaseChain){
            rank = holder.RankBaseB0x.toLocaleString(undefined, { maximumFractionDigits: 6 })
        }else{
            rank = holder.RankETHB0x.toLocaleString(undefined, { maximumFractionDigits: 6 })
        }
        tableHTML += `
            <tr>
                <td class="spot-rich">${rank}</td>
                <td class="address-rich" data-full-address="${holder.address}">
                    <a href="${_BLOCK_EXPLORER_ADDRESS_URL}${holder.address}" target="_blank">${holder.address}</a>
                </td>
                <td class="balance-rich">${holder.b0xBalance.toLocaleString(undefined, { maximumFractionDigits: maxDecimals })}</td>
                <td class="balance-rich">${holder.ethB0xBalance.toLocaleString(undefined, { maximumFractionDigits: maxDecimals })}</td>
            </tr>
        `;
    });

    tableHTML += '</tbody></table>';
    document.getElementById('tableContent').innerHTML = tableHTML;

    // Call fixsize after a brief delay to ensure DOM is updated
    setTimeout(fixsize, 50);
    renderPagination();
}





                function renderPagination() {
                    const totalPages = Math.ceil(filteredData2.length / pageSize2);
                    const pagination = document.getElementById('pagination');

                    if (totalPages <= 1) {
                        pagination.style.display = 'none';
                        return;
                    }

                    pagination.style.display = 'flex';

                    let paginationHTML = `
                <button ${currentPage2 === 1 ? 'disabled' : ''} onclick="changePage(${currentPage2 - 1})">Previous</button>
            `;

                    // Show page numbers
                    const startPage = Math.max(1, currentPage2 - 2);
                    const endPage = Math.min(totalPages, currentPage2 + 2);

                    if (startPage > 1) {
                        paginationHTML += '<button onclick="changePage(1)">1</button>';
                        if (startPage > 2) paginationHTML += '<span>...</span>';
                    }

                    for (let i = startPage; i <= endPage; i++) {
                        paginationHTML += `<button ${i === currentPage2 ? 'class="active"' : ''} onclick="changePage(${i})">${i}</button>`;
                    }

                    if (endPage < totalPages) {
                        if (endPage < totalPages - 1) paginationHTML += '<span>...</span>';
                        paginationHTML += `<button onclick="changePage(${totalPages})">${totalPages}</button>`;
                    }

                    paginationHTML += `
                <button ${currentPage2 === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage2 + 1})">Next</button>
                <div class="pagination-info-rich">
                    Showing ${((currentPage2 - 1) * pageSize2) + 1}-${Math.min(currentPage2 * pageSize2, filteredData2.length)} of ${filteredData2.length}
                </div>
            `;

                    pagination.innerHTML = paginationHTML;
                }

                function changePage(page) {
                    currentPage2 = page;
                    renderTable();
                }

                function filterData() {
                    const searchTerm = document.getElementById('searchBox').value.toLowerCase();

                    if (searchTerm === '') {
                        filteredData2 = [...combinedData];
                    } else {
                        filteredData2 = combinedData.filter(holder =>
                            holder.address.toLowerCase().includes(searchTerm)
                        );
                    }

                    currentPage2 = 1;
                    renderTable();
                }

                // Event listeners
                document.getElementById('searchBox').addEventListener('input', filterData);

                document.getElementById('pageSize2').addEventListener('change', function () {
                    pageSize2 = parseInt(this.value);
                    currentPage2 = 1;
                    renderTable();
                });

                document.getElementById('sortB0x').addEventListener('click', function () {
                    if (currentSort !== 'b0x') {
                        currentSort = 'b0x';
                        document.getElementById('sortB0x').classList.add('active');
                        document.getElementById('sort0xBTC').classList.remove('active');
                        sortData();
                        filterData();
                    }
                });

                document.getElementById('sort0xBTC').addEventListener('click', function () {
                    if (currentSort !== '0xbtc') {
                        currentSort = '0xbtc';
                        document.getElementById('sort0xBTC').classList.add('active');
                        document.getElementById('sortB0x').classList.remove('active');
                        sortData();
                        filterData();
                    }
                });























                // Smooth scrolling for internal links and enhanced UX
                document.addEventListener('DOMContentLoaded', function () {
                    // Add loading animation
                    const container = document.getElementById('b0x-main-content');
                    container.style.opacity = '0';
                    container.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        container.style.transition = 'all 0.6s ease';
                        container.style.opacity = '1';
                        container.style.transform = 'translateY(0)';
                    }, 100);

                    // Add click tracking for external links
                    const externalLinks = document.querySelectorAll('.b0x-external-link, .b0x-download-btn, .b0x-bridge-btn');
                    externalLinks.forEach(link => {
                        link.addEventListener('click', function (e) {
                            // Add visual feedback
                            this.style.transform = 'scale(0.95)';
                            setTimeout(() => {
                                this.style.transform = 'scale(1)';
                            }, 150);
                        });
                    });

                    // Add step completion tracking
                    const steps = document.querySelectorAll('.b0x-step');
                    steps.forEach((step, index) => {
                        step.addEventListener('click', function () {
                            this.style.backgroundColor = '#e8f5e8';
                            this.style.borderLeft = '4px solid #4CAF50';

                            const stepNumber = this.querySelector('.b0x-step-number');
                            stepNumber.innerHTML = '✓';
                            stepNumber.style.backgroundColor = '#4CAF50';
                        });
                    });

                    // Add copy functionality for configuration blocks
                    const configBlocks = document.querySelectorAll('.b0x-config-block');
                    configBlocks.forEach(block => {
                        block.style.cursor = 'pointer';
                        block.title = 'Click to copy';

                        block.addEventListener('click', function () {
                            navigator.clipboard.writeText(this.textContent.trim()).then(() => {
                                const originalBg = this.style.backgroundColor;
                                this.style.backgroundColor = '#4CAF50';
                                this.style.color = 'white';

                                setTimeout(() => {
                                    this.style.backgroundColor = originalBg;
                                    this.style.color = '#f8f8f2';
                                }, 1000);
                            });
                        });
                    });
                });





                var inFunctionDontRefresh = false;

                let count = 40;
                let interval;

                let countdownElements = document.querySelectorAll("[id='countdown'], .countdown, [data-countdown]");

                async function startCountdown() {
                    interval = setInterval(() => {
                        count--;
                        // Update all countdown elements
                        countdownElements.forEach(el => {
                            el.textContent = count;
                        });
                            console.log("inFunctionDontRefresh: ", inFunctionDontRefresh);

                        if (count < 0) {
                            console.log("inFunctionDontRefresh: ", inFunctionDontRefresh);
                            clearInterval(interval); // Always stop the interval at -1
                            
                            if (!inFunctionDontRefresh) {
                                runReloadFunctions();
                                resetCountdown();
                            } else {
                                console.log("Starting checker interval - waiting for inFunctionDontRefresh to become false");
                                // Set up a checker to resume when inFunctionDontRefresh becomes false
                                const checker = setInterval(() => {
                                    console.log("Checker running - inFunctionDontRefresh:", inFunctionDontRefresh); // Add this line
                                    if (!inFunctionDontRefresh) {
                                        console.log("inFunctionDontRefresh is now false - restarting countdown");
                                        clearInterval(checker);
                                        runReloadFunctions();
                                        resetCountdown();
                                    }
                                }, 1000);
                            }
                        }
                    }, 1000);
                }

                function resetCountdown() {
                    clearInterval(interval);
                    count = 40;
                    // Reset all countdown elements
                    countdownElements.forEach(el => {
                        el.textContent = count;
                    });
                    startCountdown();
                }

                startCountdown();

                var isReloading = false;


                async function runReloadFunctions() {
                    if (!walletConnected) {
                        console.log("wallet not connected no reload for it");
                        return;
                    }

                    if (isReloading) return;
                    isReloading = true;


                    try {
                        // Execute all functions in the order you specified
                        await fetchBalances();
                        await switchToEthereum();
                        await fetchBalancesETH();
                        await switchToBaseSepolia();
                        await getRewardStats();
                        await throttledGetSqrtRtAndPriceRatio("SwapFunction");

                        const now = new Date().toLocaleTimeString();
                        isReloading = false;
                    } catch (error) {
                        isReloading = false;

                        console.error('Error during reload:', error);
                    } finally {
                        isReloading = false;
                        resetCountdown();
                    }
                }





async function getStatsRPC(){



console.log("Search started");

await mainRPCStarterForPositions();





console.log("Search ENDED!!!!");







    
    
}











console.log("Using customRPC: ",customRPC);

console.log("Using customDataSource: ",customDataSource);



// Configuration
const CONFIG = {
    RPC_URL: customRPC,
    DATA_URL: customDataSource+ "testnet_uniswap_v4_data.json",
    START_BLOCK: 30489054,
    MAX_LOGS_PER_REQUEST: 499,
    MAX_BLOCKS_PER_REQUEST: 499,
    MAX_RETRIES: 5,
    BASE_RETRY_DELAY: 1000,
    MAX_RETRY_DELAY: 60000,
    RATE_LIMIT_DELAY: 1250,
    
    // Contract addresses
    POSITION_MANAGER_ADDRESS: "0xc728AF6267315b5CB7669D7DC4F87f5174adabE8",
    NFT_ADDRESS: "0x4B2C77d209D3405F41a037Ec6c77F7F5b8e2ca80",
    
    // Event signatures
    CREATE_POSITION_TOPIC: "0x97c3f5c9077358c7266488de6a3ebba41df38417797d90b665239fcb506c840a",
    TRANSFER_TOPIC: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    
    // Target pool key
    TARGET_POOL_KEY: {
        currency0: "0x4b20b6e9b678b111Dcc365EaD92b3277B178FB74",
        currency1: "0xb379A851AC41bcDF0c2564b88916B10E5A08daAe",
        fee: 8388608,
        tickSpacing: 60,
        hooks: "0x794B1409ef4b40a90eC8AF62EaF4c8bf275e5000"
    }
};

// Global state
let currentBlockzzzz = CONFIG.START_BLOCK;
let validPositions = [];
let invalidPositions = [];
let nftOwners = {}; // tokenId -> owner
let isRunning = false;

// Utility functions
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function exponentialBackoffDelay(attempt) {
    const delay = Math.min(CONFIG.BASE_RETRY_DELAY * Math.pow(2, attempt), CONFIG.MAX_RETRY_DELAY);
    const jitter = delay * 0.1 * Math.random();
    return delay + jitter;
}

function poolKeyMatches(poolKey, target) {
    return poolKey.currency0.toLowerCase() === target.currency0.toLowerCase() &&
           poolKey.currency1.toLowerCase() === target.currency1.toLowerCase() &&
           poolKey.fee === target.fee &&
           poolKey.tickSpacing === target.tickSpacing &&
           poolKey.hooks.toLowerCase() === target.hooks.toLowerCase();
}

// Network functions
async function retryWithBackoff(func, ...args) {
    let lastError;
    
    for (let attempt = 0; attempt < CONFIG.MAX_RETRIES; attempt++) {
        try {
            return await func(...args);
        } catch (error) {
            lastError = error;
            if (attempt === CONFIG.MAX_RETRIES - 1) break;
            
            const delay = exponentialBackoffDelay(attempt);
            console.log(`Attempt ${attempt + 1} failed: ${error.message.substring(0, 100)}...`);
            console.log(`Retrying in ${(delay / 1000).toFixed(2)} seconds...`);
            await sleep(delay);
        }
    }
    
    console.log(`All ${CONFIG.MAX_RETRIES} attempts failed. Last error: ${lastError.message}`);
    throw lastError;
}

async function makeRpcCall(method, params) {
    const payload = {
        jsonrpc: "2.0",
        method: method,
        params: params,
        id: Date.now()
    };
    
    await sleep(CONFIG.RATE_LIMIT_DELAY);
    const response = await fetch(CONFIG.RPC_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (result.error) {
        const errorMsg = typeof result.error === 'object' ? 
            result.error.message || JSON.stringify(result.error) : 
            result.error;
        throw new Error(`RPC Error: ${errorMsg}`);
    }
    
    return result.result;
}

async function getLogs(fromBlock, toBlock, topics, address) {
    try {
        return await retryWithBackoff(async () => {
            return await makeRpcCall('eth_getLogs', [{
                fromBlock: `0x${fromBlock.toString(16)}`,
                toBlock: `0x${toBlock.toString(16)}`,
                address: address,
                topics: topics
            }]);
        });
    } catch (error) {
        console.log(`Failed to get logs after ${CONFIG.MAX_RETRIES} attempts: ${error.message}`);
        return [];
    }
}

async function callContract(address, data, block = "latest") {
    try {
        return await retryWithBackoff(async () => {
            return await makeRpcCall('eth_call', [{
                to: address,
                data: data
            }, block]);
        });
    } catch (error) {
        console.log(`Failed to call contract after ${CONFIG.MAX_RETRIES} attempts: ${error.message}`);
        return null;
    }
}

async function getLatestBlock() {
    try {
        return await retryWithBackoff(async () => {
            const result = await makeRpcCall('eth_blockNumber', []);
            return parseInt(result, 16);
        });
    } catch (error) {
        console.log(`Failed to get latest block after ${CONFIG.MAX_RETRIES} attempts: ${error.message}`);
        return currentBlockzzzz;
    }
}
// Add to global state
let localStorageKey = 'testnet_uniswap_v4_local_data';


// Save data to localStorage
function saveDataLocally() {
    try {
        const data = {
            metadata: {
                last_updated: new Date().toISOString(),
                current_block: currentBlockzzzz,
                start_block: CONFIG.START_BLOCK,
                total_valid_positions: validPositions.length,
                total_nft_owners: Object.keys(nftOwners).length
            },
            valid_positions: validPositions.map(pos => ({
                token_id: pos.tokenId,
                pool_key: pos.poolKey,
                owner: pos.owner,
                block_number: pos.blockNumber,
                tx_hash: pos.txHash,
                timestamp: pos.timestamp
            })),
            nft_owners: nftOwners
        };
        
        localStorage.setItem(localStorageKey, JSON.stringify(data));
        console.log(`✓ Saved local data at block ${currentBlockzzzz}`);
    } catch (error) {
        console.log(`Failed to save local data: ${error.message}`);
    }
}

// Load data from localStorage
function loadDataLocally() {
    try {
        const stored = localStorage.getItem(localStorageKey);
        if (!stored) {
            console.log('No local data found');
            return null;
        }
        
        const data = JSON.parse(stored);
        const metadata = data.metadata || {};
        const localCurrentBlock = metadata.current_block || CONFIG.START_BLOCK;
        
        console.log(`Found local data at block ${localCurrentBlock}`);
        return { data, localCurrentBlock };
    } catch (error) {
        console.log(`Failed to load local data: ${error.message}`);
        return null;
    }
}

// Modified fetchDataFromUrl to compare local vs web// Modified fetchDataFromUrl to compare local vs web with GitHub backup
async function fetchDataFromUrl() {
    // First check local data
    const localData = loadDataLocally();
    let localCurrentBlock = localData ? localData.localCurrentBlock : 0;
    
    // Define primary and backup URLs
    const primaryUrl = CONFIG.DATA_URL;
    const backupUrl = CONFIG.DATA_URL.replace(customDataSource, customBACKUPDataSource);
    
    // Try primary web source first
    try {
        console.log(`Fetching web data from primary source: ${primaryUrl}...`);
        const response = await fetch(primaryUrl);
        
        if (!response.ok) {
            throw new Error(`Primary source HTTP ${response.status}: ${response.statusText}`);
        }
        
        const webData = await response.json();
        const metadata = webData.metadata || {};
        const webCurrentBlock = metadata.current_block || CONFIG.START_BLOCK;
        
        console.log(`✅ Primary source: Local block: ${localCurrentBlock}, Web block: ${webCurrentBlock}`);
        
        // Use whichever is more current
        if (webCurrentBlock > localCurrentBlock && webCurrentBlock > currentBlockzzzz) {
            console.log('Using primary web data (most current)');
            loadDataFromSource(webData, webCurrentBlock);
            return true;
        } else if (localCurrentBlock > currentBlockzzzz) {
            console.log('Using local data (most current)');
            loadDataFromSource(localData.data, localCurrentBlock);
            return true;
        } else {
            console.log(`Already at current block ${currentBlockzzzz}`);
            return false;
        }
        
    } catch (primaryError) {
        console.warn(`⚠️ Primary source failed: ${primaryError.message}`);
        console.log(`🔄 Falling back to GitHub backup: ${backupUrl}...`);
        
        // Try backup web source
        try {
            const backupResponse = await fetch(backupUrl);
            
            if (!backupResponse.ok) {
                throw new Error(`Backup source HTTP ${backupResponse.status}: ${backupResponse.statusText}`);
            }
            
            const webData = await backupResponse.json();
            const metadata = webData.metadata || {};
            const webCurrentBlock = metadata.current_block || CONFIG.START_BLOCK;
            
            console.log(`✅ Backup source: Local block: ${localCurrentBlock}, Web block: ${webCurrentBlock}`);
            
            // Use whichever is more current
            if (webCurrentBlock > localCurrentBlock && webCurrentBlock > currentBlockzzzz) {
                console.log('Using backup web data (most current)');
                loadDataFromSource(webData, webCurrentBlock);
                return true;
            } else if (localCurrentBlock > currentBlockzzzz) {
                console.log('Using local data (most current)');
                loadDataFromSource(localData.data, localCurrentBlock);
                return true;
            } else {
                console.log(`Already at current block ${currentBlockzzzz}`);
                return false;
            }
            
        } catch (backupError) {
            console.error(`❌ Both primary and backup sources failed!`);
            console.error(`Primary error: ${primaryError.message}`);
            console.error(`Backup error: ${backupError.message}`);
            
            // Fall back to local data if both web sources fail
            if (localData && localCurrentBlock > currentBlockzzzz) {
                console.log('Falling back to local data (web sources unavailable)');
                loadDataFromSource(localData.data, localCurrentBlock);
                return true;
            }
            
            console.log('Starting from scratch...');
            return false;
        }
    }
}

// Helper function to load data from either source
function loadDataFromSource(data, blockNumber) {
    currentBlockzzzz = blockNumber;
    
    // Load valid positions
    validPositions = [];
    for (const posData of data.valid_positions || []) {
        const position = {
            tokenId: posData.token_id,
            poolKey: {
                currency0: posData.pool_key.currency0,
                currency1: posData.pool_key.currency1,
                fee: posData.pool_key.fee,
                tickSpacing: posData.pool_key.tickSpacing,
                hooks: posData.pool_key.hooks
            },
            owner: posData.owner,
            blockNumber: posData.block_number,
            txHash: posData.tx_hash,
            timestamp: posData.timestamp
        };
        validPositions.push(position);
    }
    
    // Load NFT owners
    nftOwners = {};
    const remoteNftOwners = data.nft_owners || {};
    for (const [tokenId, owner] of Object.entries(remoteNftOwners)) {
        nftOwners[parseInt(tokenId)] = owner;
    }
    
    console.log(`✓ Loaded data from block ${blockNumber}`);
    console.log(`  Valid positions: ${validPositions.length}`);
    console.log(`  NFT owners: ${Object.keys(nftOwners).length}`);
}


// Contract interaction functions
async function getPoolAndPositionInfo(tokenId) {
    const functionSelector = "0x7ba03aad";
    const encodedTokenId = tokenId.toString(16).padStart(64, '0');
    const data = functionSelector + encodedTokenId;
    
    const result = await callContract(CONFIG.NFT_ADDRESS, data);
    if (!result) return null;
    
    try {
        const resultBytes = result.slice(2); // Remove 0x
        
        // Decode PoolKey struct
        const currency0 = "0x" + resultBytes.slice(24, 64); // address at offset 0
        const currency1 = "0x" + resultBytes.slice(88, 128); // address at offset 32
        const fee = parseInt(resultBytes.slice(128, 192), 16); // uint24 at offset 64
        const tickSpacing = parseInt(resultBytes.slice(192, 256), 16); // int24 at offset 96
        const hooks = "0x" + resultBytes.slice(280, 320); // address at offset 128
        
        // Decode info uint256
        const info = parseInt(resultBytes.slice(320, 384), 16);
        
        const poolKey = { currency0, currency1, fee, tickSpacing, hooks };
        
        return { poolKey, info };
        
    } catch (error) {
        console.log(`Error decoding getPoolAndPositionInfo result: ${error.message}`);
        return null;
    }
}

// Log processing functions
function processCreatePositionLogs(logs) {
    const positions = [];
    
    for (const log of logs) {
        try {
            const topics = log.topics || [];
            const txHash = log.transactionHash || "";
            const blockNumber = parseInt(log.blockNumber, 16);
            
            if (topics.length > 0 && topics[0] === CONFIG.CREATE_POSITION_TOPIC) {
                let tokenId;
                if (topics.length >= 2) {
                    tokenId = parseInt(topics[1], 16);
                } else {
                    const data = log.data || "0x";
                    if (data.length >= 66) { // 0x + 64 chars
                        tokenId = parseInt(data.slice(2, 66), 16);
                    } else {
                        continue;
                    }
                }
                
                positions.push({ tokenId, txHash, blockNumber });
                console.log(`Found CreatePosition with token ID: ${tokenId}`);
            }
        } catch (error) {
            console.log(`Error processing CreatePosition log: ${error.message}`);
            continue;
        }
    }
    
    return positions;
}

function processTransferLogs(logs) {
    const transfers = {};
    const validTokenIds = new Set(validPositions.map(pos => pos.tokenId));
    
    if (validTokenIds.size === 0) {
        return transfers;
    }
    
    let processedCount = 0;
    let ignoredCount = 0;
    
    for (const log of logs) {
        try {
            const topics = log.topics || [];
            
            if (topics.length >= 4 && topics[0] === CONFIG.TRANSFER_TOPIC) {
                const fromAddress = "0x" + topics[1].slice(-40);
                const toAddress = "0x" + topics[2].slice(-40);
                const tokenId = parseInt(topics[3], 16);
                
                if (validTokenIds.has(tokenId)) {
                    transfers[tokenId] = toAddress;
                    console.log(`      ✓ Valid Transfer: Token ${tokenId} from ${fromAddress} to ${toAddress}`);
                    processedCount++;
                } else {
                    ignoredCount++;
                }
            }
        } catch (error) {
            console.log(`Error processing Transfer log: ${error.message}`);
            continue;
        }
    }
    
    if (ignoredCount > 0) {
        console.log(`      Ignored ${ignoredCount} transfers for non-valid positions`);
    }
    if (processedCount > 0) {
        console.log(`      Processed ${processedCount} transfers for valid positions`);
    }
    
    return transfers;
}

async function validatePositions(positionData) {
    const newValidPositions = [];
    const newInvalidPositions = [];
    
    for (const { tokenId, txHash, blockNumber } of positionData) {
        try {
            const result = await getPoolAndPositionInfo(tokenId);
            if (!result) {
                console.log(`Could not get pool info for token ${tokenId}`);
                continue;
            }
            
            const { poolKey, info } = result;
            
            console.log(`\nToken ${tokenId}:`);
            console.log(`  Currency0: ${poolKey.currency0}`);
            console.log(`  Currency1: ${poolKey.currency1}`);
            console.log(`  Fee: ${poolKey.fee}`);
            console.log(`  TickSpacing: ${poolKey.tickSpacing}`);
            console.log(`  Hooks: ${poolKey.hooks}`);
            console.log(`  Info: ${info}`);
            
            const owner = nftOwners[tokenId] || "Unknown";
            const timestamp = new Date().toISOString();
            
            const position = {
                tokenId,
                poolKey,
                owner,
                blockNumber,
                txHash,
                timestamp
            };
            
            if (poolKeyMatches(poolKey, CONFIG.TARGET_POOL_KEY)) {
                console.log(`  ✓ VALID - matches target pool`);
                newValidPositions.push(position);
            } else {
                console.log(`  ✗ INVALID - does not match target pool`);
                newInvalidPositions.push(position);
            }
            
        } catch (error) {
            console.log(`Error validating token ${tokenId}: ${error.message}`);
            continue;
        }
    }
    
    return { newValidPositions, newInvalidPositions };
}

function calculateBlockRanges(fromBlock, toBlock) {
    const ranges = [];
    let current = fromBlock;
    
    while (current <= toBlock) {
        const endBlock = Math.min(current + CONFIG.MAX_BLOCKS_PER_REQUEST - 1, toBlock);
        ranges.push({ start: current, end: endBlock });
        current = endBlock + 1;
    }
    
    return ranges;
}

async function scanBlocks(fromBlock, toBlock) {
    console.log(`\nScanning blocks ${fromBlock} to ${toBlock}...`);
    
    const blockRanges = calculateBlockRanges(fromBlock, toBlock);
    const allTransfers = {};
    
    for (const { start, end } of blockRanges) {
        console.log(`  Scanning sub-range: ${start} to ${end} (${end - start + 1} blocks)`);
        
        // Get CreatePosition logs
        const createLogs = await getLogs(
            start,
            end,
            [CONFIG.CREATE_POSITION_TOPIC],
            CONFIG.POSITION_MANAGER_ADDRESS
        );
        
        console.log(`    Found ${createLogs.length} CreatePosition events`);
        await sleep(600);
        // Get Transfer logs
        const transferLogs = await getLogs(
            start,
            end,
            [CONFIG.TRANSFER_TOPIC],
            CONFIG.NFT_ADDRESS
        );
        
        console.log(`    Found ${transferLogs.length} Transfer events`);
        
        // Process CreatePosition events
        const positions = processCreatePositionLogs(createLogs);
        
        // Validate new positions
        if (positions.length > 0) {
            const { newValidPositions, newInvalidPositions } = await validatePositions(positions);
            validPositions.push(...newValidPositions);
            invalidPositions.push(...newInvalidPositions);
        }
        
        // Process transfers for valid positions
        if (validPositions.length > 0) {
            const transfers = processTransferLogs(transferLogs);
            Object.assign(allTransfers, transfers);
        } else if (transferLogs.length > 0) {
            console.log(`    No valid positions exist - skipping all ${transferLogs.length} transfer events`);
        }
    }
    
    // Update NFT ownership
    if (Object.keys(allTransfers).length > 0) {
        Object.assign(nftOwners, allTransfers);
        
        // Update ownership info in valid positions
        for (const position of validPositions) {
            if (allTransfers[position.tokenId]) {
                position.owner = allTransfers[position.tokenId];
            }
        }
    }

    saveDataLocally();
}

function printSummary() {
    console.log(`\n${'='.repeat(50)}`);
    console.log("SUMMARY");
    console.log(`${'='.repeat(50)}`);
    console.log(`Blocks scanned: ${CONFIG.START_BLOCK} to ${currentBlockzzzz}`);
    console.log(`Valid positions: ${validPositions.length}`);
    console.log(`Invalid positions: ${invalidPositions.length}`);
    console.log(`NFT owners tracked: ${Object.keys(nftOwners).length}`);
    
    if (validPositions.length > 0) {
        console.log(`\nVALID POSITIONS:`);
        for (const pos of validPositions) {
            console.log(`  Token ID: ${pos.tokenId}, Owner: ${pos.owner}, Block: ${pos.blockNumber}`);
        }
    } else {
        console.log(`\nNo valid positions found yet`);
    }
    
    if (Object.keys(nftOwners).length > 0) {
        console.log(`\nVALID NFT OWNERS (tracked):`);
        for (const [tokenId, owner] of Object.entries(nftOwners)) {
            console.log(`  Token ID: ${tokenId}, Owner: ${owner}`);
        }
    } else {
        console.log(`No valid NFT owners being tracked`);
    }
}

async function runOnce(blocksPerScan = 1000) {
    const latestBlock = await getLatestBlock();
    
    if (currentBlockzzzz <= latestBlock) {
        const blocksToScan = Math.min(blocksPerScan, latestBlock - currentBlockzzzz + 1);
        const toBlock = currentBlockzzzz + blocksToScan - 1;
        
        console.log(`Latest block: ${latestBlock}, Current: ${currentBlockzzzz}, Scanning to: ${toBlock}`);
        
        await scanBlocks(currentBlockzzzz, toBlock);
        currentBlockzzzz = toBlock + 1;
    } else {
        console.log(`Already caught up to block ${latestBlock}`);
    }
    
    printSummary();
    return latestBlock;
}

let WeAreSearchingLogsRightNow = false;
let forceRefresh = false;

function triggerRefresh() {
    forceRefresh = true;
    console.log("Force refresh triggered - will check for new blocks immediately");
}

async function runContinuous(blocksPerScan = 1000, sleepSeconds = 10) {
    console.log("Starting continuous monitoring...");
    console.log("Will continuously scan to the newest block");
    console.log("Call stopMonitoring() to stop");
    
    showLoadingWidget('Loading all positions from Uniswap');
    updateLoadingStatusWidget('Loading All Positions logs');
    isRunning = true;
    while (isRunning) {

                WeAreSearchingLogsRightNow = true;
        try {
            var x=0;
            const latestBlock = await getLatestBlock();
            var numOfLoops = (latestBlock - currentBlockzzzz)/499;
                            updateLoadingStatusWidget('Loading All Positions for users Loop #:'+ x + " MaxLoop #: " + numOfLoops);
                            setLoadingProgress(Math.floor((x + 1) / (numOfLoops) * 100));
            if (currentBlockzzzz <= latestBlock) {
                            updateLoadingStatusWidget('Loading All Positions for users Loop #:'+ x + " MaxLoop #: " + numOfLoops);
                            setLoadingProgress(Math.floor((x + 1) / (numOfLoops) * 100));
                            x=x+1;
                const remainingBlocks = latestBlock - currentBlockzzzz + 1;
                console.log(`\n${remainingBlocks} blocks behind latest (${currentBlockzzzz} → ${latestBlock})`);
                
                while (currentBlockzzzz <= latestBlock && isRunning) {
                    const currentLatest = await getLatestBlock();
                    const blocksToScan = Math.min(blocksPerScan, currentLatest - currentBlockzzzz + 1);
                    const toBlock = currentBlockzzzz + blocksToScan - 1;
                    
                    if (blocksToScan > 0) {
                        console.log(`Scanning blocks ${currentBlockzzzz} to ${toBlock} (${blocksToScan} blocks)`);
                        await scanBlocks(currentBlockzzzz, toBlock);
                        currentBlockzzzz = toBlock + 1;
                        
                        if (currentBlockzzzz <= currentLatest && isRunning) {
                            await sleep(2000);
                        }
                    } else {
                        break;
                    }
                }
                
                saveDataLocally();
                printSummary();
                hideLoadingWidget();
                console.log(`✓ Caught up to block ${latestBlock}`);
                WeAreSearchingLogsRightNow = false;
            } else {
                WeAreSearchingLogsRightNow = false;
                console.log(`Up to date at block ${latestBlock}`);
            }
            
            if (isRunning && !forceRefresh) {
                console.log(`Waiting ${sleepSeconds}s before checking for new blocks...`);
                let test = 0;
                while (!forceRefresh && test < sleepSeconds) {
                    await sleep(1000); // Sleep 1 second at a time
                    test = test + 1;
                    if (test % 10 === 0) { // Print every 10 seconds
                        console.log(`Still waiting... ${sleepSeconds - test}s remaining`);
                    }
                }
            }
            
            if (forceRefresh) {
                forceRefresh = false;
                console.log("Force refresh activated - checking immediately");
            }
        } catch (error) {
            console.error(`Error in monitoring loop: ${error.message}`);
            if (isRunning) {
                console.log("Retrying in 30 seconds...");
                await sleep(30000);
            }
        }
    }
    
    console.log("Monitor stopped.");
    hideLoadingWidget();
    saveDataLocally();
    printSummary();
}

function stopMonitoring() {
    isRunning = false;
    console.log("Stopping monitor...");
}

// Public API functions
function getNFTOwners() {
    return nftOwners;
}

function getValidPositions() {
    return validPositions;
}

function getCurrentBlock() {
    return currentBlockzzzz;
}

// Main function
async function mainRPCStarterForPositions() {
    console.log("Initializing Uniswap V4 Monitor...");
    
                    await loadSettings();
                    CONFIG.RPC_URL = customRPC;

                    CONFIG.DATA_URL= customDataSource+ "testnet_uniswap_v4_data.json",

    // Fetch existing data first
    await fetchDataFromUrl();
    
    console.log("Starting monitoring...");
    
    // Run continuous monitoring (comment out to run just once)
    await runContinuous(1996, 180);
    
    // Uncomment to run just once for testing
    // await runOnce(1000);
    
    // Get the final result
    const finalNftOwners = getNFTOwners();
    const finalValidPositions = getValidPositions();
    
    console.log("\nFinal NFT Owners:", finalNftOwners);
    console.log("Valid Positions:", finalValidPositions.length);
    
    return { nftOwners: finalNftOwners, validPositions: finalValidPositions };
}


// Option 2: Using DOMContentLoaded (fires earlier)
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(async () => {
        await mainRPCStarterForPositions();
    }, 500);
});
                //reload button javascript above
            
