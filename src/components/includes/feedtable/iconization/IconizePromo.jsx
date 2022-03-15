import { makeStyles } from "@material-ui/styles";
import { LocalOfferOutlined } from "@material-ui/icons";

export function IconizePromo(props) {
  const classes = promoStyles();

  if (props.promo > " ") {
    return (
      <LocalOfferOutlined className={classes.promo} fontSize={props.size} />
    );
  } else {
    return null;
  }
}

const promoStyles = makeStyles({
  promo: {
    color: "LightSkyBlue",
  },
});
