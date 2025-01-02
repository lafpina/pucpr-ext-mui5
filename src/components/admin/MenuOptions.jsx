import React from "react";

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";



export const PrimaryMenuOptions = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon sx={{ color: 'SteelBlue' }} />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon sx={{ color: 'SteelBlue' }} />
      </ListItemIcon>
      <ListItemText primary="Feed" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <PeopleIcon sx={{ color: 'SteelBlue' }} />
      </ListItemIcon>
      <ListItemText primary="Cliente" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <BarChartIcon sx={{ color: 'SteelBlue' }} />
      </ListItemIcon>
      <ListItemText primary="Chargebacks" />
    </ListItem>
  </div>
);

export const SecondaryMenuOptions = (
  <div>
    <ListSubheader inset>Administração</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon sx={{ color: 'DarkKhaki' }} />
      </ListItemIcon>
      <ListItemText primary="Cadastros" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon sx={{ color: 'DarkKhaki' }} />
      </ListItemIcon>
      <ListItemText primary="Configurações" />
    </ListItem>

  </div>
);
