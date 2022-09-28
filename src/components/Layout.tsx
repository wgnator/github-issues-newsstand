import { Outlet } from 'react-router-dom';
import Main from './Main';
import TopNav from './TopNav/TopNav';
import RepositoriesNav from './RepositoriesNav';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Layout() {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools /> */}
        <TopNav />
        <RepositoriesNav />
        <Main>
          <Outlet />
        </Main>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
