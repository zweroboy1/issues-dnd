export interface Issue {
  title: string;
  number: number;
  created_at: string;
  user: {
    login: string;
  };
  comments: number;
  pull_request?: boolean;
  state: "open" | "closed";
  assignee?: { login: string };
}
export interface IssueSummary {
  title: string;
  number: number;
  createdAt: string;
  userLogin: string;
  comments: number;
  status: IssueStatus;
};

export enum IssueStatus {
  ToDo = "ToDo",
  InProgress = "InProgress",
  Done = "Done",
}

export interface GithubRequestParams {
  owner: string;
  repo: string
};

