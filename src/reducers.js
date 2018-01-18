import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const counter = (state = 0, action) => {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  case 'RESET':
    return 0;
  case 'SET':
    return action.value;
  default:
    return state;
  }
}

export const testVar = (state = 'No Reply', action) => {
	 switch (action.type) {
		 case 'MYINIT' :
			return action.value; 
		 default :
			return state;
	 }
}

export const apiData = (state = 'asdasdasd', action) => {
	switch (action.type) {
		case 'SUCCESS' :
			return action.value;
		case 'FAIL' :
			return action.value;
		default :
			return state;
	}
}

let tempStore = combineReducers({counter: counter, testVar: testVar, apiData: apiData});
let store = createStore(tempStore, applyMiddleware(thunk));

export default store;