// services/jobScheduler.js

import cron from 'node-cron';
import { fetchCryptoData } from './cryptoService.js';
import Crypto from '../models/Crypto.js';

// Schedule the job to run every 30 seconds for testing


// cron.schedule('*/30 * * * * *', async () => {
  cron.schedule('0 */2 * * *', async () => {
  console.log('Cron job triggered at', new Date().toLocaleString());

  try {
    const cryptoData = await fetchCryptoData();

    if (cryptoData && cryptoData.length > 0) {

      for (const coin of cryptoData) {
        const newCrypto = new Crypto({
          coin: coin.id,
          price: coin.current_price,
          marketCap: coin.market_cap,
          change24h: coin.price_change_percentage_24h,
        });

        try {
          await newCrypto.save();
          console.log(`Saved ${coin.id} to database`); // Confirming save
        } catch (saveError) {
          console.error('Error saving to database:', saveError.message); 
        }
      }
      console.log('Crypto data processed successfully at', new Date().toLocaleString());
    } else {
      console.log('No data fetched from the API');
    }
  } catch (error) {
    console.error('Error in background job:', error.message);
  }
});
