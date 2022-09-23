import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ITEMS_PER_PAGE } from "../../consts/consts";
import { Repository } from "../../types/data";
import useReposRequest from "./useReposRequest";

export default function useReposQuery() {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchRepos } = useReposRequest();
  const { fetchNextPage, isLoading, isFetchingNextPage, hasNextPage, isError, error, data } =
    useInfiniteQuery(
      ["repos", searchQuery],
      ({ pageParam = 0 }) => searchRepos(searchQuery, pageParam),
      {
        retry: 1,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        getNextPageParam: (lastPage, allPages) => {
          console.log("lastPage", lastPage);
          return lastPage.length < ITEMS_PER_PAGE ? undefined : allPages.length + 1;
        },
      }
    );
  console.log(data);
  const repos: Repository[] | undefined = data && data.pages ? data.pages.flat() : undefined;

  return {
    searchQuery,
    setSearchQuery,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
    repos,
  };
}
