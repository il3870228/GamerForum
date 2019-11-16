import React, { Component } from "react";
import { Comment, Icon, Tooltip } from "antd";
import 'antd/dist/antd.css';
import CommentForm from "../Comment/CommentForm";
import EditForm from "../EditForm";
import CommentPost from "../Comment/CommentPost";
import './Post.css';

import axios from 'axios';
const home_url = "http://ec2-3-15-161-191.us-east-2.compute.amazonaws.com:3000/"
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
			onEdit: false,
			postid:this.props.postid//post id
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
		// this.setState({onEdit: false, postContent: updatedContent});
		const send = {
			postid: this.state.postid,
			content: updatedContent
		}
		//call axios update
		console.log("send is ", send);
		axios.post(home_url + "api/update_post", send)
		.then(res =>{
			console.log("updated post ", res.data)
		})
		this.setState({onEdit: false, postContent: updatedContent});

	}

	onClickEdit() {
		this.setState({onEdit: true});
	}

  onDeleteComment(CID) {
		//TODO: delete comment in backend
		var ps = this.state.comments;
    var c = 0;
    for (c = 0; c < ps.length; c++) {
      var p = ps[c];
      if (p.commentid === CID) {
            ps.splice(c, 1);
          }
	}
	var send ={
		commentid: CID
	}
	//CALL DELETE ON AXIOS
	axios.post(home_url + "api/delete_comment", send)
		.then(res=>{
			console.log("delete comment success")
		})
    this.setState({comments: ps});
	}

	onClickDelete() {
		this.props.onDeletePost(this.state.postid);
	}

	//TODO: send comment to backend database
	onComment(c) {
		console.log('onComment c: ', c);
		//call post on axios
		//get comment id
		var newC = {
			username: c.username,
			time: c.time,
			content: c.content,
			// comments: c.comments,
			postid: this.state.postid
		  }
		console.log("comment send ",newC)
		axios.post(home_url + "api/post_comment", newC)
		.then(res => {
			console.log("post comment success")

			this.props.getAllPosts()
		})
		// newComments.unshift(newC);
		// this.setState({comments: newComments});
		// console.log(this.state.comments);
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
				{this.state.onEdit? null : <CommentForm onComment={this.onComment}/>}
				<div className='inner'>
				{this.state.comments.map((p) => <CommentPost key={p.commentid} commentid={p.commentid} postid={p.postid} username={p.username} postContent={p.content} postTime={p.time} onDeleteComment={this.onDeleteComment}/>)}
				</div>
			</div>
			);
  }
}
export default Post;