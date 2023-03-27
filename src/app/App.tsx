import { useTheme } from 'shared/contexts/ThemeProvider';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { AppRouter, AuthRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { PageLoader } from 'widgets/PageLoader';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/constant/localstorage';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { LanguageSwitcher } from 'features/LanguageSwitcher';
import cls from './App.module.scss';

const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const authData = useSelector(getUserAuthData);

  useEffect(() => {
    document.body.className = theme;
    dispatch(userActions.initAuthData());
  }, [theme, dispatch]);

  if (!accessToken || !authData) {
    return (
      <div className={classNames('app', {}, [])}>
        <Suspense fallback={<PageLoader />}>
          <div className="content">
            <AuthRouter />

            <div className={cls.switchers}>
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
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
