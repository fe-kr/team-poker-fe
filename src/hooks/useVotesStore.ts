import { Vote } from 'types/entity';
import { create } from 'zustand';
import { groupBy } from '@utils/common';

type Votes = { [key: string]: Vote };
type Results = { [key: string]: number };

const initialVotesState = {
  votes: {},
  results: null,
};

interface VotesState {
  votes: Votes;
  addVote: (vote: Vote) => void;
  setVotes: (votes: Votes) => void;
  resetVotes: () => void;
  results: Results | null;
  setResults: (results: Results) => void;
}

const useVotesStore = create<VotesState>()(set => ({
  ...initialVotesState,
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
    set(initialVotesState);
  },
}));

export default useVotesStore;
