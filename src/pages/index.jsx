import * as React from 'react';
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
import Copyright from "../../src/components/includes/layoutaccessories/Copyright"
import { LogoAlerteMe } from "../../src/components/includes/layoutaccessories/Copyright";
import Fade from "@material-ui/core/Fade";
import { Tooltip } from "@material-ui/core";
import { PrimaryMenuOptions, SecondaryMenuOptions } from "../../src/components/admin/MenuOptions"
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import ErrorOutlinedIcon from "@material-ui/icons/ErrorOutlined";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Button from '@mui/material/Button'
import NewOrders from "../../src/components/admin/NewOrders"

const LightTooltip = styled(Tooltip, {})({
  color: "Ivory",
  backgroundColor: "transparente",
  boxShadow: 2,
  fontSize: 13,
});

const drawerWidth = 240;

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
        <AppBar position="absolute" open={open} style={{ background: "#cdcdcd" }}>
        {/* <AppBar position="absolute" open={open} style={{ background: "#4d6e8a" }}> */}
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
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
            <Typography variant="h5" color="Ivory">
              Feed
            </Typography>

            {/* <LogoAlerteMe size={"small"} color={"white"} /> */}

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {/* Dashboard */}
            </Typography>
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
                 <FavoriteOutlinedIcon />
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
                <ErrorOutlinedIcon />
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
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{PrimaryMenuOptions}</List>
          <Divider />
          <List>{SecondaryMenuOptions}</List>
          <Box sx={{ mt: 20, ml: 10, color: 'Silver', fontSize: 15}}>
             AlerteMe 
          </Box>   
          <Box sx={{ ml: 11.5, color: 'CornflowerBlue', fontSize: 10}}>
             v. Mui5
          </Box>
        </Drawer>
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                {/* <NewOrders orders={props.orders} /> */}
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 1, pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}