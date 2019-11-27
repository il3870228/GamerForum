import React, { Component } from "react";
import { Form, Button, Icon, Input } from 'antd';
import 'antd/dist/antd.css';
import './Login.css';

class LoginForm extends Component {
  constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event)  {
      console.log('this.props: ', this.props);
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Inside handleSubmit: values in form: ', values);
          this.props.loggedIn(values.username, values.password);
        }
      });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
        </Form>
    );
  }
}
export default Form.create({name: 'login_form'})(LoginForm);
