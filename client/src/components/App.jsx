import React from 'react';
import Chart from './Chart.jsx';


class App extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
      console.log(Chart);
      return (
          <div>The React App works!!!
              <Chart />
          </div>
      );
  };
};

export default App;