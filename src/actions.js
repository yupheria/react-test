import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import ReduxTest from './ReduxTest';
//import actions from './actions';

const increment = () => ({type:'INCREMENT'});
const decrement = () => ({ type: 'DECREMENT' });
const set = (value) => ({ type: 'SET', value });
const reset = () => ({ type: 'RESET' });

const myinit = (value) => ({type: 'MYINIT', value });
//const apiInit = () => ({ type: 'INIT' });

const apiSuccess = (value) => ({ type: 'SUCCESS', value });
const apiFail = (value) => ({ type: 'FAIL', value });

function apiCall() {
	 var fullURL = 'http://192.168.1.24/payroll/myTestBjorn/RAPI/queryEntry.php?myQuery=SELECT * FROM employee_static where Employee_index = 1602&myPage=Profile';  
	  return dispatch => {
		  fetch(fullURL)
			.then((response) => response.json())
				.then((responseJson) => {
					dispatch(apiSuccess(responseJson.msg))
			 }).catch((err)=> dispatch(apiFail(err)))
	  }
}

export {increment, decrement, reset, set, myinit, apiCall};
export default {increment, decrement, reset, set, myinit, apiCall};