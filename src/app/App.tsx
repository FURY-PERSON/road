import { BrowserRouter } from 'react-router-dom';
import { useTheme } from 'shared/contexts/ThemeProvider';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { PageLoader } from 'widgets/PageLoader';

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback={<PageLoader />}>
        <BrowserRouter>
          <Navbar />
          <div className="content">
            <Sidebar />
            <AppRouter />
          </div>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
