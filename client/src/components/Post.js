import React, { Component } from "react";
import { Comment, Icon, Tooltip } from "antd";
import 'antd/dist/antd.css';
import CommentForm from "./CommentForm";
import CommentPost from "./CommentPost";
import './Post.css';
class Post extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: this.props.username, 
			postContent: this.props.postContent,
			postTime: this.props.postTime,
			likes: 0,
			action: null,
			comments: this.props.comments,
		}
		this.onClickLike = this.onClickLike.bind(this);
		this.onComment = this.onComment.bind(this);
	}

	//TODO: send comment to backend database
	onComment(c) {
		console.log('onComment c: ', c);
		var newComments = this.state.comments;
		newComments.unshift(c);
		this.setState({comments: newComments});
		console.log(this.state.comments);
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
		console.log('postTime: ', this.state.postTime);
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
			</span>
		]
    return (
			<div className='outer'>
				<Comment
						author={this.state.username}
						actions={actions}
						content={this.state.postContent}
						datetime= {<Tooltip title={this.state.postTime}>
							<span>{this.state.postTime}</span>
						</Tooltip>}
				/>
				<CommentForm onComment={this.onComment}/>
				<div className='inner'>
				{this.state.comments.map((p) => <CommentPost key={p.time+p.content} username={p.username} postContent={p.content} postTime={p.time}/>)}
				</div>
			</div>
			);
  }
}
export default Post;
