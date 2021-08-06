//? Rule 4
export const applyGiftRule = (orderObject, riskScoreObject) => {
  // Scores positively in the case of it's a Guest List Order identified by a List ID
  if (orderObject.giftId) {
    riskScoreObject.final -= 30;
    riskScoreObject.giftGuest.score = -30;
  }
  return riskScoreObject;
};
