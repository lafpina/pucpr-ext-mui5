export const buildRiskAnalysys = (riskScoreObject) => {
  let riskAnalysisResult = [];
  if (riskScoreObject.incompleteOrders.qty > 0) {
    riskAnalysisResult[0] = `${riskScoreObject.incompleteOrders.qty} Tentativa(s) de compra - Score: ${riskScoreObject.incompleteOrders.score}`;
  }

  return riskAnalysisResult;
};
