import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
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
    }


    render() {
        if (this.props.line) {
            return (
                <div className={styles.chart}>
                <Line 
                data={this.props.line}
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
                                display: true,
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
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}

export default Chart;