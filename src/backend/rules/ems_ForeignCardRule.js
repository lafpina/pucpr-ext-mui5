import getCreditCardBin from "../api/getCreditCardBin";
import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 2
async function ems_ForeignCardRule(orderObject, riskScoreObject) {
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

  // const binData = await getCreditCardBin("522688");
  // console.log(binData);

  riskScoreObject = buildRiskScoreLog(
    "r002",
    "EMS",
    "Nacionalidade do Emissor do Cartão de Crédito (EMS)",
    riskScoreObject.foreignCreditCard.score,
    riskScoreObject
  );

  return riskScoreObject;
}

export default ems_ForeignCardRule;
