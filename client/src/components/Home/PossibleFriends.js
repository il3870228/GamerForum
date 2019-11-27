import React, { Component } from "react";
import { Form, Button, Checkbox, Row, List } from 'antd';
import 'antd/dist/antd.css';
import './PossibleFriends.css';
const testFriends1 = ['John', 'Ailce', 'Kevin', 'Lucy', 'Ted', 'Amy'];
const testFriends2 = ['Xavier', 'Belle', 'Sana', 'Lazzaro', 'Joan'];
const defaultCheckValues = [];
class PossibleFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            possibleFriends: testFriends1,
            selectedFriends: defaultCheckValues,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(checkedValues) {
        console.log('handleChange, checkedValues: ', checkedValues);
        this.setState({ selectedFriends: checkedValues });
    }

    handleSubmit() {
        //TODO: User add a list of new friends: Should send selectedFriends to backend
        console.log('handleSubmit in PossibleFriends');
        //TODO: nextFriends should be replace by a new list of recommended friends from the backend
        const nextFriends = this.state.possibleFriends === testFriends1 ? testFriends2 : testFriends1;
        this.setState({
            possibleFriends: nextFriends,
            selectedFriends: defaultCheckValues,
        });
    }

    render() {
        console.log('this.state.possibleFriends: ', this.state.possibleFriends);
        console.log('this.state.selectedFriends: ', this.state.selectedFriends);
        return (
            <div className='margins'>
                <Checkbox.Group
                    className='pf'
                    onChange={this.handleChange}
                    value={this.state.selectedFriends}
                >
                    <List
                        size="large"
                        header={<div>Add Friends!</div>}
                        bordered
                        dataSource={this.state.possibleFriends}
                        renderItem={
                            item =>
                                <List.Item>
                                    <Checkbox value={item}>
                                        {item}
                                    </Checkbox>
                                </List.Item>
                        }
                    />
                </Checkbox.Group>
                <Button type="primary" className='pf-button' onClick={this.handleSubmit}>
                    Add
                </Button>
            </div>
        );
    }
}
export default PossibleFriends;
