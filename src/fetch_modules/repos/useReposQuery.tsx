import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ITEMS_PER_PAGE } from '../../consts/consts';
import { ERROR_MESSAGE } from '../../consts/errors';
import { Repository } from '../../types/data';
import useReposRequest from './useReposRequest';

export default function useReposQuery() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { searchRepos } = useReposRequest();
  const {
    fetchNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
    data,
  } = useInfiniteQuery<Repository[], AxiosError>(
    ['searchedRepos', searchQuery],
    ({ pageParam = 1 }) => (searchQuery ? searchRepos(searchQuery, pageParam) : []),
    {
      cacheTime: 0,
      initialData: {
        pageParams: [undefined],
        pages: [],
      },
      retry: (failureCount, error) =>
        !(error.message === ERROR_MESSAGE.API_REQUEST_LIMIT_EXCEEDED || failureCount > 1),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      onError: (error) =>
        toast.error('Repository search failed: ' + error.message, { duration: 3000 }),
      getNextPageParam: (lastPage, allPages) => {
        return !lastPage || lastPage.length < ITEMS_PER_PAGE ? undefined : allPages.length + 1;
      },
    },
  );

  return {
    searchQuery,
    setSearchQuery,
    data,
    fetchNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
  };
}
