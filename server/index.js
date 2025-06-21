// server/index.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Your backend API route
app.get('/api/news', async (req, res) => {
    console.log("🚀 Received request to /api/news");  // <== Add this line

    try {
        const { query } = req.query;

        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: query,
                language: 'en',
                pageSize: 10,
            },
            headers: {
                'Authorization': process.env.NEWS_API_KEY
            }
        });
        // sends back the data from the API
        res.json(response.data);

    // error response
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
