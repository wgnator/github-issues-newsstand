import axios from "axios";
import { GITHUB_API_BASE_URL } from "../consts/api";
import { ITEMS_PER_PAGE } from "../consts/consts";

export const githubService = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});
