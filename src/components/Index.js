import React from 'react';
import './Index.scss';
import {Link} from 'react-router-dom';
import Eye from '../assets/eye.svg';
import Pencil from '../assets/pencil.svg';
import Delete from '../assets/bin.svg';

class Index extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			users: [],
			loading: false,
		}
	}

	async loadUser(){
		this.setState({loading: true})
		try{
			const response = await fetch(`http://localhost:3003/users`);
			if(!response.ok) throw new Error('could not fetch');
			const data = await response.json();
			this.setState({users: data.reverse()}, () => console.log(this.state.users));
		}catch(err){
			console.error(err.message);
		}finally{
			this.setState({loading: false});
		}
	}

	async componentDidMount(){
		this.loadUser()
	}

	async deleteUser(id){
		try{
			const response  = await fetch(`http://localhost:3003/users/${id}`, {method: 'DELETE'});
			if(!response.ok) throw new Error(`could not delete`);
			this.loadUser();
		}catch(err){
			console.error(err.message);
		}
	}

	render(){

		return <div className='user_table'>
			<h2 className='heading-2'>List of Users</h2>
			{this.state.loading === true && <h1>please wait...</h1>}
			<table className='table' border='1'>
				<thead className='table table__head'>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Username</th>
						<th scope="col">Email</th>
						<th scope="col">Phone</th>
						<th scope='col'>Action</th>
					</tr>
				</thead>
				<tbody className='table table__body'>
					{
						this.state.users.map((user, index) => <tr key={index}>
							<td>{index + 1}</td>
							<td>{user.name}</td>
							<td>{user.username}</td>
							<td>{user.email}</td>
							<td>{user.phone}</td>
							<td>
								<Link to='/' className=''><img src={Eye} className='img_svg img_svg--eye' /></Link>
								<Link to={`/user/edit/${user.id}`}><img src={Pencil} className='img_svg' /></Link>
								<Link to='' onClick={() => this.deleteUser(user.id)}><img src={Delete} className='img_svg' /></Link>
							</td>
						</tr>)
					}
				</tbody>
			</table>
		</div>
	}
};

export default Index;