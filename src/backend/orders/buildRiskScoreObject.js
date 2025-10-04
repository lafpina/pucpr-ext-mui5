import { determineRisk } from "../utils/determineRisk";
import { initializeScore } from "../rules/initializeScore";

import { hst_fby_HistPurchaseRule } from "../rules/hst_fby_HistPurchaseRule";
import { tit_CardHolderRule } from "../rules/tit_CardHolderRule";
import ems_ForeignCardRule from "../rules/ems_ForeignCardRule";
import { cdn_CouponDiscountRule } from "../rules/cdn_CouponDiscountRule";
import { lst_GiftRule } from "../rules/lst_GiftRule";
import { pag_PaymentMethodRule } from "../rules/pag_PaymentMethodRule";
// import { applyCustomProductRule } from "../rules/applyCustomProductRule";

import { fte_ShippingRateRule } from "../rules/fte_ShippingRateRule";
import { tnt_IncompOrdersRule } from "../rules/tnt_IncompleteOrdersRule";
import { etg_CarrierRule } from "../rules/etg_CarrierRule";
import { val_PaymentValueRule } from "../rules/val_PaymentValueRule";
import { cpf_DocumentRule } from "../rules/cpf_DocumentRule";
import { eml_EmailRule } from "../rules/eml_EmailRule";
import { ddd_AreaCodeRule } from "../rules/ddd_AreaCodeRule";
import { hra_ShoppingTimeRule } from "../rules/hra_ShoppingTimeRule";
import { blk_BlackListRule } from "../rules/blk_BlackListRule";
import { rlv_WhiteListRule } from "../rules/rlv_WhiteListRule";
import { applyOrderErrorCheck } from "../rules/applyOrderErrorCheck";
import { zdk_ZendeskRule } from '../rules/zdk_ZendeskRule';

export const buildRiskScoreObject = async (orderObject) => {
  const riskScoreGraph = [];
  const riskScoreDetail = {
    ruleId: 0,
    ruleName: "",
    score: 0,
  };

  let riskScoreObject = initializeScore();

  riskScoreObject = await hst_fby_HistPurchaseRule(orderObject, riskScoreObject);
  riskScoreObject = pag_PaymentMethodRule(orderObject, riskScoreObject);
  riskScoreObject = tit_CardHolderRule(orderObject, riskScoreObject);
  riskScoreObject = await ems_ForeignCardRule(orderObject, riskScoreObject);
  riskScoreObject = fte_ShippingRateRule(orderObject, riskScoreObject);
  riskScoreObject = val_PaymentValueRule(orderObject, riskScoreObject);
  riskScoreObject = hra_ShoppingTimeRule(orderObject, riskScoreObject);
  riskScoreObject = cdn_CouponDiscountRule(orderObject, riskScoreObject);
  riskScoreObject = lst_GiftRule(orderObject, riskScoreObject);

  riskScoreObject = await tnt_IncompOrdersRule(orderObject, riskScoreObject);
  riskScoreObject = etg_CarrierRule(orderObject, riskScoreObject);
  riskScoreObject = cpf_DocumentRule(orderObject, riskScoreObject); // CPF
  riskScoreObject = eml_EmailRule(orderObject, riskScoreObject); // Email


  riskScoreObject = ddd_AreaCodeRule(orderObject, riskScoreObject);


  riskScoreObject = blk_BlackListRule(orderObject, riskScoreObject);
  riskScoreObject = rlv_WhiteListRule(orderObject, riskScoreObject);

  riskScoreObject = await zdk_ZendeskRule(orderObject, riskScoreObject);

  // Verifica se há alguma incoerência com o pedido
  riskScoreObject = applyOrderErrorCheck(orderObject, riskScoreObject)


  if (riskScoreObject.final > 100) riskScoreObject.final = 100;
  if (riskScoreObject.final < 1) riskScoreObject.final = 1;
  if (riskScoreObject.final >= 80) riskScoreObject.alerts.qty += 1;

  riskScoreObject.description = determineRisk(riskScoreObject.final);

  //console.log("Score Final:", riskScoreObject.final);

  return riskScoreObject;
};
