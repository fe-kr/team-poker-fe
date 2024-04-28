import withRoomAdminVisibility from '@hocs/withAdminVisibility';
import React, { useDeferredValue, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'ui-kit/Button';
import Checkbox from 'ui-kit/Checkbox';
import Input from 'ui-kit/Input';
import useDialog from 'ui-kit/useDialog';
import AddIcon from '@assets/add.svg?react';
import SearchIcon from '@assets/search.svg?react';
import { RoomEvent } from '@constants/enum';
import useTopicsStore from '@hooks/useTopicsStore';
import HistoryPaths from '@services/historyPath';
import wsClient from '@services/wsClient';
import AddTopicForm from './AddTopicForm';
import { ControlsContainer, MainContainer, TopicsList, TopicsListItem } from './styles';

const TopicsSidebar = () => {
  const { roomId, topicId } = useParams();
  const [searchValue, setSearchValue] = useState('');
  const deferredSearchValue = useDeferredValue(searchValue);
  const navigate = useNavigate();
  const [showCompletedItems, setShowCompletedItemsItems] = useState(false);
  const { topics } = useTopicsStore();
  const { openDialog } = useDialog(({ openDialog }) => ({ openDialog }));

  const onSearchInTopics = e => {
    setSearchValue(e.target.value);
  };
  const onToggleCompletedItemsVisibility = e => {
    setShowCompletedItemsItems(e.target.checked);
  };
  const onAddTopic = () => {
    openDialog({ body: () => <AddTopicForm roomId={roomId} /> });
  };
  const onSelectTopic = e => {
    const { topicId } = e.currentTarget.dataset;

    wsClient.emit(RoomEvent.TopicChose, topicId);
    navigate(HistoryPaths.roomTopic.generatePath({ roomId, topicId }));
  };

  const filteredTopics = useMemo(
    () =>
      topics.filter(({ title, description, completedDate }) => {
        const shouldIncludeCompletedItems = showCompletedItems || !completedDate;
        const regex = new RegExp(deferredSearchValue || '', 'gi');

        return shouldIncludeCompletedItems && [title, description].some(item => regex.test(item));
      }),
    [topics, deferredSearchValue, showCompletedItems],
  );

  return (
    <MainContainer>
      <ControlsContainer>
        <Input
          value={searchValue}
          placeholder="Search..."
          startIcon={<SearchIcon />}
          onChange={onSearchInTopics}
        />

        <Checkbox
          label="Show completed topics"
          checked={showCompletedItems}
          onChange={onToggleCompletedItemsVisibility}
        />
      </ControlsContainer>

      <TopicsList>
        {filteredTopics.map(({ id, title, description, completedDate }) => (
          <TopicsListItem
            onClick={onSelectTopic}
            key={id}
            data-topic-id={id}
            $isActive={id === topicId}
            $isCompleted={!!completedDate}
          >
            <b className="title" title={title}>
              {title}
            </b>
            <span className="description" title={description}>
              {description}
            </span>
          </TopicsListItem>
        ))}
      </TopicsList>

      <Button
        className="add-topic-button"
        title="Add Topic"
        $isRounded
        $size="small"
        onClick={onAddTopic}
      >
        <AddIcon />
      </Button>
    </MainContainer>
  );
};

export default withRoomAdminVisibility(TopicsSidebar);
