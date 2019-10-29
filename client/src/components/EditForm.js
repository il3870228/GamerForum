import React, { Component } from "react";
//import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button';
import { Form, Button } from 'antd';
import 'antd/dist/antd.css';
import TextArea from "antd/lib/input/TextArea";
import './FormButton.css';
class EditForm extends Component {
  constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log('handleChange event: ', event);
    this.setState({value: event.target.value})
  }

  handleSubmit(event)  {
      this.props.onSubmitEdit(this.state.value);
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
                Update
            </Button>
        </Form.Item>
        </div>
    );
  }
}
export default EditForm;
