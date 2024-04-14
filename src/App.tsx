import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Theme } from '@components';
import pagesRouter from './pages';

const App = () => {
  return (
    <Theme>
      <RouterProvider router={pagesRouter} />
    </Theme>
  );
};

export default App;
