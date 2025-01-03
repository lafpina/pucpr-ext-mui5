import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import DashboardIcon from "@mui/icons-material/Dashboard";
import { styled } from '@mui/material/styles';

// ✅ Estilização adicional para manter comportamento de botão
const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  cursor: 'pointer',
  borderRadius: theme.shape.borderRadius,
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const PrimaryMenuOptions = (
  <div>
    <ListItem disablePadding>
      <StyledListItemButton selected>
        <ListItemIcon>
          <DashboardIcon sx={{ color: 'SteelBlue' }} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </StyledListItemButton>
    </ListItem>
  </div>
);

export const SecondaryMenuOptions = (
  <div>
    {/* Outras opções comentadas */}
  </div>
);
