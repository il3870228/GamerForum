import React, { Component } from "react";
import 'antd/dist/antd.css';
import { List, Descriptions } from 'antd';
import './UserProfile.css';
class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: this.props.username,
			email: "",
			friends: [],
			password: "",
		};
	}

	componentDidMount() {
		console.log('inside componentDidmount');
		//TODO get user info from backend
		this.setState({
			email: "test_email@gmail.com",
			friends: ["Roman1000", "Lucy", "Kevin", "Lazzaro", "Sana2000"],
			password: "test_password123"
		});
	}

	render() {
		var psDisplay = "";
		for (var i = 0; i < this.state.password.length; i++) {
			psDisplay = psDisplay +  "·";
		}
		return (
			<div className='personalInfo'>
				<Descriptions column={1} title='Profile' className='alignStyle'>
					<Descriptions.Item label='Username'>{this.state.username}</Descriptions.Item>
					<Descriptions.Item label='Email'>{this.state.email}</Descriptions.Item>
					<Descriptions.Item label='Password' type='password'>{psDisplay}</Descriptions.Item>
				</Descriptions>
				<div className='alignStyle'>
					<List
						size='sm'
						header={<div className='FriendsHeader'>Friends</div>}
						bordered
						dataSource={this.state.friends}
						renderItem={item => <List.Item>{item}</List.Item>}
					/>
				</div>
			</div>
		);
	}
}
export default UserProfile;
