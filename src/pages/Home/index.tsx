import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@components';
import { HistoryPaths } from '@constants/history';
import { PageContainer } from './styles';

const HomePage = () => (
  <PageContainer>
    <h1>Design. Think. Solve. Develop</h1>

    <p>Team Poker is a powerful and fun way to improve planning and estimation ceremonies.</p>

    <img src={'cards.jpg'} width={200} height={200} alt={'cards'} />

    <Button as={NavLink} to={HistoryPaths.createRoom.path}>
      Get Started
    </Button>
  </PageContainer>
);

export { HomePage as Component };
