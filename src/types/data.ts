export type Issue = {
  id: string;
  number: number;
  title: string;
  userName: string;
  state: "open" | "closed";
  status: string;
  created_at: Date;
  updated_at: Date;
  comments: number;
  url: string;
};

export type Repository = {
  id: string;
  fullName: string;
  description: string;
  stargazers_count: number;
  language: string;
  license: string;
  updated_at: Date;
};
