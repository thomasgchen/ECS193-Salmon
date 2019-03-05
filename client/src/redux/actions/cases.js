import axios from 'axios';
import hash from 'object-hash';
export const FETCH_CASES_BEGIN = 'FETCH_CASES_BEGIN';
export const FETCH_CASES_SUCCESS = 'FETCH_CASES_SUCCESS';
export const FETCH_CASES_FAILURE = 'FETCH_CASES_FAILURE';
export const FETCH_FILTERED_CASES_SUCCESS = 'FETCH_FILTERED_CASES_SUCCESS';
export const UPDATE_CASES_BEGIN = 'UPDATE_CASES_BEGIN';
export const UPDATE_CASES_SUCCESS = 'UPDATE_CASES_SUCCESS';
export const UPDATE_CASES_FAILURE = 'UPDATE_CASES_FAILURE';
export const DELETE_CASES_BEGIN = 'DELETE_CASES_BEGIN';
export const DELETE_CASES_SUCCESS = 'DELETE_CASES_SUCCESS';
export const DELETE_CASES_FAILURE = 'DELETE_CASES_FAILURE';
export const CREATE_CASES_BEGIN = 'CREATE_CASES_BEGIN';
export const CREATE_CASES_SUCCESS = 'CREATE_CASES_SUCCESS';
export const CREATE_CASES_FAILURE = 'CREATE_CASES_FAILURE';

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://salmon-health.herokuapp.com/';
}

export const fetchCasesBegin = () => ({
  type: FETCH_CASES_BEGIN
});

export const fetchCasesSuccess = (cases, filtersHash) => ({
  type: FETCH_CASES_SUCCESS,
  payload: { cases, filtersHash }
});

export const fetchCasesFailure = error => ({
  type: FETCH_CASES_FAILURE,
  payload: { error }
});

export const updateCasesBegin = () => ({
  type: UPDATE_CASES_BEGIN
});

export const updateCasesSuccess = updatedCase => ({
  type: UPDATE_CASES_SUCCESS,
  payload: { updatedCase }
});

export const updateCasesFailure = error => ({
  type: UPDATE_CASES_FAILURE,
  payload: { error }
});

export const createCasesBegin = () => ({
  type: CREATE_CASES_BEGIN
});

export const createCasesSuccess = newCase => ({
  type: CREATE_CASES_SUCCESS,
  payload: { newCase }
});

export const createCasesFailure = error => ({
  type: CREATE_CASES_FAILURE,
  payload: { error }
});

export const deleteCasesBegin = () => ({
  type: DELETE_CASES_BEGIN
});

export const deleteCasesSuccess = id => ({
  type: DELETE_CASES_SUCCESS,
  payload: { id }
});

export const deleteCasesFailure = error => ({
  type: DELETE_CASES_FAILURE,
  payload: { error }
});

export const fetchCases = (page, filters) => {
  return dispatch => {
    dispatch(fetchCasesBegin());
    axios
      .get('/cases', { params: { page, ...filters } })
      .then(response => {
        dispatch(fetchCasesSuccess(response.data, hash(filters)));
      })
      .catch(function(error) {
        console.log(error);
        dispatch(fetchCasesFailure(error));
      });
  };
};

export const updateCase = data => {
  return dispatch => {
    dispatch(updateCasesBegin());

    axios
      .put('/cases', data)
      .then(response => {
        dispatch(updateCasesSuccess(response.data));
      })
      .catch(function(error) {
        dispatch(updateCasesFailure(error));
      });
  };
};

export const createCase = data => {
  return dispatch => {
    dispatch(createCasesBegin());

    axios
      .post('/cases', data)
      .then(response => {
        dispatch(createCasesSuccess(response.data));
      })
      .catch(function(error) {
        dispatch(createCasesFailure(error));
      });
  };
};

export const deleteCase = id => {
  return dispatch => {
    dispatch(deleteCasesBegin());

    axios
      .delete('/cases', { data: { id } })
      .then(response => {
        dispatch(deleteCasesSuccess(response.data.id));
      })
      .catch(function(error) {
        dispatch(deleteCasesFailure(error));
      });
  };
};
