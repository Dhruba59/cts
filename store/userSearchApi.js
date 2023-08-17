import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const userSearchApi = createApi({
  reducerPath: "userSearchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5148/api/" }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    search: builder.query({
      query: (q) => `User/Get?firstName=${q}&pageNumber=1&pageSize=20`,
      providesTags: (result, error, search) => [{ type: "users", search }]
    })
  })
});
