import { getIncompleteOrders } from "../api/getIncompleteOrders";

//? Rule 9
export const applyIncompOrdersRule = async (orderObject, riskScoreObject) => {
  // Any incompete order will be scored negatively
  riskScoreObject.incompleteOrders.qty = await getIncompleteOrders(
    orderObject.clientName
  );

  // riskScoreObject.incompleteOrders.qty = await getIncompleteOrdersByCpf(
  //   orderObject.cpf
  // );

  if (riskScoreObject.incompleteOrders.qty == 2) {
    riskScoreObject.final += 5;
    riskScoreObject.incompleteOrders.score = 5;
  } else if (riskScoreObject.incompleteOrders.qty == 3) {
    riskScoreObject.final += 10;
    riskScoreObject.incompleteOrders.score = 10;
  } else if (riskScoreObject.incompleteOrders.qty == 4) {
    riskScoreObject.final += 15;
    riskScoreObject.incompleteOrders.score = 15;
  } else if (riskScoreObject.incompleteOrders.qty > 4) {
    riskScoreObject.final += 30;
    riskScoreObject.incompleteOrders.score = 30;
  }
  return riskScoreObject;
};
