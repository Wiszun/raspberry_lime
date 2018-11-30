import * as actionTypes from '../actions/actionTypes'

const initState = {
  showBackdrop: false,
  showForm: false,
  hideNav: false,
  redirect: false
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_BACKDROP:
      return {
        ...state,
        showBackdrop: !state.showBackdrop,
        showForm: action.showForm,
        hideNav: action.hideNav
      }
    case actionTypes.CLOSE_BACKDROP:
      return {
        ...state,
        showBackdrop: false,
        showForm: false,
        redirect: true,
      }
    default:
      return state;
  }
}

export default reducer;
