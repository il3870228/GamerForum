import React, { Component } from "react";
import SearchForm from "./SearchForm";
import './HomePage.css';
class SearchPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        searchValue: ""
    	}
      this.handleSearch = this.handleSearch.bind(this);
  }

  //TODO: send value to backend and get the search result back
  handleSearch(value) {
		this.setState({searchValue: value});
  }

  render() {
    return (
				<div className='outer'>
					<SearchForm onSearch={this.handleSearch}/>
					{this.state.searchValue}
				</div>
    );
  }
}
export default SearchPage;
