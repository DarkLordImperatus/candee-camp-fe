import {handleLoading} from '../helpers/reduxHelpers'

import {
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  RESET_PASSWORD_VALIDATE,
  SIGNIN,
} from '../actions/actionTypes'

const INITIAL_STATE = {
  loading: {
    forgotPassword: false,
    resetPassword: false,
    resetPasswordValidate: false,
    signin: false,
  },
  validResetPasswordToken: false,
}

function signin(state: {} = INITIAL_STATE, action: {}) {
  switch (action.type) {
    case SIGNIN.LOADING:
    case RESET_PASSWORD.LOADING:
    case FORGOT_PASSWORD.LOADING:
    case RESET_PASSWORD_VALIDATE.LOADING:
      return {
        ...state,
        loading: handleLoading(state.loading, action),
      }

    case RESET_PASSWORD_VALIDATE.COMPLETE:
      return {...state, validResetPasswordToken: true}

    default:
      return state
  }
}

export default signin
