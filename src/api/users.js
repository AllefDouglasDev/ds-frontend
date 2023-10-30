import api from ".";

const endpoints = {
  users: () => `users`,
  user: (id) => `users/${id}`
};

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listUsers: builder.query({
      query: (params) => ({ url: endpoints.users(), params }),
      providesTags: ["Users"],
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: endpoints.users(),
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: endpoints.user(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useListUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation
} = usersApi;

export default usersApi;

