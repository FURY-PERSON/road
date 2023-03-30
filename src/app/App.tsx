import { useTheme } from 'shared/contexts/ThemeProvider';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useLayoutEffect } from 'react';
import { PageLoader } from 'widgets/PageLoader';
import { useDispatch } from 'react-redux';
import { refreshAuthData, userActions } from 'entities/User';

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    document.body.className = theme;
    dispatch(userActions.initAuthData());
    dispatch(refreshAuthData());
  }, [theme, dispatch]);

  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback={<PageLoader />}>
        <Navbar />
        <div className="content">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
