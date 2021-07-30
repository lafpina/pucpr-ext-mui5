import React from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import ErrorOutlinedIcon from "@material-ui/icons/ErrorOutlined";
import { mainListItems, secondaryListItems } from "./ListItems";
import Chart from "./Chart";

import { Tooltip } from "@material-ui/core";
import Fade from '@material-ui/core/Fade';
import ImageAvatars from "./ImageAvatars";
import RiskScoreListTable from "../orders/riskScoreListTable";
import TotalRiskAmount from "./TotalRiskAmount";
// import Image from "next/Image";
import styles from "../../styles/Home.module.css";
import Copyright from "./Copyright";
import { LogoAlerteMe } from "../utils/LogoAlerteMe"
import Link from "next/link"

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 35,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },

  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const LightTooltip = withStyles(theme => ({
  tooltip: {
      backgroundColor: theme.palette.action.active,
      color: "Ivory",
      boxShadow: theme.shadows[2],
      fontSize: 13,
  }
}))(Tooltip);

function preventDefault(event) {
  event.preventDefault();
}

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
        // style={{ background: "#4e575a" }}
        // style={{ background: "#e4e4e4" }}
        style={{ background: "#4d6e8a" }}
        
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>

          {/* <LogoAlerteMe size={"medium"} color={"blue"} /> */}

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard

          </Typography>

          {/* Notification Whitelist */}
          <LightTooltip title="VIP" placement="bottom" arrow interactive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} aria-label="Cartão">
          <IconButton aria-label="whitelist" color="inherit">
            <Badge badgeContent={props.notificationWhiteList} color="primary">
              <FavoriteOutlinedIcon />
            </Badge>
          </IconButton>
          </LightTooltip>

          {/* Notification Blacklist */}
          <LightTooltip title="Retrições" placement="bottom" arrow interactive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} aria-label="Cartão">
          <IconButton aria-label="blacklist" color="inherit">
            <Badge badgeContent={props.notificationBlackList} color="secondary">
              <ErrorOutlinedIcon />
            </Badge>
          </IconButton>
          </LightTooltip>

          {/* Notification Alerts */}
          <LightTooltip title="Alto Risco" placement="bottom" arrow interactive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} aria-label="Cartão">
          <IconButton aria-label="notification" color="inherit">
            <Badge badgeContent={props.notificationAlerts} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          </LightTooltip>

          {/* Avatar */}
          <ImageAvatars />
          
        </Toolbar>
      </AppBar>

      {/* Menu */} 

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />

        <List>{mainListItems}</List>

        <Divider />

        <List>{secondaryListItems}</List>

      </Drawer>

      {/* Components Area */}

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>

            {/* Chart */}

            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>

            {/* Total Risk Amount */}

            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <TotalRiskAmount value={props.totalRiskAmount} todayDate={props.todayDate} />
              </Paper>
            </Grid>

            {/* Recent Orders */}

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <RiskScoreListTable orders={props.orders} />
              </Paper>
            </Grid>

          </Grid>

          <div className={classes.seeMore}>
            <Link color="primary" href="#" onClick={preventDefault}>
              Ver mais Pedidos
            </Link>
          </div>

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
