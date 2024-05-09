import { Topic } from 'types/entity';
import { create } from 'zustand';
import { groupBy } from '@utils/common';

type Topics = { [key: string]: Topic };

interface TopicsState {
  topics: Topics;
  setTopics: (topics: Topics) => void;
  addTopic: (topic: Topic) => void;
}

const useTopicsStore = create<TopicsState>()(set => ({
  topics: {},
  setTopics: topics => {
    const groupedTopics = groupBy(topics, 'id');

    set(state => ({ ...state, topics: groupedTopics }));
  },
  addTopic: topic => {
    set(state => ({ ...state, topics: { ...state.topics, [topic.id]: topic } }));
  },
}));

export default useTopicsStore;
