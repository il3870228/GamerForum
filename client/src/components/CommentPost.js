import React, { Component } from "react";
import { Comment, Icon, Tooltip } from "antd";
import 'antd/dist/antd.css';
import EditForm from './EditForm';
import axios from 'axios';
const home_url = "http://ec2-3-15-161-191.us-east-2.compute.amazonaws.com:3000/"
class CommentPost extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: this.props.username,
			postContent: this.props.postContent,
			postTime: this.props.postTime,
			likes: 0,
			action: null,
			onEdit: false,
			commentID: this.props.commentID, //add new attribute
			PostID:this.props.PostID
		}
		this.onClickLike = this.onClickLike.bind(this);
		this.onClickDelete = this.onClickDelete.bind(this);
		this.onClickEdit = this.onClickEdit.bind(this);
		this.onSubmitEdit = this.onSubmitEdit.bind(this);
	}

	onSubmitEdit(updatedContent) {
		//TODO: update content in backend database
		this.setState({onEdit: false, postContent: updatedContent});
		// const send = {
		// 	cid: this.state.commentID,
		// 	content: updatedContent
		// }
		//call axios update
		// axios.post(home_url + "api/update",  send)
		// .then(res =>{
		// 	console.log(res.data)
		// })
		console.log("comment is ", updatedContent);
	}

	onClickEdit() {
		this.setState({onEdit: true});
	}

	onClickDelete() {
		this.props.onDeleteComment(commentID);//todo here
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
