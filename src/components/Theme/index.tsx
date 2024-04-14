import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { themeConfig } from '@constants/theme';

interface ThemeProps {
  children: ReactNode;
}

const Theme = ({ children }: ThemeProps) => {
  return <ThemeProvider theme={themeConfig}>{children}</ThemeProvider>;
};

export default Theme;
