import React from 'react';
import Header from './components/Header/Header.js';
import {Switch, Route} from 'react-router-dom';
import Home from './pages/Home.js';
import userAdd from './pages/users/userAdd.js';
import userEdit from './pages/users/userEdit.js';

class App extends React.Component{

    render(){
        return <React.Fragment>
            <Header />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/user/add' component={userAdd} />
                <Route exact path='/user/edit/:id' component={userEdit} />
            </Switch>
        </React.Fragment>
    }
}

export default App;
