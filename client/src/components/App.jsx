import React from 'react';
import Chart from './Chart.jsx';
import Menu from './Menu.jsx';
import styles from './style.css';
import axios from 'axios';
import moment from 'moment';


class App extends React.Component {
  constructor(props) {
      super(props)

      this.getStockData = this.getStockData.bind(this);
      this.refreshStockView = this.refreshStockView.bind(this);
  }

  componentDidMount() {
    this.getStockData('AAPL', '1month');
  }

  getStockData(ticker, timeframe) {
    axios.get(`/stocks/${ticker}/${timeframe}`)
     .then((results) => {
         const prices = results.data
         let labels = [];
         let stockData = [];
         for (let i = prices.length - 1; i >= 0; i--) {
           if (i % 6 === 0) {
               labels.push(moment(prices[i].date).format('DD MMM'));
           } else {
               labels.push('');
           }
           stockData.push(prices[i].close);
         }
         this.setState({
             line: {
                 labels,
                 datasets: [{
                     data: stockData,
                     lineTension: 0,
                     label: `${ticker}`,
                     backgroundColor: '#020E4A',
                     borderColor: '#020E4A',
                     pointRadius: 0,
                     fill: false,
                     pointHoverRadius: 0,
                     pointHoverBorderWidth: 5,
                 }],
                 fill: false,
                 backgroundColor: 'rgba(255, 99, 132, 0.2)',
             }
         })
     })
  }

  refreshStockView(ticker, timeframe, metric) {
    this.getStockData(ticker, timeframe);
  }

  render() {
          return (
              <div className={styles.content}>
                  <Menu refreshStockView={this.refreshStockView}/>
                  { this.state && this.state.line &&
                     <Chart line={this.state.line}/>
                  }
              </div>
          );
  };
};

export default App;