import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Theme } from '@components';
import pagesRouter from './pages';
import GlobalStyle from './styles';

const App = () => {
  return (
    <Theme>
      <GlobalStyle />
      <RouterProvider router={pagesRouter} />
    </Theme>
  );
};

export default App;
