import { isPhoneAreaCodeOk } from "../../../data/area-code-list";
import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";
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

  riskScoreObject = buildRiskScoreLog(
    "r014",
    "DDD do telefone de cadastro do cliente coerente com o Estado de Destino",
    riskScoreObject.areaCode.score,
    riskScoreObject
  );

  return riskScoreObject;
};
