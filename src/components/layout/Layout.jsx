import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Tooltip } from "@material-ui/core";
import AppBar from './AppBar'
import Drawer from './Drawer'

const LightTooltip = styled(Tooltip, {})({
  color: "Ivory",
  backgroundColor: "transparente",
  boxShadow: 2,
  fontSize: 13,
});

const mdTheme = createTheme();

export default function DashboardContent(props) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <AppBar />
        <Drawer />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />

        </Box>
      </Box>
    </ThemeProvider>
  );
}