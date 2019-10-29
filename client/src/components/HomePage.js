import React, { Component } from "react";
import PostForm from './PostForm';
import Post from './Post';
import './HomePage.css';
import axios from 'axios';

const home_url = "http://ec2-3-15-161-191.us-east-2.compute.amazonaws.com:3000/"

class HomePage extends Component {
  constructor(props) {
      super(props);
      this.state = {posts: [], value: ''};
      this.onSubmitPost = this.onSubmitPost.bind(this);
      this.onDeletePost = this.onDeletePost.bind(this);

  }

  componentDidMount() {
    console.log("inside homepage component did mount method");
    //TODO: get data from back end and set state

    //get all post

    //fetch().then(data => this.setState({posts: data}));
  }

  onDeletePost(PID) {
    //TODO: delete post in back end
    var ps = this.state.posts;
    var c = 0;
    for (c = 0; c < ps.length; c++) {
      var p = ps[c];
      if (p.postId === PID) {
            ps.splice(c, 1);
            break;
          }
    }
    //call axios delete 
    // axios.post(home_url + "api/delete",  PID)
    // .then(res=>{
    //   console.log("finish delete")
    // })
    this.setState({posts: ps});
  }

  //TODO: send posts to backend database
  onSubmitPost(newPost)  {
      console.log('onSubmitPost', newPost);
      var newPosts = this.state.posts;
      
      console.log(this.state.posts);
      //set format for the sending data
      const data_send = {
        username: newPost.username,
        time: newPost.time,
        content: newPost.content,
        comments: newPost.comments
      };
      console.log('data send', data_send);
      // console.log('finish debug');

      axios.post(home_url + "api/post",  data_send)
        .then(res =>{
          console.log("test");
          console.log(res);
          console.log('response data', res.data.id);
          const temp = res.data.id;
          var newp = {
            username: newPost.username,
            Posttime: newPost.time,
            postContent: newPost.content,
            comments: newPost.comments,
            postId: temp 
          }
          newPosts.unshift(newp);
          this.setState({posts: newPosts});
        })
  }

  render() {
    return (
        <div className='outer'>
        <PostForm onSubmitPost={this.onSubmitPost}/>
        {this.state.posts.map((p) => <Post key={p.postId} username={p.username} postContent={p.content} postTime={p.time} comments={p.comments} onDeletePost={this.onDeletePost}/>)}
        </div>
    );
  }
}
export default HomePage;
