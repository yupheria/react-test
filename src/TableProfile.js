import React, { Component } from 'react';

class TableProfile extends Component {
  constructor(props) {
	  super(props);
	  this.state = {thisMsg: "NO",
						  thisData: [],
						  thisUrl: "",
						  email: "",
						  ird_number: "",
						  bank_acc_number: "",
						  start_date: "",
						};
  }
  
  componentDidMount() {
	  var thisURL = "http://192.168.1.24/payroll/myTestBjorn/RAPI/queryEntry.php";
	  var ployeeID = 1602;
	  var thisQuery = "SELECT * FROM employee_static where Employee_index = "+ployeeID;
	  var thisArg = "?myQuery=";
	  var thisPage = "&myPage=Profile";
	  
	  var fullURL = thisURL+thisArg+thisQuery+thisPage;
	  this.setState({thisUrl:fullURL});
	  
	  fetch(fullURL)
		.then((response) => response.json())
			.then((responseJson) => {
				this.setState({thisMsg: responseJson.msg});
				this.setState({thisData: responseJson.data});
				
				this.setState({email: responseJson.data.email});
				this.setState({ird_number: responseJson.data.IRD_number});
				this.setState({bank_acc_number: responseJson.data.emp_bank});
				this.setState({start_date: responseJson.data.start_date});
		 })
  }
  
  render() {
	 const tableStyle = {
								textAlign: 'left',
								marginLeft: 300,
								}
    return (
      <div>
		 <br/>
		 <table style={tableStyle}>
			<tr>
				<td>Email: </td><td>{this.state.email}</td>
			</tr>
			<tr>
				<td>IRD Number</td><td>{this.state.ird_number}</td>
			</tr>
			<tr>
				<td>Bank Account</td><td>{this.state.bank_acc_number}</td>
			</tr>
			<tr>
				<td>Start Date</td><td>{this.state.start_date}</td>
			</tr>
		 </table>
		<br /> <br />
		{this.state.thisUrl}
		<br/><br/>
      </div>
    );
  }
}

export default TableProfile;