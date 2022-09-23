import { Outlet } from "react-router-dom";
import Main from "./Main";
import GNB from "./GNB/GNB";
import RepositoriesNav from "./RepositoriesNav";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Layout() {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <GNB />
        <Main>
          <Outlet />
          <RepositoriesNav />
        </Main>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
