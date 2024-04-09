import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'X-RapidAPI-Key': 'a6334a20c4msh139e8a666d536cfp1732b6jsnd273fa1bd19c',
  'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
};

const baseUrl =  'https://cryptocurrency-news2.p.rapidapi.com';





const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });




      export const cryptoNewsApi = createApi({
        reducerPath: 'cryptoNewsApi',
        baseQuery: fetchBaseQuery({ baseUrl }),
        endpoints: (builder) => ({
          getCryptoNews: builder.query({
            query: ( count ) => createRequest(`/v1/bsc?limit=${count}`),
          }),
        }),
      });

    
      



export const { useGetCryptoNewsQuery } = cryptoNewsApi;

export default cryptoNewsApi;
