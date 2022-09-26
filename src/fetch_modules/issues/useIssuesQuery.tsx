import {
  QueryClient,
  useInfiniteQuery,
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { savedRepoNames } from "../../atoms/reposState";
import { IssueOptions, IssueOpenOrClosedStatus, Issue } from "../../types/data";
import useIssuesRequest from "./useIssuesRequest";
import { ITEMS_PER_PAGE } from "../../consts/consts";
import { useEffect, useState } from "react";

export default function useIssuesQuery(selectedOptions: IssueOptions) {
  const [hasNextPage, setHasNextPage] = useState(false);
  const { selectedRepoName, openOrClosed, page } = selectedOptions;
  const savedRepos = useRecoilValue(savedRepoNames);
  const { getIssuesByRepoName } = useIssuesRequest();

  const [isLoading, setIsLoading] = useState(true);
  const useAllIssueQueries = (page: number): UseQueryResult<Issue[]>[] =>
    useQueries({
      queries: savedRepos.map((repo) => ({
        queryKey: ["issues", repo.fullName, openOrClosed, page],
        queryFn: () => getIssuesByRepoName(repo.fullName, openOrClosed, page),
        staleTime: Infinity,
        retry: 1,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      })),
    });
  const results = useAllIssueQueries(page);
  const nextAllIssues = useAllIssueQueries(page + 1);

  useEffect(() => {
    if (selectedRepoName) {
      const nextPageData =
        nextAllIssues[savedRepos.findIndex((e) => e.fullName === selectedRepoName)]?.data;
      if (nextPageData) setHasNextPage(nextPageData.length > 0);
    } else {
      setHasNextPage(
        nextAllIssues.some((result) => (result?.data ? result?.data.length > 0 : false))
      );
    }
  }, [results]);

  return { results, isLoading, hasNextPage };
}
