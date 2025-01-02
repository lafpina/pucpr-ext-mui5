import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { ptBR } from '@mui/material/locale';



// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  ptBR,
});

export default theme;
