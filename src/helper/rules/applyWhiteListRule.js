import { isWhiteListed } from "../../../data/white-list";

export const applyWhiteListRule = (orderObject, riskScoreObject) => {
  if (isWhiteListed(orderObject.clientEmail, orderObject.cpf)) {
    riskScoreObject.whiteListed.qty += 1;
  }
  return riskScoreObject;
};
