import { combineReducers } from 'redux';
import casesReducer from './cases';
import locationsReducer from './locations';
import dashboardGraphsReducer from './dashboardGraphs';

export default combineReducers({
  cases: casesReducer,
  locations: locationsReducer,
  dashboardGraphs: dashboardGraphsReducer
});
