import React, { Component } from "react";
import { Input } from 'antd';
import 'antd/dist/antd.css';
const { Search } = Input;
class SearchForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Search
                    placeholder="Enter username"
                    enterButton="Search"
                    size="large"
                    onSearch={value => this.props.onSearch(value)}
                />
            </div>
        );
    }
}
export default SearchForm;
