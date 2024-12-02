import api from '../../store/api';

/*
TODO: Define the following 4 endpoints:
  1. getPuppies (query)
  2. getPuppy (query)
  3. addPuppy (mutation)
  4. deletePuppy (mutation)

The query endpoints should provide the "Puppy" tag.
The mutation endpoints should invalidate the "Puppy" tag.

(Optional) TODO: Write `transformResponse` and `transformErrorResponse`
functions for each endpoint.
*/

const puppyApi = api.injectEndpoints({
  endpoints: (build) => ({
    //Get all puppies
    getPuppies: build.query({
      query: () => ({
        url: '/puppies',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Puppy', id })), 'Puppy']
          : ['Puppy'],
    }),
    //Get single puppy by id
    getPuppy: build.query({
      query: (id) => ({
        url: `/puppy/${id}`,
        method: 'GET',
      }),
      providesTags: ['Puppy'],
    }),
    //Add puppy
    addPuppy: build.mutation({
      query: ({ id, name }) => ({
        url: `/puppy/${id}`,
        method: 'PUT',
        body: { name },
      }),
      invalidatesTags: ['Puppy'],
    }),
    //Delete puppy
    deletePuppy: build.mutation({
      query: (id) => ({
        url: `/puppy/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Puppy', id }],
    }),
  }),
});

export const {
  useGetPuppiesQuery,
  useGetPuppyQuery,
  useAddPuppyMutation,
  useDeletePuppyMutation,
} = puppyApi;
