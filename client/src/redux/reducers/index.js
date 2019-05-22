import { combineReducers } from 'redux';
import casesReducer from './cases';
import locationsReducer from './locations';
import dashboardGraphsReducer from './dashboardGraphs';
import explorerGraphsReducer from './explorerGraphs';
import authReducer from './auth';

export default combineReducers({
  cases: casesReducer,
  locations: locationsReducer,
  dashboardGraphs: dashboardGraphsReducer,
  explorerGraphs: explorerGraphsReducer,
  auth: authReducer
});
