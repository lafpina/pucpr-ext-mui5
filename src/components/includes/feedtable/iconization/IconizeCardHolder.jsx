import { makeStyles } from "@material-ui/styles";
import { HowToRegOutlined, PeopleAltOutlined, PermIdentityOutlined } from "@material-ui/icons";

export function IconizeCardHolder(props) {
  const classes = useCardHolderStyles();

  switch (props.cardHolder) {
    case "Sim":
      return (
        <HowToRegOutlined
          className={classes.cardHolder}
          fontSize={props.size}
        />
      );
    case "Não":
      return (
        <PeopleAltOutlined
          className={classes.noCardHolder}
          fontSize={props.size}
        />
      );
    default:
      return (
        <PermIdentityOutlined
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
