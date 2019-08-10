const express = require('express');
const app = express();
const path = require('path');
const port = 2000;
var intrinioSDK = require('intrinio-sdk');
const intrinioKey = require('../keys.js').intrinioKey;
intrinioSDK.ApiClient.instance.authentications['ApiKeyAuth'].apiKey = intrinioKey;

console.log(new Date())
let d = new Date()
d.setDate(d.getDate()-5);
console.log(d);

app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));

app.get('/stocks/:ticker/:timeframe', (req, res) => {
    const { ticker, timeframe } = req.params;
    var securityAPI = new intrinioSDK.SecurityApi();
    var startDate = new Date();
    
    if (timeframe === '5days') {
      startDate.setDate(startDate.getDate()-7);
    } else if (timeframe === '1month') {
      startDate.setDate(startDate.getDate()-32);
    } else if (timeframe === '3months') {
      startDate.setDate(startDate.getDate()-92);
    } else if (timeframe === '6momths') {
      startDate.setDate(startDate.getDate()-182);
    } else if (timeframe === '1year') {
      startDate.setDate(startDate.getDate()-367);
    } else if (timeframe === '5years') {
      startDate.setDate(startDate.getDate()-1827);
    }
    
    var opts = { 
      'startDate': startDate, // Date | Return prices on or after the date
      'endDate': new Date(), // Date | Return prices on or before the date
      'frequency': "daily", // String | Return stock prices in the given frequency
      'pageSize': 50, // Number | The number of results to return
      'nextPage': null // String | Gets the next page of data from a previous API call
    };
    
    securityAPI.getSecurityStockPrices(ticker, opts).then(function(data) {
      res.send(data.stock_prices);
    }, function(error) {
      console.error(error);
      res.send('API call did not work');
    });
});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});