import api from ".";

const endpoints = {
  classes: () => "classes",
};

const classesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listClasses: builder.query({
      query: endpoints.classes,
    }),
  }),
  overrideExisting: false,
});

export const { useListClassesQuery } = classesApi;

export default classesApi;
