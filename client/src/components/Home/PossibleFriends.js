import React, { Component } from "react";
import { Form, Button, Checkbox, Row, List } from 'antd';
import 'antd/dist/antd.css';
import './PossibleFriends.css';
import axios from 'axios';
const home_url = "http://Ec2-3-135-223-12.us-east-2.compute.amazonaws.com:3000/";
const testFriends1 = ['John', 'Ailce', 'Kevin', 'Lucy', 'Ted', 'Amy'];
const testFriends2 = ['Xavier', 'Belle', 'Sana', 'Lazzaro', 'Joan'];
const defaultCheckValues = [];
class PossibleFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            possibleFriends: [],
            selectedFriends: defaultCheckValues,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // send to backend: 
        // {
        //     username: this.props.username
        // }
        const send = {
            username: this.props.username
        }
        // TODO: check if this.props.username is passed down
        // get from backend: 
        // {
        //     possibleFriends: a list of strings
        // }
        axios.post(home_url + "api/Friend", send)
        .then(res=>{
            console.log("response data", res.data)
            // this.setState({possibleFriends: res.data.friend});
        })
        // change line below: 
        this.setState({possibleFriends: testFriends1});
    }

    handleChange(checkedValues) {
        console.log('handleChange, checkedValues: ', checkedValues);
        this.setState({ selectedFriends: checkedValues });
    }

    handleSubmit() {
        //TODO: User add a list of new friends: Should send selectedFriends to backend
        console.log('handleSubmit in PossibleFriends');
        //TODO: nextFriends should be replace by a new list of recommended friends from the backend
        // Send to back-end: 
        // {
        //     selectedFriends: this.state.selectedFriends
        // }
        const send = {
            selectedFriends: this.state.selectedFriends
        }
        // Get from back-end: 
        // {
        //     possibleFriends: a list of strings
        // }
        // axios.post(home_url + "api/sellect_friend", send)
        // .then(res=>{
        //     console.log("response data", res.data)
        //     // const nextFriends = this.state.possibleFriends === testFriends1 ? testFriends2 : testFriends1;
        //     // this.setState({
        //     //     possibleFriends: nextFriends,
        //     //     selectedFriends: defaultCheckValues,
        //     // });
        // })
        // modify lines below to fit: 
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
                        header={<div className="lgrey">Add Friends!</div>}
                        bordered
                        dataSource={this.state.possibleFriends}
                        renderItem={
                            item =>
                                <List.Item className="lgrey">
                                    <Checkbox className="lgrey" value={item}>
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
