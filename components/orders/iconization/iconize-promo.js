import { makeStyles } from "@material-ui/core/styles";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";

export function IconizePromo(props) {
  const classes = promoStyles();

  if (props.promo > " ") {
    return (
      <LocalOfferOutlinedIcon className={classes.promo} fontSize={props.size} />
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
