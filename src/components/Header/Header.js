import React from 'react';
import './Header.scss';
import {Link} from 'react-router-dom';

class Header extends React.Component{
	render(){
		return <header className='header'>
			<Link to='/'><h2 className='heading2'>Users</h2></Link>
			<Link to='/user/add' className='button'>Add User</Link>
		</header>
	}
}

export default Header;