import styled from 'styled-components';

export const Header = styled.header`
  padding: 1rem;
  height: 3rem;
  grid-column: 1 / 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${({ theme }) => theme.palette.primary.main} solid;
`;

export const ChipsContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  gap: 0.25rem;
  max-width: 200px;
`;

export const UserMenuContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoutButtonsContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
`;
