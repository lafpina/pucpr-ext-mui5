import { isBlackListed } from "../../../data/black-list";
import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

export const applyBlackListRule = (orderObject, riskScoreObject) => {
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

  if (blackedResult.isBlacked) {
    riskScoreObject.blackListed.score += 10;
    riskScoreObject.final += 10;
    riskScoreObject.blackListed.qty += 1;
  }

  riskScoreObject = buildRiskScoreLog(
    "r015",
    "BLK",
    "Pedido possui pelo menos um dos 8 parâmetros de restrição (BLK)",
    riskScoreObject.blackListed.score,
    riskScoreObject
  );

  return riskScoreObject;
};
