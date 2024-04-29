import { groupBy } from '@utils/common';
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
    const groupedVotes = groupBy(votes, 'id');

    set(state => ({ ...state, votes: groupedVotes }));
  },
  resetVotes: () => {
    set({ votes: {}, results: null });
  },
}));

export default useVotesStore;
