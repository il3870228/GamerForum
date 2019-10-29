import React, { Component } from "react";
import { Comment, Icon, Tooltip } from "antd";
import 'antd/dist/antd.css';
class CommentPost extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: this.props.username,
			postContent: this.props.postContent,
			postTime: this.props.postTime,
			likes: 0,
			action: null
		}
		this.onClickLike = this.onClickLike.bind(this);
		this.onClickDelete = this.onClickDelete.bind(this);
	}

	onClickDelete() {
		var info = {
			username: this.props.username,
			content: this.props.postContent,
			time: this.props.postTime,
		}
		this.props.onDeleteComment(info);
	}

	onClickLike() {
		var newLikes = this.state.likes;
		newLikes = newLikes + 1;
		this.setState({
			likes: newLikes,
			action: 'liked'
		});
	}

  render() {
		const { likes, action } = this.state;

		const actions = [
			<span key="post-like">
				<Tooltip title="Like">
					<Icon
						type = "like"
						theme={action === 'liked'? 'filled':'outlined'}
						onClick={this.onClickLike}
					/>
				</Tooltip>
				<span>{likes}</span>
				</span>,
				<span key="delete">
					<Tooltip title="Delete">
						<Icon
							type = "delete"
							onClick={this.onClickDelete}
						/>
					</Tooltip>
				</span>
		]
    return (
			<Comment
					author={this.state.username}
					actions={actions}
					content={this.state.postContent}
					datetime= {<Tooltip title={this.state.postTime}>
						<span>{this.state.postTime}</span>
					</Tooltip>}
			/>);
  }
}
export default CommentPost;
