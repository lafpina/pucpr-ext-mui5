import { makeStyles } from "@material-ui/styles";
import { ErrorOutlineOutlined, FavoriteOutlined, CheckCircleOutline, ReportProblem } from "@material-ui/icons";
import ErrorIcon from '@mui/icons-material/Error';


export function IconizePurchaseProfile(props) {
  const classes = usePurchaseProfileStyles();

  if (props.blackListed) {
    return <ErrorIcon className={classes.blackListed} fontSize={props.size} />;
  }

  if (props.orderErrorCheck > 0) {
    return (
      <ReportProblem
        className={classes.errorCheck}
        fontSize={props.size}
      />
    );
  }

  if (props.whiteListed) {
    return (
      <FavoriteOutlined
        className={classes.whiteListed}
        fontSize={props.size}
      />
    );
  }

  if (props.qtyPurchase > 0) {
    return (
      <CheckCircleOutline
        className={classes.regularClient}
        fontSize={props.size}
      />
    );
  }

  return (
    <ErrorOutlineOutlined
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
