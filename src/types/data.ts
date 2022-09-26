export type Issue = {
  id: string;
  repoFullName: string;
  number: number;
  title: string;
  userName: string;
  state: IssueOpenOrClosedStatus;
  labels: IssueLabel[];
  created_at: Date;
  updated_at: Date;
  comments: number;
  html_url: string;
};
export type Issues = { [id: string]: Issue[] | [] };

export const ISSUE_STATE = { OPEN: "open", CLOSED: "closed" } as const;
export type IssueOpenOrClosedStatus = typeof ISSUE_STATE[keyof typeof ISSUE_STATE];

export type Repository = {
  id: string;
  fullName: string;
  description: string;
  stargazers_count: number;
  language: string;
  license: string;
  updated_at: Date;
};

export type IssueLabel = {
  id: number;
  name: string;
  color: string;
  description: string;
};

export type IssueOptions = {
  selectedRepoName: string | undefined;
  openOrClosed: IssueOpenOrClosedStatus;
  page: number;
};
