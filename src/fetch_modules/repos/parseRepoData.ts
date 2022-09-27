import { IncomingRepositoryData, Repository } from '../../types/data';

const parseRepositoryData = (data: IncomingRepositoryData): Repository => ({
  id: data.id,
  fullName: data.full_name,
  description: data.description,
  stargazers_count: data.stargazers_count,
  language: data.language,
  license: data.license?.name,
  updated_at: new Date(data.updated_at),
});

export default parseRepositoryData;
