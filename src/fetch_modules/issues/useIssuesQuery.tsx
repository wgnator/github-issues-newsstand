import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { savedReposState } from "../../atoms/reposState";
import useIssuesRequest from "./useIssuesRequest";

export default function useIssuesQuery() {
  const savedRepos = useRecoilValue(savedReposState);
  const { getAllIssues } = useIssuesRequest();
  const { data, isError } = useQuery(["issues"], () => getAllIssues(savedRepos));
  const issues = data;
  return { issues, isError };
}
