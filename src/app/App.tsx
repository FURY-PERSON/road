import { Suspense, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@/shared/contexts/ThemeProvider';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppRouter } from '@/app/providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { PageLoader } from '@/widgets/PageLoader';
import { getUserInited, refreshAuthData, userActions } from '@/entities/User';
import { ToggleFeatures } from '@/shared/lib/helpers/features/components/ToggleFeatures/ToggleFeatures';
import { MainLayout } from '@/shared/ui/redesigned/layouts/MainLayout';
import { SvgLoader } from '@/shared/ui/redesigned/SvgLoader';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';

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

  if (!userInited) {
    return (
      <div className={classNames('app_redesigned', {}, [cls.loader])}>
        <SvgLoader width={80} height={80} />
      </div>
    );
  }

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <div className={classNames('app', {}, [])}>
          <Suspense fallback={<PageLoader />}>
            <Navbar />
            <div className="content">
              <Sidebar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      }
      on={
        <div className={classNames('app_redesigned', {}, [])}>
          <Suspense fallback={<PageLoader />}>
            <MainLayout
              header={<Navbar />}
              content={<AppRouter />}
              sidebar={<Sidebar />}
              toolbar={<ScrollToolbar />}
            />
          </Suspense>
        </div>
      }
    />
  );
}

export default App;
