import React, { Component } from 'react';

class TableDash extends Component {
  constructor(props) {
	  super(props);
	  this.state = {thisMsg: "NO",
						  thisData: [],
						  thisUrl: "",
						};
  }
  
  componentDidMount() {
	  var thisURL = "http://192.168.1.24/payroll/myTestBjorn/RAPI/queryEntry.php";
	  var ployeeID = 1602;
	  var thisQuery = "SELECT Employee_pay_period_data_index, Employer_index, Employee_index, Pay_number, Pay_start_date, Gross, Tax, Net FROM employee_pay_period_data where Employee_index = "+ployeeID+" order by Pay_number desc";
	  var thisArg = "?myQuery=";
	  var thisPage = "&myPage=Dashboard";
	  
	  var fullURL = thisURL+thisArg+thisQuery+thisPage;
	  this.setState({thisUrl:fullURL});
	  
	  fetch(fullURL)
		.then((response) => response.json())
			.then((responseJson) => {
				this.setState({thisMsg: responseJson.msg});
				this.setState({thisData: 
					responseJson.data.map(
										(remoteData, i) =>
											 <tr>
															<td
																onClick={()=> {
																window.location.href = "paydetails/"+remoteData.Employee_pay_period_data_index;
															}}
															><a href="#">{remoteData.Pay_number}</a></td>
															<td>{remoteData.Pay_start_date}</td>
															<td>{remoteData.Gross}</td>
															<td>{remoteData.Tax}</td>
															<td>{remoteData.Net}</td>
											</tr>
					)
				});
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
				<td>Pay #</td>
				<td>Start Date</td>
				<td>Gross</td>
				<td>Tax</td>
				<td>Net</td>
			</tr>
			{this.state.thisData}
		</table>
		<br /> <br />
		{this.state.thisUrl}
      </div>
    );
  }
}

export default TableDash;