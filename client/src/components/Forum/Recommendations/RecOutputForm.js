import React, { Component } from "react";
import { Form, Button, Checkbox, Row, Column } from 'antd';
import 'antd/dist/antd.css';
import './Rec.css';
class RecOutputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log('handleSubmit in RecOutputForm');
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('RecOutputForm: ', values);
        //values.checkbox-group is an array of names of added friends
        this.props.onSubmit(values['checkbox-group']);
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
    const checkboxsArr = this.props.recResults.map((rec) =>
      <Row>
          <Checkbox value={rec.user_name}>
            {rec.user_name + " | Score: " + rec.average_rate}
          </Checkbox>
      </Row>);
    return (
      <div>
        Teammate Recommendations:
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className='rec-output-form'>
          <Form.Item>
            {getFieldDecorator('checkbox-group')(
              <Checkbox.Group style={{ width: '100%' }}>
                {checkboxsArr}
              </Checkbox.Group>,
            )}
          </Form.Item>
          <Form.Item {...buttonFormItemLayout}>
            <Button type="primary" htmlType="submit" className='recommendation-button'>
              Add Friends!
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Form.create({ name: 'RecOutputForm' })(RecOutputForm);
