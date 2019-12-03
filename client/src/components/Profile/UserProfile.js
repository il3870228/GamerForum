import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Descriptions, Rate, Table } from 'antd';
import './UserProfile.css';
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
		// Get from back-end: 
		// {
		// 	email: string,
		// 	password: string,
		// 	friends: a list of strings,
		// 	friendsRating: a list of int,
		// }
		// TODO: modify below
		this.setState({
			email: "test_email@gmail.com",
			friends: ["Roman1000", "Lucy", "Kevin", "Lazzaro", "Sana2000"],
			friendsRating: [3, 3, 4, 5, 0],
			password: "test_password123"
		});
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
						size="small"
						bordered
					/>
				</div>
			</div>
		);
	}
}
export default UserProfile;
