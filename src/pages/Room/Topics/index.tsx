import { useDeferredValue, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'ui-kit/Button';
import Checkbox from 'ui-kit/Checkbox';
import Input from 'ui-kit/Input';
import useDialog from 'ui-kit/useDialog';
import { AddIcon, SearchIcon } from '@assets/icons';
import { RoomEvent } from '@constants/enum';
import withRoomAdminVisibility from '@hocs/withAdminVisibility';
import useTopicsStore from '@hooks/useTopicsStore';
import useVotesStore from '@hooks/useVotesStore';
import HistoryPaths from '@services/historyPath';
import wsClient from '@services/wsClient';
import { checkIsNil } from '@utils/common';
import AddTopicForm from './AddTopicForm';
import { ControlsContainer, MainContainer, TopicsList, TopicsListItem } from './styles';

const TopicsSidebar = () => {
  const { roomId, topicId } = useParams() as { roomId: string; topicId?: string };
  const [searchValue, setSearchValue] = useState('');
  const deferredSearchValue = useDeferredValue(searchValue);
  const navigate = useNavigate();
  const [showCompletedItems, setShowCompletedItemsItems] = useState(true);
  const { topics } = useTopicsStore();
  const { resetVotes } = useVotesStore(({ resetVotes }) => ({ resetVotes }));
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

    wsClient.emit(RoomEvent.TOPIC_CHOSE, topicId);
    resetVotes();
    navigate(HistoryPaths.roomTopic.generatePath({ roomId, topicId }));
  };

  const filteredTopics = useMemo(
    () =>
      Object.values(topics).filter(({ title, description, estimation }) => {
        const shouldIncludeCompletedItems = showCompletedItems || checkIsNil(estimation);
        const regex = new RegExp(deferredSearchValue || '', 'gi');

        return (
          shouldIncludeCompletedItems && [title, description].some(item => regex.test(item || ''))
        );
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
        {filteredTopics.map(({ id, title, description, estimation }) => (
          <TopicsListItem
            onClick={onSelectTopic}
            key={id}
            data-topic-id={id}
            $isActive={id === topicId}
            $isCompleted={!checkIsNil(estimation)}
          >
            <b className="title" title={title}>
              {title}
            </b>

            <b>{estimation}</b>

            {description && (
              <span className="description" title={description}>
                {description}
              </span>
            )}
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
