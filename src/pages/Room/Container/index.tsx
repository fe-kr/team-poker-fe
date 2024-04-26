import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useToasts from 'ui-kit/useToasts';
import { RoomEvent } from '@constants/enum';
import useRefValue from '@hooks/useRefValue';
import useTopicsStore from '@hooks/useTopicsStore';
import { UserContext } from '@hooks/useUserContext';
import useUsersStore from '@hooks/useUsersStore';
import useVotesStore from '@hooks/useVotesStore';
import HistoryPaths from '@services/historyPath';
import httpClient from '@services/httpClient';
import tokenStorage from '@services/tokenStorage';
import wsClient from '@services/wsClient';
import { Container } from './styles';

const RoomContainer = ({ children }) => {
  const { roomId, topicId } = useParams();
  const navigate = useNavigate();

  const topicIdRef = useRefValue(topicId);

  const [isRoomLoaded, setIsRoomLoaded] = useState(false);
  const [userState] = useState(tokenStorage.parseItem());

  const { addToast } = useToasts(({ addToast }) => ({ addToast }));
  const { setUsers, addUser, deleteUser } = useUsersStore(({ setUsers, addUser, deleteUser }) => ({
    setUsers,
    addUser,
    deleteUser,
  }));
  const { setTopics, addTopic } = useTopicsStore(({ setTopics, addTopic }) => ({
    setTopics,
    addTopic,
  }));
  const { addVote, setResults, resetVotes } = useVotesStore(
    ({ addVote, setResults, resetVotes }) => ({
      addVote,
      setResults,
      resetVotes,
    }),
  );

  useEffect(() => {
    Promise.all([httpClient.getRoomTopics({ roomId }).then(setTopics)])
      .catch(Error)
      .finally(() => setIsRoomLoaded(true));
  }, [roomId, setTopics]);

  useEffect(() => {
    wsClient.init({
      query: { token: tokenStorage.getItem() },
    });

    return () => {
      wsClient.disconnect();
    };
  }, []);

  useEffect(() => {
    wsClient.on(RoomEvent.UsersConnected, users => setUsers(users));

    wsClient.on(RoomEvent.UserJoined, user => {
      addUser(user);
      addToast({ message: `${user.name} joined`, color: 'primary' });
    });

    wsClient.on(RoomEvent.UserLeft, user => {
      deleteUser(user);
      addToast({ message: `${user.name} left`, color: 'primary' });
    });

    wsClient.on(RoomEvent.TopicChose, topicId => {
      navigate(HistoryPaths.roomTopic.generatePath({ topicId, roomId }));
    });

    wsClient.on(RoomEvent.TopicCreated, async topicId => {
      const topic = await httpClient.getRoomTopicById({ roomId, topicId });
      addTopic(topic);
    });

    wsClient.on(RoomEvent.VoteSubmitted, vote => {
      if (topicIdRef.current !== vote.topicId) return;
      addVote(vote);
    });

    wsClient.on(RoomEvent.VotesRevealed, ({ topicId, results }) => {
      if (topicIdRef.current !== topicId) return;
      setResults(results);
    });

    wsClient.on(RoomEvent.VotesReset, topicId => {
      if (topicIdRef.current !== topicId) return;
      resetVotes();
    });
  }, [
    addToast,
    addTopic,
    addVote,
    addUser,
    deleteUser,
    setUsers,
    setResults,
    resetVotes,
    navigate,
    roomId,
    topicIdRef,
  ]);

  if (!isRoomLoaded) {
    return <>Loading...</>;
  }

  return (
    <Container>
      <UserContext.Provider value={userState}>{children}</UserContext.Provider>
    </Container>
  );
};

export default RoomContainer;
