import { Outlet } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import { LoadingPage } from '../pages/LoadingPage';
import { Toaster } from 'react-hot-toast';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const TopNav = lazy(() => import('./TopNav/TopNav'));
const RepositoriesNav = lazy(() => import('./RepositoriesNav'));
const Main = lazy(() => import('./Main'));

export default function Layout() {
  const queryClient = new QueryClient();
  return (
    <Suspense fallback={<LoadingPage />}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools /> */}
          <TopNav />
          <RepositoriesNav />
          <Main>
            <Outlet />
          </Main>
          <Toaster />
        </QueryClientProvider>
      </RecoilRoot>
    </Suspense>
  );
}
