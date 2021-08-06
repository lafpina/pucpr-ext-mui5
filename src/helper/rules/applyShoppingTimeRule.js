//? Rule 15
export const applyShoppingTimeRule = (orderObject, riskScoreObject) => {
  const shoppingTime = orderObject.creationDate.substr(11, 5);
  if (
    shoppingTime > "00:00" &&
    shoppingTime < "06:00" &&
    orderObject.paymentGroup.creditCard
  ) {
    riskScoreObject.shoppingTime.score += 10;
    riskScoreObject.final += 10;
  }

  return riskScoreObject;
};
