# github-issues-newsstand

Search and subscribe to github repositories and see their issues at once

# How to run / 실행 방법

```bash
git clone https://github.com/wgnator/github-issues-newsstand.git
cd github-issues-newsstand
npm install
npm run dev
```
http://localhost:5173 접속

# At a glance / 미리보기

- Repository Search & Save

![Kapture 2022-09-28 at 21 00 53](https://user-images.githubusercontent.com/69628701/192780822-d8bdb8c7-90bf-4a75-b8fe-a38aedff3984.gif)

- Repository Auto Search with Debouncer / 2 View Modes: Show All(default) & Single Repo Page (by selecting from Repository Nav)

![github_newsstand_desktop_part2](https://user-images.githubusercontent.com/69628701/192781190-56b01786-b718-4813-87f2-86a048f6f3ae.gif)

- Mobile UI

![Kapture 2022-10-09 at 10 19 12](https://user-images.githubusercontent.com/69628701/194733236-7992656c-eb80-4d54-9c3c-10acfac431e2.gif)

# Objectives

- GitHub의 Public Repository를 검색 및 등록하여 Issue들을 모아서 볼 수 있다.

# Project Plan

## State management

RepoSearchText: TopNav component state

RepoSearchResult: React-Query (useInfiniteQuery) / { page: Repository[] }

SavedRepos: LocalStorage & Global(Recoil) / Repository[]<max:4>

Issues: React-Query / Query Key: ['issues', 'repoName', 'openOrClosed', 'page']

## UI & Dataflow Sketch(ver. 1)

<img width="825" alt="Screen Shot 2022-09-23 at 4 03 40 AM" src="https://user-images.githubusercontent.com/69628701/191830897-68a4a9f8-cbd4-4033-aacb-f76905fe9d5c.png">

<img width="977" alt="Screen Shot 2022-09-27 at 1 24 46 AM" src="https://user-images.githubusercontent.com/69628701/192754571-73263dcc-7144-4ffc-bd4d-2cb3aa36746c.png">

## UI & Dataflow Sketch(ver. 2)

<img width="822" alt="Screen Shot 2022-09-28 at 7 17 41 PM" src="https://user-images.githubusercontent.com/69628701/192754475-ee15e284-0f11-4f0a-8b22-41b6aad09013.png">

<img width="1040" alt="Screen Shot 2022-09-27 at 6 57 12 PM" src="https://user-images.githubusercontent.com/69628701/192754594-72251812-ea2d-4f8e-8ae2-8248ff1f85fb.png">

## Tree

```bash
.
├── App.tsx
├── UI_hooks
│   ├── useDetectOutsideClick.ts
│   ├── useIntersectionObserver.ts
│   └── useSwipe.ts
├── atoms
│   ├── reposState.ts
│   └── screenSizeState.ts
├── axios
│   └── reposService.ts
├── components
│   ├── Issues
│   │   ├── IssueItem.tsx
│   │   ├── IssuesBox.tsx
│   │   ├── IssuesBoxMobile.tsx
│   │   └── sections
│   │       ├── IssuesSection.tsx
│   │       ├── IssuesToolbarSection.tsx
│   │       └── PageNavSection.tsx
│   ├── Layout.tsx
│   ├── Main.tsx
│   ├── RepositoriesNav.tsx
│   ├── TopNav
│   │   ├── RepoItem.tsx
│   │   ├── RepoSearchResult.tsx
│   │   ├── SearchInput.tsx
│   │   └── TopNav.tsx
│   └── UI_common
│       ├── AlertDialog.tsx
│       ├── Button.tsx
│       ├── Chip.tsx
│       └── LoadingSpinner.tsx
├── consts
│   ├── api.ts
│   ├── consts.ts
│   └── errors.ts
├── contexts
│   └── RepoContext.tsx
├── fetch_modules
│   ├── issues
│   │   ├── parseIssueData.ts
│   │   ├── useIssuesQuery.tsx
│   │   └── useIssuesRequest.tsx
│   └── repos
│       ├── parseRepoData.ts
│       ├── useReposQuery.tsx
│       └── useReposRequest.tsx
├── main.tsx
├── pages
│   ├── IssuesPage.tsx
│   ├── IssuesPageMobile.tsx
│   ├── LoadingPage.tsx
│   └── PageNotFound.tsx
├── router.tsx
├── styles
│   ├── GlobalStyle.ts
│   └── theme.ts
├── types
│   ├── data.ts
│   └── states.ts
├── utils
│   └── debouncer.ts
└── vite-env.d.ts
```

## Data Types

```
type Issue = {
  id: number;
  repoFullName: string;
  number: number;
  title: string;
  userName: string;
  state: IssueOpenOrClosedState;
  labels: IssueLabel[];
  created_at: Date;
  updated_at: Date;
  comments: number;
  html_url: string;
};

type Repository = {
  id: number;
  fullName: string;
  description: string;
  stargazers_count: number;
  language: string;
  license: string | undefined;
  updated_at: Date;
};
```
