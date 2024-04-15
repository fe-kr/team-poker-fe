import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  flex-grow: 1;
  max-width: 400px;
`;

export const FieldsContainer = styled.fieldset`
  display: flex;
  padding: 1.25rem;
  gap: 1.25rem;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.shape.border.sm};
  border-color: ${({ theme }) => theme.palette.primary.main};
  border-style: solid;
  width: 100%;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > a {
    display: flex;
    justify-content: center;
  }
`;
