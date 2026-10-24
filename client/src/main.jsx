import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { VisitorQuestionPage } from './components/VisitorQuestionPage.jsx';
import './styles.css';

const RootPage = window.location.pathname === '/visitor-question' ? VisitorQuestionPage : App;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootPage />
  </StrictMode>,
);
