import mongoose from 'mongoose';

// schema for the Crypto model
const CryptoSchema = new mongoose.Schema({
    coin: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    marketCap: {
        type: Number,
        required: true
    },
    change24h: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

// Creating the model based on the schema
const Crypto = mongoose.model('Crypto', CryptoSchema, 'cryptos'); 
export default Crypto;
