import { create } from 'zustand';

const useTopicsStore = create()(set => ({
  topics: [],
  setTopics: topics => {
    set(state => ({ ...state, topics }));
  },
  addTopic: topic => {
    set(state => ({ ...state, topics: [...state.topics, topic] }));
  },
  deleteTopic: id => {
    set(state => ({ ...state, topics: state.topics.filter(topic => topic.id !== id) }));
  },
}));

export default useTopicsStore;
