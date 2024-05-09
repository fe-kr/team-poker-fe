import { useNavigate, useParams } from 'react-router-dom';
import Button from 'ui-kit/Button';
import Chip from 'ui-kit/Chip';
import useDialog from 'ui-kit/useDialog';
import { LogoutIcon } from '@assets/icons';
import useTopicsStore from '@hooks/useTopicsStore';
import useUserContext from '@hooks/useUserContext';
import useRoomStore from '@hooks/useUsersStore';
import HistoryPaths from '@services/historyPath';
import tokenStorage from '@services/tokenStorage';
import {
  ChipsContainer,
  Header,
  LogoutButtonsContainer,
  UserInfoContainer,
  UserMenuContainer,
} from './styles';

const RoomHeader = () => {
  const { topicId } = useParams() as { topicId: string };
  const users = useRoomStore(({ users }) => users);
  const topics = useTopicsStore(({ topics }) => topics);
  const navigate = useNavigate();
  const currentUser = useUserContext();
  const { openDialog, closeDialog } = useDialog(({ openDialog, closeDialog }) => ({
    openDialog,
    closeDialog,
  }));

  const onLogout = () => {
    navigate(HistoryPaths.enterRoom.path);
    closeDialog();
    tokenStorage.removeItem();
  };

  const onLogoutClick = () => {
    openDialog({
      header: () => 'Are you sure to leave this room ?',
      body: () => (
        <LogoutButtonsContainer>
          <Button $size="small" onClick={onLogout}>
            Yes
          </Button>

          <Button $variant="outlined" $size="small" onClick={closeDialog}>
            No
          </Button>
        </LogoutButtonsContainer>
      ),
    });
  };

  return (
    <Header>
      <ChipsContainer>
        {Object.values(users).map(({ id, name }) => (
          <Chip $size="large" name={name} title={name} key={id} />
        ))}
      </ChipsContainer>

      <p>{topics[topicId]?.title}</p>

      <UserMenuContainer>
        <UserInfoContainer>
          <b>{currentUser.name}</b>
          <span>{currentUser.type}</span>
        </UserInfoContainer>

        <Button
          $isRounded
          $variant="outlined"
          title="Sign Out"
          $color="warning"
          $size="small"
          onClick={onLogoutClick}
        >
          <LogoutIcon />
        </Button>
      </UserMenuContainer>
    </Header>
  );
};

export default RoomHeader;
