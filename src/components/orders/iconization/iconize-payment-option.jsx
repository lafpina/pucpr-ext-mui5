import { makeStyles } from "@material-ui/core/styles";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import MobileFriendlyOutlinedIcon from "@material-ui/icons/MobileFriendlyOutlined";
import SaveAltOutlinedIcon from "@material-ui/icons/SaveAltOutlined";
import LoyaltyOutlinedIcon from "@material-ui/icons/LoyaltyOutlined";
import { convertGridRowsPropToState } from "@material-ui/data-grid";

export function IconizePaymentOption(props) {
  const classes = usePaymentStyles();

  //? Bloco giftCard

  console.log(props)

  if (props.payMethod.giftCard && props.payMethod.isCreditCardHolder.no) {
    return (
      <>
        <LoyaltyOutlinedIcon
          className={classes.giftCard}
          fontSize={props.size}
        />

        <PaymentOutlinedIcon
          className={classes.noCreditCardHolder}
          fontSize={props.size}
        />
      </>
    );
  }

  if (props.payMethod.giftCard && props.payMethod.isCreditCardHolder.maybe) {
    return (
      <>
        <LoyaltyOutlinedIcon
          className={classes.giftCard}
          fontSize={props.size}
        />

        <PaymentOutlinedIcon
          className={classes.maybeCreditCardHolder}
          fontSize={props.size}
        />
      </>
    );
  }

  if (props.payMethod.giftCard && props.payMethod.isCreditCardHolder.yes) {
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

  if (props.payMethod.giftCard && props.payMethod.instantPayment) {
    return (
      <>
        <LoyaltyOutlinedIcon
          className={classes.giftCard}
          fontSize={props.size}
        />

        <MobileFriendlyOutlinedIcon
          className={classes.instantPayment}
          fontSize={props.size}
        />
      </>
    );
  }

  //? Bloco instantPayment

  if (props.payMethod.instantPayment && props.payMethod.isCreditCardHolder.no) {
    return (
      <>
        <MobileFriendlyOutlinedIcon
          className={classes.instantPayment}
          fontSize={props.size}
        />

        <PaymentOutlinedIcon
          className={classes.noCreditCardHolder}
          fontSize={props.size}
        />
      </>
    );
  }

  if (
    props.payMethod.instantPayment &&
    props.payMethod.isCreditCardHolder.maybe
  ) {
    return (
      <>
        <MobileFriendlyOutlinedIcon
          className={classes.instantPayment}
          fontSize={props.size}
        />

        <PaymentOutlinedIcon
          className={classes.maybeCreditCardHolder}
          fontSize={props.size}
        />
      </>
    );
  }

  if (
    props.payMethod.instantPayment &&
    props.payMethod.isCreditCardHolder.yes
  ) {
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

  if (props.payMethod.promissory && props.payMethod.isCreditCardHolder.no) {
    return (
      <>
        <SaveAltOutlinedIcon
          className={classes.promissory}
          fontSize={props.size}
        />

        <PaymentOutlinedIcon
          className={classes.noCreditCardHolder}
          fontSize={props.size}
        />
      </>
    );
  }

  if (props.payMethod.promissory && props.payMethod.isCreditCardHolder.maybe) {
    return (
      <>
        <SaveAltOutlinedIcon
          className={classes.promissory}
          fontSize={props.size}
        />

        <PaymentOutlinedIcon
          className={classes.maybeCreditCardHolder}
          fontSize={props.size}
        />
      </>
    );
  }

  if (props.payMethod.promissory && props.payMethod.isCreditCardHolder.yes) {
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

  if (props.payMethod.giftCard) {
    return (
      <LoyaltyOutlinedIcon className={classes.giftCard} fontSize={props.size} />
    );
  }

  if (props.payMethod.instantPayment) {
    return (
      <MobileFriendlyOutlinedIcon
        className={classes.instantPayment}
        fontSize={props.size}
      />
    );
  }

  if (props.payMethod.isCreditCardHolder.no) {
    return (
      <PaymentOutlinedIcon
        className={classes.noCreditCardHolder}
        fontSize={props.size}
      />
    );
  }

  if (props.payMethod.isCreditCardHolder.maybe) {
    return (
      <PaymentOutlinedIcon
        className={classes.maybeCreditCardHolder}
        fontSize={props.size}
      />
    );
  }

  if (props.payMethod.isCreditCardHolder.yes) {
    return (
      <PaymentOutlinedIcon
        className={classes.creditCardHolder}
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

  return null
}

const usePaymentStyles = makeStyles({
  creditCardHolder: {
    color: "MediumSpringGreen",
  },
  maybeCreditCardHolder: {
    color: "Gold",
  },
  noCreditCardHolder: {
    color: "LightSalmon",
  },
  giftCard: {
    color: "LightSkyBlue",
  },
  promissory: {
    color: "RosyBrown",
  },
  instantPayment: {
    color: "YellowGreen",
  },
});
