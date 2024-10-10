import axios from 'axios';

// Fetching cryptocurrency data from CoinGecko API
export const fetchCryptoData = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        ids: 'bitcoin,matic-network,ethereum', 
      },
    });

  
    return response.data; 
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error.message);
    throw error;
  }
};
