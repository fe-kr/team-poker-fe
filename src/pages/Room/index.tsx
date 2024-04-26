import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from './Container';
import Header from './Header';
import Topics from './Topics';

const RoomPage = () => {
  return (
    <Container>
      <Header />
      <Topics />
      <Outlet />
    </Container>
  );
};

export { RoomPage as Component };
