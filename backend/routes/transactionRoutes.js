const express = require('express');
const {
    initializeDatabase,
    getTransactions,
    getStatistics,
    getBarChartData,
    getPieChartData,
    getCombinedData
} = require('../controllers/transactionController');

const router = express.Router();

router.get('/initialize', initializeDatabase);
router.get('/transactions', getTransactions);
router.get('/statistics', getStatistics);
router.get('/bar-chart-data', getBarChartData);
router.get('/pie-chart-data', getPieChartData);
router.get('/combined-data', getCombinedData);

module.exports = router;
