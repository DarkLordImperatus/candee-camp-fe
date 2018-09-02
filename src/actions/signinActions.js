import request from '../api'
import {setUser} from '../helpers/authHelpers'

import {SIGNIN} from './actionTypes'

export const signin = fields => dispatch => {
  dispatch({type: SIGNIN.LOADING, field: 'signin', loading: true})

  return request
    .get('/signin', {
      params: {
        email: fields.email.value,
        password: fields.password.value,
      },
    })
    .then(response => {
      dispatch({type: SIGNIN.LOADING, field: 'signin', loading: false})
      dispatch({type: SIGNIN.COMPLETE})
      setUser(response.data.result)
    })
    .catch(() => {
      dispatch({type: SIGNIN.LOADING, field: 'signin', loading: false})
    })
}
