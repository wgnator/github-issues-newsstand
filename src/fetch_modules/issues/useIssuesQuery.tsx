import { useQuery, useQueryClient } from '@tanstack/react-query';

import useIssuesRequest from './useIssuesRequest';
import { useEffect, useState } from 'react';
import { IssueOptions } from '../../components/Issues/IssuesBox';

export default function useIssuesQuery(repoName: string, selectedOptions: IssueOptions) {
  const [hasNextPage, setHasNextPage] = useState(false);
  const { openOrClosed, page } = selectedOptions;

  const { getIssuesByRepoName } = useIssuesRequest();
  const queryClient = useQueryClient();

  const { isLoading, isError, error, data } = useQuery(
    ['issues', repoName, openOrClosed, page],
    () => getIssuesByRepoName(repoName, openOrClosed, page),
    {
      staleTime: Infinity,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );

  const getHasNextPage = () =>
    queryClient
      .fetchQuery(['issues', repoName, openOrClosed, page + 1], () =>
        getIssuesByRepoName(repoName, openOrClosed, page + 1),
      )
      .then((data) => data.length > 0 && setHasNextPage(true));

  useEffect(() => {
    getHasNextPage();
  }, [data]);

  return {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
  };
}
