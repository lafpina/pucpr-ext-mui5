import { isBlackListed } from "../../../data/black-list";

export const applyBlackListRule = (orderObject, riskScoreObject) => {
  let blackedResult = isBlackListed(
    orderObject.clientEmail,
    orderObject.cpf,
    orderObject.shippingPostalCode,
    orderObject.phone,
    orderObject.cardLastDigits,
    orderObject.shippingState,
    orderObject.shippingCity,
    orderObject.cardCountry
  );

  if (blackedResult.isBlacked) riskScoreObject.blackListed.qty += 1;

  return riskScoreObject;
};
