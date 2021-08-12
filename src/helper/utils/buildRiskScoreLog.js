export const buildRiskScoreLog = (ruleId, ruleName, score, riskScoreObject) => {
  const riskScoreLogDetail = {
    ruleId: ruleId,
    ruleName: ruleName,
    score: score,
  };
  riskScoreObject.riskScoreLog.push(riskScoreLogDetail);
  console.log(riskScoreLogDetail, riskScoreObject.final);

  return riskScoreObject;
};
