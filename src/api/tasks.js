import api from ".";

const endpoints = {
  tasks: () => "tasks",
  task: (id) => `tasks/${id}`
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
    fetchTask: builder.query({
      query: (id) => endpoints.task(id),
      providesTags: [{ type: 'Tasks', id: 'Id' }],
    }),
    editTask: builder.mutation({
      query: ({ id, ...body }) => ({
        url: endpoints.task(id),
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Tasks', {type: 'Tasks', id: 'Id'}]
    })
  }),
  overrideExisting: false,
});

export const { 
  useListTasksQuery,
  useCreateTaskMutation,
  useFetchTaskQuery,
  useEditTaskMutation,
} = tasksApi;

export default tasksApi;
