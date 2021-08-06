export const applyAlertsRule = (finalScore, riskScoreObject) => {
  if (finalScore > 80) {
    riskScoreObject.alerts.qty += 1;
  }
  return riskScoreObject;
};
