import { lookForPurchaseHistory } from "../../components/lib/api/lookfor-purchase-history";
import titleCase from "../../components/lib/utils/titleCase";
import { getIncompleteOrders } from "../../components/lib/api/getIncompleteOrders";
import isClientEmailValid from "../../components/lib/api/is-client-email-valid";
import isClientCPFValid from "../../components/lib/utils/is-client-cpf-valid";

export const buildRiskScoreObject = async (orderObject) => {
  let riskScoreObject = initializeScores();
  //? Down Score Rules (Decrease the chance of fraud suspection)
  riskScoreObject = applyCardHolderScoreRule(orderObject, riskScoreObject);
  console.log("Regra 1");
  riskScoreObject = applyCouponDiscountScoreRule(orderObject, riskScoreObject);
  console.log("Regra 2");
  riskScoreObject = applyGiftScoreRule(riskScoreObject);
  console.log("Regra 3");
  riskScoreObject = applyPaymentMethodScoreRule(orderObject, riskScoreObject);
  console.log("Regra 4");
  riskScoreObject = applyCustomProductScoreRule(orderObject, riskScoreObject);
  console.log("Regra 5");
  riskScoreObject = applyHistoryPurchaseScoreRule(orderObject, riskScoreObject);
  console.log("Regra 6");
  //? Up Score Rules (Increase the chance of fraud suspection)
  riskScoreObject = applyShippingRateScoreRule(orderObject, riskScoreObject);
  console.log("Regra 7");
  riskScoreObject = applyIncompleteOrdersScoreRule(riskScoreObject);
  console.log("Regra 8");
  riskScoreObject = applyCarrierScoreRule(orderObject, riskScoreObject);
  console.log("Regra 9");
  riskScoreObject = applyForeignCardScoreRule(orderObject, riskScoreObject);
  console.log("Regra 10");
  //? Up or Down Score Rules
  riskScoreObject = applyPaymentValueScoreRule(orderObject, riskScoreObject);
  console.log("Regra 11");
  //? Higher Score to its max value
  riskScoreObject = applyDocumentScoreRule(orderObject, riskScoreObject); // CPF
  console.log("Regra 12");
  riskScoreObject = applyEmailScoreRule(orderObject, riskScoreObject); // Email
  console.log("Regra 13");

  console.log(riskScoreObject);

  if (riskScoreObject.final > 100) riskScoreObject.final = 100;

  return riskScoreObject;
};

const initializeScores = () => {
  var riskScoreObject = {
    incompleteOrders: {
      qty: 0,
      score: 0,
    },
    couponDiscount: {
      qty: 0,
      score: 0,
    },
    carrier: {
      score: 0,
    },
    giftGuest: {
      score: 0,
    },
    paymentMethod: {
      promissory: {
        score: 0,
      },
      instantPayment: {
        score: 0,
      },
      creditCard: {
        score: 0,
      },
      giftCard: {
        score: 0,
      },
    },
    customProduct: {
      score: 0,
    },
    historyPurchase: {
      qty: 0,
      value: 0,
      giftHistory: 0,
      score: 0,
    },
    paymentValue: {
      score: 0,
    },
    validEmail: {
      score: 0,
    },
    validCpf: {
      score: 0,
    },
    cardHolder: {
      yes: false,
      maybe: false,
      no: false,
      score: 0,
    },
    foreignCreditCard: {
      score: 0,
    },
    shippingRate: {
      score: 0,
    },
    final: 100,
  };
  return riskScoreObject;
};

const applyCardHolderScoreRule = (orderObject, riskScoreObject) => {
  // Score positively depending on matches between client data and card data
  var nomeCadastro = titleCase(orderObject.clientName).split(" ");
  var nomeCartao = titleCase(orderObject.cardHolder).split(" ");

  var qtyInstance = 0;

  const verifyBuyer = (item) => {
    if (nomeCadastro.indexOf(item) > -1) {
      qtyInstance++;
    }
  };

  nomeCartao.forEach(verifyBuyer);

  if (qtyInstance > 1) {
    riskScoreObject.final -= -10;
    riskScoreObject.cardHolder.score = -10;
    riskScoreObject.cardHolder.yes = true;
  } else if (qtyInstance == 1) {
    riskScoreObject.final -= -5;
    riskScoreObject.cardHolder.score = -5;
    riskScoreObject.cardHolder.maybe = true;
  } else {
    riskScoreObject.cardHolder.no = false;
  }

  return riskScoreObject;
};

const applyCouponDiscountScoreRule = (orderObject, riskScoreObject) => {
  // Any coupon of discount other than Compre Junto will score positively
  if (
    orderObject.coupon > " " &&
    orderObject.coupon.indexOf("Compre Junto") == -1
  ) {
    riskScoreObject.final += -15;
    riskScoreObject.couponDiscount.score = -15;
  }
  return riskScoreObject;
};

const applyShippingRateScoreRule = (orderObject, riskScoreObject) => {
  // Scores negatively depending on the rate between total product value and shipping cost
  let shippingRate = (
    (orderObject.totalShippingValue.value / orderObject.totalItemsValue.value) *
    100
  ).toFixed(2);

  if (shippingRate > 30.0) {
    riskScoreObject.final += 5;
    riskScoreObject.shippingRate.score = 5;
  }
  return riskScoreObject;
};

const applyIncompleteOrdersScoreRule = async (riskScoreObject) => {
  // Any incompete order will be scored negatively
  riskScoreObject.incompleteOrders.qty = await getIncompleteOrders(clientName);

  if (riskScoreObject.incompleteOrders.qty == 2) {
    riskScoreObject.final += 5;
    riskScoreObject.incompleteOrders.score = 5;
  } else if (riskScoreObject.incompleteOrders.qty == 3) {
    riskScoreObject.final += 10;
    riskScoreObject.incompleteOrders.score = 10;
  } else if (riskScoreObject.incompleteOrders.qty == 4) {
    riskScoreObject.final += 15;
    riskScoreObject.incompleteOrders.score = 15;
  } else if (riskScoreObject.incompleteOrders.qty > 4) {
    riskScoreObject.final += 30;
    riskScoreObject.incompleteOrders.score = 30;
  }
  return orderRiskObject;
};

const applyCarrierScoreRule = (orderObject, riskScoreObject) => {
  // Carrier express and pickup store score negatively
  if (!orderObject.paymentGroup.giftCard) {
    if (
      orderObject.carrier === "Expressa" ||
      orderObject.carrier === "Retirada"
    ) {
      if (orderObject.phone.substr(3, 2) != "11") {
        riskScoreObject.final += 10;
        riskScoreObject.carrier.score = 10;
      } else {
        riskScoreObject.final += 5;
        riskScoreObject.carrier.score = 5;
      }
    }
  }
  return riskScoreObject;
};

const applyGiftScoreRule = (riskScoreObject) => {
  // Scores positively in the case of it's a Guest List Order identified by a List ID
  if (riskScoreObject.giftId) {
    riskScoreObject.final += -20;
    riskScoreObject.giftGuest.score = -20;
  }
  return riskScoreObject;
};

const applyPaymentMethodScoreRule = (orderObject, riskScoreObject) => {
  // Score positively whether it's a deposit, pix or giftCard payment method

  if (orderObject.paymentGroupActive.promissory) {
    riskScoreObject.final += -30;
    riskScoreObject.promissory.score = -30;
  }
  if (orderObject.paymentGroupActive.instantPayment) {
    riskScoreObject.final += -35;
    riskScoreObject.instantPayment.score = -35;
  }
  if (orderObject.paymentGroupActive.giftCard) {
    riskScoreObject.final += -35;
    riskScoreObject.giftCard.score = -35;
  }
  return riskScoreObject;
};

const applyCustomProductScoreRule = (orderObject, riskScoreObject) => {
  // Score positively if the order is for a customized product
  for (let i = 0; i < orderObject.items.length; ++i) {
    if (orderObject.items[i].refId === "PAC0075") {
      riskScoreObject.final += -10;
      riskScoreObject.customProduct.score = -10;
    }
  }
  return riskScoreObject;
};

const applyHistoryPurchaseScoreRule = async (orderObject, riskScoreObject) => {
  // Score positively based on the history of purchase

  if (orderObject.clientEmail > " ") {
    orderObject.historyPurchase.qty = await lookForPurchaseHistory(
      orderObject.clientEmail
    );

    if (orderObject.historyPurchase.qty > 0) {
      if (riskScoreObject.historyPurchase.giftHistory) {
        riskScoreObject.final += -40;
        riskProfile.historyPurchaseScore = -40;
      } else if (orderObject.historyPurchase.value > 40000) {
        switch (orderObject.historyPurchase.qty) {
          case 1:
            riskScoreObject.final += -5;
            riskScoreObject.historyPurchase.score = -5;
            break;
          case 2:
            riskScoreObject.final += -10;
            riskScoreObject.historyPurchase.score = -10;
            break;
          case 3:
            riskScoreObject.final += -15;
            riskScoreObject.historyPurchase.score = -15;
            break;
          case 4:
            riskScoreObject.final += -20;
            riskScoreObject.historyPurchase.score = -20;
            break;
          case 5:
            riskScoreObject.final += -25;
            riskScoreObject.historyPurchase.score = -25;
            break;
          default:
            riskScoreObject.final += -30;
            riskScoreObject.historyPurchase.score = -30;
        }
      }
    }
  }
  return riskScoreObject;
};

const applyPaymentValueScoreRule = (orderObject, riskScoreObject) => {
  // Fist it scores positively for payment whose value is acceptable as a risk, as long as it's
  // a national card
  if (orderObject.value <= 40000 && orderObject.cardCountry === "BRAZIL") {
    riskScoreObject.final += -15;
    riskScoreObject.paymentValue.score += -15;
  } else {
    // Otherwise, for values over a ceiling limit, it gets evaluated by either
    // fist buying, one installment, or by the less installment payment allowed
    if (
      orderObject.value > 100000 &&
      orderObject.paymentGroupObject.creditCard
    ) {
      // first buying
      if (orderObject.historyPurchase.qty === 0) {
        riskScoreObject.final += 5;
        riskScoreObject.paymentValue.score += 5;
      }
      // one installment buying
      if (orderObject.cardInstallments === 1) {
        riskScoreObject.final += 5;
        riskScoreObject.paymentValue.score += 5;
      }
      // less installment payment allowed
      if (orderObject.cardInstallments === 6) {
        riskScoreObject.final += 5;
        riskScoreObject.paymentValue.score += 5;
      }
    }
  }
  return riskScoreObject;
};

const applyForeignCardScoreRule = (orderObject, riskScoreObject) => {
  // Socre negatively for foreign credit card
  if (orderObject.cardCountry !== "BRAZIL") {
    riskScoreObject.final += 5;
    riskScoreObject.foreignCreditCard.score = +5;
  }
  return riskScoreObject;
};

const applyDocumentScoreRule = (orderObject, riskScoreObject) => {
  // set final score to its max if document is invalid
  if (!isClientCPFValid(orderObject.cpf)) {
    riskScoreObject.valirdCPF.score = 100;
    riskScoreObject.final = 100;
  }
  return riskScoreObject;
};

const applyEmailScoreRule = (orderObject, riskScoreObject) => {
  // set final socre to its max if e-mail is invalid
  // if (riskProfile.score > 85) {
  //   if (clientEmail) {
  //     if (!isClientEmailValid(clientEmail)) {
  //       isEmailValid = false;
  //       riskProfile.emailScore = +100;
  //       riskProfile.score = riskProfile.score + 100;
  //       console.log(`email ${clientEmail} não é válido`);
  //     }
  //   }
  // }
};
