import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
import Crypto from './models/Crypto.js'; 
import './services/jobScheduler.js'; 

dotenv.config();

const app = express();

connectDB();

// Middleware
app.use(express.json());

// Serving static files from the public directory
app.use(express.static(path.join(path.resolve(), 'public')));

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to the Crypto Price App');
});

// API to fetch cryptocurrency stats
app.get('/stats', async (req, res) => {
    const { coin } = req.query; // Get the coin from query parameters

    if (!coin) {
        return res.status(400).json({ message: 'Coin is required' });
    }

    try {
        const latestData = await Crypto.findOne({ coin }).sort({ createdAt: -1 });

        if (!latestData) {
            return res.status(404).json({ message: 'No data found for the requested coin' });
        }

        return res.json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData.change24h,
            coin: latestData.coin
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
});

// API to calculate standard deviation
app.get('/deviation', async (req, res) => {
    const { coin } = req.query; 
    if (!coin) {
        return res.status(400).json({ message: 'Coin is required' });
    }

    try {
        // Fetch the last 100 records for the requested coin
        const records = await Crypto.find({ coin }).sort({ createdAt: -1 }).limit(100);

        if (records.length === 0) {
            return res.status(404).json({ message: 'No data found for the requested coin' });
        }

        // Extract prices from the records
        const prices = records.map(record => record.price);

        // Calculate the standard deviation
        const deviation = calculateStandardDeviation(prices);

        // Respond with the deviation
        return res.json({ deviation: deviation.toFixed(2) });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Function to calculate the standard deviation
const calculateStandardDeviation = (values) => {
    const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
    const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
};

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
