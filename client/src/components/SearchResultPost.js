import React, { Component } from "react";
import { Comment, Tooltip } from "antd";
import 'antd/dist/antd.css';
class SearchResultPost extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: this.props.username,
			postContent: this.props.postContent,
			postTime: this.props.postTime
		}
	}
  render() {
    return (
      <Comment
          author={this.state.username}
          content={this.state.postContent}
          datetime= {<Tooltip title={this.state.postTime}>
            <span>{this.state.postTime}</span>
          </Tooltip>}
      />);
  }
}
export default SearchResultPost;
