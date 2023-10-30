import api from ".";

const endpoints = {
  schedules: () => "schedules",
};

const schedulesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listSchedules: builder.query({
      query: endpoints.schedules, 
    }),
  }),
  overrideExisting: false,
});

export const { useListSchedulesQuery } = schedulesApi;

export default schedulesApi;
