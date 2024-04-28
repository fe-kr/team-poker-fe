import { create } from 'zustand';

const useVotesStore = create()(set => ({
  votes: {},
  results: null,
  addVote: vote => {
    set(state => ({ ...state, votes: { ...state.votes, [vote.id]: vote } }));
  },
  setResults: results => {
    set(state => ({ ...state, results }));
  },
  setVotes: votes => {
    set(state => ({ ...state, votes }));
  },
  resetVotes: () => {
    set({ votes: {}, results: null });
  },
}));

export default useVotesStore;
