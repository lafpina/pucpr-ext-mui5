import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";
//? Rule 6
export const applyCouponDiscountRule = (orderObject, riskScoreObject) => {
  // Any coupon of discount other than Compre Junto will score positively

  console.log("Dentro da função do cupom")

  if (
    orderObject.coupon > " " &&
    orderObject.coupon.indexOf("Compre Junto") == -1
  ) {
    riskScoreObject.final -= 15;
    riskScoreObject.couponDiscount.score = -15;
    console.log("gerou")
  }

  riskScoreObject = buildRiskScoreLog(
    "r006",
    "CPN",
    "Utilização de Cupom de Desconto emitido pela Área de Atendimento ao Cliente",
    riskScoreObject.couponDiscount.score,
    riskScoreObject
  );

  return riskScoreObject;
};
