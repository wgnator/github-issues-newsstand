import { githubService } from "../../axios/reposService";
import { ITEMS_PER_PAGE } from "../../consts/consts";
import { Issue, Issues, IssueOpenOrClosedStatus, Repository } from "../../types/data";
import parseIssueData from "./parseIssueData";

export default function useIssuesRequest() {
  const getIssuesByRepoName = (
    repoFullName: string,
    openOrClose: IssueOpenOrClosedStatus,
    page: number
  ): Promise<Issue[]> =>
    githubService
      .get(
        `repos/${repoFullName}/issues?accept=application/vnd.github+json&state=${openOrClose}&page=${page}&per_page=${ITEMS_PER_PAGE}`
      )
      .then((response) => response.data.map((data: any) => parseIssueData(repoFullName, data)));

  // const getAllIssues = async (
  //   repos: Repository[],
  //   openOrClose: IssueOpenOrClosedStatus,
  //   page: number
  // ) => {
  //   const results = await Promise.allSettled(
  //     repos.map(
  //       (repo) =>
  //         new Promise<Issue[]>((resolve) =>
  //           resolve(getIssuesByRepoName(repo.fullName, openOrClose, page))
  //         )
  //     )
  //   );
  //   const issues = results.reduce(
  //     (prev, result, index) => ({
  //       ...prev,
  //       [repos[index].id]: result.status === "fulfilled" ? result.value : [],
  //     }),
  //     {} as Issues
  //   );

  //   return issues;
  // };

  return { getIssuesByRepoName };
}
