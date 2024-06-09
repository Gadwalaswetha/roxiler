const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const transactionSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    category: String,
    sold: Boolean,
    dateOfSale: Date,
    image: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);

mongoose.connect('mongodb://localhost:27017/mernstack', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get('/api/initialize', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Transaction.insertMany(response.data);
        res.status(200).send('Database initialized');
    } catch (error) {
        res.status(500).send('Error initializing database');
    }
});


app.get('/api/transactions', async (req, res) => {
    const { month, search = '', page = 1, perPage = 10 } = req.query;
    const regex = new RegExp(search, 'i');
    const monthNumber = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;
    const transactions = await Transaction.find({
        dateOfSale: { $month: monthNumber },
        $or: [
            { title: regex },
            { description: regex },
            { price: regex }
        ]
    }).skip((page - 1) * perPage).limit(parseInt(perPage));
    res.json(transactions);
});


app.get('/api/statistics', async (req, res) => {
    const { month } = req.query;
    const monthNumber = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;
    const totalSaleAmount = await Transaction.aggregate([
        { $match: { dateOfSale: { $month: monthNumber }, sold: true } },
        { $group: { _id: null, total: { $sum: "$price" } } }
    ]);
    const totalSoldItems = await Transaction.countDocuments({ dateOfSale: { $month: monthNumber }, sold: true });
    const totalNotSoldItems = await Transaction.countDocuments({ dateOfSale: { $month: monthNumber }, sold: false });
    res.json({
        totalSaleAmount: totalSaleAmount[0]?.total || 0,
        totalSoldItems,
        totalNotSoldItems
    });
});


app.get('/api/barchart', async (req, res) => {
    const { month } = req.query;
    const monthNumber = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;
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
    const data = {};
    for (const range of priceRanges) {
        const count = await Transaction.countDocuments({
            dateOfSale: { $month: monthNumber },
            price: { $gte: range.min, $lte: range.max }
        });
        data[range.range] = count;
    }
    res.json(data);
});


app.get('/api/piechart', async (req, res) => {
    const { month } = req.query;
    const monthNumber = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;
    const categories = await Transaction.aggregate([
        { $match: { dateOfSale: { $month: monthNumber } } },
        { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
    res.json(categories);
});


app.get('/api/combined', async (req, res) => {
    const { month } = req.query;
    const [transactions, statistics, barchart, piechart] = await Promise.all([
        axios.get(`http://localhost:5000/api/transactions?month=${month}`),
        axios.get(`http://localhost:5000/api/statistics?month=${month}`),
        axios.get(`http://localhost:5000/api/barchart?month=${month}`),
        axios.get(`http://localhost:5000/api/piechart?month=${month}`)
    ]);
    res.json({
        transactions: transactions.data,
        statistics: statistics.data,
        barchart: barchart.data,
        piechart: piechart.data
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
