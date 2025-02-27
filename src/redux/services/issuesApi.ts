import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GithubRequestParams, Issue } from "src/types";

export const issuesApi = createApi({
  reducerPath: "issuesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com/repos/" }),
  endpoints: (builder) => ({
    getIssues: builder.query<Issue[], GithubRequestParams>({
      query: ({ owner, repo }) => `${owner}/${repo}/issues`,
    }),
  }),
});

export const { useGetIssuesQuery } = issuesApi;