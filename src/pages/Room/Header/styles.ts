import styled from 'styled-components';

export const Header = styled.header`
  padding: 1rem;
  height: 3rem;
  grid-column: 1 / 4;
  display: flex;
  gap: 1rem;
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
  gap: 0.25rem;
  max-width: 200px;

  & > b {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const UserMenuContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const LogoutButtonsContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
`;
