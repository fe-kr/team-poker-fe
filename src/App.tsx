import { RouterProvider } from 'react-router-dom';
import Dialog from 'ui-kit/Dialog';
import ThemeProvider from 'ui-kit/ThemeProvider';
import ToastsContainer from 'ui-kit/ToastsContainer';
import useHttpInit from '@hooks/useHttpInit';
import pagesRouter from './pages';
import GlobalStyle from './styles';

const App = () => {
  useHttpInit();

  return (
    <ThemeProvider>
      <GlobalStyle />
      <RouterProvider router={pagesRouter} />
      <Dialog />
      <ToastsContainer position="bottom-right" />
    </ThemeProvider>
  );
};

export default App;
