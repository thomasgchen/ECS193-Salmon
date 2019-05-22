import axios from 'axios';
import base64 from 'base-64';
export const SET_PASS = 'SET_PASS';
export const UNSET_PASS = 'UNSET_PASS';
export const BEGIN_VALIDATION = 'BEGIN_VALIDATION';

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://salmon-health.herokuapp.com/';
}

export const beginValidation = () => ({
  type: BEGIN_VALIDATION
});

export const setPass = pass => ({
  type: SET_PASS,
  payload: { pass }
});

export const unsetPass = () => ({
  type: UNSET_PASS
});

export const validatePass = pass => {
  return dispatch => {
    dispatch(beginValidation());
    const auth = base64.encode(`admin:${pass}`);
    axios
      .post('/validate_auth', null, { headers: { Authorization: `Basic ${auth}` } })
      .then(response => {
        if (response.status === 200) {
          dispatch(setPass(auth));
        }
      })
      .catch(function(error) {
        dispatch(setPass(error));
      });
  };
};
