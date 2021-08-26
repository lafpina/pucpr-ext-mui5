import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";
//? Rule 7
export const applyGiftRule = (orderObject, riskScoreObject) => {
  // Scores positively in the case of it's a Guest List Order identified by a List ID
  if (orderObject.giftId) {
    riskScoreObject.final -= 40;
    riskScoreObject.giftGuest.score = -40;
  }

  riskScoreObject = buildRiskScoreLog(
    "r007",
    "LST",
    "Compra efetuada para uma Lista de Presentes Modelo Crédito",
    riskScoreObject.giftGuest.score,
    riskScoreObject
  );

  return riskScoreObject;
};
