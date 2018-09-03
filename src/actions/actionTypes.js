import {createAction} from 'redux-helpers-cgen'

export const SIGNIN = createAction('SIGNIN')

export const notificationActionTypes = {
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  ERROR_MESSAGE: 'ERROR_MESSAGE',
  CLEAR_SUCCESSES: 'CLEAR_SUCCESSES',
  SUCCESS_MESSAGE: 'SUCCESS_MESSAGE',
}
