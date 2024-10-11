# Crypto Price App

## Overview

The **Crypto Price App** is a Node.js application that tracks the prices of selected cryptocurrencies (Bitcoin, Ethereum, and Matic Network). It features a background service that fetches real-time data from a cryptocurrency API and stores it in a MongoDB database. The app provides APIs to retrieve the latest data, as well as to calculate and return the standard deviation of prices from the last 100 records.

## Features

- Fetches real-time data for **Bitcoin**, **Ethereum**, and **Matic Network** every 2 hours.
- Stores cryptocurrency data (price, market cap, and 24h change) in MongoDB.
- Provides a `/stats` API to retrieve the latest price, market cap, and 24h change for any supported cryptocurrency.
- Provides a `/deviation` API to calculate and return the standard deviation of the price for the last 100 records of any cryptocurrency.
- A frontend to display fetched data along with standard deviation.

## Technologies Used

- **Node.js**: Backend server
- **Express.js**: Web framework for building APIs
- **MongoDB**: Database to store cryptocurrency data
- **Cron Jobs**: To schedule the periodic data fetch every 2 hours
- **Docker**: Containerized app for easy deployment
- **Frontend**: Simple JavaScript, HTML for interacting with APIs

## APIs

### 1. `/stats`
**Method:** GET  
**Query Params:**  
`coin`: The name of the cryptocurrency (`bitcoin`, `ethereum`, or `matic-network`).  

**Example Request:**
```http
GET /stats?coin=bitcoin
```

**Sample Response:**
```json
{
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4,
    "coin": "bitcoin"
}
```

### 2. `/deviation`
**Method:** GET  
**Query Params:**  
`coin`: The name of the cryptocurrency (`bitcoin`, `ethereum`, or `matic-network`).  

**Example Request:**
```http
GET /deviation?coin=bitcoin
```

**Sample Response:**
```json
{
    "deviation": 4082.48
}
```

## Project Setup

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **MongoDB** (local or cloud instance)
- **Docker** (optional, if you want to use the Docker setup)

### 1. Clone the Repository

```bash
git clone https://github.com/d-ravi-kumar19/koinx-assignment.git
cd koinx-assignment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory of your project and add the following:
```env
PORT=27017
MONGO_URI=mongodb://localhost:27017/crypto-price-app
COIN_API_KEY=your-api-key
```

Make sure to replace `MONGO_URI` with your MongoDB connection string and `COIN_API_KEY` with the key from the cryptocurrency API provider.

### 4. Run the App

```bash
node app.js
```

The server will be running on `http://localhost:27017`.

### 5. Frontend

To interact with the APIs via the frontend, open the `public/index.html` file in your browser and use the UI to select the cryptocurrency and fetch the data.

## Cron Job

The app uses a cron job to fetch cryptocurrency prices every 2 hours. The cron job is scheduled using the following expression:

```javascript
cron.schedule('0 */2 * * *', async () => {
    // Your scheduled task here
});
```

This ensures the data for Bitcoin, Ethereum, and Matic Network is fetched and saved to the MongoDB database at the start of every second hour.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
