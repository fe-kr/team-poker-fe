import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useToasts from 'ui-kit/useToasts';
import { RoomEvent } from '@constants/events';
import useTopicsStore from '@hooks/useTopicsStore';
import useUsersStore from '@hooks/useUsersStore';
import HistoryPaths from '@services/historyPath';
import httpClient from '@services/httpClient';
import tokenStorage from '@services/tokenStorage';
import wsClient from '@services/wsClient';
import { Container } from './styles';

const RoomContainer = ({ children }) => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isRoomLoaded, setIsRoomLoaded] = useState(false);

  const { addToast } = useToasts(({ addToast }) => ({ addToast }));
  const { setUsers, addUser, deleteUser } = useUsersStore(({ setUsers, addUser, deleteUser }) => ({
    setUsers,
    addUser,
    deleteUser,
  }));
  const { setTopics, addTopic } = useTopicsStore(({ setTopics, addTopic }) => ({ setTopics, addTopic }));

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
    wsClient.on(RoomEvent.UsersConnected, setUsers);

    wsClient.on(RoomEvent.UserJoined, user => {
      addUser(user);
      addToast({ message: `${user.name} joined`, color: 'primary' });
    });

    wsClient.on(RoomEvent.UserLeft, user => {
      deleteUser(user);
      addToast({ message: `${user.name} left`, color: 'primary' });
    });

    wsClient.on(RoomEvent.TopicChose, topicId => {
      navigate(HistoryPaths.room.generatePath({ topicId, roomId }));
    });

    wsClient.on(RoomEvent.TopicCreated, topicId => {
      httpClient.getRoomTopicById({ roomId, topicId }).then(topic => {
        addTopic(topic);
      });
    });
  }, [addToast, addTopic, addUser, deleteUser, setUsers, navigate, roomId]);

  if (!isRoomLoaded) {
    return <>Loading...</>;
  }

  return <Container>{children}</Container>;
};

export default RoomContainer;
