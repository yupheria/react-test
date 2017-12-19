import React, { Component } from 'react';

import TableDash from './TableDash'

class Dashboard extends Component {
  render() {
    return (
      <div>
			Welcome to Dashboard
			<br /> <br />
			<TableDash />
      </div>
	  
    );
  }
}

export default Dashboard;
