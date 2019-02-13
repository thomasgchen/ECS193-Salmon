import axios from 'axios';
export const FETCH_CASES_BEGIN = 'FETCH_CASES_BEGIN';
export const FETCH_CASES_SUCCESS = 'FETCH_CASES_SUCCESS';
export const FETCH_CASES_FAILURE = 'FETCH_CASES_FAILURE';
export const UPDATE_CASES_BEGIN = 'UPDATE_CASES_BEGIN';
export const UPDATE_CASES_SUCCESS = 'UPDATE_CASES_SUCCESS';
export const UPDATE_CASES_FAILURE = 'UPDATE_CASES_FAILURE';
export const DELETE_CASES_BEGIN = 'DELETE_CASES_BEGIN';
export const DELETE_CASES_SUCCESS = 'DELETE_CASES_SUCCESS';
export const DELETE_CASES_FAILURE = 'DELETE_CASES_FAILURE';

export const fetchCasesBegin = () => ({
  type: FETCH_CASES_BEGIN
});

export const fetchCasesSuccess = cases => ({
  type: FETCH_CASES_SUCCESS,
  payload: { cases }
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

export const fetchCases = page => {
  return dispatch => {
    dispatch(fetchCasesBegin());

    axios
      .get('/cases', { params: { page } })
      .then(response => {
        console.log(response);
        dispatch(fetchCasesSuccess(response.data));
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
        console.log(response);
        dispatch(updateCasesSuccess(response.data));
      })
      .catch(function(error) {
        console.log(error);
        dispatch(updateCasesFailure(error));
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
