import { isWhiteListed } from "../../../data/white-list";
import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

export const applyWhiteListRule = (orderObject, riskScoreObject) => {
  if (isWhiteListed(orderObject.clientEmail, orderObject.cpf)) {
    riskScoreObject.whiteListed.score -= 50;
    riskScoreObject.final -= 50;
    riskScoreObject.whiteListed.qty += 1;
  }

  riskScoreObject = buildRiskScoreLog(
    "r016",
    "RLV",
    "Cliente possui alta relevância (RLV)",
    riskScoreObject.whiteListed.score,
    riskScoreObject
  );

  return riskScoreObject;
};
