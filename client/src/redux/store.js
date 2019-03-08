import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
// import loggerMiddleware from './middleware/logger';

const composeEnhancers = composeWithDevTools({});
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunkMiddleware)
    // other store enhancers if any
  )
);

export default store;
