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
  flex: 1 1 0;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1rem;
  padding: 0;
  min-height: 0;
  overflow-y: auto;
`;

export const ResultsContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
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
  margin-top: auto;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0;
  gap: 1rem;
`;
