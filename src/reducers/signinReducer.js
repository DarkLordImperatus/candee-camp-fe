import {handleLoading} from '../helpers/reduxHelpers'

import {SIGNIN, FORGOT_PASSWORD} from '../actions/actionTypes'

const INITIAL_STATE = {
  loading: {
    signin: false,
  },
}

function signin(state: {} = INITIAL_STATE, action: {}) {
  switch (action.type) {
    case SIGNIN.LOADING:
    case FORGOT_PASSWORD.LOADING:
      return {
        ...state,
        loading: handleLoading(state.loading, action),
      }

    default:
      return state
  }
}

export default signin
