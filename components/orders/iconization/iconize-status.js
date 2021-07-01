import { makeStyles } from "@material-ui/core/styles";
import TimerIcon from "@material-ui/icons/Timer";
import ScheduleIcon from "@material-ui/icons/Schedule";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import CancelIcon from "@material-ui/icons/Cancel";
import ExposurePlus1Icon from "@material-ui/icons/ExposurePlus1";

export function IconizeStatus(props) {
  const classes = useStatusStyles();

  switch (props.status) {
    case "payment-pending":
      return <TimerIcon className={classes.aguardando} fontSize={props.size} />;
    case "window-to-cancel":
      return (
        <ScheduleIcon className={classes.carencia} fontSize={props.size} />
      );
    case "ready-for-handling":
      return (
        <ScreenShareIcon className={classes.manuseio} fontSize={props.size} />
      );
    case "handling":
      return (
        <ShoppingBasketIcon
          className={classes.preparando}
          fontSize={props.size}
        />
      );
    case "invoiced":
      return (
        <MonetizationOnIcon
          className={classes.faturado}
          fontSize={props.size}
        />
      );
    case "canceled":
      return <CancelIcon className={classes.cancelado} fontSize={props.size} />;
    default:
      return (
        <ExposurePlus1Icon className={classes.qty6} fontSize={props.size} />
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
