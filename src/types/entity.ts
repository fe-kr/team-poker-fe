export interface Topic {
  id: string;
  roomId: string;
  title: string;
  description?: string;
  estimation?: number;
}

export interface User {
  id: string;
  name: string;
  type: string;
  roomId: string;
}

export interface Vote {
  id: string;
  vote: number;
  topicId: string;
  userName: string;
}
