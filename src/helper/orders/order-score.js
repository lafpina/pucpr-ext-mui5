import getOption from "../../helper/vtex-apis/get-option";
import getURL from "../../helper/vtex-apis/get-url";
import getOrder from "../../helper/vtex-apis/get-order";
import buildOrderObject from "./build-order-object";
import { buildRiskScoreObject } from "./build-risk-score-object";

const orderScore = async (order) => {
  let url = getURL("order", order);
  let options = getOption("order");
  let vtexOrder = await getOrder(url, options);

  if (vtexOrder) {
    // Build an order object in a way that all the info needed is in the same object
    const orderObject = await buildOrderObject(vtexOrder);
    // Get score based on the order object
    const riskScoreObject = await buildRiskScoreObject(orderObject);

    return riskScoreObject;
  } else {
    console.log("Pedido não encontrado na VTEX");
    return null;
  }
};

export default orderScore;
