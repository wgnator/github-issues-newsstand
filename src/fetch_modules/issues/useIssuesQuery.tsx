import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { savedRepoNames } from "../../atoms/reposState";
import { IssueOptions, Issue } from "../../types/data";
import useIssuesRequest from "./useIssuesRequest";

import { useEffect, useState } from "react";

export default function useIssuesQuery(selectedOptions: IssueOptions) {
  const [hasNextPage, setHasNextPage] = useState(false);
  const { selectedRepoId, openOrClosed, page } = selectedOptions;
  const savedRepos = useRecoilValue(savedRepoNames);
  const { getIssuesByRepoName } = useIssuesRequest();

  const useAllIssueQueries = (page: number): UseQueryResult<Issue[]>[] =>
    useQueries({
      queries: savedRepos.map((repo) => ({
        queryKey: ["issues", repo.id, openOrClosed, page],
        queryFn: () => getIssuesByRepoName(repo.fullName, openOrClosed, page),
        staleTime: Infinity,
        retry: 1,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      })),
    });
  const results = useAllIssueQueries(page);
  const nextAllIssues = useAllIssueQueries(page + 1);

  const getHasNextPage = (
    nextPageData: ReturnType<typeof useAllIssueQueries>,
    selectedRepoId: string | undefined
  ): boolean => {
    if (selectedRepoId)
      if (nextPageData[savedRepos.findIndex((e) => e.id === Number(selectedRepoId))]?.data)
        return nextPageData.length > 0;
      else return false;
    return nextAllIssues.some((result) => (result?.data ? result?.data.length > 0 : false));
  };

  useEffect(() => {
    setHasNextPage(getHasNextPage(nextAllIssues, selectedRepoId));
  }, [results]);

  return { results, hasNextPage };
}
