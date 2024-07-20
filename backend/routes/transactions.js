const express = require('express');
const axios = require('axios');
const Transaction = require('../models/Transaction');

const router = express.Router();

const DATA_URL = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

// Fetch and initialize the database
router.get('/initialize', async (req, res) => {
    try {
        const response = await axios.get(DATA_URL);
        const transactions = response.data;

        await Transaction.deleteMany({});
        await Transaction.insertMany(transactions);

        res.status(200).json({ message: 'Database initialized with seed data' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to initialize database' });
    }
});

// Get all transactions with search and pagination
router.get('/transactions', async (req, res) => {
    const { month, search, page = 1, perPage = 10 } = req.query;

    const monthIndex = new Date(`${month} 1, 2020`).getMonth();

    const query = {
        dateOfSale: { $regex: `-${String(monthIndex + 1).padStart(2, '0')}-` }
    };

    if (search) {
        query.$or = [
            { title: new RegExp(search, 'i') },
            { description: new RegExp(search, 'i') },
            { price: new RegExp(search, 'i') }
        ];
    }

    try {
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(Number(perPage));

        const totalItems = await Transaction.countDocuments(query);

        res.status(200).json({ transactions, totalItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

// Other routes for statistics, bar chart, pie chart...

module.exports = router;
