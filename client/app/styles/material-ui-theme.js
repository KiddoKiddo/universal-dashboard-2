import React from 'react';
import {
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    // type: 'dark', // Switching the dark mode on is a single property value change.
  },
  typography: {
    useNextVariants: true,
    fontSize: 10,
  },
});

const Theme = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );
};

export default Theme;
