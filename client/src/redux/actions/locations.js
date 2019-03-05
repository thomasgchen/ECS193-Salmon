import axios from 'axios';
export const FETCH_LOCATIONS_BEGIN = 'FETCH_LOCATIONS_BEGIN';
export const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS';
export const FETCH_LOCATIONS_FAILURE = 'FETCH_LOCATIONS_FAILURE';

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://salmon-health.herokuapp.com/';
}

export const fetchLocationsBegin = () => ({
  type: FETCH_LOCATIONS_BEGIN
});

export const fetchLocationsSuccess = locations => ({
  type: FETCH_LOCATIONS_SUCCESS,
  payload: { locations }
});

export const fetchLocationsFailure = error => ({
  type: FETCH_LOCATIONS_FAILURE,
  payload: { error }
});

export const fetchLocations = () => {
  return dispatch => {
    dispatch(fetchLocationsBegin());

    axios
      .get('/locations')
      .then(response => {
        dispatch(fetchLocationsSuccess(response.data));
      })
      .catch(function(error) {
        dispatch(fetchLocationsFailure(error));
      });
  };
};
