import HistoryPath from '@services/historyPath';

export class HistoryPaths {
  static home = new HistoryPath('/');

  static createRoom = new HistoryPath('/create-room');

  static enterRoom = new HistoryPath('/enter-room');

  static room = new HistoryPath('/room/:id');
}
