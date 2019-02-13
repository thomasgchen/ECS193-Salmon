import {
  FETCH_CASES_BEGIN,
  FETCH_CASES_SUCCESS,
  FETCH_CASES_FAILURE,
  UPDATE_CASES_BEGIN,
  UPDATE_CASES_SUCCESS,
  UPDATE_CASES_FAILURE,
  DELETE_CASES_BEGIN,
  DELETE_CASES_SUCCESS,
  DELETE_CASES_FAILURE
} from '../actions/cases';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function cases(state = initialState, action) {
  switch (action.type) {
    case FETCH_CASES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_CASES_SUCCESS:
      const ids = action.payload.cases.map(c => c.id);
      const prunedFetchedItems = state.items.filter((value, index, arr) => {
        return !ids.includes(value.id);
      });

      return {
        ...state,
        loading: false,
        items: [...prunedFetchedItems, ...action.payload.cases]
      };

    case FETCH_CASES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case UPDATE_CASES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case UPDATE_CASES_SUCCESS:
      const updatedItems = state.items;
      const caseIndex = state.items.findIndex(x => x.id === action.payload.updatedCase.id);
      updatedItems[caseIndex] = action.payload.updatedCase;

      return {
        ...state,
        loading: false,
        items: updatedItems
      };

    case UPDATE_CASES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case DELETE_CASES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case DELETE_CASES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter((value, index, arr) => {
          return value.id !== action.payload.id;
        })
      };

    case DELETE_CASES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
