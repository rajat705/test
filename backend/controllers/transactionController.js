const axios = require('axios');
const Transaction = require('../models/Transaction');

// Initialize database with seed data
const initializeDatabase = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        // Clear existing data
        await Transaction.deleteMany({});
        await Transaction.insertMany(transactions);

        res.status(200).json({ message: 'Database initialized with seed data' });
    } catch (error) {
        res.status(500).json({ error: 'Error initializing database' });
    }
};

// Get all transactions with search and pagination
const getTransactions = async (req, res) => {
    const { month, search, page = 1, perPage = 10 } = req.query;
    const monthIndex = new Date(Date.parse(month +" 1, 2023")).getMonth(); // Get month index from month name
    const query = {
        dateOfSale: { $month: monthIndex + 1 }
    };

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { price: { $regex: search, $options: 'i' } },
        ];
    }

    try {
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));
        const total = await Transaction.countDocuments(query);

        res.status(200).json({
            transactions,
            total,
            page: parseInt(page),
            perPage: parseInt(perPage),
            totalPages: Math.ceil(total / perPage),
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions' });
    }
};

// Get statistics
const getStatistics = async (req, res) => {
    const { month } = req.query;
    const monthIndex = new Date(Date.parse(month +" 1, 2023")).getMonth(); // Get month index from month name
    const query = {
        dateOfSale: { $month: monthIndex + 1 }
    };

    try {
        const totalSaleAmount = await Transaction.aggregate([
            { $match: query },
            { $group: { _id: null, total: { $sum: "$price" } } }
        ]);

        const soldItems = await Transaction.countDocuments({ ...query, sold: true });
        const notSoldItems = await Transaction.countDocuments({ ...query, sold: false });

        res.status(200).json({
            totalSaleAmount: totalSaleAmount[0] ? totalSaleAmount[0].total : 0,
            soldItems,
            notSoldItems,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching statistics' });
    }
};

// Get bar chart data
const getBarChartData = async (req, res) => {
    const { month } = req.query;
    const monthIndex = new Date(Date.parse(month +" 1, 2023")).getMonth(); // Get month index from month name
    const query = {
        dateOfSale: { $month: monthIndex + 1 }
    };

    try {
        const priceRanges = [
            { range: '0-100', min: 0, max: 100 },
            { range: '101-200', min: 101, max: 200 },
            { range: '201-300', min: 201, max: 300 },
            { range: '301-400', min: 301, max: 400 },
            { range: '401-500', min: 401, max: 500 },
            { range: '501-600', min: 501, max: 600 },
            { range: '601-700', min: 601, max: 700 },
            { range: '701-800', min: 701, max: 800 },
            { range: '801-900', min: 801, max: 900 },
            { range: '901-above', min: 901, max: Infinity }
        ];

        const barChartData = await Promise.all(priceRanges.map(async (range) => {
            const count = await Transaction.countDocuments({
                ...query,
                price: { $gte: range.min, $lte: range.max }
            });

            return { range: range.range, count };
        }));

        res.status(200).json(barChartData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching bar chart data' });
    }
};

// Get pie chart data
const getPieChartData = async (req, res) => {
    const { month } = req.query;
    const monthIndex = new Date(Date.parse(month +" 1, 2023")).getMonth(); // Get month index from month name
    const query = {
        dateOfSale: { $month: monthIndex + 1 }
    };

    try {
        const pieChartData = await Transaction.aggregate([
            { $match: query },
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);

        res.status(200).json(pieChartData.map(item => ({ category: item._id, count: item.count })));
    } catch (error) {
        res.status(500).json({ error: 'Error fetching pie chart data' });
    }
};

// Get combined data
const getCombinedData = async (req, res) => {
    try {
        const { month } = req.query;

        const transactions = await getTransactions(req, res);
        const statistics = await getStatistics(req, res);
        const barChartData = await getBarChartData(req, res);
        const pieChartData = await getPieChartData(req, res);

        res.status(200).json({
            transactions: transactions.data,
            statistics: statistics.data,
            barChartData: barChartData.data,
            pieChartData: pieChartData.data
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching combined data' });
    }
};

module.exports = {
    initializeDatabase,
    getTransactions,
    getStatistics,
    getBarChartData,
    getPieChartData,
    getCombinedData
};
