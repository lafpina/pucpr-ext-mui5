import { isPhoneAreaCodeOk } from "../../../data/area-code-list";
//? Rule 14
export const applyAreaCodeRule = (orderObject, riskScoreObject) => {
  if (
    !isPhoneAreaCodeOk(
      orderObject.phone.substr(3, 2),
      orderObject.shippingState
    )
  ) {
    riskScoreObject.areaCode.score += 5;
    riskScoreObject.final += 5;
  }

  return riskScoreObject;
};
