import axios from 'axios';
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
  console.log(filters);
  return dispatch => {
    dispatch(fetchExplorerGraphsBegin());

    axios
      .get('/cases', { params: { explorer: true, ...filters } })
      .then(response => {
        console.log(response);
        dispatch(fetchExplorerGraphsSuccess(response.data));
      })
      .catch(function(error) {
        dispatch(fetchExplorerGraphsFailure(error));
      });
  };
};
