import { determineRisk } from "../utils/determineRisk";
import { initializeScore } from "../rules/initializeScore";
import { applyCardHolderRule } from "../rules/applyCardHolderRule";
import { applyForeignCardRule } from "../rules/applyForeignCardRule";
import { applyCouponDiscountRule } from "../rules/applyCouponDiscountRule";
import { applyGiftRule } from "../rules/applyGiftRule";
import { applyPaymentMethodRule } from "../rules/applyPaymentMethodRule";
import { applyCustomProductRule } from "../rules/applyCustomProductRule";
import { applyHistPurchaseRule } from "../rules/applyHistPurchaseRule";
import { applyShippingRateRule } from "../rules/appplyShippingRateRule";
import { applyIncompOrdersRule } from "../rules/applyIncompleteOrdersRule";
import { applyCarrierRule } from "../rules/applyCarrierRule";
import { applyPaymentValueRule } from "../rules/applyPaymentValueRule";
import { applyDocumentRule } from "../rules/applyDocumentRule";
import { applyEmailRule } from "../rules/applyEmailRule";
import { applyAreaCodeRule } from "../rules/applyAreaCodeRule";
import { applyShoppingTimeRule } from "../rules/applyShoppingTimeRule";
import { applyBlackListRule } from "../rules/applyBlackListRule";
import { applyWhiteListRule } from "../rules/applyWhiteListRule";

export const buildRiskScoreObject = async (orderObject) => {
  const riskScoreGraph = [];
  const riskScoreDetail = {
    ruleId: 0,
    ruleName: "",
    score: 0,
  };

  let riskScoreObject = initializeScore();

  console.log("-----------------------------------------");
  console.log("Pedido:", orderObject.orderId);
  console.log("Cliente:", orderObject.clientName);
  console.log("-----------------------------------------");

  if (orderObject.paymentGroupActive.creditCard) {
    riskScoreObject = applyCardHolderRule(orderObject, riskScoreObject);
    riskScoreDetail.ruleId = "r001";
    riskScoreDetail.ruleName = "Card Holder";
    riskScoreDetail.score = riskScoreObject.cardHolder.score;
    riskScoreGraph.push(riskScoreDetail);
    console.log(riskScoreGraph[0]);

    riskScoreObject = applyForeignCardRule(orderObject, riskScoreObject);
    riskScoreDetail.ruleId = "r002";
    riskScoreDetail.ruleName = "Foreign Card";
    riskScoreDetail.score = riskScoreObject.foreignCreditCard.score;
    riskScoreGraph.push(riskScoreDetail);
    console.log(riskScoreGraph[1]);

    riskScoreObject = applyShippingRateRule(orderObject, riskScoreObject);
    riskScoreDetail.ruleId = "r003";
    riskScoreDetail.ruleName = "Shipping Rate";
    riskScoreDetail.score = riskScoreObject.shippingRate.score;
    riskScoreGraph.push(riskScoreDetail);
    console.log(riskScoreGraph[2]);

    riskScoreObject = applyPaymentValueRule(orderObject, riskScoreObject);
    riskScoreDetail.ruleId = "r004";
    riskScoreDetail.ruleName = "Payment Value";
    riskScoreDetail.score = riskScoreObject.paymentValue.score;
    riskScoreGraph.push(riskScoreDetail);
    console.log(riskScoreGraph[3]);

    riskScoreObject = applyShoppingTimeRule(orderObject, riskScoreObject);
    riskScoreDetail.ruleId = "r005";
    riskScoreDetail.ruleName = "Shopping Time";
    riskScoreDetail.score = riskScoreObject.shoppingTime.score;
    riskScoreGraph.push(riskScoreDetail);
    console.log(riskScoreGraph[4]);
  }
  riskScoreObject = applyCouponDiscountRule(orderObject, riskScoreObject);
  riskScoreDetail.ruleId = "r006";
  riskScoreDetail.ruleName = "Coupon Discount";
  riskScoreDetail.score = riskScoreObject.couponDiscount.score;
  riskScoreGraph.push(riskScoreDetail);
  console.log(riskScoreGraph[5]);

  riskScoreObject = applyGiftRule(orderObject, riskScoreObject);
  riskScoreDetail.ruleId = "r007";
  riskScoreDetail.ruleName = "Gift Rule";
  riskScoreDetail.score = riskScoreObject.giftGuest.score;
  riskScoreGraph.push(riskScoreDetail);
  console.log(riskScoreGraph[6]);

  riskScoreObject = applyPaymentMethodRule(orderObject, riskScoreObject);
  riskScoreDetail.ruleId = "r008";
  riskScoreDetail.ruleName = "Payment Method";
  riskScoreDetail.score =
    riskScoreObject.paymentMethod.promissory.score +
    riskScoreObject.paymentMethod.instantPayment.score +
    riskScoreObject.paymentMethod.creditCard.score +
    riskScoreObject.paymentMethod.giftCard.score;
  riskScoreGraph.push(riskScoreDetail);
  console.log(riskScoreGraph[7]);

  // riskScoreObject = applyCustomProductRule(orderObject, riskScoreObject);

  riskScoreObject = await applyHistPurchaseRule(orderObject, riskScoreObject);
  riskScoreDetail.ruleId = "r009";
  riskScoreDetail.ruleName = "History Purchase";
  riskScoreDetail.score = riskScoreObject.historyPurchase.score;
  riskScoreGraph.push(riskScoreDetail);
  console.log(riskScoreGraph[8]);

  riskScoreObject = await applyIncompOrdersRule(orderObject, riskScoreObject);
  riskScoreDetail.ruleId = "r010";
  riskScoreDetail.ruleName = "Incomplete Orders";
  riskScoreDetail.score = riskScoreObject.incompleteOrders.score;
  riskScoreGraph.push(riskScoreDetail);
  console.log(riskScoreGraph[9]);

  riskScoreObject = applyCarrierRule(orderObject, riskScoreObject);
  riskScoreDetail.ruleId = "r011";
  riskScoreDetail.ruleName = "Carrier";
  riskScoreDetail.score = riskScoreObject.carrier.score;
  riskScoreGraph.push(riskScoreDetail);
  console.log(riskScoreGraph[10]);

  riskScoreObject = applyDocumentRule(orderObject, riskScoreObject); // CPF
  riskScoreDetail.ruleId = "r012";
  riskScoreDetail.ruleName = "Document";
  riskScoreDetail.score = riskScoreObject.validCpf.score;
  riskScoreGraph.push(riskScoreDetail);
  console.log(riskScoreGraph[11]);

  riskScoreObject = applyEmailRule(orderObject, riskScoreObject); // Email
  riskScoreDetail.ruleId = "r013";
  riskScoreDetail.ruleName = "Email";
  riskScoreDetail.score = riskScoreObject.validEmail.score;
  riskScoreGraph.push(riskScoreDetail);
  console.log(riskScoreGraph[12]);

  riskScoreObject = applyAreaCodeRule(orderObject, riskScoreObject);
  riskScoreDetail.ruleId = "r014";
  riskScoreDetail.ruleName = "Area Code";
  riskScoreDetail.score = riskScoreObject.areaCode.score;
  riskScoreGraph.push(riskScoreDetail);
  console.log(riskScoreGraph[13]);

  riskScoreObject = applyBlackListRule(orderObject, riskScoreObject);
  riskScoreObject = applyWhiteListRule(orderObject, riskScoreObject);

  if (riskScoreObject.final > 100) riskScoreObject.final = 100;
  if (riskScoreObject.final < 1) riskScoreObject.final = 1;
  if (riskScoreObject.final > 80) riskScoreObject.alerts.qty += 1;

  riskScoreObject.description = determineRisk(riskScoreObject.final);

  console.log("Score Final:", riskScoreObject.final);

  return riskScoreObject;
};
