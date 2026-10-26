import { useEffect, useState } from 'react';
import App from './App.jsx';
import { VisitorQuestionPage } from './components/VisitorQuestionPage.jsx';

function matchVisitorRoute() {
  const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const validPaths = ['/visitor-question', '/visitor-questions', '/visitor-qustion'];
  const validHashes = ['#/visitor-question', '#visitor-question', '#/visitor-questions', '#visitor-questions'];
  return validPaths.includes(path) || validHashes.includes(hash);
}

export function RootRouter() {
  const [isVisitorPage, setIsVisitorPage] = useState(matchVisitorRoute);

  useEffect(() => {
    const handleLocationChange = () => {
      setIsVisitorPage(matchVisitorRoute());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  return isVisitorPage ? <VisitorQuestionPage /> : <App />;
}
