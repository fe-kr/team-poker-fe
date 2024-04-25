import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'ui-kit/Button';
import Chip from 'ui-kit/Chip';
import useDialog from 'ui-kit/useDialog';
import LogoutIcon from '@assets/logout.svg?react';
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
  const users = useRoomStore(({ users }) => users);
  const navigate = useNavigate();
  const user = useRef(tokenStorage.parseItem());
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
        {users.map(({ id, name }) => (
          <Chip $size="large" name={name} title={name} key={id} />
        ))}
      </ChipsContainer>

      <UserMenuContainer>
        <UserInfoContainer>
          <span>
            <b>Name: </b>
            {user.current.name}
          </span>
          <span>
            <b>Type: </b>
            {user.current.type}
          </span>
        </UserInfoContainer>

        <Button $isRounded title="Sign Out" $color="warning" $size="small" onClick={onLogoutClick}>
          <LogoutIcon width={20} height={20} />
        </Button>
      </UserMenuContainer>
    </Header>
  );
};

export default RoomHeader;
