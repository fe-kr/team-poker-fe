export const themeConfig = {
  palette: {
    common: {
      black: '#000000',
      white: '#ffffff',
    },
    primary: {
      main: '#238885',
      light: '#56b5b5',
      dark: '#1b4c47',
    },
    secondary: {
      main: '#b7353c',
      light: '#bf6b71',
      dark: '#882326',
    },
    gray: {
      main: '#9b9b9b',
      light: '#ececec',
      dark: '#404040',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
    },
  },
  zIndex: {
    dialog: 1300,
    toast: 1400,
    tooltip: 1500,
  },
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1600,
  },
  shape: {
    border: {
      xs: '0.125rem',
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      rounded: '9999px',
    },
    ratio: {
      small: 0.75,
      medium: 1,
      large: 1.25,
    },
  },
  transitions: {
    duration: {
      none: 0,
      short: 200,
      standard: 300,
      complex: 400,
    },
  },
};
