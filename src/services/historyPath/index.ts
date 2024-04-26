import { HistoryPath } from './historyPath';

class HistoryPaths {
  static home = new HistoryPath('/');

  static createRoom = new HistoryPath('/create-room');

  static enterRoom = new HistoryPath('/enter-room');

  static room = new HistoryPath('/room/:roomId');

  static roomTopic = new HistoryPath(`${HistoryPaths.room.path}/topic/:topicId?`);
}

export default HistoryPaths;
