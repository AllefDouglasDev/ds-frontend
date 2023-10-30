import { createSelector } from '@reduxjs/toolkit'

const selectAuthStateDomain = state => state.auth

export const selectIsAuthenticated = createSelector(
  selectAuthStateDomain,
  state => state.isAuthenticated,
)

export const selectProfile = createSelector(
  selectAuthStateDomain,
  state => state.user,
)
