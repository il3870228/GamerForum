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
