import React, { Component } from "react";
import { Comment, Icon, Tooltip } from "antd";
import 'antd/dist/antd.css';
import EditForm from './EditForm';
class CommentPost extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: this.props.username,
			postContent: this.props.postContent,
			postTime: this.props.postTime,
			likes: 0,
			action: null,
			onEdit: false
		}
		this.onClickLike = this.onClickLike.bind(this);
		this.onClickDelete = this.onClickDelete.bind(this);
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
			<div>
				<Comment
						author={this.state.username}
						actions={actions}
						content={this.state.postContent}
						datetime= {<Tooltip title={this.state.postTime}>
							<span>{this.state.postTime}</span>
						</Tooltip>}
				/>
				{this.state.onEdit ? <EditForm onSubmitEdit={this.onSubmitEdit}/> : null}
			</div>);
  }
}
export default CommentPost;
