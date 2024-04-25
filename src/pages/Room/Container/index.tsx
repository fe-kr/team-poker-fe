import React, { useEffect, useState } from 'react';
import useToasts from 'ui-kit/useToasts';
import { RoomEvent } from '@constants/events';
import useRoomStore from '@hooks/useUsersStore';
import tokenStorage from '@services/tokenStorage';
import wsClient from '@services/wsClient';
import { Container } from './styles';

const RoomContainer = ({ children }) => {
  const [isRoomLoaded, setIsRoomLoaded] = useState(false);

  const addToast = useToasts(({ addToast }) => addToast);
  const { setUsers, addUser, deleteUser } = useRoomStore(({ setUsers, addUser, deleteUser }) => ({
    setUsers,
    addUser,
    deleteUser,
  }));

  useEffect(() => {
    Promise.all([])
      .catch()
      .finally(() => setIsRoomLoaded(true));
  }, []);

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
  }, [addToast, addUser, deleteUser, setUsers]);

  if (!isRoomLoaded) {
    return <>Loading...</>;
  }

  return <Container>{children}</Container>;
};

export default RoomContainer;
