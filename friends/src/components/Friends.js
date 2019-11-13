import React, { useState, useEffect } from 'react';
import AuthFriends from './AuthFriends';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';

const Name = styled.h2`
	color: #008b8b;
	font-size: 2.0rem;
`;
const Age = styled.h4`
	color: white;
	font-size: 1.5rem;
`;
const Email = styled.h4`color: #d3d3d3;`;

const Friends = () => {
	const [ friends, setFriends ] = useState([]);

	useEffect(() => {
		axiosWithAuth()
			.get('/friends')
			.then((res) => {
				setFriends(...friends, res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div>
			<AuthFriends setFriends={setFriends} />
			{friends.map((item) => (
				<div key={item.id}>
					<Name>Name: {item.name}</Name>
					<Age>Age: {item.age}</Age>
					<Email>Email: {item.email}</Email>
				</div>
			))}
		</div>
	);
};

export default Friends;
//using class components:
// class Friends extends React.Component {
// 	state = {
// 		friends : [],
// 	};
// 	setFriends = (arr) => {
// 		this.setState({ friends: arr });
// 	};
// 	componentDidMount() {
// 		console.log('CDM');
// 		this.getData();
// 	}
// 	getData = () => {
// 		axiosWithAuth()
// 			.get('/friends')
// 			.then((res) => this.setState({ friends: res.data }))
// 			.catch((err) => console.log(err.response));
// 	};
// 	render() {
// 		console.log('friend', this.state.friends);
// 		return (
// 			<div>
// 				<AuthFriends setFriends={this.setFriends} />
// 				{this.state.friends.map((item) => (
// 					<div key={item.id}>
// 						<Name>Name: {item.name}</Name>
// 						<Age>Age: {item.age}</Age>
// 						<Email>Email: {item.email}</Email>
// 					</div>
// 				))}
// 			</div>
// 		);
// 	}
// }
