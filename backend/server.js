const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionRoutes = require('./routes/transactions');

const app = express();
const PORT = 5000;
const DB_URL = 'your-mongodb-connection-string';

app.use(cors());
app.use(express.json());
app.use('https://s3.amazonaws.com/roxiler.com/product_transaction.json', transactionRoutes);
// app.use('/api', transactionRoutes);

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Database connection error:', error);
    });
