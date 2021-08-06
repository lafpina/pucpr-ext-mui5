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
import { applyAlertsRule } from "../rules/applyAlertRule";

export const buildRiskScoreObject = async (orderObject) => {
  let riskScoreObject = initializeScore();
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
