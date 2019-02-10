export const FETCH_CASES_BEGIN = 'FETCH_CASES_BEGIN';
export const FETCH_CASES_SUCCESS = 'FETCH_CASES_SUCCESS';
export const FETCH_CASES_FAILURE = 'FETCH_CASES_FAILURE';

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
