import React, { Component } from "react";
import { connect } from 'react-redux';
import { increment, decrement, reset, set, myinit, apiCall} from './actions'

const mapStateToProps = state => ({
  counter: state.counter, 
  myTest: state.testVar,
  apiData: state.apiData,
})

const mapDispatchToProps = (dispatch) => ({
  increment: () =>  dispatch(increment()) ,
  decrement: () =>  dispatch(decrement()) ,
  reset: () =>  dispatch(reset()) ,
  set: (value) =>  dispatch(set(value)) ,
  
  myinit: (value) =>  dispatch(myinit(value)) ,
  
  apiCall: () => dispatch(apiCall()) ,
})

const ReduxTest = (store) =>(
			 <div>
				<br /><br />
				<a href="#"
						//onClick={()=>{Alert.alert('UP')}}
						onClick={store.increment}
				>
				UP
				</a>
				<br /><br />
				<a href="#"
					//onClick={()=>{Alert.alert('DOWN')}}
					onClick={store.decrement}
				>
					DOWN
				</a>
				<br /><br />
				<a href="#"
					//onClick={()=>{Alert.alert('DOWN')}}
					onClick={() => store.set(1234)}
				>
					SET
				</a>
				<br /><br />
				{store.counter}
				 <br /> <br />
				
				<a href="#"
					//onClick={()=>{Alert.alert('DOWN')}}
					onClick={() => store.myinit('testing')}
				>
					CALL IT
				</a> <br/><br/>
				
				{store.myTest}
				<br /> <br />
				
				<a href="#"
					onClick={store.apiCall}
				>
					APICALL
				</a>
				<br/> <br/>
				{store.apiData}
				
			</div>
			
    );

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest)