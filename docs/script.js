// Hardcoded purchase price for AAPL
const hardcodedPurchasePrice = 150.00; // Set your hardcoded purchase price here
const apiKey = 'YEplLiGiXF8MqQIrdUiJUrDbYIwn0kakb'; // Replace with your actual API key
const url = `https://financialmodelingprep.com/api/v3/quote-short/TSLA?apikey=EplLiGiXF8MqQIrdUiJUrDbYIwn0kakb`;

// Function to fetch stock data
async function fetchStockQuote() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        displayQuote(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Function to display the stock quote and compare prices
function displayQuote(data) {
    const symbolElement = document.getElementById('symbol');
    const currentPriceElement = document.getElementById('currentPrice');
    const comparisonResultElement = document.getElementById('comparisonResult');
    const percentageChangeElement = document.getElementById('percentageChange');
    const moneyChangeElement = document.getElementById('moneyChange');

    if (data.length > 0) {
        const stock = data[0]; // Get the first (and only) stock object
        const currentPrice = stock.price;

        symbolElement.textContent = `Symbol: ${stock.symbol}`;
        currentPriceElement.textContent = `Current Price: $${currentPrice.toFixed(2)}`; // Format to 2 decimal places

        // Compare the current price with the hardcoded purchase price
        const gainLoss = currentPrice - hardcodedPurchasePrice;
        const percentageChange = (gainLoss / hardcodedPurchasePrice) * 100;

        // Set the text and color based on gain or loss
        if (gainLoss > 0) {
            comparisonResultElement.textContent = 'You are in a positive position.';
            comparisonResultElement.className = 'gain';
            moneyChangeElement.textContent = `You made: $${gainLoss.toFixed(2)}`;
            moneyChangeElement.className = 'money-gain';
        } else if (gainLoss < 0) {
            comparisonResultElement.textContent = 'You are in a negative position.';
            comparisonResultElement.className = 'loss';
            moneyChangeElement.textContent = `You lost: $${Math.abs(gainLoss).toFixed(2)}`;
            moneyChangeElement.className = 'money-loss';
        } else {
            comparisonResultElement.textContent = 'You are at breakeven.';
            comparisonResultElement.className = 'breakeven';
            moneyChangeElement.textContent = `You broke even.`;
            moneyChangeElement.className = '';
        }

        percentageChangeElement.textContent = `Percentage Change: ${percentageChange.toFixed(2)}%`;
    } else {
        symbolElement.textContent = 'No data found for the specified stock symbol.';
        currentPriceElement.textContent = '';
        comparisonResultElement.textContent = '';
        percentageChangeElement.textContent = '';
        moneyChangeElement.textContent = '';
    }
}

// Fetch and display the stock quote when the page loads
fetchStockQuote();
