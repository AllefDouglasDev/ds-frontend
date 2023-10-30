/**
 *
 * Combine all reducers in this file and export the combined reducers.
 *
 */

import { combineReducers } from '@reduxjs/toolkit'

import api from '../api'
import authSlice, { logout } from './auth/slice'

/**
 * Merges the main reducer with the router state
 */
const appReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authSlice,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rootReducer = (state, action) => {
  if (logout?.match(action)) {
    state = undefined
  }

  return appReducer(state, action)
}
