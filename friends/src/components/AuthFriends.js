import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const AuthFriends = ({ setFriends }) => {
	const [ newFriend, setNewFriend ] = useState({
		name  : '',
		age   : '',
		email : '',
		id    : Date.now(),
	});
	const handleChanges = (e) => {
		setNewFriend({
			...newFriend,
			[e.target.name]: e.target.value,
		});
	};
	const friendPosted = (data) => {
		axiosWithAuth()
			.post('/friends', data)
			.then((res) => {
				setFriends(res.data);
				console.log('Added', res);
			})
			.catch((err) => {
				console.log('Failed', err);
			});
	};
	return (
		<div>
			<input type='text' name='name' value={newFriend.name} onChange={handleChanges} placeholder='Name' />
			<input type='text' name='age' value={newFriend.age} onChange={handleChanges} placeholder='Age' />
			<input type='text' name='email' value={newFriend.email} onChange={handleChanges} placeholder='Email' />
			<button onClick={() => friendPosted(newFriend)}>Add Friend</button>
		</div>
	);
};

export default AuthFriends;
