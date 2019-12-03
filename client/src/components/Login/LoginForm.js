import React, { Component } from "react";
import { Form, Button, Icon, Input, Alert } from 'antd';
import 'antd/dist/antd.css';
import './Login.css';

class LoginForm extends Component {
  constructor(props) {
      super(props);
      this.state = {
        LogInErrorDisplay: false,
        LogInError: "",
      };
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event)  {
      console.log('this.props: ', this.props);
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Inside handleSubmit: values in form: ', values);
          // send to backend: 
          // {
          //   username: values.username,
          //   password: values.password,
          // }
          // get error/success message from backend
          // if error: 
          //   set LogInErrorDisplay and LogInError
          // if success: 
          this.props.loggedIn(values.username, values.password);
        }
      });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const logInErrorAlert = this.state.LogInErrorDisplay ? <Alert message={this.state.LogInError} type="error" /> : null;
    return (
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{required: true, message: 'Please enter your username'}]
            })(
              <Input
                prefix={<Icon type="user"/>}
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Please enter your password'}]
            })(
              <Input
                prefix={<Icon type="lock"/>}
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className='login-button'>
              Log in
            </Button>
          </Form.Item>
          {logInErrorAlert}
        </Form>
        
    );
  }
}
export default Form.create({name: 'login_form'})(LoginForm);
