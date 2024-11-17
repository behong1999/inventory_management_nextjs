import {createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: [], // used to configure caching and invalidation of cached data
    endpoints: (builder) => ({}),
})
