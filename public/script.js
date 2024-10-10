document.getElementById('fetchStats').addEventListener('click', async () => {
    const coin = document.getElementById('coinSelect').value; 
    try {
        const response = await fetch(`/stats?coin=${coin}`); 

        // console.log('Response status:', response.status); 

        if (response.ok) {
            const data = await response.json(); 
            displayResult(data);
            await fetchDeviation(coin);
        } else {
            const errorData = await response.json(); 
            console.error('Error message:', errorData.message); 
            document.getElementById('result').innerHTML = 'Error fetching data!'; 
        }
    } catch (error) {
        console.error('Fetch error:', error.message); 
        document.getElementById('result').innerHTML = 'An unexpected error occurred!'; 
    }
});

async function fetchDeviation(coin) {
    try {
        const response = await fetch(`/deviation?coin=${coin}`); 
        console.log('Deviation response status:', response.status); 

        if (response.ok) {
            const deviationData = await response.json(); 
            displayDeviation(deviationData); 
        } else {
            const errorData = await response.json(); 
            console.error('Deviation error message:', errorData.message); 
        }
    } catch (error) {
        console.error('Deviation fetch error:', error.message); 
    }
}

// to display the fetched cryptocurrency 
function displayResult(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Results for ${data.coin.charAt(0).toUpperCase() + data.coin.slice(1)}:</h2>
        <p>Price: $${data.price.toFixed(2)}</p>
        <p>Market Cap: $${data.marketCap.toLocaleString()}</p>
        <p>24h Change: ${data['24hChange'].toFixed(2)}%</p>
    `;
}

// to display the standard deviation
function displayDeviation(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML += `
        <p>Standard Deviation: $${data.deviation}</p>
    `;
}
