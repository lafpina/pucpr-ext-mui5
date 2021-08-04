import { lookForPurchaseHistory } from "../api/lookForPurchaseHistory";
import formatTZOrderDate from "../utils/formatTZOrderDate";
import titleCase from "../utils/titleCase";
import { getIncompleteOrders } from "../api/getIncompleteOrders";
import { getIncompleteOrdersByCpf } from "../api/getIncompleteOrdersByCpf";
import isClientEmailValid from "../api/isClientEmailValid";
import isClientCPFValid from "../utils/isClientCpfValid";
import { determineRisk } from "../utils/determineRisk";
import { isBlackListed } from "../../../data/black-list";
import { isWhiteListed } from "../../../data/white-list";
import { isPhoneAreaCodeOk } from "../../../data/area-code-list";

export const buildRiskScoreObject = async (orderObject) => {
  let riskScoreObject = initializeScores();

  if (orderObject.paymentGroupActive.creditCard) {
    riskScoreObject = applyCardHolderRule(orderObject, riskScoreObject);
    riskScoreObject = applyForeignCardRule(orderObject, riskScoreObject);
    riskScoreObject = applyShippingRateRule(orderObject, riskScoreObject);
    riskScoreObject = applyPaymentValueRule(orderObject, riskScoreObject);
    riskScoreObject = applyShoppingTimeRule(orderObject, riskScoreObject);
  }
  riskScoreObject = applyCouponDiscountRule(orderObject, riskScoreObject);
  riskScoreObject = applyGiftRule(orderObject, riskScoreObject);
  riskScoreObject = applyPaymentMethodRule(orderObject, riskScoreObject);
  // riskScoreObject = applyCustomProductRule(orderObject, riskScoreObject);
  riskScoreObject = await applyHistPurchaseRule(orderObject, riskScoreObject);
  riskScoreObject = await applyIncompOrdersRule(orderObject, riskScoreObject);
  riskScoreObject = applyCarrierRule(orderObject, riskScoreObject);
  riskScoreObject = applyDocumentRule(orderObject, riskScoreObject); // CPF
  riskScoreObject = applyEmailRule(orderObject, riskScoreObject); // Email
  riskScoreObject = applyAreaCodeRule(orderObject, riskScoreObject);
  riskScoreObject = applyBlackListRule(orderObject, riskScoreObject);
  riskScoreObject = applyWhiteListRule(orderObject, riskScoreObject);

  if (riskScoreObject.final > 100) riskScoreObject.final = 100;
  if (riskScoreObject.final < 1) riskScoreObject.final = 1;

  riskScoreObject.description = determineRisk(riskScoreObject.final);

  riskScoreObject = applyAlertsRule(riskScoreObject.final, riskScoreObject);

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
      profile: {
        qty: 0,
        value: 0,
        isGiftHistory: false,
        isPromissoryHistory: false,
        isPixHistory: false,
        dateFirstBuy: " ",
      },
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
    areaCode: {
      score: 0,
    },
    shoppingTime: {
      score: 0,
    },
    blackListed: {
      qty: 0,
      score: 0,
    },
    whiteListed: {
      qty: 0,
      score: 0,
    },
    alerts: {
      qty: 0,
      score: 0,
    },
    final: 100,
    description: " ",
  };

  return riskScoreObject;
};
//? Rule 1
const applyCardHolderRule = (orderObject, riskScoreObject) => {
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
    riskScoreObject.final -= 10;
    riskScoreObject.cardHolder.score = -10;
    riskScoreObject.cardHolder.yes = true;
  } else if (qtyInstance == 1) {
    riskScoreObject.final -= 5;
    riskScoreObject.cardHolder.score = -5;
    riskScoreObject.cardHolder.maybe = true;
  } else {
    riskScoreObject.cardHolder.no = true;
  }

  return riskScoreObject;
};
//? Rule 2
const applyForeignCardRule = (orderObject, riskScoreObject) => {
  // Socre negatively for foreign credit card

  if (orderObject.cardCountry !== "BRAZIL" && orderObject.cardCountry !== " ") {
    riskScoreObject.final += 5;
    riskScoreObject.foreignCreditCard.score = 5;
  }
  return riskScoreObject;
};
//? Rule 3
const applyCouponDiscountRule = (orderObject, riskScoreObject) => {
  // Any coupon of discount other than Compre Junto will score positively
  if (
    orderObject.coupon > " " &&
    orderObject.coupon.indexOf("Compre Junto") == -1
  ) {
    riskScoreObject.final -= 15;
    riskScoreObject.couponDiscount.score = -15;
  }
  return riskScoreObject;
};
//? Rule 4
const applyGiftRule = (orderObject, riskScoreObject) => {
  // Scores positively in the case of it's a Guest List Order identified by a List ID
  if (orderObject.giftId) {
    riskScoreObject.final -= 30;
    riskScoreObject.giftGuest.score = -30;
  }
  return riskScoreObject;
};
//? Rule 5
const applyPaymentMethodRule = (orderObject, riskScoreObject) => {
  // Score positively whether it's a deposit, pix or giftCard payment method

  if (orderObject.paymentGroupActive.promissory) {
    riskScoreObject.final -= 50;
    riskScoreObject.paymentMethod.promissory.score = -50;
  }
  if (orderObject.paymentGroupActive.instantPayment) {
    riskScoreObject.final -= 50;
    riskScoreObject.paymentMethod.instantPayment.score = -50;
  }
  if (orderObject.paymentGroupActive.giftCard) {
    riskScoreObject.final -= 50;
    riskScoreObject.paymentMethod.giftCard.score = -50;
  }
  return riskScoreObject;
};
//? Rule 6
const applyCustomProductRule = (orderObject, riskScoreObject) => {
  // Score positively if the order is for a customized product
  for (let i = 0; i < orderObject.items.length; ++i) {
    if (orderObject.items[i].refId === "PAC0075") {
      riskScoreObject.final -= 5;
      riskScoreObject.customProduct.score = -5;
    }
  }
  return riskScoreObject;
};
//? Rule 7
const applyHistPurchaseRule = async (orderObject, riskScoreObject) => {
  // Score positively based on the history of purchase

  if (orderObject.clientEmail > " ") {
    riskScoreObject.historyPurchase.profile = await lookForPurchaseHistory(
      // orderObject.clientEmail
      orderObject.cpf
    );

    if (riskScoreObject.historyPurchase.profile.qty > 0) {
      const createDate = orderObject.creationDate.substr(0, 10);
      const now = convertDate(createDate); // Data da compra atual

      const past = new Date(
        riskScoreObject.historyPurchase.profile.dateFirstBuy.substr(0, 10)
      ); // Data da primeira compra

      const diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).

      let blackedResult = isBlackListed(
        orderObject.clientEmail,
        orderObject.cpf,
        orderObject.shippingPostalCode,
        orderObject.phone,
        orderObject.cardLastDigits,
        orderObject.shippingState,
        orderObject.shippingCity,
        orderObject.cardCountry
      );

      if (days > 90 && !blackedResult.isBlacked) {
        riskScoreObject.final -= 20;
        riskScoreObject.historyPurchase.score -= 20;
      }

      // History has at least one purchase for a gift list
      if (riskScoreObject.historyPurchase.profile.isGiftHistory) {
        riskScoreObject.final -= 40;
        riskScoreObject.historyPurchase.score -= -40;
      }
      if (riskScoreObject.historyPurchase.profile.isPromissoryHistory) {
        riskScoreObject.final -= 30;
        riskScoreObject.historyPurchaseScore -= 30;
      }
      if (riskScoreObject.historyPurchase.profile.isPixHistory) {
        riskScoreObject.final -= 30;
        riskScoreObject.historyPurchaseScore -= 30;
      }
      // Client has bought over 1.000 before this transaction
      if (riskScoreObject.historyPurchase.profile.value > 100000) {
        riskScoreObject.final -= 10;
        riskScoreObject.historyPurchase.score -= 10;
      }
      // Client has bought at least 100 before this transaction than can be
      // elegible for quantity evaluation
      if (riskScoreObject.historyPurchase.profile.value > 10000) {
        switch (riskScoreObject.historyPurchase.profile.qty) {
          case 1:
            riskScoreObject.final -= 5;
            riskScoreObject.historyPurchase.score -= 5;
            break;
          case 2:
            riskScoreObject.final -= 10;
            riskScoreObject.historyPurchase.score -= 10;
            break;
          case 3:
            riskScoreObject.final -= 15;
            riskScoreObject.historyPurchase.score -= 15;
            break;
          case 4:
            riskScoreObject.final -= 20;
            riskScoreObject.historyPurchase.score -= 20;
            break;
          case 5:
            riskScoreObject.final -= 25;
            riskScoreObject.historyPurchase.score -= 25;
            break;
          default:
            riskScoreObject.final -= 30;
            riskScoreObject.historyPurchase.score -= 30;
        }
      }
    }
  }
  return riskScoreObject;
};
//? Rule 8
const applyShippingRateRule = (orderObject, riskScoreObject) => {
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
//? Rule 9
const applyIncompOrdersRule = async (orderObject, riskScoreObject) => {
  // Any incompete order will be scored negatively
  riskScoreObject.incompleteOrders.qty = await getIncompleteOrders(
    orderObject.clientName
  );

  // riskScoreObject.incompleteOrders.qty = await getIncompleteOrdersByCpf(
  //   orderObject.cpf
  // );

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
  return riskScoreObject;
};
//? Rule 10
const applyCarrierRule = (orderObject, riskScoreObject) => {
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
//? Rule 11
const applyPaymentValueRule = (orderObject, riskScoreObject) => {
  // Fist it scores positively for payment whose value is acceptable as a risk,
  // as long as it's a national card
  // if (orderObject.value <= 10000 && orderObject.cardCountry === "BRAZIL") {
  //   riskScoreObject.paymentValue.score -= 5;
  //   riskScoreObject.final -= 5;
  // }

  // For values over the average ticket, it gets evaluated by either
  // fist buying, one installment, or by the minimum installment payment allowed
  if (orderObject.value > 40000 && orderObject.paymentGroup.creditCard) {
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
  if (orderObject.value > 300000 && orderObject.paymentGroup.creditCard) {
    // higher value
    riskScoreObject.final += 10;
    riskScoreObject.paymentValue.score += 10;
  }

  return riskScoreObject;
};
//? Rule 12
const applyDocumentRule = (orderObject, riskScoreObject) => {
  // set final score to its max if document is invalid
  if (!isClientCPFValid(orderObject.cpf)) {
    riskScoreObject.validCPF.score = 100;
    riskScoreObject.final = 100;
  }
  return riskScoreObject;
};
//? Rule 13
const applyEmailRule = (orderObject, riskScoreObject) => {
  // In case client email contains numbers risk increases in 5%
  const regex = /[0-9]/;
  const emailFirstPart = orderObject.clientEmail.split("@", 1);

  if (regex.test(emailFirstPart)) {
    riskScoreObject.validEmail.score += 5;
    riskScoreObject.final += 5;
  }

  // In case email client doesnt contain any portion of the name risk increases in 5%
  const cliName = titleCase(orderObject.clientName).split(" ");

  let qtyInstance = 0;
  const email = emailFirstPart.toString();
  const verifyNameEmail = (name) => {
    const clientNamePortion = name.toString().toLowerCase();
    if (email.includes(clientNamePortion)) {
      qtyInstance++;
    }
  };

  cliName.forEach(verifyNameEmail);

  if (qtyInstance === 0) {
    riskScoreObject.validEmail.score += 5;
    riskScoreObject.final += 5;
  }

  // In case of not a free email domain risk increases in 5%
  let isFreeDomainEmail = false;
  const freeEmail = ["gmail", "hotmail", "yahoo", "outlook", "icloud"];
  for (var i = 0; i < freeEmail.length; i++) {
    if (orderObject.clientEmail.indexOf(freeEmail[i]) != -1) {
      isFreeDomainEmail = true;
    }
  }
  if (!isFreeDomainEmail) {
    riskScoreObject.validEmail.score += 5;
    riskScoreObject.final += 5;
  }

  // In case of email too long risk increases in 5%
  if (emailFirstPart.length > 25) {
    console.log("Bingo!", emailFirstPart, emailFirstPart.length);
    riskScoreObject.validEmail.score += 5;
    riskScoreObject.final += 5;
  }

  return riskScoreObject;

  // set final score to its max if e-mail is invalid
  // if (riskScoreObject.score > 85) {
  //   if (clientEmail) {
  //     if (!isClientEmailValid(clientEmail)) {
  //       isEmailValid = false;
  //       riskScoreObject.emailScore = +100;
  //       riskScoreObject.score = riskScoreObject.score + 100;
  //       console.log(`email ${clientEmail} não é válido`);
  //     }
  //   }
  // }
};

//? Rule 14
const applyAreaCodeRule = (orderObject, riskScoreObject) => {
  if (
    !isPhoneAreaCodeOk(
      orderObject.phone.substr(3, 2),
      orderObject.shippingState
    )
  ) {
    riskScoreObject.areaCode.score += 5;
    riskScoreObject.final += 5;
  }

  return riskScoreObject;
};

//? Rule 15
const applyShoppingTimeRule = (orderObject, riskScoreObject) => {
  const shoppingTime = orderObject.creationDate.substr(11, 5);
  if (
    shoppingTime > "00:00" &&
    shoppingTime < "06:00" &&
    orderObject.paymentGroup.creditCard
  ) {
    riskScoreObject.shoppingTime.score += 10;
    riskScoreObject.final += 10;
  }

  return riskScoreObject;
};

const applyBlackListRule = (orderObject, riskScoreObject) => {
  let blackedResult = isBlackListed(
    orderObject.clientEmail,
    orderObject.cpf,
    orderObject.shippingPostalCode,
    orderObject.phone,
    orderObject.cardLastDigits,
    orderObject.shippingState,
    orderObject.shippingCity,
    orderObject.cardCountry
  );

  if (blackedResult.isBlacked) riskScoreObject.blackListed.qty += 1;

  return riskScoreObject;
};

const applyWhiteListRule = (orderObject, riskScoreObject) => {
  if (isWhiteListed(orderObject.clientEmail, orderObject.cpf)) {
    riskScoreObject.whiteListed.qty += 1;
  }
  return riskScoreObject;
};

const applyAlertsRule = (finalScore, riskScoreObject) => {
  if (finalScore > 80) {
    riskScoreObject.alerts.qty += 1;
  }
  return riskScoreObject;
};

const convertDate = (date) => {
  // ex date: "DD-MM-AAAA HH:mm"

  // Precisamos quebrar a string para retornar cada parte
  const dataSplit = date.split("-");
  const day = dataSplit[0]; // DD
  const month = dataSplit[1]; // MM
  const year = dataSplit[2]; // AAAA

  // const data = new Date(year, month - 1, day);

  // Retorna o objeto Date, lembrando que o mês começa em 0, então fazemos -1.
  return new Date(year, month - 1, day);
};
