import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 2
export const applyForeignCardRule = (orderObject, riskScoreObject) => {
  if (orderObject.paymentGroupActive.creditCard) {
    // Score negatively for foreign credit card
    if (
      orderObject.cardCountry !== "BRAZIL" &&
      orderObject.cardCountry !== " "
    ) {
      riskScoreObject.final += 5;
      riskScoreObject.foreignCreditCard.score = 5;
    }
  }

  riskScoreObject = buildRiskScoreLog(
    "r002",
    "Emissor",
    "Nacionalidade do Emissor do Cartão de Crédito",
    riskScoreObject.foreignCreditCard.score,
    riskScoreObject
  );

  return riskScoreObject;
};
