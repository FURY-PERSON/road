import { BrowserRouter } from 'react-router-dom';
import { useTheme } from 'shared/contexts/ThemeProvider';
import "./styles/index.scss"
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense } from 'react';

function App() {
  const {theme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={<div>Loading languages</div>}>
        <BrowserRouter>
            <Navbar />
            <div className='content'>
              <Sidebar />
              <AppRouter />
            </div>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;