export const buildRiskScoreLog = (
  ruleId,
  ruleRef,
  ruleName,
  score,
  riskScoreObject
) => {
  const riskScoreLogDetail = {
    ruleId: ruleId,
    ruleRef: ruleRef,
    ruleName: ruleName,
    score: score,
  };
  riskScoreObject.riskScoreLog.push(riskScoreLogDetail);
  // console.log(riskScoreLogDetail, riskScoreObject.final);

  return riskScoreObject;
};
