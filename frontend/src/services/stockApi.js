import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Note: Change v1 to v2 on rapid api

const StockApiHeaders = {
  'x-rapidapi-host': process.env.REACT_APP_Stock_RAPIDAPI_HOST,
  'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
};
const createRequest = (url) => ({ url, headers: StockApiHeaders });

export const StockApi = createApi({
  reducerPath: 'StockApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_Stock_API_URL }),
  endpoints: (builder) => ({
    getStocks: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),

    getStockDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

    // Note: Change the coin price history endpoint from this - `coin/${coinId}/history/${timeperiod} to this - `coin/${coinId}/history?timeperiod=${timeperiod}`
    getStockHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
    }),

    // Note: To access this endpoint you need premium plan
    getExchanges: builder.query({
      query: () => createRequest('/exchanges'),
    }),
  }),
});

export const {
  useGetstocksQuery,
  useGetStockDetailsQuery,
  useGetExchangesQuery,
  useGetStockHistoryQuery,
} = StockApi;
