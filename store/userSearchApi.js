import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const userSearchApi = createApi({
  reducerPath: "userSearchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5148/api/" }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    search: builder.query({
      query: ({firstName, pageNumber, pageSize}) => `User/Get?firstName=${firstName}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      providesTags: (result, error, search) => [{ type: "users", search }]
    })
  })
});
