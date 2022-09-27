import { githubService } from '../../axios/reposService';
import { ITEMS_PER_PAGE } from '../../consts/consts';
import { ERROR_MESSAGE } from '../../consts/errors';
import { IncomingRepositoryData } from '../../types/data';
import parseRepositoryData from './parseRepoData';

export default function useReposRequest() {
  const searchRepos = (queryString: string, page: number) =>
    queryString
      ? githubService
          .get(
            `search/repositories?q=${queryString}&page=${page}&per_page=${ITEMS_PER_PAGE}`,
          )
          .then((response) =>
            response.data.items.map((item: IncomingRepositoryData) => {
              return parseRepositoryData(item);
            }),
          )
          .catch((error) => {
            throw new Error(error.message);
          })
      : new Promise(() => {
          throw new Error(ERROR_MESSAGE.NO_QUERY_STRING_RECEIVED);
        });
  return { searchRepos };
}
