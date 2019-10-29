import React, { Component } from "react";
import SearchForm from "./SearchForm";
import './HomePage.css';
import axios from 'axios';
const home_url = "ec2-3-15-161-191.us-east-2.compute.amazonaws.com/"
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
    // get result; 
    // var = {
    //   result
    // }
    this.setState({result: "sdsadas}"})
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
