//? Rule 2
export const applyForeignCardRule = (orderObject, riskScoreObject) => {
  // Socre negatively for foreign credit card
  if (orderObject.cardCountry !== "BRAZIL" && orderObject.cardCountry !== " ") {
    riskScoreObject.final += 5;
    riskScoreObject.foreignCreditCard.score = 5;
  }
  return riskScoreObject;
};
