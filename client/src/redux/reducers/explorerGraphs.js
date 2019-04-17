import {
  FETCH_EXPLORER_GRAPHS_BEGIN,
  FETCH_EXPLORER_GRAPHS_SUCCESS,
  FETCH_EXPLORER_GRAPHS_FAILURE
} from '../actions/explorerGraphs';

const initialState = {
  data: {},
  loading: false,
  error: null
};

export default function explorerGraphs(state = initialState, action) {
  switch (action.type) {
    case FETCH_EXPLORER_GRAPHS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_EXPLORER_GRAPHS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data
      };

    case FETCH_EXPLORER_GRAPHS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
