# github-issues-newsstand
Search and subscribe to github repositories and see their issues at once

# Objectives
- GitHub의 Public Repository를 검색 및 등록하여 Issue들을 모아서 볼 수 있다.

# Project Plan 

## State Management

RepoSearchText: string -> GNB component state

RepoSearchResult: Repository[] -> React-Query

SavedRepos: Repository[]<max:4> -> LocalStorage & Global(Recoil)

Issues: {
	[repository]: Issue[]
	} -> React-Query

SortedIssues: Object.values(Issues).flat().reduce()

## UI 

<img width="825" alt="Screen Shot 2022-09-23 at 4 03 40 AM" src="https://user-images.githubusercontent.com/69628701/191830897-68a4a9f8-cbd4-4033-aacb-f76905fe9d5c.png">


## Data Types

```
type Issue = {
  id: string;
  number: number;
  title: string;
  userName: string;
  state: "open" | "closed";
  status: string;
  created_at: Date;
  updated_at: Date;
  comments: number;
  url: string;
};

type Repository = {
  id: string;
  fullName: string;
  description: string;
  stargazers_count: number;
  language: string;
  license: string;
  updated_at: Date;
};
```
