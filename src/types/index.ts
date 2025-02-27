export interface IssueSummary {
  title: string;
  number: number;
  createdAt: string;
  userLogin: string;
  comments: number;
};

export interface GithubRequestParams {
  owner: string;
  repo: string
};

export interface Issue {
  title: string;
  number: number;
  created_at: string;
  user: {
    login: string;
  };
  comments: number;
}