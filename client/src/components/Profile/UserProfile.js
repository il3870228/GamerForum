import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Descriptions, Rate, Table } from 'antd';
import './UserProfile.css';
import axios from 'axios';
const home_url = "http://Ec2-3-135-223-12.us-east-2.compute.amazonaws.com:3000/";
const tableColumns = [
	{
		title: 'Friend',
		dataIndex: 'Friend',
		key: 'Friend',
	},
	{
		title: 'Rating',
		dataIndex: 'Rating',
		key: 'Rating',
	},
];
class UserProfile extends Component {
	constructor(props) {
		super(props);
		//each friendsRating corresponds to the rating of the friend of the same idx
		this.state = {
			username: this.props.username,
			email: "",
			friends: [],
			friendsRating: [],
			password: "",
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		console.log('inside componentDidmount');
		//TODO get user info from backend
		// Send to back-end: 
		// {
		// 	username: this.props.username
		// }
		const send = {
			username: this.props.username
		}
		axios.post(home_url + "api/profile", send)
		.then(res=>{
			console.log("profile response : ", res.data)
			this.setState({
				email: res.data.email,
				friends: res.data.friends,//["Roman1000", "Lucy", "Kevin", "Lazzaro", "Sana2000"],
				friendsRating: res.data.friendsRating,//[3, 3, 4, 5, 0],
				password: res.data.password//"test_password123"
			});
		})
		// Get from back-end: 
		// {
		// 	email: string,
		// 	password: string,
		// 	friends: a list of strings,
		// 	friendsRating: a list of int,
		// }
		// TODO: modify below
		
	}

	handleChange(value, index) {
		//TODO: update back-end ratings. 
		console.log('userprofile handlechange: value, index: ', value, index);
		var newFriendsRating = this.state.friendsRating;
		newFriendsRating[index] = value;
		this.setState({
			friendsRating: newFriendsRating
		});
		// Send to back-end: 
		// {
		// 	username: this.props.username,
		// 	friendsRating: newFriendsRating
		// }
		const send = {
			username: this.props.username,
			friend_username: this.state.friends[index],
			friendsRating: newFriendsRating[index]
		}
		console.log('rate data send: ',send)
		axios.post(home_url + "api/profile/rating", send)
		.then(res=>{
			console.log("rate response : ", res.data)
		})

	}

	render() {
		var psDisplay = "";
		for (var i = 0; i < this.state.password.length; i++) {
			psDisplay = psDisplay + "·";
		}
		const tableData = this.state.friends.map(
			(value, index) =>
				({
					key: value,
					Friend: value,
					Rating: <Rate onChange={(val) => this.handleChange(val, index)} value={this.state.friendsRating[index]} />,
				})
		);
		return (
			<div className='personalInfo'>
				<Descriptions column={1} title='Profile' className='alignStyle'>
					<Descriptions.Item label='Username'>{this.state.username}</Descriptions.Item>
					<Descriptions.Item label='Email'>{this.state.email}</Descriptions.Item>
					<Descriptions.Item label='Password' type='password'>{psDisplay}</Descriptions.Item>
				</Descriptions>
				<div className='alignStyle'>
					<Table
						columns={tableColumns}
						dataSource={tableData}
						pagination={false}
						size="small"
						bordered
					/>
				</div>
			</div>
		);
	}
}
export default UserProfile;
