import React, { Component } from "react";
import SearchForm from "./SearchForm";
import './HomePage.css';
import axios from 'axios';
const home_url = "http://ec2-3-15-161-191.us-east-2.compute.amazonaws.com:3000/"
class SearchPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        searchValue: "",
        result: ""
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
      if(res.data.length === 0){
        this.setState({result: "Not Found!!!!!!!!"});
      }
      else{
        var r = "username: " + res.data[0].username + " content: " + res.data[0].content;
        this.setState({result: r});
      }
    
    })
    // get result; 
    // var = {
    //   result
    // }
    // 
  }

  render() {
    return (
				<div className='outer'>
					<SearchForm onSearch={this.handleSearch}/>
					{this.state.result}
				</div>
    );
  }
}
export default SearchPage;
