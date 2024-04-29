import { groupBy } from '@utils/common';
import { create } from 'zustand';

const useTopicsStore = create()(set => ({
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
