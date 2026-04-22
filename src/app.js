const express = require('express');
const { add } = require('./math');

const app = express();

app.get('/add', (req, res) => {
    const { a, b } = req.query;
    res.json({ result: add(Number(a), Number(b)) });
});

module.exports = app;
