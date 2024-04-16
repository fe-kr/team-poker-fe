import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from 'ui-kit/theme';
import pagesRouter from './pages';
import GlobalStyle from './styles';

const App = () => {
  return (
    <ThemeProvider theme={theme.light}>
      <GlobalStyle />
      <RouterProvider router={pagesRouter} />
    </ThemeProvider>
  );
};

export default App;
