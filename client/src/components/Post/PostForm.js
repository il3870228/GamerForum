import React, { Component } from "react";
//import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button';
import { Form, Button } from 'antd';
import 'antd/dist/antd.css';
import TextArea from "antd/lib/input/TextArea";
import moment from 'moment';
class PostForm extends Component {
  constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // console.log('handleChange event: ', event);
	console.log(this)
    this.setState({value: event.target.value})
  }

  handleSubmit(event)  {
      console.log('handleSubmit event: ', event);
      var curTime = moment().format('YYYY-MM-DD HH:mm:ss');
      const p = {time: curTime, content: this.state.value, comments: []};
      this.props.onSubmitPost(p);
  }

  render() {
    return (
        <div>
        <Form.Item>
            <TextArea
                rows={4}
                onChange={this.handleChange}
                value={this.state.value}
            />
            <Button
                type="primary"
                htmlType="submit"
                onClick={this.handleSubmit}
            >
                Post
            </Button>
        </Form.Item>
        </div>
    );
  }
}
export default PostForm;
