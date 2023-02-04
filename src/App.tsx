import { Suspense } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async';
import { MainPageAsync } from './pages/MainPage/MainPage.async';
import "./styles/index.scss"
import { ThemeProvider } from './theme/ThemeProvider';
import { useTheme } from './theme/useTheme';


function App() {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={`app ${theme}`}>
      <button onClick={toggleTheme} type="button">Change Theme</button>
      <BrowserRouter>
          <Link to="/">To Main</Link>
          <Link to="/about">To About</Link>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path={'/'} element={<MainPageAsync />}/>
              <Route path={'/about'} element={<AboutPageAsync />}/>
            </Routes>
          </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;