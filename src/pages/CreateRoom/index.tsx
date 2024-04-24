import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from 'ui-kit/Button';
import Input from 'ui-kit/Input';
import { object, string } from 'yup';
import KeyIcon from '@assets/key.svg?react';
import PersonIcon from '@assets/person.svg?react';
import VisibilityIcon from '@assets/visibility.svg?react';
import VisibilityOffIcon from '@assets/visibility_off.svg?react';
import { ROOM_PASSWORD_VALIDATION_REGEX, ValidationMessage } from '@constants/validation';
import useForm from '@hooks/useForm';
import HistoryPaths from '@services/historyPath';
import httpClient from '@services/httpClient';
import tokenStorage from '@services/tokenStorage';
import { ButtonsContainer, FieldsContainer, Form } from './styles';

const formSchema = object({
  userName: string().required(ValidationMessage.Required),
  password: string().matches(ROOM_PASSWORD_VALIDATION_REGEX, ValidationMessage.RoomPasswordRegex),
});

interface ICreateRoom {
  userName: string;
  password: string;
}

const formInitialValues = {
  userName: '',
  password: '',
};

const CreateRoomPage = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { formValues, handleChange, isFormChanged, validationErrors, validateForm, validateField } =
    useForm<ICreateRoom>(formInitialValues, formSchema);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (!(await validateForm())) return;

    await httpClient.signUp({ body: formValues }).then(res => res.text());

    const { roomId } = tokenStorage.parseItem();
    navigate(HistoryPaths.room.generatePath({ roomId }));
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
          name="password"
          type={isPasswordVisible ? 'text' : 'password'}
          autoComplete="off"
          value={formValues.password}
          error={validationErrors.password}
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
