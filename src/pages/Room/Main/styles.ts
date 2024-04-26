import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  grid-column: 2 / 3;
`;

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
`;

export const VotesContainer = styled.ul`
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  gap: 1rem;
  padding: 0;
`;

export const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Vote = styled.li`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CardsList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0;
  gap: 1rem;
`;
