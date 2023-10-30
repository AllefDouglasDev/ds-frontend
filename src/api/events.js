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
    }),
    createEvent: builder.mutation({
      query: (body) => ({
        url: endpoints.events(),
        method: 'POST',
        body
      }),
      invalidatesTags: ['Events']
    }),
    fetchEvent: builder.query({
      query: (id) => endpoints.event(id),
      providesTags: [{ type: 'Events', id: 'Id' }],
    }),
    editEvent: builder.mutation({
      query: ({ id, ...body }) => ({
        url: endpoints.event(id),
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Events', {type: 'Events', id: 'Id'}]
    })
  }),
  overrideExisting: false,
});

export const {
  useListEventsQuery,
  useDeleteEventMutation,
  useCreateEventMutation,
  useFetchEventQuery,
  useEditEventMutation
} = eventsApi;

export default eventsApi;
