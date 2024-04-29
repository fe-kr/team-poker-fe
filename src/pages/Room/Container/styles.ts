import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template: auto 1fr auto / auto 1fr auto;
  flex-grow: 1;
`;

export const Loader = styled.p`
  display: flex;
  font-size: 2rem;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;
