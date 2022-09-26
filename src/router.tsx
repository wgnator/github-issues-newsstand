import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import IssuesPage from "./pages/IssuesPage";
import { PageNotFound } from "./pages/PageNotFound";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<IssuesPage />} />
          <Route path=":repoName" element={<IssuesPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
