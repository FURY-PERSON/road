import { ThemeProvider } from 'shared/contexts/ThemeProvider';
import { createRoot } from 'react-dom/client';
import App from './app/App';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <ThemeProvider>
    <App/>
  </ThemeProvider>
);
