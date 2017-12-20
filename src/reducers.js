import { createStore, combineReducers } from 'redux'

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

export const testVar = () => {
	return 'harharharh';
}

let tempStore = combineReducers({counter: counter, testVar: testVar});
let store = createStore(tempStore);

export default store;