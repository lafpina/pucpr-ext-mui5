import { makeStyles } from "@material-ui/core/styles";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined"; // Cliente novo
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined"; // White List
import LocalFloristOutlinedIcon from "@material-ui/icons/LocalFloristOutlined";
import SentimentVeryDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentVeryDissatisfiedOutlined"; //Black List
import PanToolOutlinedIcon from "@material-ui/icons/PanToolOutlined";
import ErrorIcon from "@material-ui/icons/Error";

export function IconizePurchaseProfile(props) {
  const classes = usePurchaseProfileStyles();

  if (props.blackListed) {
    return <ErrorIcon className={classes.blackListed} fontSize={props.size} />;
  }

  if (props.whiteListed) {
    return (
      <LocalFloristOutlinedIcon
        className={classes.whiteListed}
        fontSize={props.size}
      />
    );
  }

  if (props.qtyPurchase > 0) {
    return (
      <FavoriteOutlinedIcon
        className={classes.regularClient}
        fontSize={props.size}
      />
    );
  }

  return (
    <ErrorOutlineOutlinedIcon
      className={classes.newClient}
      fontSize={props.size}
    />
  );
}

const usePurchaseProfileStyles = makeStyles({
  newClient: {
    color: "LightSteelBlue",
  },
  regularClient: {
    color: "Pink",
  },
  blackListed: {
    color: "Black",
  },
  whiteListed: {
    color: "Violet",
  },
  default: {
    color: "DarkGray",
  },
});
