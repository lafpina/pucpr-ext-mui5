import { getIncompleteOrdersByCpf } from "../api/getIncompleteOrdersByCpf";
import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 10
export const applyIncompOrdersRule = async (orderObject, riskScoreObject) => {
  const history = await getIncompleteOrdersByCpf(orderObject.cpf);

  const hasGoodPaymentHistory = () => {
    return history.list.find(
      (obj) =>
        obj.paymentNames == "Pix" ||
        obj.paymentNames == "Vale" ||
        obj.paymentNames == "Depósito" ||
        obj.paymentNames == "Boleto"
    );
  };

  riskScoreObject.incompleteOrders.qty = history.list.length;

  if (!hasGoodPaymentHistory()) {
    if (riskScoreObject.incompleteOrders.qty > 0) {
      switch (riskScoreObject.incompleteOrders.qty) {
        case 1:
          riskScoreObject.final += 10;
          riskScoreObject.incompleteOrders.score = 10;
          break;
        case 2:
          riskScoreObject.final += 20;
          riskScoreObject.incompleteOrders.score = 20;
          break;
        case 3:
          riskScoreObject.final += 30;
          riskScoreObject.incompleteOrders.score = 30;
          break;
        case 4:
          riskScoreObject.final += 40;
          riskScoreObject.incompleteOrders.score = 40;
          break;
        default:
          riskScoreObject.final += 50;
          riskScoreObject.incompleteOrders.score = 50;
          break;
      }
    }
  }

  riskScoreObject = buildRiskScoreLog(
    "r010",
    "TNT",
    "Tentativas de compra antes da efetivação da compra atual (TNT)",
    riskScoreObject.incompleteOrders.score,
    riskScoreObject
  );

  return riskScoreObject;
};
