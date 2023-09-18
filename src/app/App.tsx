import { Suspense, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@/shared/contexts/ThemeProvider';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppRouter } from '@/app/providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { PageLoader } from '@/widgets/PageLoader';
import { getUserInited, refreshAuthData, userActions } from '@/entities/User';
import { SvgLoader } from '@/shared/ui/deprecated/SvgLoader';
import { ToggleFeatures } from '@/shared/lib/helpers/ToggleFeatures/ToggleFeatures';
import { MainLayout } from '@/shared/ui/redesigned/MainLayout';

import cls from './App.module.scss';

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    document.body.className = theme;
    dispatch(userActions.initAuthData());
    dispatch(refreshAuthData());
  }, [theme, dispatch]);

  const userInited = useSelector(getUserInited);

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <div className={classNames('app', {}, [])}>
          <Suspense fallback={<PageLoader />}>
            <Navbar />
            <div className="content">
              <Sidebar />
              {userInited ? (
                <AppRouter />
              ) : (
                <div className={cls.loader}>
                  <SvgLoader />
                </div>
              )}
            </div>
          </Suspense>
        </div>
      }
      on={
        <div className={classNames('app_redesigned', {}, [])}>
          <Suspense fallback={<PageLoader />}>
            {userInited ? (
              <MainLayout
                header={<Navbar />}
                content={<AppRouter />}
                sidebar={<Sidebar />}
                toolbar={<div>123</div>}
              />
            ) : (
              <div className={cls.loader}>
                <SvgLoader />
              </div>
            )}
          </Suspense>
        </div>
      }
    />
  );
}

export default App;
