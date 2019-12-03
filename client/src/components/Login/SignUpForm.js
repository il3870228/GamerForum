import React, { Component } from "react";
import { Form, Button, Input, Alert } from 'antd';
import 'antd/dist/antd.css';
import './Login.css';
class SignUpForm extends Component {
  constructor(props) {
      super(props);
      this.state = {
        confirmDirty: false, 
        LogInErrorDisplay: false,
        LogInError: "",
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.validateToNextPassword = this.validateToNextPassword.bind(this);
      this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
      this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
  }
  handleSubmit(event)  {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Inside handleSubmit: values in form: ', values);
          // send to back-end: 
          // {
          //   email: values.email,
          //   username: values.username,
          //   password: values.password,
          // }
          // get error/success message from back-end
          // if error: 
          //   set state on LogInErrorDisplay and LogInError
          // if success: 
          this.props.loggedIn(values.username, values.password);
        }
      })
  }

  validateToNextPassword(rule, value, callback) {
    const { form } = this.props;
    console.log('rule: ', rule, '; value: ', value, '; callback: ', callback);
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  }

  compareToFirstPassword(rule, value, callback) {
    const { form } = this.props;
    console.log('compareToFirstPassword rule: ', rule, '; value: ', value, '; callback: ', callback);
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords are inconsistent');
    } else {
      callback();
    }
  }

  handleConfirmBlur(event) {
    const { value } = event.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      }
    }
    const buttonFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
         },
      }
    }
    const logInErrorAlert = this.state.LogInErrorDisplay ? <Alert message={this.state.LogInError} type="error" /> : null;
    return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className='sign-up-form'>
          <Form.Item label="Email">
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your email'
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email'
                }
              ]
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your password'
                },
                {
                  validator: this.validateToNextPassword,
                }
              ]
            })(
              <Input
                type="password"
              />
            )}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password'
                },
                {
                  validator: this.compareToFirstPassword,
                }
              ]
            })(
              <Input
                type="password"
                onBlur={this.handleConfirmBlur}
              />
            )}
          </Form.Item>
          <Form.Item label='Username'>
            {getFieldDecorator('username', {
              rules: [{required: true, message: 'Please enter your username'}]
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item {...buttonFormItemLayout}>
            <Button type="primary" htmlType="submit" className='login-button'>
              Sign Up
            </Button>
          </Form.Item>
          {logInErrorAlert}
        </Form>
    );
  }
}
export default Form.create({name: 'sign_up_form'})(SignUpForm);
