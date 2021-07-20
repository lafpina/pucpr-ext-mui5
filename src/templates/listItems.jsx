import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";

import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import ErrorOutlinedIcon from "@material-ui/icons/ErrorOutlined";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="OMS" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingBasketIcon />
      </ListItemIcon>
      <ListItemText primary="Pedido" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Cliente" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ViewQuiltIcon />
      </ListItemIcon>
      <ListItemText primary="Produto" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Chargebacks" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Administração</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Cadastros" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Configurações" />
    </ListItem>
  </div>
);
