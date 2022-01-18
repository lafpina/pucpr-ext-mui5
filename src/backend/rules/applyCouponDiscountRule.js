import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";
//? Rule 6
export const applyCouponDiscountRule = (orderObject, riskScoreObject) => {
  // Any coupon of discount other than Compre Junto will score positively

  orderObject.coupon.map((coupon) => {
    if (coupon.includes("CDN")) {
      riskScoreObject.final -= 15;
      riskScoreObject.couponDiscount.score = -15;
    }
  })

  riskScoreObject = buildRiskScoreLog(
    "r006",
    "CDN",
    "Utilização de Cupom de Desconto emitido pela Área de Atendimento ao Cliente (CDN)",
    riskScoreObject.couponDiscount.score,
    riskScoreObject
  );

  return riskScoreObject;
};
