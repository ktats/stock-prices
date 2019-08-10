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
              {/* <Menu /> */}
              <Chart />
          </div>
      );
  };
};

export default App;