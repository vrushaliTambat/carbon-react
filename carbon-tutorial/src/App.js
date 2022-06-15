import './app.scss';
import React, { Component } from 'react';
import { Button, Content } from 'carbon-components-react';
import TutorialHeader from './components/TutorialHeader';
import BasicTable from './components/Table/BasicTable';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LineGraph from './components/LineGraph';



class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <TutorialHeader />
          <div style={{ height: '48px' }} />
          <Switch>
            <Route exact path="/">
              <BasicTable />
            </Route>
            <Route exact path="/chart">
              <LineGraph />
            </Route>
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
