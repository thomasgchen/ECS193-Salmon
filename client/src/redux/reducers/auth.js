import { SET_PASS, UNSET_PASS, BEGIN_VALIDATION } from '../actions/auth';

const initialState = {
  pass: '',
  loading: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case BEGIN_VALIDATION:
      return {
        ...state,
        loading: true
      };
    case SET_PASS:
      return {
        ...state,
        pass: action.payload.pass,
        loading: false
      };

    case UNSET_PASS:
      return {
        ...state,
        pass: '',
        loading: false
      };

    default:
      return state;
  }
}
