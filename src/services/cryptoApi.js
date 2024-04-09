
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'a6334a20c4msh139e8a666d536cfp1732b6jsnd273fa1bd19c',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  };





const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
   reducerPath: 'cryptoApi',
   baseQuery: fetchBaseQuery({ baseUrl }),
   endpoints: (builder) => ({
     getCryptos: builder.query({
       query: (count) => createRequest(`/coins?limit=${count}`),
     }),
    
     getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest('/coin/Qwsogvtv82FCd/exchanges'),
    }),

   }),
 
});

export const { useGetCryptosQuery, 
   useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
    useGetExchangesQuery } = cryptoApi;

export default cryptoApi;


