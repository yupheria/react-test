import React, { Component } from 'react';

class PayDetails extends Component {
  constructor(props) {
	  super(props);
	   this.state = {thisMsg: "NO",
						  thisData: [],
						  thisUrl: "",
						  rawXML: "",
						  standardList: [],
						  customList: [],
						  gross: 0,
						  net: 0,
						  tax: 0,
						  paynumber : 0,
						};
  }
  componentDidMount() {
	  var thisURL = "http://192.168.1.24/payroll/myTestBjorn/RAPI/queryEntry.php";
	  var thisQuery = "SELECT xml_data FROM employee_pay_period_data where Employee_pay_period_data_index = "+this.props.match.params.payid;
	  var thisArg = "?myQuery=";
	  var thisPage = "&myPage=payDetails";
	  
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
															<td>{remoteData.xml_data}</td>
											</tr>
						)
					});
				this.setState({rawXML: responseJson.data});
				
				var parseString = require('xml2js').parseString;
				var xml = this.state.rawXML[0].xml_data;
				
				var myStandardTemp = [];
				var myCustomTemp = [];
				var myGrossTemp = 0;
				var myNetTemp = 0;
				var myTaxTemp = 0;
				var myPayNumberTemp = 0;
				
				parseString(xml, function (err, result) {
						//console.log(result.results.standard_index);
						try {
							result.results.standard_index.forEach(function (myStandard) {
								var temp = [myStandard.date[0], myStandard.entry[0], myStandard.dollar_val[0]];
								console.log(temp);
								myStandardTemp.push(temp);
							});
						} catch (error) {
							var temp = ['NA','NA','NA'];
							console.log(temp);
							myStandardTemp.push(temp);
						}
						
						try {
							result.results.custom_index.forEach(function (myCustom) {
								var temp = [myCustom.pay_type_name[0], myCustom.date_c[0], myCustom.entry_c[0], myCustom.dollar_val_c[0]];
								console.log(temp);
								myCustomTemp.push(temp);
							});
						} catch (error) {
							var temp = ['NA','NA','NA'];
							console.log(temp);
							myCustomTemp.push(temp);
						}
								
						myGrossTemp = result.results.gross		
						myNetTemp = result.results.NET
						myTaxTemp = result.results.TAX
						myPayNumberTemp = result.results.pay_number
				});
				this.setState({standardList:
									myStandardTemp.map((thisRow) => <tr> 
																				{thisRow.map((finalInner) =>
																									<td>
																											{finalInner}
																									</td>
																				)}
																			</tr>
						)
					});
				this.setState({customList:
									myCustomTemp.map((thisRow) => <tr> 
																				{thisRow.map((finalInner) =>
																									<td>
																											{finalInner}
																									</td>
																				)}
																			</tr>
						)
					});
				
				this.setState({gross: myGrossTemp});
				this.setState({net: myNetTemp});
				this.setState({tax: myTaxTemp});
				this.setState({paynumber: myPayNumberTemp});
				
				});
  }
  
  render() {
    return (
      <div>
			Welcome to PayDetails <br /> <br />
			Standard Entries
			<table style={{
					textAlign: 'left',
					marginLeft: 300,
				}}>
				<tr>
					<td>Date</td>
					<td>Entry</td>
					<td>Dollar Value</td>
				</tr>
				{this.state.standardList}
			</table>
			<br /><br />
			
			Custom Entries
			<table style={{
					textAlign: 'left',
					marginLeft: 300,
				}}>
				<tr>
					<td>Name</td>
					<td>Date</td>
					<td>Entry</td>
					<td>Dollar Value</td>
				</tr>
				{this.state.customList}
			</table>
			
			Other Details
			<table style={{
					textAlign: 'left',
					marginLeft: 300,
				}}>
				<tr>
					<td>Pay Number: </td><td>{this.state.paynumber}</td>
				</tr>
				<tr>
					<td>Gross: </td><td>{this.state.gross}</td>
				</tr>
				<tr>
					<td>Net: </td><td>{this.state.net}</td>
				</tr>
				<tr>
					<td>Tax: </td><td>{this.state.tax}</td>
				</tr>
			</table>
			
			<br /><br />
			{this.props.match.params.payid} <br /><br />
			{this.state.thisUrl} <br /><br />
			<table>
				{this.state.thisData}
			</table>
      </div>
    );
  }
}

export default PayDetails;
