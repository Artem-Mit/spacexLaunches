import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Rocket } from '../types/Rocket';

export const spacexApi = createApi({
  reducerPath: 'spacexApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacexdata.com/v5/launches' }),
  endpoints: (build) => ({
    getSpacexByYear: build.mutation({
      query: () => ({
        url: '/query',
        method: 'POST',
        body: {
          query: {
            date_utc: {
              $gte: '2015-01-22T00:00:00.000Z',
              $lte: '2019-12-25T00:00:00.000Z',
            },
            success: true,
          },
          options: {
            select: [
              'details', 'name', 'date_utc', 'success', 'links',
            ],
            pagination: false,
          },
        },
      }),
      transformResponse: (response: { docs: Rocket[] }) => response.docs,
    }),
  }),
});

export const { useGetSpacexByYearMutation } = spacexApi;
