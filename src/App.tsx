import { RecoilRoot } from 'recoil';
import Router from './router';
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <Router />
      </RecoilRoot>
    </>
  );
}

export default App;
