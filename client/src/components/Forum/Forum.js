import React, { Component } from "react";
import PostForm from '../Post/PostForm';
import Post from '../Post/Post';
import './Forum.css';
import axios from 'axios';

const home_url = "http://Ec2-3-135-223-12.us-east-2.compute.amazonaws.com:3000/";

class Forum extends Component {
  constructor(props) {
      super(props);
      this.state = {
        posts: [],
        value: '',
        username: this.props.username,
      };
      this.onSubmitPost = this.onSubmitPost.bind(this);
      this.onDeletePost = this.onDeletePost.bind(this);
      this.getAllPosts = this.getAllPosts.bind(this);
 
  }

  componentDidMount() {
    const data_send = {
      game: this.props.game,
    };
    console.log("inside forum component did mount method");
    //TODO: get data from back end and set state

    //get all post
    axios.post(home_url + "api/get", data_send)
    .then(res =>{
      console.log("mount data", res.data)
      this.setState({posts: res.data});
    })
    //fetch().then(data => this.setState({posts: data}));
  }

  getAllPosts(){
    console.log("inside get all posts");
    //TODO: get data from back end and set state

    //get all post
    axios.post(home_url + "api/get")
    .then(res =>{
      console.log("get all posts mount data", res.data)
      this.setState({posts: res.data});
    })
  }

  onDeletePost(PID) {
    //TODO: delete post in back end
    var ps = this.state.posts;
    var c = 0;
    for (c = 0; c < ps.length; c++) {
      var p = ps[c];
      if (p.postid === PID) {
            ps.splice(c, 1);
            break;
          }
    }
    //call axios delete
    var send = {
      postid : PID
    }
    console.log("data send", send)
    axios.post(home_url + "api/delete_post",  send)
    .then(res=>{
      console.log("finish delete")
    })
    this.setState({posts: ps});
  }

  //TODO: send posts to backend database
  onSubmitPost(newPost)  {
      console.log('onSubmitPost', newPost);

      console.log(this.state.posts);
      //set format for the sending data
      const data_send = {
        username: this.state.username,
        time: newPost.time,
        content: newPost.content,
        comments: newPost.comments,
        game: this.props.game,
      };
      console.log('data send', data_send);
      // console.log('finish debug');

      axios.post(home_url + "api/post",  data_send)
        .then(res =>{
          // console.log("test");
          // console.log(res);
          // console.log('response data', res.data.id);
          // const temp = res.data.id;
          // var newp = {
          //   username: newPost.username,
          //   Posttime: newPost.time,
          //   postContent: newPost.content,
          //   comments: newPost.comments,
          //   postid: temp
          // }
          // newPosts.unshift(newp);
          // this.setState({posts: newPosts});
          this.getAllPosts();
        })

  }

  render() {
    return (
        <div className='outer'>
        <PostForm onSubmitPost={this.onSubmitPost}/>
        {this.state.posts.map((p) => <Post key={p.postid+"clength: "+p.comments.length} viewerUsername={this.state.username} postid={p.postid} username={p.username} postContent={p.content} postTime={p.time} comments={p.comments} onDeletePost={this.onDeletePost} getAllPosts={this.getAllPosts}/>)}
        </div>
    );
  }
}
export default Forum;
