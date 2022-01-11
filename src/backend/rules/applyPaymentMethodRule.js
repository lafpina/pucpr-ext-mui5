import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";
//? Rule 08
export const applyPaymentMethodRule = (orderObject, riskScoreObject) => {
  // Score positively whether it's a deposit, pix or giftCard payment method

  if (orderObject.paymentGroupActive.promissory) {
    riskScoreObject.final -= 50;
    riskScoreObject.paymentMethod.promissory.score = -50;
  }
  if (orderObject.paymentGroupActive.instantPayment) {
    riskScoreObject.final -= 50;
    riskScoreObject.paymentMethod.instantPayment.score = -50;
  }
  if (orderObject.paymentGroupActive.giftCard) {
    riskScoreObject.final -= 50;
    riskScoreObject.paymentMethod.giftCard.score = -50;
  }
  if (orderObject.paymentGroupActive.creditCard) {
    riskScoreObject.final += 15;
    riskScoreObject.paymentMethod.creditCard.score += 15;
  }

  const score =
    riskScoreObject.paymentMethod.promissory.score +
    riskScoreObject.paymentMethod.instantPayment.score +
    riskScoreObject.paymentMethod.creditCard.score +
    riskScoreObject.paymentMethod.giftCard.score;

  riskScoreObject = buildRiskScoreLog(
    "r008",
    "PAG",
    "Método de Pagamento utilizado",
    score,
    riskScoreObject
  );

  return riskScoreObject;
};
