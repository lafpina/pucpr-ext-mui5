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

  //   return (
  //     <div className={classes.root}>
  //       <Alert severity="error">
  //         <AlertTitle>Error</AlertTitle>
  //         This is an error alert — <strong>check it out!</strong>
  //       </Alert>
  //       <Alert severity="warning">
  //         <AlertTitle>Warning</AlertTitle>
  //         This is a warning alert — <strong>check it out!</strong>
  //       </Alert>
  //       <Alert severity="info">
  //         <AlertTitle>Info</AlertTitle>
  //         This is an info alert — <strong>check it out!</strong>
  //       </Alert>
  //       <Alert severity="success">
  //         <AlertTitle>Success</AlertTitle>
  //         This is a success alert — <strong>check it out!</strong>
  //       </Alert>
  //     </div>
  //   );
}
