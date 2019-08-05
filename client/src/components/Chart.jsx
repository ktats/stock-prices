import React, {Component} from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';

//check out default properties 

class Chart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chartData: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },

            line: {
                labels: [1,2,3,4,5],
                datasets: [{
                    data: [10,20,35, 50, 80],
                    label: 'test1',
                }]
            }
        }

        this.getStockData = this.getStockData.bind(this);
    }

    componentDidMount() {
        this.getStockData('AAPL');
    }

    getStockData(ticker) {
      axios.get(`/stocks/${ticker}`)
       .then((data) => {
           console.log(data)
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
               options={{ maintainAspectRatio: false }}
               />
            </div>
        )
    }
}

export default Chart;