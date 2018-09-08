import {createAction} from '../helpers/reduxHelpers'

export const FORGOT_PASSWORD = createAction('FORGOT_PASSWORD')
export const RESET_PASSWORD = createAction('RESET_PASSWORD')
export const RESET_PASSWORD_VALIDATE = createAction('RESET_PASSWORD_VALIDATE')
export const SIGNIN = createAction('SIGNIN')

export const notificationActionTypes = {
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  CLEAR_SUCCESSES: 'CLEAR_SUCCESSES',
  ERROR_MESSAGE: 'ERROR_MESSAGE',
  SUCCESS_MESSAGE: 'SUCCESS_MESSAGE',
}
