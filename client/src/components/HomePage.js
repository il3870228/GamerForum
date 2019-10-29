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

  componentDidMount() {
    console.log("inside homepage component did mount method");
    //TODO: get data from back end and set state
    //fetch().then(data => this.setState({posts: data}));
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
        {this.state.posts.map((p) => <Post key={p.time+p.content} username={p.username} postContent={p.content} postTime={p.time} comments={p.comments}/>)}
        </div>
    );
  }
}
export default HomePage;
