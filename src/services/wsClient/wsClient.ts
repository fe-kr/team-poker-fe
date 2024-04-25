import { io } from 'socket.io-client';

export class WsClient {
  ws;
  uri;

  constructor(uri) {
    this.uri = uri;
  }

  init(options) {
    this.ws = io(this.uri, options);
  }

  on(event, listener) {
    return this.ws.on(event, listener);
  }

  emit(event, args) {
    return this.ws.emit(event, args);
  }

  disconnect() {
    return this.ws.disconnect();
  }
}
