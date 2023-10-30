import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://localhost:3001' 

export const TOKEN_KEY = '@digital-schedule/token'

const api = createApi({
  tagTypes: ['Tasks'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: headers => {
      const token = localStorage.getItem(TOKEN_KEY)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: () => ({}),
})

export default api

