import axios from 'axios';
export const FETCH_LOCATIONS_BEGIN = 'FETCH_LOCATIONS_BEGIN';
export const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS';
export const FETCH_LOCATIONS_FAILURE = 'FETCH_LOCATIONS_FAILURE';
export const FETCH_LOCATION_PROFILES_BEGIN = 'FETCH_LOCATION_PROFILES_BEGIN';
export const FETCH_LOCATION_PROFILES_SUCCESS = 'FETCH_LOCATION_PROFILES_SUCCESS';
export const FETCH_LOCATION_PROFILES_FAILURE = 'FETCH_LOCATION_PROFILES_FAILURE';

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

export const fetchLocationProfilesBegin = () => ({
  type: FETCH_LOCATION_PROFILES_BEGIN
});

export const fetchLocationProfilesSuccess = profiles => ({
  type: FETCH_LOCATION_PROFILES_SUCCESS,
  payload: { profiles }
});

export const fetchLocationProfilesFailure = error => ({
  type: FETCH_LOCATION_PROFILES_FAILURE,
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

export const fetchLocationProfiles = () => {
  return dispatch => {
    dispatch(fetchLocationProfilesBegin());

    axios
      .get('https://s3-us-west-1.amazonaws.com/salmon-health/locationGraphData.json')
      .then(response => {
        dispatch(fetchLocationProfilesSuccess(response.data));
      })
      .catch(function(error) {
        dispatch(fetchLocationProfilesFailure(error));
      });
  };
};
