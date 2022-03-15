import { makeStyles } from "@material-ui/styles";
import { CardGiftcardOutlined } from "@material-ui/icons"; // Lista

export function IconizeGiftCard(props) {
  const classes = giftCardStyles();

  if (props.giftId > " ") {
    return (
      <CardGiftcardOutlined
        className={classes.giftCard}
        fontSize={props.size}
      />
    );
  } else {
    return " ";
  }
}

const giftCardStyles = makeStyles({
  giftCard: {
    color: "LightSkyBlue",
  },
});
