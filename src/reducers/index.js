import {combineReducers} from 'redux'
import {router5Reducer} from 'redux-router5'

import signin from './signinReducer'

export default combineReducers({
  router: router5Reducer,
  signin,
})
