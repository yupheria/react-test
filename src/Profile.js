import React, { Component } from 'react';

import TableProfile from './TableProfile';

class Profile extends Component {
  
  render() {
    return (
      <div>
			Welcome to Profile
			<br /> <br />
			<TableProfile />
      </div>
	  
    );
  }
}

export default Profile;
