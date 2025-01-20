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
import Fade from "@mui/material/Fade";
import Tooltip from '@mui/material/Tooltip';


import Notifications from '@mui/icons-material/Notifications';
import FavoriteOutlined from '@mui/icons-material/FavoriteOutlined';
import ErrorOutlined from '@mui/icons-material/ErrorOutlined';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

import Button from '@mui/material/Button';
import FeedTable from "./FeedTable";
import FeedBar from '../includes/feedbar/FeedBar';
import PageTitle from '../includes/layoutaccessories/PageTitle';
import TextField from '@mui/material/TextField';
import { LocalizationProvider, DesktopDateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { PrimaryMenuOptions, SecondaryMenuOptions } from "./MenuOptions";
import CircularProgress from '@mui/material/CircularProgress'; // ✅ Spinner adicionado

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
const drawerWidth = 200;

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
  const [isLoading, setIsLoading] = useState(false); // ✅ Estado para Spinner

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleDashboardClick = () => {
    setIsLoading(true); // ✅ Ativa o Spinner no botão
    setTimeout(() => {
      window.location.reload(); // ✅ Recarrega após breve atraso
    }, 300);
  };
  

  // ✅ Atualiza título da página
  useEffect(() => {
    if (props.notificationWhiteList) document.title = `${props.notificationWhiteList} VIP(s)`;
    if (props.notificationAlerts) document.title = `${props.notificationAlerts} Alerta(s)`;
    if (props.notificationBlackList) document.title = `${props.notificationBlackList} Blacklist(s)`;
    document.title = `${props.orders.length} Pedido(s)`;
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
            <PageTitle title='AlerteMe' />

            {/* Notification Whitelist */}
            <LightTooltip
              title="VIP"
              placement="bottom"
              arrow
              interactive
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              aria-label="Cartão"
            >
              <IconButton aria-label="whitelist" color="inherit">
                <Badge badgeContent={props.notificationWhiteList} color="primary">
                  <FavoriteOutlined />
                </Badge>
              </IconButton>
            </LightTooltip>

            {/* Notification Blacklist */}
            <LightTooltip
              title="Retrições"
              placement="bottom"
              arrow
              interactive
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              aria-label="Cartão"
            >
              <IconButton aria-label="blacklist" color="inherit">
                <Badge
                  badgeContent={props.notificationBlackList}
                  color="secondary"
                >
                  <ErrorOutlined />
                </Badge>
              </IconButton>
            </LightTooltip>

            {/* Notification Alerts */}
            <LightTooltip
              title="Alto Risco"
              placement="bottom"
              arrow
              interactive
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              aria-label="Notification"
            >
              <IconButton aria-label="notification" color="inherit">
                <Badge badgeContent={props.notificationAlerts} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </LightTooltip>

            <Box sx={{ ml: 1 }}>
              <Button>
                <ArrowDropDown />
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
          <List>
            <ListItemButton onClick={handleDashboardClick}>
              <ListItemIcon>
                {isLoading ? <CircularProgress size={24} /> : <DashboardIcon sx={{ color: 'SteelBlue' }} />}
              </ListItemIcon>
              <ListItemText primary={isLoading ? "Carregando..." : "Dashboard"} />
            </ListItemButton>
          </List>
          <Divider />
          <List>{SecondaryMenuOptions}</List>
          <Box sx={{ mt: 70, ml: 10, color: 'Silver', fontSize: 15 }}>
            AlerteMe
          </Box>
          <Box sx={{ ml: 12.3, color: 'Steelblue', fontSize: 10 }}>
            Fênix
          </Box>
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
            <Copyright sx={{ mt: 0.5, pt: 2 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
