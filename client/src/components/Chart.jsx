import React, {Component} from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import moment from 'moment';
import styles from './style.css';

//check out default properties 
// check out stock.js npm package 

class Chart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            line: {
                labels: [1,2,5,3],
                datasets: [{
                    data: [10,20,35, 50, 80],
                    label: 'test1',
                }],
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.2)'
            }
        }

        this.getStockData = this.getStockData.bind(this);
    }

    componentDidMount() {
        this.getStockData('AAPL', '5years');
    }

    getStockData(ticker, timeframe) {
      axios.get(`/stocks/${ticker}/${timeframe}`)
       .then((results) => {
           const prices = results.data
           let labels = [];
           let stockData = [];
           for (let i = prices.length - 1; i >= 0; i--) {
            //  labels.push(moment(prices[i].date).format('DD MMM'));
            labels.push('');
             stockData.push(prices[i].close);
           }
           console.log(labels, stockData);
           this.setState({
               line: {
                   labels,
                   datasets: [{
                       data: stockData,
                       lineTension: 0,
                       label: `${ticker}`,
                       backgroundColor: 'rgba(255, 99, 132, 0.2)',
                       borderColor: 'rgba(255, 99, 132, 0.2)',
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

    render() {
        return (
            <div className={styles.chart}>
              <Line 
               data={this.state.line}
               responsive={true}
               fill={false}
               height={300}
               width={15}
               options={
                   { 
                       maintainAspectRatio: false,
                       tooltips: {
                            mode: 'index',
                            intersect: false
                        },
                        hover: {
                            mode: 'index',
                            intersect: false
                        },
                       scales: {
                        yAxes: [{
                            ticks: {
                                display: true,
                            },
                            gridLines: {
                              display: false,
                              drawBorder: true,
                          }
                        }],
                        xAxes: [{
                          ticks: {
                              display: true,
                              beginAtZero: true,
                          },
                          gridLines: {
                            display: false,
                            drawBorder: true,
                        }
                      }],
                      }
                       
                    }}
               />
            </div>
        )
    }
}

export default Chart;