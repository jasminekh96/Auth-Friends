import React from 'react';
import AuthFriends from './AuthFriends';
import { axiosWithAuth } from '../utils/axiosWithAuth';

class Friends extends React.Component {
	state = {
		friends : [],
	};
	setFriends = (arr) => {
		this.setState({ friends: arr });
	};
	componentDidMount() {
		console.log('CDM');
		this.getData();
	}
	getData = () => {
		axiosWithAuth()
			.get('/friends')
			.then((res) => this.setState({ friends: res.data }))
			.catch((err) => console.log(err.response));
	};
	render() {
		console.log('friend', this.state.friends);
		return (
			<div>
				<AuthFriends setFriends={this.setFriends} />
				{this.state.friends.map((item) => (
					<div key={item.id}>
						<h2>Name: {item.name}</h2>
						<h4>Age: {item.age}</h4>
						<h4>Email: {item.email}</h4>
					</div>
				))}
			</div>
		);
	}
}
export default Friends;
