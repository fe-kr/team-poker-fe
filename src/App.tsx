import React from 'react';
import { RouterProvider } from 'react-router-dom';

import pagesRouter from './pages';

const App = () => {
  return (
    <>
      <RouterProvider router={pagesRouter} />
    </>
  );
};

export default App;
