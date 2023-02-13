import { BrowserRouter, Link } from 'react-router-dom';
import { useTheme } from 'shared/contexts/ThemeProvider';
import "./styles/index.scss"
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { AppRouter } from 'app/providers/router';

function App() {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme} type="button">Change Theme</button>
      <BrowserRouter>
          <Link to="/">To Main</Link>
          <Link to="/about">To About</Link>
          <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;