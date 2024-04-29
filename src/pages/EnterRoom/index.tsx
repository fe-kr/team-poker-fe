import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from 'ui-kit/Button';
import Input from 'ui-kit/Input';
import { object, string } from 'yup';
import { BadgeIcon, KeyIcon, PersonIcon, VisibilityIcon, VisibilityOffIcon } from '@assets/icons';
import { ROOM_PASSWORD_VALIDATION_REGEX, ValidationMessage } from '@constants/validation';
import useForm from '@hooks/useForm';
import HistoryPaths from '@services/historyPath';
import httpClient from '@services/httpClient';
import tokenStorage from '@services/tokenStorage';
import { ButtonsContainer, FieldsContainer, Form } from './styles';

const formSchema = object({
  userName: string().required(ValidationMessage.Required),
  roomId: string().required(ValidationMessage.Required),
  password: string().matches(ROOM_PASSWORD_VALIDATION_REGEX, ValidationMessage.RoomPasswordRegex),
});

interface IEnterRoom {
  userName: string;
  roomId: string;
  password: string;
}

const formInitialValues = {
  userName: '',
  roomId: '',
  password: '',
};

const EnterRoomPage = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { formValues, handleChange, isFormChanged, validationErrors, validateField } =
    useForm<IEnterRoom>(formInitialValues, formSchema);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  const onSubmit = async e => {
    e.preventDefault();

    await httpClient.signIn({ body: formValues }).then(res => res.text());

    const { roomId } = tokenStorage.parseItem();

    navigate(HistoryPaths.room.generatePath({ roomId }));
  };

  const PasswordIcon = isPasswordVisible ? VisibilityOffIcon : VisibilityIcon;

  return (
    <Form noValidate onSubmit={onSubmit}>
      <FieldsContainer>
        <legend>Login Room</legend>

        <Input
          startIcon={<BadgeIcon />}
          required
          placeholder="Room ID"
          name="roomId"
          value={formValues.roomId}
          error={validationErrors.roomId}
          onChange={handleChange}
          onBlur={validateField}
        />

        <Input
          required
          startIcon={<KeyIcon />}
          endIcon={<PasswordIcon onClick={togglePasswordVisibility} />}
          placeholder="Room Password"
          name="password"
          value={formValues.password}
          type={isPasswordVisible ? 'text' : 'password'}
          autoComplete="off"
          error={validationErrors.password}
          onChange={handleChange}
          onBlur={validateField}
        />

        <Input
          startIcon={<PersonIcon />}
          required
          placeholder="Your Name"
          name="userName"
          error={validationErrors['userName']}
          onChange={handleChange}
          onBlur={validateField}
        />

        <ButtonsContainer>
          <Button type="submit" disabled={!isFormChanged}>
            Enter Room
          </Button>

          <p>If you do not have a room:</p>

          <Button as={NavLink} $variant="outlined" type="button" to={HistoryPaths.createRoom.path}>
            Create Room
          </Button>
        </ButtonsContainer>
      </FieldsContainer>
    </Form>
  );
};

export { EnterRoomPage as Component };
