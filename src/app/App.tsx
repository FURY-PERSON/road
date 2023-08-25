import { Suspense, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@/shared/contexts/ThemeProvider';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppRouter } from '@/app/providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { PageLoader } from '@/widgets/PageLoader';
import { refreshAuthData, userActions } from '@/entities/User';
import { getUserInited } from '@/entities/User/model/selectors/getUserInited/getUserInited';
import { SvgLoader } from '@/shared/ui/SvgLoader';

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
  );
}

export default App;
