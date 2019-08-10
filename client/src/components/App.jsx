import React from 'react';
import Chart from './Chart.jsx';
import Menu from './Menu.jsx';
import styles from './style.css';


class App extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
      return (
          <div className={styles.content}>
              <div className={styles.title}><h1>Historical Equity Data</h1></div>
              <Menu />
              <Chart />
          </div>
      );
  };
};

export default App;