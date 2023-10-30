import api from ".";

const endpoints = {
  tasks: () => "tasks",
  task: (id) => `tasks/${id}`,
  delivery: (id) => `tasks/${id}/delivery`,
  doubt: (id) => `tasks/${id}/doubt`,
};

const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchTask: builder.query({
      query: (id) => endpoints.task(id),
      providesTags: [{ type: "Tasks", id: "Id" }],
    }),
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
    deliveryTask: builder.mutation({
      query: ({ id, ...body }) => ({
        url: endpoints.delivery(id),
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks", { type: "Tasks", id: "Id" }],
    }),
    createDoubt: builder.mutation({
      query: ({ id, ...body }) => ({
        url: endpoints.doubt(id),
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks", { type: "Tasks", id: "Id" }],
    }),
    editTask: builder.mutation({
      query: ({ id, ...body }) => ({
        url: endpoints.task(id),
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Tasks", { type: "Tasks", id: "Id" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchTaskQuery,
  useListTasksQuery,
  useCreateTaskMutation,
  useDeliveryTaskMutation,
  useCreateDoubtMutation,
  useEditTaskMutation,
} = tasksApi;

export default tasksApi;
