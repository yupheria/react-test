import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import ReduxTest from './ReduxTest';
//import actions from './actions';

const increment = () => ({type:'INCREMENT'});
const decrement = () => ({ type: 'DECREMENT' });
const set = (value) => ({ type: 'SET', value });
const reset = () => ({ type: 'RESET' });

export {increment, decrement, reset, set};
export default {increment, decrement, reset, set};