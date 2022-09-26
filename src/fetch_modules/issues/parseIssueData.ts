import { Issue, IssueLabel } from "../../types/data";

const parseIssueData = (repoFullName: string, data: any): Issue => ({
  id: data.id,
  repoFullName: repoFullName,
  number: Number(data.number),
  title: data.title,
  userName: data.user.login,
  state: data.state,
  labels: data.labels.map((label: IssueLabel) => ({
    id: label.id,
    name: label.name,
    color: label.color,
    description: label.description,
  })),
  created_at: new Date(data.created_at),
  updated_at: new Date(data.updated_at),
  comments: Number(data.comments),
  html_url: data.html_url,
});

export default parseIssueData;
