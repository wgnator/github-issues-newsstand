import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense, useEffect } from 'react';
import { LoadingPage } from '../pages/LoadingPage';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { screenSizeState, useMediaType } from '../atoms/screenSizeState';
import IssuesPageMobile from '../pages/IssuesPageMobile';
import { useSetRecoilState } from 'recoil';

const TopNav = lazy(() => import('./TopNav/TopNav'));
const RepositoriesNav = lazy(() => import('./RepositoriesNav'));
const Main = lazy(() => import('./Main'));

export default function Layout() {
  const queryClient = new QueryClient();
  const setScreenSize = useSetRecoilState(screenSizeState);
  const mediaType = useMediaType();
  useEffect(() => {
    const onWindowResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  return (
    <Suspense fallback={<LoadingPage />}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <TopNav />
        <RepositoriesNav />
        <Main>{mediaType === 'desktop/tablet' ? <Outlet /> : <IssuesPageMobile />}</Main>
        <Toaster />
      </QueryClientProvider>
    </Suspense>
  );
}
