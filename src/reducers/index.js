import {combineReducers} from 'redux'
import {router5Reducer} from 'redux-router5'

import signin from './signinReducer'
import notifications from './notificationsReducer'

export default combineReducers({
  router: router5Reducer,
  notifications,
  signin,
})
