import { Issue } from "../../types/data";

const parseIssueData = (data: any): Issue => ({
  id: data.id,
  number: Number(data.number),
  title: data.title,
  userName: data.user.login,
  state: data.state,
  status: data.labels.status,
  created_at: new Date(data.created_at),
  updated_at: new Date(data.updated_at),
  comments: Number(data.comments),
  url: data.url,
});

export default parseIssueData;
