import { BrowserRouter } from 'react-router-dom';
import { useTheme } from 'shared/contexts/ThemeProvider';
import "./styles/index.scss"
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';

function App() {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme} type="button">Change Theme</button>
      <BrowserRouter>
          <Navbar />
          <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;