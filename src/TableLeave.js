import React, { Component } from 'react';

class TableLeave extends Component {
  constructor(props) {
	  super(props);
	  this.state = {thisMsg: "NO",
						  thisData: [],
						  thisUrl: "",
						  leave_liability: 0,
						  allocated_days: 0,
						  allocated_rate: 0,
						  percent_since: 0,
						  alt_days: 0,
						  alt_rate: 0,
						  sick_days: 0,
						};
  }
  
  componentDidMount() {
	  var thisURL = "http://192.168.1.24/payroll/myTestBjorn/RAPI/queryEntry.php";
	  var ployeeID = 1602;
	  var thisQuery = "SELECT * FROM employee_leave_liability";
			thisQuery +=		" where employee = "+ployeeID+" order by liability_index desc limit 1";
	  var thisArg = "?myQuery=";
	  var thisPage = "&myPage=Leave";
	  
	  var fullURL = thisURL+thisArg+thisQuery+thisPage;
	  this.setState({thisUrl:fullURL});
	  
	  fetch(fullURL)
		.then((response) => response.json())
			.then((responseJson) => {
				this.setState({thisMsg: responseJson.msg});
				this.setState({thisData: responseJson.data});
				
				var parseString = require('xml2js').parseString;
				var xml = responseJson.data;
				
				var templeave_liability = 0;
				var tempallocated_days = 0;
				var tempallocated_rate = 0;
				var temppercent_since = 0; 
				var tempalt_days = 0;
				var tempalt_rate = 0;
				var tempsick_days = 0;
				parseString(xml, function (err, result) {
						//console.log(result.data.ldata[0].av_12[0]);
						templeave_liability = result.data.ldata[0].leave_liability[0];
						tempallocated_days = result.data.ldata[0].allocated_days_bal[0];
						tempallocated_rate = result.data.ldata[0].allocated_rate_days[0];
						temppercent_since = result.data.ldata[0].percent_since_leave_ann[0];
						tempalt_days = result.data.ldata[0].alt_bal[0];
						tempalt_rate = result.data.ldata[0].alt_rate[0];
						tempsick_days = result.data.ldata[0].sick_bal[0];
				});
				this.setState({leave_liability:templeave_liability});
				this.setState({allocated_days:tempallocated_days});
				this.setState({allocated_rate:tempallocated_rate});
				this.setState({percent_since:temppercent_since});
				this.setState({alt_days:tempalt_days});
				this.setState({alt_rate:tempalt_rate});
				this.setState({sick_days:tempsick_days});
				
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
					<td>Leave Liability</td> <td>{this.state.leave_liability}</td>
				</tr>
				<tr>
					<td>Allocated Days Balance</td> <td>{this.state.allocated_days}</td>
				</tr>
				<tr>
					<td>Allocated Days Rate</td> <td>{this.state.allocated_rate}</td>
				</tr>
				<tr>
					<td>Percent Since Leave Ann</td> <td>{this.state.percent_since}</td>
				</tr>
				<tr>
					<td>Alt Days Balance</td> <td>{this.state.alt_days}</td>
				</tr>
				<tr>
					<td>Alt Days Rate</td> <td>{this.state.alt_rate}</td>
				</tr>
				<tr>
					<td>Sick Days Balance</td> <td>{this.state.sick_days}</td>
				</tr>
		 </table>
		<br /> <br />
		{this.state.thisUrl}
		<br/><br/>
		{this.state.thisData}
      </div>
    );
  }
}

export default TableLeave;