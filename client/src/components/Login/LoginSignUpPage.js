import React, { Component } from "react";
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './LoginSignUp.css';

class LoginSignUpPage extends Component {
  constructor(props) {
      super(props);
      this.callback = this.callback.bind(this);
      this.loggedIn = this.loggedIn.bind(this);
  }

  callback(key) {
    console.log('inside callback, key: ', key);
  }

  loggedIn(username, password) {
    console.log('username: ', username, ' password: ', password);
    this.props.history.push({
      pathname: '/Overwatch',
      state: {
        username: username,
        password: password,
      }
    });
  }

  render() {
    return (
        <div className="login-sign-up-form">
          <Tabs defaultActiveKey="login_form" onChange={this.callback}>
            <Tabs.TabPane tab="Log in" key="login_form">
              <LoginForm loggedIn={this.loggedIn}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Sign Up" key="sign_up_form">
              <SignUpForm loggedIn={this.loggedIn}/>
            </Tabs.TabPane>
          </Tabs>
        </div>
    );
  }
}
export default LoginSignUpPage;
