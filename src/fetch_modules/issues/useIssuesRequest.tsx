import { useState } from "react";
import { githubService } from "../../axios/reposService";
import { Issue, Repository } from "../../types/data";
import parseIssueData from "./parseIssueData";

type Issues = { [id: string]: Issue[] | [] };

export default function useIssuesRequest() {
  const getIssuesByRepoName = (repoFullName: string) =>
    githubService
      .get(`repos/${repoFullName}/issues`)
      .then((response) => response.data.map((data: any) => parseIssueData(data)));

  const getAllIssues = async (repos: Repository[]) => {
    const results = await Promise.allSettled(
      repos.map(
        (repo) => new Promise<Issue[]>((resolve) => resolve(getIssuesByRepoName(repo.fullName)))
      )
    );
    const issues = results.reduce(
      (prev, result, index) => ({
        ...prev,
        [repos[index].id]: result.status === "fulfilled" ? result.value : [],
      }),
      {} as Issues
    );

    return issues;
  };

  return { getIssuesByRepoName, getAllIssues };
}
