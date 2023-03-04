import './polyfill/install';

import { lazy, StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { injectGlobalStyle } from './global.styles';

const App = lazy(() => import('./components/application/App'));

injectGlobalStyle();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
