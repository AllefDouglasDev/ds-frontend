import api from ".";

const endpoints = {
  events: () => "events",
  event: (id) => `events/${id}`,
};

const eventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listEvents: builder.query({
      query: endpoints.events, 
      providesTags: ['Events'],
    }),
    deleteEvent: builder.mutation({
      query: ({ id }) => ({
        url: endpoints.event(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Events'],
    })
  }),
  overrideExisting: false,
});

export const { useListEventsQuery, useDeleteEventMutation } = eventsApi;

export default eventsApi;
