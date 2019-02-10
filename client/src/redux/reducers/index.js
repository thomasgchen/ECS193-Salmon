import { combineReducers } from 'redux';
import casesReducer from './cases';

export default combineReducers({ cases: casesReducer });
