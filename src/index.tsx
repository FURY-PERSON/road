import { ThemeProvider } from 'shared/contexts/ThemeProvider';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { StoreProvider } from 'app/providers/StoreProvider';
import App from './app/App';
import 'shared/config/i18n/i18n';
import 'app/styles/index.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ErrorBoundary>
    <ThemeProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ThemeProvider>
  </ErrorBoundary>,
);
