import { makeStyles } from "@material-ui/styles";
import { Timer, Schedule, ScreenShare, ShoppingBasket, MonetizationOn, Cancel, ExposurePlus1 } from "@material-ui/icons";

import ExposurePlus1Icon from "@material-ui/icons/ExposurePlus1";

export function IconizeStatus(props) {
  const classes = useStatusStyles();

  switch (props.status) {
    case "payment-pending":
      return <Timer className={classes.aguardando} fontSize={props.size} />;
    case "window-to-cancel":
      return (
        <Schedule className={classes.carencia} fontSize={props.size} />
      );
    case "ready-for-handling":
      return (
        <ScreenShare className={classes.manuseio} fontSize={props.size} />
      );
    case "handling":
      return (
        <ShoppingBasket
          className={classes.preparando}
          fontSize={props.size}
        />
      );
    case "invoiced":
      return (
        <MonetizationOn
          className={classes.faturado}
          fontSize={props.size}
        />
      );
    case "canceled":
      return <Cancel className={classes.cancelado} fontSize={props.size} />;
    default:
      return (
        <ExposurePlus1 className={classes.qty6} fontSize={props.size} />
      );
  }
}

const useStatusStyles = makeStyles({
  aguardando: {
    color: "LightGrey",
  },
  carencia: {
    color: "LightGrey",
  },
  manuseio: {
    color: "LightGrey",
  },
  preparando: {
    color: "Tan",
  },
  faturado: {
    color: "LightGrey",
  },
  cancelado: {
    color: "LightGrey",
  },
});
