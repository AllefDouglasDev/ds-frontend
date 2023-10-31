import api from ".";

const endpoints = {
  schedules: () => "schedules",
  lunch: () => "schedules/lunch",
};

const schedulesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listSchedules: builder.query({
      query: endpoints.schedules,
    }),
    listLunchSchedules: builder.query({
      query: endpoints.lunch,
    }),
  }),
  overrideExisting: false,
});

export const { useListSchedulesQuery, useListLunchSchedulesQuery } =
  schedulesApi;

export default schedulesApi;
