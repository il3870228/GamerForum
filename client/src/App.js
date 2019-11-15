import React, { Component } from "react";
import LoginSignUpPage from './components/Login/LoginSignUpPage';
import RouterLayout from './components/RouterLayout';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Menu, Layout} from 'antd';
import 'antd/dist/antd.css';
import './App.css'
const {Header, Content} = Layout;
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={LoginSignUpPage} />
          <Route path='/Home' component={RouterLayout}/>
          <Route path='/Search' component={RouterLayout}/>
        </Switch>
      </Router>
    );
  }
}
export default App;
