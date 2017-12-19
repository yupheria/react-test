import React, { Component } from "react";
import { connect } from 'react-redux';
import { increment, decrement, reset, set } from './actions'

const mapStateToProps = state => ({
  count: state
})

const mapDispatchToProps = (dispatch) => ({
  increment: () =>  dispatch(increment()) ,
  decrement: () =>  dispatch(decrement()) ,
  reset: () =>  dispatch(reset()) ,
  set: (value) =>  dispatch(set(value)) 
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
				{store.count}
			</div>
			
    );

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest)