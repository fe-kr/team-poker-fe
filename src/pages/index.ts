import { createBrowserRouter, redirect } from 'react-router-dom';
import HistoryPaths from '@services/historyPath';
import tokenStorage from '@services/tokenStorage';
import ErrorBoundary from './Error';

const browserRouter = createBrowserRouter([
  {
    ErrorBoundary,
    children: [
      {
        path: HistoryPaths.home.path,
        lazy: () => import('./Home'),
      },
      {
        path: HistoryPaths.enterRoom.path,
        lazy: () => import('./EnterRoom'),
      },
      {
        path: HistoryPaths.createRoom.path,
        lazy: () => import('./CreateRoom'),
      },
      {
        path: HistoryPaths.room.path,
        lazy: () => import('./Room'),
        loader: () => !tokenStorage.checkIsValid() && redirect(HistoryPaths.enterRoom.path),
        children: [
          {
            path: HistoryPaths.roomTopic.path,
            lazy: () => import('./Room/Main'),
          },
        ],
      },
    ],
  },
]);

export default browserRouter;
