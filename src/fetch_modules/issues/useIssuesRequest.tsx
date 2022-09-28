import { githubService } from '../../axios/reposService';
import { ITEMS_PER_PAGE } from '../../consts/consts';
import { IncomingIssueData, Issue } from '../../types/data';
import { IssueOpenOrClosedState } from '../../types/states';
import parseIssueData from './parseIssueData';

export default function useIssuesRequest() {
  const getIssuesByRepoName = (
    repoFullName: string,
    openOrClose: IssueOpenOrClosedState,
    page: number,
  ): Promise<Issue[]> =>
    githubService
      .get(
        `repos/${repoFullName}/issues?accept=application/vnd.github+json&state=${openOrClose}&page=${page}&per_page=${ITEMS_PER_PAGE}`,
      )
      .then((response) =>
        response.data.map((data: IncomingIssueData) =>
          parseIssueData(repoFullName, data),
        ),
      );

  return { getIssuesByRepoName };
}
