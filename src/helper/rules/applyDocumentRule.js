import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";
import isClientCPFValid from "../utils/isClientCpfValid";

//? Rule 12
export const applyDocumentRule = (orderObject, riskScoreObject) => {
  // set final score to its max if document is invalid
  if (!isClientCPFValid(orderObject.cpf)) {
    riskScoreObject.validCPF.score = 100;
    riskScoreObject.final = 100;
  }

  riskScoreObject = buildRiskScoreLog(
    "r012",
    "Dígito do Documento CPF válido",
    riskScoreObject.validCpf.score,
    riskScoreObject
  );

  return riskScoreObject;
};
