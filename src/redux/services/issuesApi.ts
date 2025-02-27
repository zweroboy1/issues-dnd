import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GithubRequestParams, Issue, IssueSummary, IssueStatus } from "src/types";

const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  return `${diffDays} days ago`;
};

export const issuesApi = createApi({
  reducerPath: "issuesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com/repos/" }),
  endpoints: (builder) => ({
    getIssues: builder.query<IssueSummary[], GithubRequestParams>({
      query: ({ owner, repo }) => `${owner}/${repo}/issues?per_page=100&state=all`,
      transformResponse: (response: Issue[]) => {
        // Фильтрация pull request'ов
        const issuesWithoutPR = response.filter((issue) => !issue.pull_request);

        // Маппинг данных с добавлением статуса
        return issuesWithoutPR.map((issue) => {
          let status: IssueStatus = IssueStatus.ToDo; // По умолчанию ставим ToDo

          // Проверяем статус
          if (issue.state === "closed") {
            status = IssueStatus.Done; // Закрытые ишьюсы — Done
          } else if (issue.assignee) {
            status = IssueStatus.InProgress; // Ишьюсы с ассигни — InProgress
          }

          return {
            title: issue.title,
            number: issue.number,
            createdAt: formatRelativeDate(issue.created_at),
            userLogin: issue.user.login,
            comments: issue.comments,
            status, // Добавляем статус
          };
        });
      },
    }),
  }),
});

export const { useGetIssuesQuery } = issuesApi;
