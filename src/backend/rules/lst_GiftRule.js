import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";
//? Rule 7
export const lst_GiftRule = (orderObject, riskScoreObject) => {
  // Scores positively in the case of it's a Guest List Order identified by a List ID
  if (orderObject.giftId) {
    if (orderObject.value <= 10000) {
      riskScoreObject.final -= 50;
      riskScoreObject.giftGuest.score = -50;
    } else if (orderObject.value <= 20000) {
      riskScoreObject.final -= 40;
      riskScoreObject.giftGuest.score = -40;
    } else if (orderObject.value <= 30000) {
      riskScoreObject.final -= 30;
      riskScoreObject.giftGuest.score = -30;
    } else {
      riskScoreObject.final -= 20;
      riskScoreObject.giftGuest.score = -20;
    }
  }

  riskScoreObject = buildRiskScoreLog(
    "r007",
    "LST",
    "Compra efetuada para uma Lista de Presentes Modelo Crédito, que pode atenuar o risco (LST)",
    riskScoreObject.giftGuest.score,
    riskScoreObject
  );

  return riskScoreObject;
};
