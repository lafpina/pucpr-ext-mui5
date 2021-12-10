import { makeStyles } from "@material-ui/core/styles";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined"; // Cliente novo
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined"; // White List
import LocalFloristOutlinedIcon from "@material-ui/icons/LocalFloristOutlined";
import SentimentVeryDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentVeryDissatisfiedOutlined"; //Black List
import ErrorIcon from "@material-ui/icons/Error";
import FaceIcon from '@material-ui/icons/Face';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

export function IconizePurchaseProfile(props) {
  const classes = usePurchaseProfileStyles();

  if (props.blackListed) {
    return <ErrorIcon className={classes.blackListed} fontSize={props.size} />;
  }

  if (props.whiteListed) {
    return (
      <FavoriteOutlinedIcon
        className={classes.whiteListed}
        fontSize={props.size}
      />
    );
  }

  if (props.qtyPurchase > 0) {
    return (
      <CheckCircleOutlineIcon
        className={classes.regularClient}
        fontSize={props.size}
      />
    );
  }

  console.log("Error Check Score ==>", props.orderErrorCheckScore)
  if (props.orderErrorCheckScore > 0) {
    return (
      <ReportProblemIcon
        className={classes.errorCheck}
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
    color: "Gold",
  },
  regularClient: {
    color: "PowderBlue",
  },
  blackListed: {
    color: "DimGray",
  },
  whiteListed: {
    color: "Pink",
  },
  errorCheck: {
    color: "LightCoral",
  },
  default: {
    color: "DarkGray",
  },
});
