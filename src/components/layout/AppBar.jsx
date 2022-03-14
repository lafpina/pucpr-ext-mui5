import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import PageTitle from '../includes/layoutaccessories/PageTitle'
import { Tooltip } from "@material-ui/core";
import Badge from '@mui/material/Badge';
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import ErrorOutlinedIcon from "@material-ui/icons/ErrorOutlined";

const LightTooltip = styled(Tooltip, {})({
  color: "Ivory",
  backgroundColor: "transparente",
  boxShadow: 2,
  fontSize: 13,
});

const drawerWidth = 240;

const AppBarStyled = styled(MuiAppBar, {
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

const AppBar = (props) => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <AppBarStyled position="absolute" open={open} style={{ background: "#cdcdcd" }}>
      <Toolbar sx={{ pr: '24px' }} >
        <PageTitle title='Dashboard' />
        {/* Notification Whitelist */}
        <IconButton aria-label="whitelist" color="inherit">
          <Badge badgeContent={props.notificationWhiteList} color="primary">
            <FavoriteOutlinedIcon />
          </Badge>
        </IconButton>
        {/* Notification Blacklist */}
        <IconButton aria-label="blacklist" color="inherit">
          <Badge
            badgeContent={props.notificationBlackList}
            color="secondary"
          >
            <ErrorOutlinedIcon />
          </Badge>
        </IconButton>
        {/* Notification Alerts */}
        <IconButton aria-label="notification" color="inherit">
          <Badge badgeContent={props.notificationAlerts} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

      </Toolbar>
    </AppBarStyled>
  )
}
export default AppBar
