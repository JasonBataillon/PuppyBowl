import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//import { useGetPuppiesQuery } from '../features/puppies/puppySlice';

const COHORT_CODE = '2408-ftb-et-web-am';
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT_CODE}/`;

// TODO: configure createApi to use API_URL as the base URL
// TODO: add "Puppy" as a tag type.
const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Puppy'],
  endpoints: (builder) => ({
    getPuppies: builder.query({
      query: () => 'players',
      providesTags: ['Puppy'],
    }),
  }),
});

export default api;
export const { useGetPuppiesQuery } = api;
