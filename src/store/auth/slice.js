import { createSlice } from '@reduxjs/toolkit'

import { TOKEN_KEY } from '../../api'
import authApi from '../../api/auth'

const USER_KEY = '@digital-schedule/user'

function getUserFromLocalStorage() {
  const user = localStorage.getItem(USER_KEY)
  return user ? JSON.parse(user) : null
}

export const initialState = {
  token: localStorage.getItem(TOKEN_KEY),
  user: getUserFromLocalStorage(),
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.token = null
      state.user = null
      state.isAuthenticated = false
      localStorage.clear()
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        localStorage.setItem(TOKEN_KEY, action.payload.token)
        localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user))
        state.token = action.payload.token
        state.user = action.payload.user
        state.isAuthenticated = true
      },
    )
    builder.addMatcher(
      authApi.endpoints.fetchProfile.matchFulfilled,
      (state, action) => {
        state.user = action.payload
        localStorage.setItem(USER_KEY, JSON.stringify(action.payload))
      },
    )
  },
})

export const { logout } = slice.actions
export default slice.reducer

