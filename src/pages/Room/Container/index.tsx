import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useToasts from 'ui-kit/useToasts';
import { RoomEvent, UserType } from '@constants/enum';
import useRefValue from '@hooks/useRefValue';
import useTopicsStore from '@hooks/useTopicsStore';
import { UserContext } from '@hooks/useUserContext';
import useUsersStore from '@hooks/useUsersStore';
import useVotesStore from '@hooks/useVotesStore';
import HistoryPaths from '@services/historyPath';
import httpClient from '@services/httpClient';
import tokenStorage from '@services/tokenStorage';
import wsClient from '@services/wsClient';
import { Container, Loader } from './styles';

const getCurrentUserInitialState = () => {
  const user = tokenStorage.parseItem();

  return { ...user, isAdmin: user.type === UserType.ADMIN };
};

const selectTopics = ({ setTopics, addTopic }) => ({ setTopics, addTopic });
const selectUsers = ({ setUsers, addUser, deleteUser }) => ({
  setUsers,
  addUser,
  deleteUser,
});
const selectVotes = ({ addVote, setResults, setVotes, resetVotes }) => ({
  addVote,
  setVotes,
  setResults,
  resetVotes,
});

interface RoomContainerProps {
  children: ReactNode;
}

const RoomContainer = ({ children }: RoomContainerProps) => {
  const { roomId, topicId } = useParams();
  const navigate = useNavigate();

  const topicIdRef = useRefValue(topicId);

  const [isRoomLoaded, setIsRoomLoaded] = useState(false);
  const [userState] = useState(getCurrentUserInitialState);

  const { addToast } = useToasts(({ addToast }) => ({ addToast }));
  const { setUsers, addUser, deleteUser } = useUsersStore(selectUsers);
  const { setTopics, addTopic } = useTopicsStore(selectTopics);
  const { addVote, setResults, setVotes, resetVotes } = useVotesStore(selectVotes);

  useEffect(() => {
    Promise.all([
      httpClient.getRoom({ roomId }),
      topicIdRef.current && httpClient.getVotesByTopicId({ topicId: topicIdRef.current }),
    ])
      .then(([{ topics }, votes]) => {
        setTopics(topics);
        setVotes(votes);
      })
      .catch(Error)
      .finally(() => setIsRoomLoaded(true));
  }, [roomId, setTopics, setVotes, topicIdRef]);

  useEffect(() => {
    wsClient.init({
      query: { token: tokenStorage.getItem() },
    });

    return () => {
      wsClient.disconnect();
    };
  }, []);

  useEffect(() => {
    wsClient.on(RoomEvent.USERS_CONNECTED, users => setUsers(users));

    wsClient.on(RoomEvent.USER_JOINED, user => {
      addUser(user);
      addToast({ message: `${user.name} joined`, color: 'primary' });
    });

    wsClient.on(RoomEvent.USER_LEFT, ({ id, name }) => {
      deleteUser(id);
      addToast({ message: `${name} left`, color: 'primary' });
    });

    wsClient.on(RoomEvent.TOPIC_CHOSE, topicId => {
      navigate(HistoryPaths.roomTopic.generatePath({ topicId, roomId }));
    });

    wsClient.on(RoomEvent.TOPIC_CREATED, async topicId => {
      const topic = await httpClient.getRoomTopicById({ roomId, topicId });
      addTopic(topic);
    });

    wsClient.on(RoomEvent.VOTE_SUBMITTED, vote => {
      if (topicIdRef.current !== vote.topicId) return;
      addVote(vote);
    });

    wsClient.on(RoomEvent.VOTES_REVEALED, ({ topicId, results }) => {
      if (topicIdRef.current !== topicId) return;
      setResults(results);
    });

    wsClient.on(RoomEvent.VOTES_RESET, topicId => {
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
    return <Loader>Loading</Loader>;
  }

  return (
    <Container>
      <UserContext.Provider value={userState}>{children}</UserContext.Provider>
    </Container>
  );
};

export default RoomContainer;
