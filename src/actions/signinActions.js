import request from '../api'
import {handleError} from '../helpers'
import {setUser} from '../helpers/authHelpers'
import {notificationActions as notifications} from '.'

import {
  SIGNIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD_VALIDATE,
  RESET_PASSWORD,
} from './actionTypes'

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

      return Promise.resolve()
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

      return Promise.reject()
    })
}

export const validateResetPasswordToken = (token: string) => (
  dispatch: () => void,
) => {
  if (!token) {
    handleError(
      'This reset password token is missing. Please click the link in your email again.',
      {},
      dispatch,
    )

    return Promise.reject()
  }

  dispatch({
    type: RESET_PASSWORD_VALIDATE.LOADING,
    field: 'resetPasswordValidate',
    loading: true,
  })

  return request
    .get('/validateresetpasswordtoken', {
      params: {token},
    })
    .then(() => {
      setTimeout(() => {
        dispatch({
          type: RESET_PASSWORD_VALIDATE.LOADING,
          field: 'resetPasswordValidate',
          loading: false,
        })
        dispatch({type: RESET_PASSWORD_VALIDATE.COMPLETE})

        return Promise.resolve()
      }, 3000)
    })
    .catch(error => {
      dispatch({
        type: RESET_PASSWORD_VALIDATE.LOADING,
        field: 'resetPasswordValidate',
        loading: false,
      })
      handleError(
        'This reset password token is invalid or has expired. Please try again later.',
        error,
        dispatch,
      )

      return Promise.reject()
    })
}

export const resetPassword = (fields: {}) => (dispatch: () => void) => {
  dispatch({
    type: RESET_PASSWORD.LOADING,
    field: 'resetPassword',
    loading: true,
  })

  return request
    .get('/resetpassword', {
      params: {password: fields.newPassword.value},
    })
    .then(() => {
      dispatch({
        type: RESET_PASSWORD.LOADING,
        field: 'resetPassword',
        loading: false,
      })
      dispatch({type: RESET_PASSWORD.COMPLETE})
      dispatch(
        notifications.success(
          'Your password has been reset. You can now use your new password to signin.',
        ),
      )

      return Promise.resolve()
    })
    .catch(error => {
      dispatch({
        type: RESET_PASSWORD_VALIDATE.LOADING,
        field: 'resetPassword',
        loading: false,
      })
      handleError(
        'Unable to reset your password at this time. Please try again later.',
        error,
        dispatch,
      )

      return Promise.reject()
    })
}
