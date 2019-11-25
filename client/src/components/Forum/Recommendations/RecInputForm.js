import React, { Component } from "react";
import { Form, Button, Input, Select, Rate } from 'antd';
import 'antd/dist/antd.css';
const { Option } = Select
class RecInputForm extends Component {
  constructor(props) {
      super(props);
      this.state = {};
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log('handleSubmit in RecInputForm');
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('RecInputForm: ', values);
        //values.checkbox-group is an array of names of added friends
        this.props.onSubmit(values);
      }
    });
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
    return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className='rec-input-form'>
          <Form.Item label="Ranking">
            {getFieldDecorator('ranking', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your ranking'
                }
              ]
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="Rating">
            {getFieldDecorator('rate', {
              initialValue: 0,
              requred: true,
              message: 'Please enter your rating'
            })(<Rate />)}
          </Form.Item>
          <Form.Item label="Postion">
            {getFieldDecorator('confirm', {
              rules: [{ required: true, message: 'Please select your position'}]
            })(
              <Select
                placeholder="Select your position"
                onChange={this.handlePositionChange}
              >
                <Option value='Tank'>Tank</Option>
                <Option value='Damage'>Damage</Option>
                <Option value='Support'>Support</Option> 
              </Select>
            )}
          </Form.Item>
          <Form.Item {...buttonFormItemLayout}>
            <Button type="primary" htmlType="submit" className='recommendation-button'>
              Recommend Teammates
            </Button>
          </Form.Item>
        </Form>
    );
  }
}
export default Form.create({name: 'recommendationForm'})(RecInputForm);
