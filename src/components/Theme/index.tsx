import React from 'react';
import { ThemeProvider } from 'styled-components';
import { themeConfig } from '@constants/theme';

interface ThemeProps {
  children: React.ReactNode;
}

const Theme = ({ children }: ThemeProps) => {
  return <ThemeProvider theme={themeConfig}>{children}</ThemeProvider>;
};

export default Theme;
