import React, { Component } from "react";
import LoginSignUpPage from './components/Login/LoginSignUpPage';
import RouterLayout from './components/RouterLayout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import 'antd/dist/antd.css';
import './App.css';
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={LoginSignUpPage} />
          <Route exact path='/Home' component={RouterLayout}/>
          <Route path='/Overwatch' component={RouterLayout}/>
          <Route path='/PUBG' component={RouterLayout}/>
          <Route path='/Search' component={RouterLayout}/>
        </Switch>
      </Router>
    );
  }
}
export default App;
