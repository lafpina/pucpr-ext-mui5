import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import { IconizeRiskLevel } from "../includes/iconization/IconizeRiskLevel";
import { StyledBadge } from "../includes/badgezation/StyledBadge";
import { StyledBadgeRisk } from "../includes/badgezation/StyledBadge";
import { StyledBadgeWarning } from "../includes/badgezation/StyledBadge";

import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    // backgroundColor: theme.palette.warning.dark,
    backgroundColor: "#4d6e8a",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  color: "Grey",
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();

  const { orderDetail } = props;

  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {orderDetail.cliente}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              {/* Score {orderDetail.score + " - Risco " + orderDetail.scoreDesc} */}
              {orderDetail.score > 80 ? (
                <StyledBadgeRisk
                  badgeContent={orderDetail.score}
                  max={999}
                ></StyledBadgeRisk>
              ) : orderDetail.score > 60 ? (
                <StyledBadgeWarning
                  badgeContent={orderDetail.score}
                  max={999}
                ></StyledBadgeWarning>
              ) : (
                <StyledBadge
                  badgeContent={orderDetail.score}
                  max={999}
                ></StyledBadge>
              )}
              <IconizeRiskLevel
                riskLevel={orderDetail.scoreDesc}
                size="default"
              />
              {/* </Box> */}
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {orderDetail.riskScoreLog
            .filter((rule) => rule.score != 0)
            .map((rule, ruleId) => {
              return (
                <div key={ruleId}>
                  <ListItem key={ruleId} button>
                    <ListItemText
                      id={rule.ruleId}
                      primary={rule.ruleName}
                      secondary={"score " + rule.score}
                    />
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
        </List>
      </Dialog>
    </div>
  );
}
