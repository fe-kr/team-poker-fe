import { HistoryPath } from './historyPath';

class HistoryPaths {
  static home = new HistoryPath('/');

  static createRoom = new HistoryPath('/create-room');

  static enterRoom = new HistoryPath('/enter-room');

  static room = new HistoryPath('/room/:roomId/:topicId?');
}

export default HistoryPaths;
