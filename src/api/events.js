import api from ".";

const endpoints = {
  events: () => "events",
  event: (id) => `events/${id}`,
  createEvent: () => `events`
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
    }),
    createEvent: builder.mutation({
      query: (body) => ({
        url: endpoints.createEvent(),
        method: 'POST',
        body
      }),
      invalidatesTags: ['Events']
    })
  }),
  overrideExisting: false,
});

export const { useListEventsQuery, useDeleteEventMutation, useCreateEventMutation } = eventsApi;

export default eventsApi;
