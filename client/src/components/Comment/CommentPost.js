import React, { Component } from "react";
import { Comment, Icon, Tooltip } from "antd";
import 'antd/dist/antd.css';
import EditForm from '../EditForm';
import axios from 'axios';
import './Comment.css';
const home_url = "http://Ec2-3-135-223-12.us-east-2.compute.amazonaws.com:3000/";
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
			commentid: this.props.commentid, //add new attribute
			postid:this.props.postid
		}
		this.onClickLike = this.onClickLike.bind(this);
		this.onClickDelete = this.onClickDelete.bind(this);
		this.onClickEdit = this.onClickEdit.bind(this);
		this.onSubmitEdit = this.onSubmitEdit.bind(this);
	}

	onSubmitEdit(updatedContent) {
		//TODO: update content in backend database
		console.log("on submit edit: ", this.state);
		const send = {
			commentid: this.state.commentid,
			content: updatedContent
		}
		// // call axios update
		console.log("send is ", send);
		axios.post(home_url + "api/update_comment", send)
		.then(res =>{
			console.log("updated data", res.data)
		})
		this.setState({onEdit: false, postContent: updatedContent});
	}

	onClickEdit() {
		this.setState({onEdit: true});
	}

	onClickDelete() {

		this.props.onDeleteComment(this.state.commentid);//todo here
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
		];
		const diffViewerActions = [
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
		];
    return (
			<div>
				<Comment
						className='commentStyle'
						author={this.state.username}
						actions={this.props.username===this.props.viewerUsername? actions : diffViewerActions}
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
