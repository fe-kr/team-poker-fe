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

  getRoomTopics({ roomId, ...params }) {
    return this.http.get(`topics`, { ...params, searchParams: { roomId } }).json();
  }

  getRoomTopicById({ roomId, topicId, ...params }) {
    return this.http.get(`topics/${topicId}`, { ...params, searchParams: { roomId } }).json();
  }

  createRoomTopic({ body, ...params }) {
    return this.http.post('topics', { ...params, json: body }).json();
  }
}
