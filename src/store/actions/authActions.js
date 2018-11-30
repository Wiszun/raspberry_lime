import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
    loading: true,
  };
};

export const authSuccess = (message, status, login, retrievedLogin = 0) => {
  let error = null;
  if(status === 'ok') {
    if(!retrievedLogin) {
      let now = new Date().getTime();
      now = now + 24*60*60*1000;
      localStorage.setItem('userLoggedIn', login);
      localStorage.setItem('successMessage', message);
      localStorage.setItem('setupTime', now);
    }
  } else {
    error = status
  }
  return {
    type: actionTypes.AUTH_SUCCESS,
    message: message,
    error: error,
    status: status,
    loading: false,
    loggedUser: login
  }
}

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err
  }
}

export const logOut = (err) => {
  localStorage.removeItem('userLoggedIn');
  localStorage.removeItem('successMessage');
  return {
    type: actionTypes.LOG_OUT,
  }
}

export const retryAuth = () => {
  return {
    type: actionTypes.RETRY_AUTH,
  }
}


export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('https://recruitment-api.pyt1.stg.jmr.pl/login', {
        login: email,
        password: password
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then(data => {
      let {message, status} = data.data;
      dispatch(authSuccess(message, status, email));
    })
    .catch(err => dispatch(authFail(err)));
  }
}

export const clearErrors = () => {
  return {
    type: actionTypes.CLEAR_ERRORS,
  }
}

export const tryInitAuth = () => {
  return dispatch => {
    const loggedUser = localStorage.getItem('userLoggedIn');
    if(loggedUser) {
      let now = new Date().getTime();
      const setupTime = localStorage.getItem('setupTime');
      if(now > setupTime) {
        localStorage.clear();
      } else {
        const message = localStorage.getItem('successMessage');
        let now = new Date().getTime();
        now = now + 24*60*60*1000;
        localStorage.setItem('setupTime', now);
        dispatch(authSuccess(message, 'ok', loggedUser, 1));
      }
    }
  }
}
