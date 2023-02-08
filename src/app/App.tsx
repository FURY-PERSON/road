import { Suspense } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useTheme } from 'shared/contexts/ThemeProvider';
import "./styles/index.scss"
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';

function App() {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme} type="button">Change Theme</button>
      <BrowserRouter>
          <Link to="/">To Main</Link>
          <Link to="/about">To About</Link>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path={'/'} element={<MainPage />}/>
              <Route path={'/about'} element={<AboutPage />}/>
            </Routes>
          </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;