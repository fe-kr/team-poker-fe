import styled from 'styled-components';
import { StyledVariant } from '@constants/ui';

export const Button = styled.button`
  background-color: ${({ theme, $variant, $color }) =>
    $variant === StyledVariant.Outlined ? theme.palette.common.white : theme.palette[$color]?.main};
  color: ${({ theme, $variant, $color }) =>
    $variant === StyledVariant.Outlined ? theme.palette[$color]?.main : theme.palette.common.white};
  padding: ${({ theme, $size, $isRounded }) =>
    `${theme.shape.ratio[$size]}rem ${theme.shape.ratio[$size] * ($isRounded ? 1 : 2)}rem`};
  font-size: ${({ theme, $size }) => `${theme.shape.ratio[$size]}rem`};
  cursor: pointer;
  border-style: solid;
  border-radius: ${({ theme, $isRounded }) =>
    $isRounded ? theme.shape.border.rounded : theme.shape.border.sm};
  border-color: ${({ theme, $color }) => theme.palette[$color]?.main};
  text-decoration: none;
  text-transform: uppercase;
  outline: none;
  background-position: center;
  transition: ${({ theme }) => `background ${theme.transitions.duration.complex}ms`};

  &:hover {
    background: ${({ theme, $color }) =>
      `${theme.palette[$color]?.light} radial-gradient(circle, transparent 1%, ${theme.palette[$color]?.light} 1%) center/15000%`};
    border-color: ${({ theme, $color }) => theme.palette[$color]?.light};
    color: ${({ theme }) => theme.palette.common.white};
  }

  &:active {
    background-color: ${({ theme, $color }) => theme.palette[$color]?.main};
    background-size: 100%;
    transition: background 0s;
  }

  &:disabled {
    pointer-events: none;
    cursor: default;
    border-color: ${({ theme }) => theme.palette.gray.light};
    background-color: ${({ theme }) => theme.palette.gray.main};
  }

  &:focus {
    border-color: ${({ theme, $color }) => theme.palette[$color]?.dark};
  }
`;
