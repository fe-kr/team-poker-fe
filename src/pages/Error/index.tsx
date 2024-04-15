import React from 'react';
import { NavLink, useRouteError } from 'react-router-dom';
import { Button } from '@components';
import { HistoryPaths } from '@constants/history';
import { Container, ErrorMessage, Header } from './styles';

const ErrorPage = () => {
  const { statusText, message } = useRouteError();

  return (
    <Container>
      <Header>Oops!</Header>
      <p>Sorry, an unexpected error has occurred.</p>
      <ErrorMessage>{statusText || message}</ErrorMessage>
      <Button as={NavLink} to={HistoryPaths.home.path}>
        Go To Home
      </Button>
    </Container>
  );
};

export default ErrorPage;
