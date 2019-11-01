import React, { Component } from "react";
import SearchForm from "./SearchForm";
import './HomePage.css';
import axios from 'axios';
import SearchResultPost from "./SearchResultPost";
const home_url = "http://ec2-3-15-161-191.us-east-2.compute.amazonaws.com:3000/"
class SearchPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        searchValue: "",
        result: [],
        shouldDisplay: false
    	}
      this.handleSearch = this.handleSearch.bind(this);
  }

  //TODO: send value to backend and get the search result back
  handleSearch(value) {
    this.setState({searchValue: value});
    //send keyward to be
    var send = {
      value : value
    }
    console.log("value send", send)
    axios.post(home_url + "api/search", send)
    .then(res =>{
      console.log("after search")
      console.log("receive : " ,res.data)
      this.setState({result: res.data, shouldDisplay: true});
    })
    // get result;
    // var = {
    //   result
    // }
    //
  }

  render() {
    var result = this.state.result.length === 0 ? "User Not Found" :
      this.state.result.map(p=> <SearchResultPost key={p.postid} username={p.username} postContent={p.content} postTime={p.time}/>)
    return (
				<div className='outer'>
					<SearchForm onSearch={this.handleSearch}/>
					{this.state.shouldDisplay ? result : null}
				</div>
    );
  }
}
export default SearchPage;
