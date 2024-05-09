import { useNavigate, useParams } from 'react-router-dom';
import Button from 'ui-kit/Button';
import Input from 'ui-kit/Input';
import { number, object } from 'yup';
import { ValidationMessage } from '@constants/validation';
import useForm from '@hooks/useForm';
import useTopicsStore from '@hooks/useTopicsStore';
import HistoryPaths from '@services/historyPath';
import httpClient from '@services/httpClient';
import { SubmitVotesForm as StyledSubmitVotesForm } from './styles';

const formInitialValues = {
  estimation: '',
};

const formSchema = object({
  estimation: number()
    .transform(value => (isNaN(parseFloat(value)) ? null : value))
    .min(0, ValidationMessage.OutOfRange)
    .max(100, ValidationMessage.OutOfRange)
    .required(ValidationMessage.Required),
});

interface ISubmitVotes {
  estimation: string;
}

const SubmitVotesForm = () => {
  const { roomId, topicId } = useParams();
  const navigate = useNavigate();
  const { addTopic } = useTopicsStore(({ addTopic }) => ({ addTopic }));

  const { formValues, handleChange, validationErrors, validateField, validateForm } =
    useForm<ISubmitVotes>(formInitialValues, formSchema);

  const onSubmit = async e => {
    e.preventDefault();

    if (!(await validateForm())) return;

    try {
      const topic = await httpClient.updateRoomTopic({ topicId, body: formValues });
      addTopic(topic);
      navigate(HistoryPaths.room.generatePath({ roomId }));
    } catch {
      /* empty */
    }
  };

  return (
    <StyledSubmitVotesForm noValidate onSubmit={onSubmit}>
      <Input
        name="estimation"
        type="number"
        min="0"
        max="100"
        $size="small"
        placeholder="Result"
        value={formValues.estimation}
        onChange={handleChange}
        error={validationErrors.estimation}
        onBlur={validateField}
      />

      <Button $size="small" type="submit">
        Save Result
      </Button>
    </StyledSubmitVotesForm>
  );
};

export default SubmitVotesForm;
