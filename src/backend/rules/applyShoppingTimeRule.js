import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";
//? Rule 05
export const applyShoppingTimeRule = (orderObject, riskScoreObject) => {
  const shoppingTime = orderObject.creationDate.substr(11, 5);
  if (
    shoppingTime > "00:00" &&
    shoppingTime < "06:00" &&
    orderObject.paymentGroup.indexOf("creditCard") > -1
  ) {
    riskScoreObject.shoppingTime.score += 10;
    riskScoreObject.final += 10;
  }

  riskScoreObject = buildRiskScoreLog(
    "r005",
    "HRA",
    "Compra efetuada fora do horário habitual (HRA)",
    riskScoreObject.shoppingTime.score,
    riskScoreObject
  );

  return riskScoreObject;
};
