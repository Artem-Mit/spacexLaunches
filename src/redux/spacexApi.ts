import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const spacexApi = createApi({
  reducerPath: 'spacexApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacexdata.com/v5/launches' }),
  endpoints: (build) => ({
    getSpacexByYear: build.mutation({
      query: (page: number) => ({
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
            page: `${page}`,
            sort: {
              date_utc: '-1',
            },
            select: [
              'details', 'name', 'date_utc', 'success', 'links',
            ],
            pagination: true,
          },
        },
      }),
    }),
  }),
});

export const { useGetSpacexByYearMutation } = spacexApi;
