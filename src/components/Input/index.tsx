import React, { ChangeEvent, ReactNode } from 'react';
import { StyledColor, StyledPosition, StyledSize } from '@constants/ui';
import { ErrorMessage, IconContainer, InputContainer, Input as StyledInput } from './styles';

interface InputProps {
  name?: string;
  type?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ error, startIcon, endIcon, ...props }: InputProps) => (
  <InputContainer>
    {startIcon && <IconContainer $position={StyledPosition.Left}>{startIcon}</IconContainer>}

    <StyledInput
      {...props}
      $hasError={!!error}
      $hasStartIcon={!!startIcon}
      $hasEndIcon={!!endIcon}
    />

    {endIcon && <IconContainer $position={StyledPosition.Right}>{endIcon}</IconContainer>}

    {!!error && <ErrorMessage>{error}</ErrorMessage>}
  </InputContainer>
);

Input.defaultProps = {
  $color: StyledColor.Primary,
  $size: StyledSize.Medium,
};

export default Input;
