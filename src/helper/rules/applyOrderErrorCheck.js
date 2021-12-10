import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";
//? Apply Order Error Check 
export const applyOrderErrorCheck = (orderObject, riskScoreObject) => {

  if (orderObject.paymentGroupActive.giftCard && orderObject.giftCard > "") {
    riskScoreObject.final += 50;
    riskScoreObject.orderErrorCheck.score = 50;
  }

  riskScoreObject = buildRiskScoreLog(
    "r020",
    "CPL",
    "Possibilidade do Cliente ter efetuado compra para a própria lista",
    riskScoreObject.orderErrorCheck.score,
    riskScoreObject
  );

  return riskScoreObject;
};
