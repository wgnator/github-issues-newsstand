import axios from 'axios';
import { GITHUB_API_BASE_URL } from '../consts/api';
import { ERROR_MESSAGE } from '../consts/errors';

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
      return Promise.reject(new Error(ERROR_MESSAGE.API_REQUEST_LIMIT_EXCEEDED));
  },
);
