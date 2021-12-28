import { makeStyles } from "@material-ui/styles";
import CardGiftcardOutlinedIcon from "@material-ui/icons/CardGiftcardOutlined"; // Lista

export function IconizeGiftCard(props) {
  const classes = giftCardStyles();

  if (props.giftId > " ") {
    return (
      <CardGiftcardOutlinedIcon
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
