//? Rule 8
export const applyShippingRateRule = (orderObject, riskScoreObject) => {
  // Scores negatively depending on the rate between total product value and shipping cost
  let shippingRate = (
    (orderObject.totalShippingValue.value / orderObject.totalItemsValue.value) *
    100
  ).toFixed(2);

  if (shippingRate > 30.0) {
    riskScoreObject.final += 5;
    riskScoreObject.shippingRate.score = 5;
  }
  return riskScoreObject;
};
