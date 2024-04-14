import React from 'react';
import { ColorType, SizeType, VariantType } from '@constants/ui';
import { Button as StyledButton } from './styles';

interface ButtonProps {
  value?: string;
  name?: string;
  onChange?: () => void;
  $variant?: VariantType;
  $color?: ColorType;
  $size?: SizeType;
}

const Button = (props: ButtonProps) => <StyledButton {...props} />;

Button.defaultProps = {
  $variant: VariantType.Standard,
  $color: ColorType.Primary,
  $size: SizeType.Medium,
};

export default Button;
