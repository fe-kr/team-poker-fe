import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import KeyIcon from '@assets/key.svg?react';
import PersonIcon from '@assets/person.svg?react';
import VisibilityIcon from '@assets/visibility.svg?react';
import VisibilityOffIcon from '@assets/visibility_off.svg?react';
import { Button, Input } from '@components';
import { HistoryPaths } from '@constants/history';
import { ROOM_PASSWORD_VALIDATION_REGEX, ValidationMessage } from '@constants/validation';
import useForm from '@hooks/useForm';
import { ButtonsContainer, FieldsContainer, Form } from './styles';

const formSchema = object({
  userName: string().required(ValidationMessage.Required),
  roomPassword: string().matches(
    ROOM_PASSWORD_VALIDATION_REGEX,
    ValidationMessage.RoomPasswordRegex,
  ),
});

interface ICreateRoom {
  userName: string;
  roomPassword: string;
}

const formInitialValues = {
  userName: '',
  roomPassword: '',
};

const CreateRoomPage = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { formValues, handleChange, isFormChanged, validationErrors, validateForm, validateField } =
    useForm<ICreateRoom>(formInitialValues, formSchema);

  const togglePasswordVisibility = e => {
    e.preventDefault();
    setIsPasswordVisible(prevState => !prevState);
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (!(await validateForm())) return;

    navigate(HistoryPaths.room.path);
  };

  const PasswordIcon = isPasswordVisible ? VisibilityOffIcon : VisibilityIcon;

  return (
    <Form noValidate onSubmit={onSubmit}>
      <FieldsContainer>
        <legend>Create Your Room</legend>

        <Input
          startIcon={<PersonIcon />}
          required
          placeholder="Your Name"
          name="userName"
          value={formValues.userName}
          error={validationErrors.userName}
          onChange={handleChange}
          onBlur={validateField}
        />

        <Input
          required
          startIcon={<KeyIcon />}
          endIcon={<PasswordIcon onClick={togglePasswordVisibility} />}
          placeholder="Room Password"
          name="roomPassword"
          type={isPasswordVisible ? 'text' : 'password'}
          autoComplete="off"
          value={formValues.roomPassword}
          error={validationErrors.roomPassword}
          onChange={handleChange}
          onBlur={validateField}
        />

        <ButtonsContainer>
          <Button type="submit" disabled={!isFormChanged}>
            Create Room
          </Button>

          <p>Or if you already have a room:</p>

          <Button as={NavLink} $variant="outlined" type="button" to={HistoryPaths.enterRoom.path}>
            Enter Room
          </Button>
        </ButtonsContainer>
      </FieldsContainer>
    </Form>
  );
};

export { CreateRoomPage as Component };
