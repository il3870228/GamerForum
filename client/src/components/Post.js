import React, { Component } from "react";
import { Comment, Icon, Tooltip } from "antd";
import 'antd/dist/antd.css';
import CommentForm from "./CommentForm";
import EditForm from "./EditForm";
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
			onEdit: false
		}
		this.onClickLike = this.onClickLike.bind(this);
		this.onComment = this.onComment.bind(this);
		this.onClickDelete = this.onClickDelete.bind(this);
		this.onDeleteComment = this.onDeleteComment.bind(this);
		this.onClickEdit = this.onClickEdit.bind(this);
		this.onSubmitEdit = this.onSubmitEdit.bind(this);
	}

	onSubmitEdit(updatedContent) {
		//TODO: update content in backend database
		this.setState({onEdit: false, postContent: updatedContent});
	}

	onClickEdit() {
		this.setState({onEdit: true});
	}

  onDeleteComment(info) {
		//TODO: delete comment in backend
		var ps = this.state.comments;
    var c = 0;
    for (c = 0; c < ps.length; c++) {
      var p = ps[c];
      if (p.username === info.username &&
          p.content === info.content &&
          p.time === info.time) {
            ps.splice(c, 1);
            break;
          }
    }
    this.setState({comments: ps});
	}

	onClickDelete() {
		var info = {
			username: this.props.username,
			content: this.props.postContent,
			time: this.props.postTime,
		}
		this.props.onDeletePost(info);
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
			</span>,
			<span key="delete">
				<Tooltip title="Delete">
					<Icon
						type = "delete"
						onClick={this.onClickDelete}
					/>
				</Tooltip>
			</span>,
			<span key="edit">
				<Tooltip title="Edit">
					<Icon
						type = "edit"
						onClick={this.onClickEdit}
					/>
				</Tooltip>
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
				{this.state.onEdit ? <EditForm onSubmitEdit={this.onSubmitEdit}/> : null}
				<CommentForm onComment={this.onComment}/>
				<div className='inner'>
				{this.state.comments.map((p) => <CommentPost key={p.time+p.content+Math.random()} username={p.username} postContent={p.content} postTime={p.time} onDeleteComment={this.onDeleteComment}/>)}
				</div>
			</div>
			);
  }
}
export default Post;
