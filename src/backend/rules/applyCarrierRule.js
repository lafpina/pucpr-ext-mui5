import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";
//? Rule 11
export const applyCarrierRule = (orderObject, riskScoreObject) => {
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

  riskScoreObject = buildRiskScoreLog(
    "r011",
    "ETG",
    "Retirada na Loja ou Entrega expressa, ou DDD incompatível com um destes tipos de entrega (ETG)",
    riskScoreObject.carrier.score,
    riskScoreObject
  );

  return riskScoreObject;
};
