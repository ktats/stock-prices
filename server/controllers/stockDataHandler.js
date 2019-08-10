const alphaVantage = require('../../keys.js').alphaVantage;
const Stocks = require('stocks.js');
const stocks = new Stocks(alphaVantage);

module.exports.stockDataHandler = (req, res) => {
    const { ticker, timeframe } = req.params;
    let interval, amount;
    if (timeframe === '1day') {
        interval = '15min';
        amount = 26;
    } else if (timeframe === '5days') {
        interval = '30min',
        amount = 13*5;
    } else if (timeframe === '1month') {
        interval = 'daily';
        amount = 31;
    } else if (timeframe === '3months') {
        interval = 'daily';
        amount = 92;
    } else if (timeframe === '6months') {
        interval = 'daily';
        amount = 184;
    } else if (timeframe === '1year') {
        interval = 'weekly';
        amount = 52;
    } else if (timeframe === '5years') {
        interval = 'monthly';
        amount = 12*5;
    }
    const options = {
        symbol: ticker,
        interval,
        amount, // Seems like there are 13 recorded 13 minute times in a day 
        // start: new Date('2017-08-05 06:30:00'),
        // end: new Date('2017-08-06 09:30:00')
    }
    stocks.timeSeries(options)
        .then((results) => {
        console.log(results);
        res.send(results);
    })
}