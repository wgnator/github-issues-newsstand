import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ITEMS_PER_PAGE } from '../../consts/consts';
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
  } = useInfiniteQuery<Repository[], Error>(
    ['searchedRepos', searchQuery],
    ({ pageParam = 1 }) => (searchQuery ? searchRepos(searchQuery, pageParam) : []),
    {
      cacheTime: 0,
      initialData: {
        pageParams: [undefined],
        pages: [],
      },
      retry: 1,
      refetchOnWindowFocus: false,

      getNextPageParam: (lastPage, allPages) => {
        return !lastPage || lastPage.length < ITEMS_PER_PAGE
          ? undefined
          : allPages.length + 1;
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
