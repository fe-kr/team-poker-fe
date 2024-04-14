import React, { MouseEvent } from 'react';
import { ColorType, SizeType, VariantType } from '@constants/ui';
import { Button as StyledButton } from './styles';

interface ButtonProps {
  $variant?: VariantType;
  $color?: ColorType;
  $size?: SizeType;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: ButtonProps) => <StyledButton {...props} />;

Button.defaultProps = {
  $variant: VariantType.Standard,
  $color: ColorType.Primary,
  $size: SizeType.Medium,
};

export default Button;
