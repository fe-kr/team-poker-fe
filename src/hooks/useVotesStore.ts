import { create } from 'zustand';

const useVotesStore = create()(set => ({
  votes: {},
  results: null,
  addVote: voteData => {
    const data = { [voteData.user.id]: voteData };

    set(state => ({ ...state, votes: { ...state.votes, ...data } }));
  },
  setResults: results => {
    set(state => ({ ...state, results }));
  },
  setVotes: voteData => {
    set(state => ({ ...state, votes: voteData }));
  },
  resetVotes: () => {
    set({ votes: {}, results: null });
  },
}));

export default useVotesStore;
