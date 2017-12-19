import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import Dashboard from './Dashboard';
import LeaveInfo from './LeaveInfo';
import PayHistory from './PayHistory';
import Profile from './Profile';
import Logout from './Logout';
import PayDetails from './PayDetails'

import logo from './typLogo.png';

class App extends Component {
 
  render() {
	 const headerMenu = {
		 textAlign: 'center',
		 paddingTop: 10,
	 };
	 const menuItem = {
		paddingLeft: 5,
		paddingRight: 5,	
	 } 
    return (
      <Router>
		<div style={headerMenu}>
		  <Link to="/"><img src={logo} height='50' />
		  </Link>{' '}
		  <Link style={menuItem} to="/">Dashboard</Link>{' '}
		  <Link style={menuItem} to="/leave">Leave</Link>{' '}
		  <Link style={menuItem} to="/pays">PayHistory</Link>{' '}
		  <Link style={menuItem} to="/profile">Profile</Link>{' '}
		  <Link style={menuItem} to="/logout">Logout (ReduxTest)</Link>{' '}
		   <br /><br />
		  <Switch>
			<Route exact path="/" component={Dashboard} />
			<Route exact path="/leave" component={LeaveInfo} />
			<Route exact path="/pays" component={PayHistory} />
			<Route exact path="/profile" component={Profile} />
			<Route exact path="/logout" component={Logout} />
			
			<Route exact path="/paydetails/:payid" component={PayDetails} />
			
			<Route render={() => <h1>Page not found</h1>} />
		  </Switch>
		  
		</div>
	</Router>
	  
    );
  }
}

export default App;
