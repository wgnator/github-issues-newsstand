import { useInfiniteQuery } from '@tanstack/react-query';
import useIssuesRequest from './useIssuesRequest';
import toast from 'react-hot-toast';
import { Issue } from '../../types/data';
import { AxiosError } from 'axios';
import { ERROR_MESSAGE } from '../../consts/errors';
import { ITEMS_PER_PAGE } from '../../consts/consts';
import { IssueOpenOrClosedState } from '../../types/states';
import { useLayoutEffect, useState } from 'react';

export default function useIssuesQuery(
  repoName: string,
  openOrClosed: IssueOpenOrClosedState,
  currentPage: number,
) {
  const { getIssuesByRepoName } = useIssuesRequest();
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const getHasNextPage = (data: Issue[][]) =>
    data.length === currentPage &&
    fetchNextPage({ pageParam: currentPage + 1 }).then((result) => {
      console.log('next page fetched:', result);
      setHasNextPage(
        (result?.data?.pages[currentPage] && result.data.pages[currentPage].length > 0) || false,
      );
    });

  const { fetchNextPage, isLoading, isFetching, isFetchingNextPage, isError, error, data } =
    useInfiniteQuery<Issue[], AxiosError>(
      ['issues', repoName, openOrClosed],
      ({ pageParam = 1 }) => getIssuesByRepoName(repoName, openOrClosed, pageParam),
      {
        retry: (failureCount, error) =>
          !(error.message === ERROR_MESSAGE.API_REQUEST_LIMIT_EXCEEDED || failureCount > 1),
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        onSuccess: (data) => getHasNextPage(data?.pages),
        onError: (error) =>
          toast.error('Issues fetch failed: ' + error.message, { duration: 3000 }),
        getNextPageParam: (lastPage, allPages) =>
          !lastPage || lastPage.length < ITEMS_PER_PAGE ? undefined : allPages.length + 1,
      },
    );

  useLayoutEffect(() => {
    data && getHasNextPage(data.pages);
  }, [currentPage]);

  return {
    fetchNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isError,
    error,
    data,
    hasNextPage,
  };
}
