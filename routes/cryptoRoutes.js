import express from 'express';
import Crypto from '../models/Crypto.js';

const router = express.Router();

// Endpoint to get the latest data about a specific cryptocurrency
router.get('/stats', async (req, res) => {
    const { coin } = req.query; // Get the coin from query parameters

    if (!coin) {
        return res.status(400).json({ message: 'Coin is required' });
    }

    try {
        // Fetch the latest crypto data from the database
        const latestData = await Crypto.findOne({ coin }).sort({ createdAt: -1 }); // Sort by createdAt field to get the latest entry

        if (!latestData) {
            return res.status(404).json({ message: 'No data found for the requested coin' });
        }

        // Respond with the required data
        return res.json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData.change24h,
            coin: latestData.coin // Optionally include the coin name in the response
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
});

export default router;
