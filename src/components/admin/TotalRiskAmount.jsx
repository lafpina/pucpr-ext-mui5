import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

import setCurrency from "../../helper/utils/setCurrency";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  riskValueContext: {
    flex: 1,
  },
});

export default function TotalRiskAmount(props) {
  const classes = useStyles();

  const {value, todayDate } = props

  return (
    <>
      <Title>Risco</Title>

      <Typography component="p" variant="h4">
        {setCurrency(value)}
      </Typography>
      <Typography color="textSecondary" className={classes.riskValueContext}>

        {todayDate}

      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver pedidos em risco
        </Link>
      </div>
    </>
  );
}
