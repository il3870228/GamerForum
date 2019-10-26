import React, { Component } from "react";
import { Form, Button, Input } from 'antd';
import 'antd/dist/antd.css';
class SearchForm extends Component {
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
      console.log('handleSubmit event: ', event);
      this.props.onSearch(this.state.value);
  }

  render() {
    return (
        <div>
        <Form.Item>
            <Input
                onChange={this.handleChange}
                value={this.state.value}
            />
            <Button 
                type="primary" 
                htmlType="submit"
                onClick={this.handleSubmit}
            >
                Search
            </Button>
        </Form.Item>
        </div>
    );
  }
}
export default SearchForm;
