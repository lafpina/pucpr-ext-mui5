import { makeStyles } from "@material-ui/core/styles";
import HowToRegOutlinedIcon from "@material-ui/icons/HowToRegOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";

export function IconizeCardHolder(props) {
  const classes = useCardHolderStyles();

  switch (props.cardHolder) {
    case "Sim":
      return (
        <HowToRegOutlinedIcon
          className={classes.cardHolder}
          fontSize={props.size}
        />
      );
    case "Não":
      return (
        <PeopleAltOutlinedIcon
          className={classes.noCardHolder}
          fontSize={props.size}
        />
      );
    default:
      return (
        <PermIdentityOutlinedIcon
          className={classes.default}
          fontSize={props.size}
        />
      );
  }
}

const useCardHolderStyles = makeStyles({
  cardHolder: {
    color: "LimeGreen",
  },
  noCardHolder: {
    color: "DarkOrange",
  },
  default: {
    color: "LightSkyBlue",
  },
});
