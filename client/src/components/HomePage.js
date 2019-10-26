import React, { Component } from "react";
import PostForm from './PostForm';
import Post from './Post';
import './HomePage.css';
class HomePage extends Component {
  constructor(props) {
      super(props);
      this.state = {posts: [], value: ''};
      this.onSubmitPost = this.onSubmitPost.bind(this);
  }

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
        {this.state.posts.map((p) => <Post key={p.time+p.content} username="Alex" postContent={p.content} postTime={p.time}/>)}
        </div>
    );
  }
}
export default HomePage;
