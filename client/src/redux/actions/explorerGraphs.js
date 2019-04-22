import axios from 'axios';
import _ from 'lodash';
export const FETCH_EXPLORER_GRAPHS_BEGIN = 'FETCH_EXPLORER_GRAPHS_BEGIN';
export const FETCH_EXPLORER_GRAPHS_SUCCESS = 'FETCH_EXPLORER_GRAPHS_SUCCESS';
export const FETCH_EXPLORER_GRAPHS_FAILURE = 'FETCH_EXPLORER_GRAPHS_FAILURE';

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://salmon-health.herokuapp.com/';
}

export const fetchExplorerGraphsBegin = () => ({
  type: FETCH_EXPLORER_GRAPHS_BEGIN
});

export const fetchExplorerGraphsSuccess = data => ({
  type: FETCH_EXPLORER_GRAPHS_SUCCESS,
  payload: { data }
});

export const fetchExplorerGraphsFailure = error => ({
  type: FETCH_EXPLORER_GRAPHS_FAILURE,
  payload: { error }
});

export const fetchGraphs = filters => {
  const structuredFilters = _.mapValues(filters, filter => {
    if (_.isArray(filter)) {
      return _.join(filter, '~');
    } else {
      return filter;
    }
  });
  return dispatch => {
    dispatch(fetchExplorerGraphsBegin());

    axios
      .get('/cases', { params: { explorer: true, ...structuredFilters } })
      .then(response => {
        dispatch(fetchExplorerGraphsSuccess(response.data));
      })
      .catch(function(error) {
        dispatch(fetchExplorerGraphsFailure(error));
      });
  };
};
