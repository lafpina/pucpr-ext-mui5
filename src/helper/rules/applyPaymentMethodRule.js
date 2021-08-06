//? Rule 5
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
  return riskScoreObject;
};
