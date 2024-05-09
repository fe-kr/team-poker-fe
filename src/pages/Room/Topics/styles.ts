import styled from 'styled-components';
import { TopicListItem } from './types';

export const MainContainer = styled.aside`
  padding: 1rem;
  max-width: 320px;
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
  position: relative;
  border-right: ${({ theme }) => theme.palette.primary.main} solid;

  & > .add-topic-button {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
`;

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TopicsList = styled.ul`
  flex: 1 1 0;
  min-height: 0;
  padding-left: 0;
  overflow-y: auto;
`;

export const TopicsListItem = styled.li<TopicListItem>`
  display: grid;
  grid-template-columns: 1fr 1rem;
  list-style-type: none;
  gap: 0.5rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: ${({ theme, $isActive }) => ($isActive ? theme.palette.primary.main : 'transparent')}
    solid;
  border-radius: ${({ theme }) => theme.shape.border.md};
  background-color: ${({ theme, $isActive }) => ($isActive ? theme.palette.primary.light : null)};
  pointer-events: ${({ $isCompleted }) => ($isCompleted ? 'none' : null)};
  color: ${({ theme, $isCompleted, $isActive }) => {
    if ($isCompleted) return theme.palette.gray.main;

    if ($isActive) return theme.palette.common.white;
  }};

  &:hover {
    border: ${({ theme, $isCompleted }) =>
        $isCompleted ? theme.palette.gray.light : theme.palette.primary.main}
      solid;
    cursor: ${({ $isCompleted }) => ($isCompleted ? 'default' : 'pointer')};
  }

  & > .title {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > .description {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`;
