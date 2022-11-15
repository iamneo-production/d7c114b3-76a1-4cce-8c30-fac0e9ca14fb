import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const StockNewsHeaders = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
  'x-rapidapi-host': process.env.REACT_APP_NEWS_RAPIDAPI_HOST,
};

const createRequest = (url) => ({ url, headers: StockNewsHeaders });

export const StockNewsApi = createApi({
  reducerPath: 'StockNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_NEWS_API_URL }),
  endpoints: (builder) => ({
    getStockNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
    }),
  }),
});

export const { useGetStockNewsQuery } = StockNewsApi;
