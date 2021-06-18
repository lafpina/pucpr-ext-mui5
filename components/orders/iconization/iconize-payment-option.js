import { makeStyles } from "@material-ui/core/styles";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import MobileFriendlyOutlinedIcon from "@material-ui/icons/MobileFriendlyOutlined";
import SaveAltOutlinedIcon from "@material-ui/icons/SaveAltOutlined";
import LoyaltyOutlinedIcon from "@material-ui/icons/LoyaltyOutlined";
import { convertGridRowsPropToState } from "@material-ui/data-grid";

export function IconizePaymentOption(props) {
  const classes = usePaymentStyles();

  //? Bloco giftCard

  if (props.payMethod.giftCard && props.payMethod.creditCard) {
    return (
      <>
        <LoyaltyOutlinedIcon
          className={classes.giftCard}
          fontSize={props.size}
        />

        <PaymentOutlinedIcon
          className={classes.creditCard}
          fontSize={props.size}
        />
      </>
    );
  }

  if (props.payMethod.giftCard && props.payMethod.creditCardHolder) {
    return (
      <>
        <LoyaltyOutlinedIcon
          className={classes.giftCard}
          fontSize={props.size}
        />

        <PaymentOutlinedIcon
          className={classes.creditCardHolder}
          fontSize={props.size}
        />
      </>
    );
  }

  if (props.payMethod.giftCard) {
    return (
      <LoyaltyOutlinedIcon className={classes.giftCard} fontSize={props.size} />
    );
  }

  //? Bloco instantPayment

  if (props.payMethod.instantPayment && props.payMethod.creditCard) {
    return (
      <>
        <MobileFriendlyOutlinedIcon
          className={classes.instantPayment}
          fontSize={props.size}
        />

        <PaymentOutlinedIcon
          className={classes.creditCard}
          fontSize={props.size}
        />
      </>
    );
  }

  if (props.payMethod.instantPayment && props.payMethod.creditCardHolder) {
    return (
      <>
        <MobileFriendlyOutlinedIcon
          className={classes.instantPayment}
          fontSize={props.size}
        />

        <PaymentOutlinedIcon
          className={classes.creditCardHolder}
          fontSize={props.size}
        />
      </>
    );
  }

  //? Bloco promissory

  if (props.payMethod.promissory && props.payMethod.creditCard) {
    return (
      <>
        <SaveAltOutlinedIcon
          className={classes.promissory}
          fontSize={props.size}
        />

        <PaymentOutlinedIcon
          className={classes.creditCard}
          fontSize={props.size}
        />
      </>
    );
  }

  if (props.payMethod.promissory && props.payMethod.creditCardHolder) {
    return (
      <>
        <SaveAltOutlinedIcon
          className={classes.promissory}
          fontSize={props.size}
        />

        <PaymentOutlinedIcon
          className={classes.creditCardHolder}
          fontSize={props.size}
        />
      </>
    );
  }

  //? Bloco single payment

  if (props.payMethod.instantPayment) {
    return (
      <MobileFriendlyOutlinedIcon
        className={classes.instantPayment}
        fontSize={props.size}
      />
    );
  }

  if (props.payMethod.creditCardHolder) {
    return (
      <PaymentOutlinedIcon
        className={classes.creditCardHolder}
        fontSize={props.size}
      />
    );
  }

  if (props.payMethod.creditCard) {
    return (
      <PaymentOutlinedIcon
        className={classes.creditCard}
        fontSize={props.size}
      />
    );
  }

  if (props.payMethod.promissory) {
    return (
      <SaveAltOutlinedIcon
        className={classes.promissory}
        fontSize={props.size}
      />
    );
  }

  return (
    <SaveAltOutlinedIcon className={classes.promissory} fontSize={props.size} />
  );
}

const usePaymentStyles = makeStyles({
  creditCardHolder: {
    color: "Aquamarine",
  },
  creditCard: {
    color: "Tomato",
  },
  giftCard: {
    color: "LightSkyBlue",
  },
  promissory: {
    color: "RosyBrown",
  },
  instantPayment: {
    color: "MediumAquamarine",
  },
});
