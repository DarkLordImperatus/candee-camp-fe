import request from '../api'
import {handleError} from '../helpers'
import {setUser} from '../helpers/authHelpers'
import {notificationActions as notifications} from '.'

import {SIGNIN, FORGOT_PASSWORD} from './actionTypes'

export const signin = (fields: {}) => (dispatch: () => void) => {
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
    .catch(error => {
      dispatch({type: SIGNIN.LOADING, field: 'signin', loading: false})
      handleError('Unable to Sign in. Please try again.', error, dispatch)
    })
}

export const forgotPassword = (fields: {}) => (dispatch: () => void) => {
  dispatch({
    type: FORGOT_PASSWORD.LOADING,
    field: 'forgotPassword',
    loading: true,
  })

  return request
    .get('/forgotpassword', {
      params: {
        email: fields.email.value,
      },
    })
    .then(() => {
      dispatch({
        type: FORGOT_PASSWORD.LOADING,
        field: 'forgotPassword',
        loading: false,
      })
      dispatch({type: FORGOT_PASSWORD.COMPLETE})
      dispatch(
        notifications.success(
          'The reset link has been sent to your email address.',
        ),
      )

      return true
    })
    .catch(error => {
      dispatch({
        type: FORGOT_PASSWORD.LOADING,
        field: 'forgotPassword',
        loading: false,
      })
      handleError(
        'Unable to send reset link. Please make sure your email address is correct.',
        error,
        dispatch,
      )

      return false
    })
}
