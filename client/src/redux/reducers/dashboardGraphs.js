import {
  FETCH_GRAPHS_BEGIN,
  FETCH_GRAPHS_SUCCESS,
  FETCH_GRAPHS_FAILURE
} from '../actions/dashboardGraphs';

const initialState = {
  graphs: [],
  loading: false,
  error: null
};

export default function locations(state = initialState, action) {
  switch (action.type) {
    case FETCH_GRAPHS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_GRAPHS_SUCCESS:
      return {
        ...state,
        loading: false,
        graphs: action.payload.graphs
      };

    case FETCH_GRAPHS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
