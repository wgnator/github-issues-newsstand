import { githubService } from "../../axios/reposService";
import { ITEMS_PER_PAGE } from "../../consts/consts";
import parseRepositoryData from "./parseRepoData";

export default function useReposRequest() {
  const searchRepos = (queryString: string, page: number) =>
    githubService
      .get(`search/repositories?q=${queryString}&page=${page}&per_page=${ITEMS_PER_PAGE}`)
      .then((response) =>
        response.data.items.map((item: any) => {
          return parseRepositoryData(item);
        })
      );
  return { searchRepos };
}
