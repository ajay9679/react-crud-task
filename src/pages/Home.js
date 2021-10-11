import React from 'react';
import './Home.scss';
import Index from '../components/Index.js';

class Home extends React.Component{
	render(){
		return <div className='container'>
			<Index />
		</div>
	}
}

export default Home;