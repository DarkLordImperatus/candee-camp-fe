import {handleLoading} from 'redux-helpers-cgen'

import {SIGNIN} from '../actions/actionTypes'

const INITIAL_STATE = {
  loading: {
    signin: false,
  },
}

function signin(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNIN.LOADING:
      return {
        ...state,
        loading: handleLoading(state.loading, action),
      }

    default:
      return {...state}
  }
}

export default signin
