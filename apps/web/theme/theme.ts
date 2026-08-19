import { createTheme } from '@mui/material/styles';
import { color, shadow } from './tokens';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: color.forest,
      light: color.moss,
      dark: color.forestHover,
      contrastText: color.white,
    },
    secondary: {
      main: color.chartreuse,
      contrastText: color.ink,
    },
    background: {
      default: color.paper,
      paper: color.white,
    },
    text: {
      primary: color.ink,
      secondary: color.stone,
    },
    divider: color.line,
    success: { main: color.moss },
    warning: { main: color.terracotta },
  },
  typography: {
    fontFamily: 'var(--font-sans), Outfit, Arial, sans-serif',
    h1: {
      fontFamily: 'var(--font-display), Fraunces, Georgia, serif',
      fontWeight: 500,
      fontSize: '4.25rem',
      lineHeight: 1.05,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontFamily: 'var(--font-display), Fraunces, Georgia, serif',
      fontWeight: 500,
      fontSize: '3.25rem',
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
    },
    h3: {
      fontFamily: 'var(--font-display), Fraunces, Georgia, serif',
      fontWeight: 500,
      fontSize: '2.35rem',
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontFamily: 'var(--font-display), Fraunces, Georgia, serif',
      fontWeight: 500,
      fontSize: '1.85rem',
      lineHeight: 1.2,
    },
    h5: {
      fontFamily: 'var(--font-sans), Outfit, sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.3,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontFamily: 'var(--font-sans), Outfit, sans-serif',
      fontWeight: 600,
      fontSize: '1.05rem',
      lineHeight: 1.35,
    },
    body1: { fontSize: '1.0625rem', lineHeight: 1.65 },
    body2: { fontSize: '0.9375rem', lineHeight: 1.6 },
    button: { fontWeight: 600, letterSpacing: '-0.01em' },
  },
  shape: { borderRadius: 2 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: color.paper, color: color.ink },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
          fontWeight: 600,
          paddingInline: 20,
          minHeight: 44,
          transition: 'transform .2s ease, background-color .2s ease, box-shadow .2s ease',
          '&:hover': { transform: 'translateY(-1px)' },
          '&:focus-visible': {
            outline: `2px solid ${color.forest}`,
            outlineOffset: 3,
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: shadow.soft },
        },
        outlined: {
          borderColor: color.line,
          color: color.ink,
          '&:hover': { borderColor: color.ink, background: color.white },
        },
        sizeLarge: { minHeight: 52, paddingInline: 24, fontSize: '1rem' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: `1px solid ${color.line}`,
          backgroundImage: 'none',
          backgroundColor: color.white,
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: color.white,
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: color.moss },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: color.forest, borderWidth: 1.5 },
        },
        notchedOutline: { borderColor: color.line },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: 4 },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          background: 'transparent',
          boxShadow: 'none',
          '&:before': { display: 'none' },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: { color: color.forest },
      },
    },
  },
});
