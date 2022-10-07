import { useQuery, useQueryClient } from '@tanstack/react-query';
import useIssuesRequest from './useIssuesRequest';
import { useLayoutEffect, useState } from 'react';
import { IssueOptions } from '../../components/Issues/IssuesBox';
import toast from 'react-hot-toast';
import { Issue } from '../../types/data';
import { AxiosError } from 'axios';
import { ERROR_MESSAGE } from '../../consts/errors';

export default function useIssuesQuery(repoName: string, selectedOptions: IssueOptions) {
  const [hasNextPage, setHasNextPage] = useState<boolean | 'pending'>(false);
  const { openOrClosed, page } = selectedOptions;

  const { getIssuesByRepoName } = useIssuesRequest();
  const queryClient = useQueryClient();

  const { isLoading, isFetching, isError, data } = useQuery<Issue[], AxiosError>(
    ['issues', repoName, openOrClosed, page],
    () => getIssuesByRepoName(repoName, openOrClosed, page),
    {
      retry: (failureCount, error) =>
        !(error.message === ERROR_MESSAGE.API_REQUEST_LIMIT_EXCEEDED || failureCount > 1),
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      onError: (error) => toast.error('Issues fetch failed: ' + error.message, { duration: 3000 }),
    },
  );

  useLayoutEffect(() => {
    setHasNextPage('pending');
    queryClient
      .fetchQuery(['issues', repoName, openOrClosed, page + 1], () =>
        getIssuesByRepoName(repoName, openOrClosed, page + 1),
      )
      .then((data) => {
        setHasNextPage(data.length > 0);
      })
      .catch(() => setHasNextPage(false));
  }, [data]);

  return {
    isLoading,
    isFetching,
    isError,
    data,
    hasNextPage,
  };
}
