const express = require('express');
const app = express();
const path = require('path');
const port = 2000;
var intrinioSDK = require('intrinio-sdk');
const intrinioKey = require('../keys.js');
intrinioSDK.ApiClient.instance.authentications['ApiKeyAuth'].apiKey = intrinioKey;



app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));

app.get('/stocks/:ticker', (req, res) => {
    const { ticker } = req.params;
    console.log(ticker);
    var securityAPI = new intrinioSDK.SecurityApi();
    
    var identifier = ticker; // String | A Security identifier (Ticker, FIGI, ISIN, CUSIP, Intrinio ID)
    
    var opts = { 
      'startDate': new Date("2019-01-01"), // Date | Return prices on or after the date
      'endDate': new Date("2019-01-04"), // Date | Return prices on or before the date
      'frequency': "daily", // String | Return stock prices in the given frequency
      'pageSize': 100, // Number | The number of results to return
      'nextPage': null // String | Gets the next page of data from a previous API call
    };
    
    securityAPI.getSecurityStockPrices(identifier, opts).then(function(data) {
      res.send(data);
    }, function(error) {
      console.error(error);
      res.send('API call did not work');
    });
});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});