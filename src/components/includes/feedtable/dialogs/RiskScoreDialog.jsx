import React from "react";
import { makeStyles } from "@material-ui/styles";
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

import { IconizeRiskLevel } from "../iconization/IconizeRiskLevel";
import { StyledBadge } from "../badgezation/StyledBadge";
import { StyledBadgeRisk } from "../badgezation/StyledBadge";
import { StyledBadgeWarning } from "../badgezation/StyledBadge";

import InsertChartIcon from "@material-ui/icons/InsertChart";

import RiskScoreChart from "./RiskScoreChart";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    // backgroundColor: theme.palette.warning.dark,
    backgroundColor: "#4d6e8a",
    // backgroundColor: "#546d77",
  },
  title: {
    // marginLeft: theme.spacing(2),
    flex: 1,
  },
  color: "Grey",
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RiskScoreDialog(props) {
  const classes = useStyles();

  const { orderDetail } = props;

  const [open, setOpen] = React.useState(true);
  const [isChartOpen, setIsChartOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChartOpen = (e) => setIsChartOpen((prevState) => !prevState);

  return (
    <Dialog
      // fullScreen
      maxWidth="lg"
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
          <Button autoFocus color="inherit" onClick={handleChartOpen}>
            {/* {orderDetail.score > 80 ? (
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
              /> */}
            <InsertChartIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        {orderDetail.riskProfile.riskScoreLog
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
      {isChartOpen && <RiskScoreChart detail={orderDetail} />}
    </Dialog>
  );
}
