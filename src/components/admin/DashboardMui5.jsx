import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Copyright from "../includes/layoutaccessories/Copyright";
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';
import { PrimaryMenuOptions, SecondaryMenuOptions } from "./MenuOptions";
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import FeedTable from "./FeedTable";
import FeedBar from '../includes/feedbar/FeedBar';
import PageTitle from '../includes/layoutaccessories/PageTitle';
import TextField from '@mui/material/TextField';
import { LocalizationProvider, DesktopDateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

// ✅ Substituído estilo Tooltip corretamente para MUI 5
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    color: "Ivory",
    backgroundColor: "transparent",
    boxShadow: theme.shadows[2],
    fontSize: 13,
  },
}));

// ✅ Constante para largura do Drawer
const drawerWidth = 220;

// ✅ Estilização do AppBar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// ✅ Estilização do Drawer
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// ✅ Tema padrão
const mdTheme = createTheme();

export default function DashboardContent(props) {
  const [open, setOpen] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // ✅ Atualiza título da página
  useEffect(() => {
    if (props.notificationWhiteList) document.title = `${props.notificationWhiteList} VIP(s)`;
    if (props.notificationAlerts) document.title = `${props.notificationAlerts} Alerta(s)`;
    if (props.notificationBlackList) document.title = `${props.notificationBlackList} Blacklist(s)`;
  }, [props.notificationWhiteList, props.notificationAlerts, props.notificationBlackList]);

  const FeedBarDate = () => {
    return (
      <Box sx={{ ml: 2, mr: 5, display: 'inline' }}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDateTimePicker
            renderInput={(props) => <TextField {...props} size='small' />}
            label="Início"
            value={startDate}
            onChange={(newDate) => {
              setStartDate(newDate);
              window.location.reload();
            }}
            ampm={false}
            ampmInClock={false}
          />
        </LocalizationProvider>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} style={{ background: "#d5d5d5" }}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <PageTitle title='Feed' />

            {/* Notificações */}
            <LightTooltip title="VIP" arrow>
              <IconButton color="inherit">
                <Badge badgeContent={props.notificationWhiteList} color="primary">
                  <FavoriteOutlinedIcon />
                </Badge>
              </IconButton>
            </LightTooltip>

            <LightTooltip title="Restrições" arrow>
              <IconButton color="inherit">
                <Badge badgeContent={props.notificationBlackList} color="secondary">
                  <ErrorOutlinedIcon />
                </Badge>
              </IconButton>
            </LightTooltip>

            <LightTooltip title="Alto Risco" arrow>
              <IconButton color="inherit">
                <Badge badgeContent={props.notificationAlerts} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </LightTooltip>

            <Box sx={{ ml: 1 }}>
              <Button>
                <ArrowDropDownIcon />
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{PrimaryMenuOptions}</List>
          <Divider />
          <List>{SecondaryMenuOptions}</List>
        </Drawer>

        {/* FEED TABLE */}
        <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto' }}>
          <Toolbar />
          <FeedBar orders={props.orders} />
          <Container maxWidth="lg" sx={{ mt: 1, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <FeedTable orders={props.orders} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
