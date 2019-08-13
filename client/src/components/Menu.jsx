import React from 'react';
import styles from './style.css';
import { privateEncrypt } from 'crypto';

class Menu extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            timeframe: '1day',
            metric: 'price',
            ticker: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    handleInputChange(e) {
      this.setState({
          [e.target.id]: e.target.value
      })
    }

    handleRefresh() {
        const { ticker, timeframe, metric } = this.state;
        this.props.refreshStockView(ticker, timeframe, metric);
    }
  
    render() {
        return (
            <div className={styles.menu}>
                <div className={styles.menuTop}>
                    <div className={styles.timeframeBox}>
                        <span className={styles.input}>Choose a timeframe: </span>
                        <select id='timeframe' onChange={this.handleInputChange}>
                            <option value="1day">1 Day</option>
                            <option value="5days">5 Days</option>
                            <option value="1month">1 Month</option>
                            <option value="3months">3 Months</option>
                            <option value="6months">6 Months</option>
                            <option value="1year">1 Year</option>
                            <option value="5years">5 Years</option>
                        </select>
                    </div>
                    <div className={styles.metricBox}>
                        <span className={styles.input}>Choose a metric: </span>
                        <select id='metric' onChange={this.handleInputChange}>
                            <option value="price">Price</option>
                        </select>
                    </div>
                </div>
                <div className={styles.menuBottom}>
                     <div className={styles.tickerBox}>
                        <span className={styles.input}>Choose a stock:</span>
                        <input id='ticker' className={styles.tickerInput} onChange={this.handleInputChange}></input>
                    </div>
                </div>
                <div className={styles.refresh}>
                    <button onClick={this.handleRefresh}>Refresh Graph</button>
                </div>
            </div>
        );
    };
  };
  
export default Menu;