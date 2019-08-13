import React from 'react';
import styles from './style.css';

class Info extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { title, description, marketCap, peRatio, eps, divYield } = this.props.attr;
        return (
            <div className={styles.info}>
                <div className={styles.companyName}>
                   <h2>{title}</h2>
                </div>
                <div className={styles.marketCap}>
                    Market Cap: {marketCap}
                </div>
                <div className={styles.peRatio}>
                    P/E Ratio: {peRatio}
                </div>
                <div className={styles.eps}>
                    EPS: {eps}
                </div>
                <div className={styles.divYield}>
                    Yield: {divYield}
                </div>
                <div className={styles.description}>
                    {description}
                </div>
            </div>
        )
    }
}

export default Info;