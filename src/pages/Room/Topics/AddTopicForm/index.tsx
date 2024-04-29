import React from 'react';
import Button from 'ui-kit/Button';
import Input from 'ui-kit/Input';
import useDialog from 'ui-kit/useDialog';
import { object, string } from 'yup';
import { RoomEvent } from '@constants/enum';
import { ValidationMessage } from '@constants/validation';
import useForm from '@hooks/useForm';
import useTopicsStore from '@hooks/useTopicsStore';
import httpClient from '@services/httpClient';
import wsClient from '@services/wsClient';
import { ButtonsContainer, Form } from './styles';

const formInitialValues = {
  title: '',
  description: '',
};

const formSchema = object({
  title: string().required(ValidationMessage.Required),
  description: string(),
});

const AddTopicForm = ({ roomId }) => {
  const { closeDialog } = useDialog();
  const { addTopic } = useTopicsStore();
  const { formValues, handleChange, validationErrors, validateField, validateForm } = useForm(
    formInitialValues,
    formSchema,
  );

  const onSubmit = async e => {
    e.preventDefault();

    if (!(await validateForm())) return;

    const body = { ...formValues, roomId };
    const topic = await httpClient.createRoomTopic({ body });
    wsClient.emit(RoomEvent.TopicCreated, topic.id);

    addTopic(topic);
    closeDialog();
  };

  return (
    <Form noValidate onSubmit={onSubmit}>
      <Input
        name="title"
        placeholder="Title"
        value={formValues.title}
        onChange={handleChange}
        error={validationErrors.title}
        onBlur={validateField}
      />

      <Input
        rows={3}
        name="description"
        as="textarea"
        placeholder="Description"
        value={formValues.description}
        error={validationErrors.description}
        onChange={handleChange}
        onBlur={validateField}
      />

      <ButtonsContainer>
        <Button $variant="outlined" type="button" onClick={closeDialog}>
          Cancel
        </Button>
        <Button type="submit">Add Topic</Button>
      </ButtonsContainer>
    </Form>
  );
};

export default AddTopicForm;
