//? Rule 6
export const applyCustomProductRule = (orderObject, riskScoreObject) => {
  // Score positively if the order is for a customized product
  for (let i = 0; i < orderObject.items.length; ++i) {
    if (orderObject.items[i].refId === "PAC0075") {
      riskScoreObject.final -= 5;
      riskScoreObject.customProduct.score = -5;
    }
  }
  return riskScoreObject;
};
