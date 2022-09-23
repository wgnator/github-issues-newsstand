import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { Repository } from "../types/data";

type RepoContext = {
  repos: Repository[] | [];
  setRepos: Dispatch<SetStateAction<RepoContext["repos"]>>;
};

export const RepoContext = createContext({} as RepoContext);

export const RepoContextProvider = ({ children }: { children: ReactNode }) => {
  const [repos, setRepos] = useState([] as Repository[]);
  return <RepoContext.Provider value={{ repos, setRepos }}>{children}</RepoContext.Provider>;
};

export const useRepoContext = () => useContext(RepoContext);
