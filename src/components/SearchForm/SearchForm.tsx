import { useEffect, useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setIssues } from "src/redux/slices/issuesSlice";
import { useGetIssuesQuery } from "src/redux/services/issuesApi";
import { skipToken } from "@reduxjs/toolkit/query";
import  { GithubRequestParams, Issue, IssueSummary } from "src/types";

const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  return `${diffDays} days ago`;
};

const SearchForm = () => {
  const dispatch = useDispatch();
  const [repoUrl, setRepoUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState<GithubRequestParams | null>(null);

  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  const owner = match?.[1] ?? "";
  const repo = match?.[2] ?? "";

  const { data, error, isFetching } = useGetIssuesQuery(
    submittedUrl ? { owner: submittedUrl.owner, repo: submittedUrl.repo } : skipToken
  );

  const handleLoadIssues = () => {
    if (!match) {
      alert("Invalid GitHub repo URL");
      return;
    }
    setSubmittedUrl({ owner, repo });
  };

  useEffect(() => {
    if (data) {
      const mappedIssues: IssueSummary[] = data.map((issue: Issue) => ({
        title: issue.title,
        number: issue.number,
        createdAt: formatRelativeDate(issue.created_at),
        userLogin: issue.user.login,
        comments: issue.comments,
      }));
      console.log(mappedIssues);

      dispatch(setIssues(mappedIssues));
    }
  }, [data, dispatch]);

  return (
    <Form>
      <InputGroup className="w-100">
        <Form.Control
          type="text"
          placeholder="Enter repo URL"
          className="flex-grow-1 me-2"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
        <Button variant="primary" onClick={handleLoadIssues} disabled={isFetching}>
          {isFetching ? "Loading..." : "Load issues"}
        </Button>
      </InputGroup>
      {error && <p className="text-danger mt-2">Failed to load issues. Please check the repo URL.</p>}
    </Form>
  );
};

export default SearchForm;
