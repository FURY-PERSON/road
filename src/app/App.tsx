import { useTheme } from 'shared/contexts/ThemeProvider';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { AppRouter, AuthRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { PageLoader } from 'widgets/PageLoader';
import { useDispatch } from 'react-redux';
import { userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/constant/localstorage';

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.className = theme;
    dispatch(userActions.initAuthData());
  }, [theme, dispatch]);

  const accessToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);

  if (!accessToken) {
    return (
      <div className={classNames('app', {}, [])}>
        <Suspense fallback={<PageLoader />}>
          <div className="content">
            <AuthRouter />
          </div>
        </Suspense>
      </div>
    );
  }

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
