import React from 'react';
import './AddUser.scss';
import '../../index.scss';
import {withRouter} from 'react-router-dom';

class EditUser extends React.Component{
	constructor(props){
		super(props);
		this.id = props.match.params.id
		this.state = {
			users: {
				name: '',
				username: '',
				email: '',
				phone: '',
			}
		}
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onSubmitHandler = this.onSubmitHandler.bind(this);
	}

	onChangeHandler(e){
		this.setState({
			...this.state,
			users: { ...this.state.users, [e.target.name]: e.target.value },
		});
	}

	async onSubmitHandler(e){
		e.preventDefault();
		const {history} = this.props;
		try{
			const res = await fetch(`http://localhost:3003/users/${this.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(this.state.users),	
			});
			if(!res.ok) throw new Error(`could not fetch`);
			const data = await res.json();
			history.push('/');
		}catch(err){
			console.error(err.message);
		}
	}

	componentDidMount(){
		this.loadUser();
	}

	async loadUser(){
		try{
			const res = await fetch(`http://localhost:3003/users/${this.id}`);
			if(!res.ok) throw new Error('could not load user');
			const data = await res.json();
			this.setState({ users: data })
		}catch(err){
			console.error(err.message);
		}
	}

	render(){
		const {name, username, email, phone} = this.state.users;

		return <div className='add_user'>
			<div className='form_container'>
				<h2 className='heading-2'>Edit User</h2>
				<form onSubmit={this.onSubmitHandler} className='form'>
					<div className='form form__group'>
						<input type='text' name='name' value={name} onChange={this.onChangeHandler} className='form__input' placeholder='Name' />
					</div>
					<div className='form form__group'>
						<input type='text' name='username' value={username} onChange={this.onChangeHandler} className='form__input' placeholder='Username' />
					</div>
					<div className='form form__group'>
						<input type='text' name='email' value={email} onChange={this.onChangeHandler} className='form__input' placeholder='Email' />
					</div>
					<div className='form form__group'>
						<input type='text' name='phone' value={phone} onChange={this.onChangeHandler} className='form__input' placeholder='Phone' />
					</div>
					<div className='form form__group'>
						<button type='submit' className='btn'>Add User</button>
					</div>
				</form>
			</div>
		</div>
	}
}

export default withRouter(EditUser);
