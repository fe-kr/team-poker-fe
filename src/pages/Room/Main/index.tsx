import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'ui-kit/Button';
import Card from 'ui-kit/Card';
import Chip from 'ui-kit/Chip';
import { RoomEvent } from '@constants/enum';
import { playingCardOptions } from '@constants/options';
import useUserContext from '@hooks/useUserContext';
import useVotesStore from '@hooks/useVotesStore';
import wsClient from '@services/wsClient';
import {
  CardsList,
  ControlsContainer,
  ResultsContainer,
  Main as StyledMain,
  Vote,
  VotesContainer,
} from './styles';

const Main = () => {
  const { topicId } = useParams();
  const currentUser = useUserContext();
  const { results, votes, addVote, resetVotes } = useVotesStore();

  const isVotesRevealed = !!results;
  const votesList = useMemo(() => Object.values(votes), [votes]);

  const onSelectVote = e => {
    const { vote } = e.currentTarget.dataset;

    addVote({ vote, topicId, userName: currentUser.name, id: currentUser.id });

    wsClient.emit(RoomEvent.VoteSubmitted, { vote, topicId });
  };

  const onShowResults = () => {
    wsClient.emit(RoomEvent.VotesRevealed, topicId);
  };

  const onResetResults = () => {
    resetVotes();

    wsClient.emit(RoomEvent.VotesReset, topicId);
  };

  return (
    <StyledMain>
      {currentUser.isAdmin && (
        <ControlsContainer>
          {!isVotesRevealed && (
            <Button $size="small" disabled={!votesList.length} onClick={onShowResults}>
              Show Results
            </Button>
          )}

          {isVotesRevealed && (
            <ResultsContainer>
              <b>Min: {results.min}</b>
              <b>Max: {results.max}</b>
              <b>Mean: {results.mean}</b>
              <b>Median: {results.median}</b>
            </ResultsContainer>
          )}

          {isVotesRevealed && (
            <Button $size="small" onClick={onResetResults}>
              Reset Results
            </Button>
          )}
        </ControlsContainer>
      )}

      <VotesContainer>
        {Object.values(votes).map(({ id, userName, vote }) => {
          const isCurrentUser = id === currentUser.id;

          return (
            <Vote key={id}>
              <Card $isFlipSide={!isCurrentUser && !isVotesRevealed}>{vote}</Card>
              <Chip name={userName} $size="large" />
            </Vote>
          );
        })}
      </VotesContainer>

      {!isVotesRevealed && (
        <CardsList>
          {playingCardOptions.map(value => (
            <Card
              as="li"
              tabIndex={1}
              key={value}
              data-vote={value}
              onClick={onSelectVote}
              $size="large"
            >
              {value}
            </Card>
          ))}
        </CardsList>
      )}
    </StyledMain>
  );
};

export { Main as Component };
