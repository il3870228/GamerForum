import React, { Component } from "react";
import LoginSignUpPage from './components/Login/LoginSignUpPage';
import RouterLayout from './components/RouterLayout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Recommendations from './components/Forum/Recommendations/Recommendations';
import 'antd/dist/antd.css';
import './App.css';
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={LoginSignUpPage} />
          <Route exact path='/Rec' render={(props) => <Recommendations {...props} game="Overwatch"/>} />
          <Route path='/Home' component={RouterLayout}/>
          <Route path='/Search' component={RouterLayout}/>
        </Switch>
      </Router>
    );
  }
}
export default App;
