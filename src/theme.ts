import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const colors = {
  primary: "#263238",    // Blue Grey 900 (אפור גרפיט כהה)
  secondary: "#2979FF",  // Blue A400 (כחול חשמלי בוהק)
  bg: "#ECEFF1",         // רקע אפרפר בהיר
  paper: "#ffffff",
};

let theme = createTheme({
  direction: "rtl",
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
    background: { 
      default: colors.bg, 
      paper: colors.paper 
    },
  },
  typography: {
    fontFamily: "Rubik, sans-serif",
    h1: { fontSize: "2.5rem", fontWeight: 700, color: colors.primary },
    h2: { fontSize: "2rem", fontWeight: 600, color: colors.primary },
    h3: { fontSize: "1.5rem", fontWeight: 600 },
  },
});

theme = createTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: "bold",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.paper,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiPaper: { 
      styleOverrides: {
        root: {
          backgroundColor: colors.paper,
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.secondary.main,
            },
          },
          "& label.Mui-focused": {
            color: theme.palette.primary.main,
          },
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);
export default theme;