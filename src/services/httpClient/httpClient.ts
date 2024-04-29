import ky from 'ky';

export class HttpClient {
  http;

  init(options) {
    this.http = ky.create(options);
  }

  signUp({ body, ...params }) {
    return this.http.post('sign-up', { ...params, json: body });
  }

  signIn({ body, ...params }) {
    return this.http.post('sign-in', { ...params, json: body });
  }

  getRoom({ roomId, ...params }) {
    return this.http.get(`rooms/${roomId}`, { ...params }).json();
  }

  getRoomTopicById({ roomId, topicId, ...params }) {
    return this.http.get(`topics/${topicId}`, { ...params, searchParams: { roomId } }).json();
  }

  getVotesByTopicId({ topicId, ...params }) {
    return this.http.get(`votes/${topicId}`, { ...params }).json();
  }

  createRoomTopic({ body, ...params }) {
    return this.http.post('topics', { ...params, json: body }).json();
  }

  updateRoomTopic({ topicId, body, ...params }) {
    return this.http.put(`topics/${topicId}`, { ...params, json: body }).json();
  }
}
