import { isBlackListed } from "../../../data/black-list";
import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

export const blk_BlackListRule = (orderObject, riskScoreObject) => {
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
    riskScoreObject.blackListed.score += 100;
    riskScoreObject.final += 100;
    riskScoreObject.blackListed.qty += 1;
  }

  riskScoreObject = buildRiskScoreLog(
    "r015",
    "BLK",
    "Pedido possui pelo menos um dos 8 parâmetros de restrição  ❗",
    riskScoreObject.blackListed.score,
    riskScoreObject
  );

  return riskScoreObject;
};
