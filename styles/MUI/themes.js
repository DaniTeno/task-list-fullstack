import { createTheme } from "@mui/material";

export const theme = createTheme({
  status: {
    remove: '#E53E3E',
    edit: '#6666A2',
    importance_level: {
      high: '#FF5133',
      medium: '#FFD91F',
      low: '#11CF6F'
    }
  },
  palette: {
    primary: {
      main: '#238FCF',
    },
    secondary: {
      main: '#339946'
    },
    active: {
      main: '#3366AF'
    },
    neutral: {
      main: '#004BFF',
      contrastText: '#FFFFFF',
    },
  },
})