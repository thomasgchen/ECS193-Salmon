// TODO: Split reducers up into seperate pages.
import { TEST_ACTION } from '../actions/actionTypes';

const initialState = {
  test: 'test'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TEST_ACTION: {
      return {
        ...state,
        test: action.text
      };
    }

    default: {
      return state;
    }
  }
};
