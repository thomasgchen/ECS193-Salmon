import axios from 'axios';
export const FETCH_GRAPHS_BEGIN = 'FETCH_GRAPHS_BEGIN';
export const FETCH_GRAPHS_SUCCESS = 'FETCH_GRAPHS_SUCCESS';
export const FETCH_GRAPHS_FAILURE = 'FETCH_GRAPHS_FAILURE';

// if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
//   axios.defaults.baseURL = 'https://salmon-health.herokuapp.com/';
// }

export const fetchGraphsBegin = () => ({
  type: FETCH_GRAPHS_BEGIN
});

export const fetchGraphsSuccess = graphs => ({
  type: FETCH_GRAPHS_SUCCESS,
  payload: { graphs }
});

export const fetchGraphsFailure = error => ({
  type: FETCH_GRAPHS_FAILURE,
  payload: { error }
});

export const fetchGraphs = () => {
  return dispatch => {
    dispatch(fetchGraphsBegin());

    axios
      .get('https://s3-us-west-1.amazonaws.com/salmon-health/graphData.json')
      .then(response => {
        dispatch(fetchGraphsSuccess(response.data));
      })
      .catch(function(error) {
        dispatch(fetchGraphsFailure(error));
      });
  };
};
