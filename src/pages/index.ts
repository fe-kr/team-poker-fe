import { createBrowserRouter } from 'react-router-dom';
import { HistoryPaths } from '@constants/history';
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
    ErrorBoundary,
  },
]);

export default browserRouter;
