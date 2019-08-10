import React from 'react';
import styles from './style.css';

class Menu extends React.Component {
    constructor(props) {
        super(props)
    }
  
    render() {
        return (
            <div className={styles.menu}>
                <div className={styles.menuTop}>
                    <div className={styles.timeframeBox}>
                        <span className={styles.input}>Choose a timeframe: </span>
                        <select>
                            <option value="price">Price</option>
                        </select>
                    </div>
                    <div className={styles.metricBox}>
                        <span className={styles.input}>Choose a metric: </span>
                        <select>
                            <option value="price">Price</option>
                        </select>
                    </div>
                </div>
                <div className={styles.menuBottom}>
                     <div className={styles.tickerBox}>
                        <span className={styles.input}>Choose a stock:</span>
                        <input></input>
                    </div>
                </div>
            </div>
        );
    };
  };
  
export default Menu;