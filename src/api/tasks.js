import api from ".";

const endpoints = {
  tasks: () => "tasks",
};

const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listTasks: builder.query({
      query: endpoints.tasks,
      providesTags: ["Tasks"],
    }),
    createTask: builder.mutation({
      query: (body) => ({
        url: endpoints.tasks(),
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
  overrideExisting: false,
});

export const { useListTasksQuery, useCreateTaskMutation } = tasksApi;

export default tasksApi;
