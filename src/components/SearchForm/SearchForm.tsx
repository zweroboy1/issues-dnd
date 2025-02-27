import { useEffect, useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setIssues } from "src/redux/slices/issuesSlice";
import { useGetIssuesQuery } from "src/redux/services/issuesApi";
import { skipToken } from "@reduxjs/toolkit/query";
import  { GithubRequestParams } from "src/types";



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
      console.log(data);
      dispatch(setIssues(data));
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
