import { makeStyles } from "@material-ui/core/styles";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined"; // Cliente novo
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined"; // White List
import LocalFloristOutlinedIcon from "@material-ui/icons/LocalFloristOutlined";
import SentimentVeryDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentVeryDissatisfiedOutlined"; //Black List

export function IconizePurchaseProfile(props) {
  const classes = usePurchaseProfileStyles();

  if (props.blackListed) {
    return (
      <SentimentVeryDissatisfiedOutlinedIcon
        className={classes.blackListed}
        fontSize={props.size}
      />
    );
  } else if (props.whiteListed) {
    return (
      <LocalFloristOutlinedIcon
        className={classes.whiteListed}
        fontSize={props.size}
      />
    );
  } else if (props.qtyPurchase === 1) {
    return (
      <ErrorOutlineOutlinedIcon
        className={classes.newClient}
        fontSize={props.size}
      />
    );
  } else if (props.qtyPurchase > 1) {
    return (
      <FavoriteOutlinedIcon
        className={classes.regularClient}
        fontSize={props.size}
      />
    );
  }
  return (
    <ErrorOutlineOutlinedIcon
      className={classes.default}
      fontSize={props.size}
    />
  );
}

const usePurchaseProfileStyles = makeStyles({
  newClient: {
    color: "LightSteelBlue",
  },
  regularClient: {
    color: "Plum",
  },
  blackListed: {
    color: "Red",
  },
  whiteListed: {
    color: "Violet",
  },
  default: {
    color: "DarkGray",
  },
});
