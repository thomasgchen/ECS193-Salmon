import {
  FETCH_CASES_BEGIN,
  FETCH_CASES_SUCCESS,
  FETCH_CASES_FAILURE,
  UPDATE_CASES_BEGIN,
  UPDATE_CASES_SUCCESS,
  UPDATE_CASES_FAILURE
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
      const id = action.payload.updatedCase.id;
      const prunedItems = state.items.filter((value, index, arr) => {
        return value.id !== id;
      });

      return {
        ...state,
        loading: false,
        items: [...prunedItems, action.payload.updatedCase]
      };

    case UPDATE_CASES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
