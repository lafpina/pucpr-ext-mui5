import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import PageTitle from '../includes/layoutaccessories/PageTitle';
import Tooltip from '@mui/material/Tooltip'; // ✅ Corrigido
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';

// ✅ Tooltip Estilizado Corretamente
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    color: 'Ivory',
    backgroundColor: 'transparent',
    boxShadow: theme.shadows[2],
    fontSize: 13,
  },
}));

const drawerWidth = 240;

// ✅ AppBar Estilizado Corretamente
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
      <Toolbar sx={{ pr: '24px' }}>
        <PageTitle title="Dashboard" />

        {/* Notification Whitelist */}
        <LightTooltip title="VIP" arrow>
          <IconButton aria-label="whitelist" color="inherit">
            <Badge badgeContent={props.notificationWhiteList} color="primary">
              <FavoriteOutlinedIcon />
            </Badge>
          </IconButton>
        </LightTooltip>

        {/* Notification Blacklist */}
        <LightTooltip title="Restrições" arrow>
          <IconButton aria-label="blacklist" color="inherit">
            <Badge badgeContent={props.notificationBlackList} color="secondary">
              <ErrorOutlinedIcon />
            </Badge>
          </IconButton>
        </LightTooltip>

        {/* Notification Alerts */}
        <LightTooltip title="Alto Risco" arrow>
          <IconButton aria-label="notification" color="inherit">
            <Badge badgeContent={props.notificationAlerts} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </LightTooltip>
      </Toolbar>
    </AppBarStyled>
  );
};

export default AppBar;
