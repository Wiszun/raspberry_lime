import * as actionTypes from '../actions/actionTypes'

const initState = {
  loggedUser: null,
  loading: false,
  error: null,
  message: '',
  status: '',
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.error,
        message: action.message,
        status: action.status,
        loggedUser: action.loggedUser
      }
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.RETRY_AUTH:
      return {
        ...state,
        error: '',
        status: '',
        message: ''
      }
    case actionTypes.LOG_OUT:
      return {
        ...state,
        error: '',
        status: '',
        message: ''
      }
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        message: action.error.message,
        status: 'error'
      }
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        status: '',
        error: '',
        message: '',
      }
    default:
      return state;
  }
}

export default reducer;
