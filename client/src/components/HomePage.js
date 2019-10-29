import React, { Component } from "react";
import PostForm from './PostForm';
import Post from './Post';
import './HomePage.css';
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
    //fetch().then(data => this.setState({posts: data}));
  }

  onDeletePost(info) {
    //TODO: delete post in back end
    var ps = this.state.posts;
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
    this.setState({posts: ps});
  }

  //TODO: send posts to backend database
  onSubmitPost(newPost)  {
      console.log('onSubmitPost', newPost);
      var newPosts = this.state.posts;
      newPosts.unshift(newPost);
      this.setState({posts: newPosts});
      console.log(this.state.posts);
  }

  render() {
    return (
        <div className='outer'>
        <PostForm onSubmitPost={this.onSubmitPost}/>
        {this.state.posts.map((p) => <Post key={p.time+p.content+Math.random()} username={p.username} postContent={p.content} postTime={p.time} comments={p.comments} onDeletePost={this.onDeletePost}/>)}
        </div>
    );
  }
}
export default HomePage;
