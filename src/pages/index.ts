import { createBrowserRouter, redirect } from 'react-router-dom';
import HistoryPaths from '@services/historyPath';
import tokenStorage from '@services/tokenStorage';
import ErrorBoundary from './Error';

const browserRouter = createBrowserRouter([
  {
    path: HistoryPaths.home.path,
    lazy: () => import('./Home'),
    ErrorBoundary,
  },
  {
    path: HistoryPaths.enterRoom.path,
    lazy: () => import('./EnterRoom'),
    ErrorBoundary,
  },
  {
    path: HistoryPaths.createRoom.path,
    lazy: () => import('./CreateRoom'),
    ErrorBoundary,
  },
  {
    path: HistoryPaths.room.path,
    lazy: () => import('./Room'),
    loader: () => !tokenStorage.checkIsValid() && redirect(HistoryPaths.enterRoom.path),
    ErrorBoundary,
  },
]);

export default browserRouter;
