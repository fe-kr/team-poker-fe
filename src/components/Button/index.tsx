import React, { MouseEvent } from 'react';
import { StyledColor, StyledSize, StyledVariant } from '@constants/ui';
import { Button as StyledButton } from './styles';

interface ButtonProps {
  $variant?: StyledVariant;
  $color?: StyledColor;
  $size?: StyledSize;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: ButtonProps) => <StyledButton {...props} />;

Button.defaultProps = {
  $variant: StyledVariant.Standard,
  $color: StyledColor.Primary,
  $size: StyledSize.Medium,
};

export default Button;
