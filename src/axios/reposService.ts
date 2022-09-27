import axios from 'axios';
import { GITHUB_API_BASE_URL } from '../consts/api';

export const githubService = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

githubService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response.status === 403 &&
      error.response.data.message.includes('API rate limit exceeded')
    )
      throw new Error(
        'API 요청 횟수를 초과하였습니다. 자동검색기능을 끄시고 잠시 후 시도해 주세요.',
      );
  },
);
