import styled, { css } from 'styled-components';
import { StyledPosition } from '@constants/ui';

export const Input = styled.input`
  background: ${({ theme }) => theme.palette.gray.light};
  padding: ${({ theme, $size }) => theme.shape.ratio[$size]}rem;
  padding-left: ${({ theme, $hasStartIcon, $size }) =>
    ($hasStartIcon ? 3 : 1) * theme.shape.ratio[$size]}rem;
  outline: none;
  flex-grow: 1;
  color: ${({ theme }) => theme.palette.common.black};
  border-radius: ${({ theme }) => theme.shape.border.sm};
  border-color: ${({ theme, $color }) => theme.palette[$color]?.main};
  border-style: solid;
  border-width: 2px;
  &:focus {
    border-color: ${({ theme, $color }) => theme.palette[$color]?.dark};
  }
  &::placeholder {
    color: ${({ theme, $color }) => theme.palette[$color]?.main};
  }
  ${({ theme, $hasError }) =>
    $hasError &&
    css`
      border-color: ${theme.palette.error.main} !important; // TODO: remove important
    `};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const IconContainer = styled.span`
  position: absolute;
  transform: translate(
    ${({ $position }) => ($position === StyledPosition.Right ? '-50%' : '50%')},
    50%
  );
  right: ${({ $position }) => ($position === StyledPosition.Right ? 0 : 'auto')};
  left: ${({ $position }) => ($position === StyledPosition.Left ? 0 : 'auto')};
  color: ${({ theme, $color }) => theme.palette[$color]?.main};
`;

export const ErrorMessage = styled.span`
  font-size: 0.75rem;
  position: absolute;
  bottom: 0;
  transform: translate(0, 100%);
  color: ${({ theme }) => theme.palette.error.main};
`;
