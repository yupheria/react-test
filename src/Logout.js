import React, { Component } from 'react';

import ReduxTest from './ReduxTest';
import store from './reducers';

class Logout extends Component {
  
  render() {
    return (
      <div>
			Welcome to Logout (ReduxTest) <br /> <br />
			<ReduxTest store={store} />
      </div>
    );
  }
}

export default Logout;
