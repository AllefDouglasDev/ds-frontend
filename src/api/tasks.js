import api from ".";

const endpoints = {
  tasks: () => "tasks",
};

const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listTasks: builder.query({
      query: endpoints.tasks, 
      providesTags: ['Tasks'],
    }),
  }),
  overrideExisting: false,
});

export const { useListTasksQuery } = tasksApi;

export default tasksApi;
