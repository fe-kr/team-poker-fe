import React from 'react';
import { NavLink, useRouteError } from 'react-router-dom';
import Button from 'ui-kit/Button';
import HistoryPaths from '@services/historyPath';
import { Container, ErrorMessage, Header } from './styles';

interface RouteError {
  message?: string;
  statusText?: string;
}

const ErrorPage = () => {
  const routeError = useRouteError() as RouteError;

  return (
    <Container>
      <Header>Oops!</Header>
      <p>Sorry, an unexpected error has occurred.</p>
      <ErrorMessage>{routeError.statusText || routeError.message}</ErrorMessage>
      <Button as={NavLink} to={HistoryPaths.home.path}>
        Go To Home
      </Button>
    </Container>
  );
};

export default ErrorPage;
