import * as actionTypes from './actionTypes'

export const toggleBackdrop = (showForm = false, hideNav = false) => {
  return {
    type: actionTypes.TOGGLE_BACKDROP,
    showForm: showForm,
    hideNav: hideNav
  }
}

export const closeBackdrop = () => {
  return {
    type: actionTypes.CLOSE_BACKDROP
  }
}
