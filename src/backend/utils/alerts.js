import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export function DisplayAlert(props) {
  const classes = useStyles();

  switch (props.type) {
    case "error":
      return (
        <div className={classes.root}>
          <Alert onClose={() => {}}>{props.msg}</Alert>
        </div>
      );
    case "warning":
      return (
        <div className={classes.root}>
          <Alert severity="warning">
            <AlertTitle>Atenção</AlertTitle>
            {props.msg}
          </Alert>
        </div>
      );
    case "info":
      return (
        <div className={classes.root}>
          <Alert severity="info">
            <AlertTitle>Aviso</AlertTitle>
            {props.msg}
          </Alert>
        </div>
      );
    case "success":
      return (
        <div className={classes.root}>
          <Alert severity="success">
            <AlertTitle>Parabéns</AlertTitle>
            {props.msg}
          </Alert>
        </div>
      );
  }

}
