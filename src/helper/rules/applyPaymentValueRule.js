//? Rule 11
export const applyPaymentValueRule = (orderObject, riskScoreObject) => {
  // Fist it scores positively for payment whose value is acceptable as a risk,
  // as long as it's a national card
  // if (orderObject.value <= 10000 && orderObject.cardCountry === "BRAZIL") {
  //   riskScoreObject.paymentValue.score -= 5;
  //   riskScoreObject.final -= 5;
  // }

  // For values over the average ticket, it gets evaluated by either
  // fist buying, one installment, or by the minimum installment payment allowed
  if (orderObject.value > 40000 && orderObject.paymentGroup.creditCard) {
    // first buying
    if (orderObject.historyPurchase.qty === 0) {
      riskScoreObject.final += 5;
      riskScoreObject.paymentValue.score += 5;
    }
    // one installment buying
    if (orderObject.cardInstallments === 1) {
      riskScoreObject.final += 5;
      riskScoreObject.paymentValue.score += 5;
    }
    // less installment payment allowed
    if (orderObject.cardInstallments === 6) {
      riskScoreObject.final += 5;
      riskScoreObject.paymentValue.score += 5;
    }
  }
  if (orderObject.value > 300000 && orderObject.paymentGroup.creditCard) {
    // higher value
    riskScoreObject.final += 10;
    riskScoreObject.paymentValue.score += 10;
  }

  return riskScoreObject;
};
