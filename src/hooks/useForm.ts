import { useCallback, useState } from 'react';

type Error = {
  [key: string]: string;
};

const useForm = <T extends object>(initialValues, initialSchema) => {
  const [initialFormValues] = useState<Partial<T>>(initialValues);
  const [validationErrors, setValidationErrors] = useState<Error>({});
  const [schema, setSchema] = useState(initialSchema);
  const [formValues, setFormValues] = useState<Partial<T>>(initialValues);

  const isFormChanged = Object.keys(formValues).some(
    key => formValues[key] !== initialFormValues[key],
  );

  const validateField = useCallback(
    async e => {
      try {
        const { name, value } = e.target;

        await schema.validateAt(name, { [name]: value });
        setValidationErrors(prevState => ({ ...prevState, [name]: '' }));
      } catch ({ path, message }) {
        setValidationErrors(prevState => ({ ...prevState, [path]: message }));
      }
    },
    [schema],
  );

  const validateForm = useCallback(async () => {
    try {
      await schema.validate(formValues);
      setValidationErrors({});

      return true;
    } catch ({ path, message }) {
      setValidationErrors({ [path]: message });
    }
  }, [formValues, schema]);

  const handleChange = useCallback(
    e => {
      const { name, value } = e.target;

      setFormValues(prevState => ({ ...prevState, [name]: value }));

      validateField(e);
    },
    [validateField],
  );

  return {
    formValues,
    setFormValues,
    handleChange,
    setSchema,
    validateField,
    validateForm,
    validationErrors,
    isFormChanged,
  };
};

export default useForm;
