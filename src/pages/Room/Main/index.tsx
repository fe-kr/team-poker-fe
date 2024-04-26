import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'ui-kit/Button';
import Card from 'ui-kit/Card';
import Chip from 'ui-kit/Chip';
import { RoomEvent, UserType } from '@constants/enum';
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

  const isCurrentUserAdmin = currentUser.type === UserType.Admin;
  const isVotesRevealed = !!results;
  const votesList = useMemo(() => Object.values(votes), [votes]);

  const onSelectVote = e => {
    const { vote } = e.currentTarget.dataset;

    addVote({ vote, topicId, user: currentUser });

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
      {isCurrentUserAdmin && (
        <ControlsContainer>
          {!isVotesRevealed && (
            <Button $size="small" disabled={!votesList.length} onClick={onShowResults}>
              Show Results
            </Button>
          )}

          {isVotesRevealed && (
            <Button $size="small" onClick={onResetResults}>
              Reset Results
            </Button>
          )}
        </ControlsContainer>
      )}

      <VotesContainer>
        {Object.values(votes).map(({ user, vote }) => {
          const isCurrentUser = user.id === currentUser.id;

          return (
            <Vote key={user.id}>
              <Card $isFlipSide={!isCurrentUser && !isVotesRevealed}>{vote}</Card>
              <Chip name={user.name} $size="large" />
            </Vote>
          );
        })}
      </VotesContainer>

      {isVotesRevealed && (
        <ResultsContainer>
          <span>Min: {results.min}</span>
          <span>Max: {results.max}</span>
          <span>Mean: {results.mean}</span>
        </ResultsContainer>
      )}

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
