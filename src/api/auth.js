import api from '.'

const endpoints = {
  login: () => 'auth/login',
  profile: () => 'auth/profile',
}

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: body => ({
        url: endpoints.login(),
        method: 'POST',
        body,
      }),
    }),
    fetchProfile: builder.query({
      query: endpoints.profile,
    }),
  }),
  overrideExisting: false,
})

export const { useFetchProfileQuery, useLoginMutation } = authApi

export default authApi

