import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';

const Buttons = styled.button`
	background-color: #808000;
	color: white;
	border-radius: 10px;
	font-size: 1.0rem;
`;
const UserNameForm = styled.input`
	padding: 10px;
	margin-right: 20px;
	border-radius: 10px;
`;
function Login(props) {
	const [ data, setData ] = useState({
		username : '',
		password : '',
	});

	const handleChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axiosWithAuth()
			.post('/login', data)
			.then((res) => {
				localStorage.setItem('token', res.data.payload);
				props.history.push('/private');
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<UserNameForm
					type='text'
					name='username'
					value={data.username}
					onChange={handleChange}
					placeholder='Username'
				/>
				<UserNameForm
					type='password'
					name='password'
					value={data.password}
					onChange={handleChange}
					placeholder='Password'
				/>
				<Buttons>Submit</Buttons>
			</form>
		</div>
	);
}

export default Login;

// class Login extends React.Component {
// 	state = {
// 		credentials : {
// 			username : '',
// 			password : '',
// 		},
// 	};

// 	handleChange = (e) => {
// 		this.setState({
// 			credentials : {
// 				...this.state.credentials,
// 				[e.target.name]: e.target.value,
// 			},
// 		});
// 	};
// 	login = (e) => {
// 		e.preventDefault();
// 		axiosWithAuth()
// 			.post('/login', this.state.credentials)
// 			.then((res) => {
// 				localStorage.setItem('token', res.data.payload);
// 				this.props.history.push('/private');
// 			})
// 			.catch((err) => console.log(err));
// 	};
// 	render() {
// 		return (
// 			<div>
// 				<form onSubmit={this.login}>
// 					<UserNameForm
// 						type='text'
// 						name='username'
// 						value={this.state.credentials.username}
// 						onChange={this.handleChange}
// 						placeholder='Username'
// 					/>
// 					<UserNameForm
// 						type='password'
// 						name='password'
// 						value={this.state.credentials.password}
// 						onChange={this.handleChange}
// 						placeholder='Password'
// 					/>
// 					<Buttons>Submit</Buttons>
// 				</form>
// 			</div>
// 		);
// 	}
// }
