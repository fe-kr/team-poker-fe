import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Dialog from 'ui-kit/Dialog';
import theme from 'ui-kit/theme';
import ToastsContainer from 'ui-kit/ToastsContainer';
import useHttpInit from '@hooks/useHttpInit';
import pagesRouter from './pages';
import GlobalStyle from './styles';

const App = () => {
  useHttpInit();

  return (
    <ThemeProvider theme={theme.light}>
      <GlobalStyle />
      <RouterProvider router={pagesRouter} />
      <Dialog />
      <ToastsContainer />
    </ThemeProvider>
  );
};

export default App;
