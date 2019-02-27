import { combineReducers } from 'redux';
import casesReducer from './cases';
import locationsReducer from './locations';

export default combineReducers({ cases: casesReducer, locations: locationsReducer });
