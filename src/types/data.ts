export type IncomingIssueData = {
  id: number;
  number: number;
  title: string;
  user: { login: string };
  state: 'open' | 'closed';
  labels: {
    id: number;
    name: string;
    color: string;
    description: string;
  }[];
  created_at: string;
  updated_at: string;
  comments: number;
  html_url: string;
};

export type Issue = {
  id: number;
  repoFullName: string;
  number: number;
  title: string;
  userName: string;
  state: IssueOpenOrClosedState;
  labels: IssueLabel[];
  created_at: Date;
  updated_at: Date;
  comments: number;
  html_url: string;
};
export type Issues = { [id: string]: Issue[] | [] };

export const ISSUE_STATE = { OPEN: 'open', CLOSED: 'closed' } as const;
export type IssueOpenOrClosedState = typeof ISSUE_STATE[keyof typeof ISSUE_STATE];

export type IncomingRepositoryData = {
  id: number;
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string;
  license?: { name: string };
  updated_at: string;
};
export type Repository = {
  id: number;
  fullName: string;
  description: string;
  stargazers_count: number;
  language: string;
  license: string | undefined;
  updated_at: Date;
};

export type IssueLabel = {
  id: number;
  name: string;
  color: string;
  description: string;
};
