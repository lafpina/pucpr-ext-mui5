import { makeStyles } from "@material-ui/styles";
import { PaymentOutlined, MobileFriendlyOutlined, SaveAltOutlined, LoyaltyOutlined } from "@material-ui/icons";
// import { convertGridRowsPropToState } from "@material-ui/data-grid";
// import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';

export function IconizePaymentOption(props) {
  const classes = usePaymentStyles();

  //? Bloco giftCard

  if (props.payMethod.giftCard && props.payMethod.isCreditCardHolder.no) {
    return (
      <>
        <LoyaltyOutlined
          className={classes.giftCard}
          fontSize={props.size}
        />

        <PaymentOutlined
          className={classes.noCreditCardHolder}
          fontSize={props.size}
        />
      </>
    );
  }

  if (props.payMethod.giftCard && props.payMethod.isCreditCardHolder.maybe) {
    return (
      <>
        <LoyaltyOutlined
          className={classes.giftCard}
          fontSize={props.size}
        />

        <PaymentOutlined
          className={classes.maybeCreditCardHolder}
          fontSize={props.size}
        />
      </>
    );
  }

  if (props.payMethod.giftCard && props.payMethod.isCreditCardHolder.yes) {
    return (
      <>
        <LoyaltyOutlined
          className={classes.giftCard}
          fontSize={props.size}
        />

        <PaymentOutlined
          className={classes.creditCardHolder}
          fontSize={props.size}
        />
      </>
    );
  }

  if (props.payMethod.giftCard && props.payMethod.instantPayment) {
    return (
      <>
        <LoyaltyOutlined
          className={classes.giftCard}
          fontSize={props.size}
        />

        <MobileFriendlyOutlined
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
        <MobileFriendlyOutlined
          className={classes.instantPayment}
          fontSize={props.size}
        />

        <PaymentOutlined
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
        <MobileFriendlyOutlined
          className={classes.instantPayment}
          fontSize={props.size}
        />

        <PaymentOutlined
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
        <MobileFriendlyOutlined
          className={classes.instantPayment}
          fontSize={props.size}
        />

        <PaymentOutlined
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
        <SaveAltOutlined
          className={classes.promissory}
          fontSize={props.size}
        />

        <PaymentOutlined
          className={classes.noCreditCardHolder}
          fontSize={props.size}
        />
      </>
    );
  }

  if (props.payMethod.promissory && props.payMethod.isCreditCardHolder.maybe) {
    return (
      <>
        <SaveAltOutlined
          className={classes.promissory}
          fontSize={props.size}
        />

        <PaymentOutlined
          className={classes.maybeCreditCardHolder}
          fontSize={props.size}
        />
      </>
    );
  }

  if (props.payMethod.promissory && props.payMethod.isCreditCardHolder.yes) {
    return (
      <>
        <SaveAltOutlined
          className={classes.promissory}
          fontSize={props.size}
        />

        <PaymentOutlined
          className={classes.creditCardHolder}
          fontSize={props.size}
        />
      </>
    );
  }

  //? Bloco single payment

  if (props.payMethod.giftCard) {
    return (
      <LoyaltyOutlined className={classes.giftCard} fontSize={props.size} />
    );
  }

  if (props.payMethod.instantPayment) {
    return (
      <MobileFriendlyOutlined
        className={classes.instantPayment}
        fontSize={props.size}
      />
    );
  }

  if (props.payMethod.isCreditCardHolder.no) {
    return (
      <PaymentOutlined
        className={classes.noCreditCardHolder}
        fontSize={props.size}
      />
    );
  }

  if (props.payMethod.isCreditCardHolder.maybe) {
    return (
      <PaymentOutlined
        className={classes.maybeCreditCardHolder}
        fontSize={props.size}
      />
    );
  }

  if (props.payMethod.isCreditCardHolder.yes) {
    return (
      <PaymentOutlined
        className={classes.creditCardHolder}
        fontSize={props.size}
      />
    );
  }

  if (props.payMethod.promissory) {
    return (
      <SaveAltOutlined
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
