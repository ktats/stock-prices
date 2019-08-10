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
              <Menu />
              <Chart />
              <div className={styles.test}>test 3</div>
          </div>
      );
  };
};

export default App;