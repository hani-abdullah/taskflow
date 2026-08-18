import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#263b2e', light: '#4c6756', dark: '#17211b', contrastText: '#ffffff',
    },
    secondary: {
      main: '#dfff3f',
    },
    background: {
      default: '#f6f7f2',
      paper: '#ffffff',
    },
    text: {
      primary: '#17211b', secondary: '#69736c',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.06em' },
    h2: { fontWeight: 800, letterSpacing: '-0.06em' },
    h3: { fontWeight: 800, letterSpacing: '-0.06em' },
    h4: { fontWeight: 800, letterSpacing: '-0.04em' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10, fontWeight: 800,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 10px 30px rgba(23,33,27,.06)', border: '1px solid #e2e5dd',
        },
      },
    },
  },
});
