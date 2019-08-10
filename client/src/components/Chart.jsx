import React, {Component} from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import moment from 'moment';

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
        this.getStockData('AAPL', '5days');
    }

    getStockData(ticker, timeframe) {
      axios.get(`/stocks/${ticker}/${timeframe}`)
       .then((results) => {
           console.log(results.data)
           const prices = results.data
           let labels = [];
           let data = [];
           for (let i = prices.length - 1; i >= 0; i--) {
            //  labels.push(moment(prices[i].date).format('DD MMM'));
            labels.push('');
             data.push(prices[i].close);
           }
           console.log(labels, data);
           this.setState({
               line: {
                   labels,
                   datasets: [{
                       data,
                       label: `${ticker}`,
                       backgroundColor: 'rgba(255, 99, 132, 0.2)',
                       fill: false
                   }],
                   fill: false,
                   backgroundColor: 'rgba(255, 99, 132, 0.2)'
               }
           })
       })
    }

    render() {
        return (
            <div className="chart">
              {/* <Bar
                data={this.state.chartData}
                options={{ maintainAspectRatio: false, title: {
                    display: true,
                    text: 'Test Graph',
                } }}
                height={50}
                />   */}
              <Line 
               data={this.state.line}
               fill={false}
               height={200}
               width={15}
               options={{ maintainAspectRatio: false }}
               />
            </div>
        )
    }
}

export default Chart;