import { Suspense } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async';
import { MainPageAsync } from './pages/MainPage/MainPage.async';
import "./styles.css"

function App() {
  return (
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
  );
}

export default App;