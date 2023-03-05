import { ThemeProvider } from 'shared/contexts/ThemeProvider';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import App from './app/App';
import 'shared/config/i18n/i18n';
import 'app/styles/index.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ErrorBoundary>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ErrorBoundary>,
);
