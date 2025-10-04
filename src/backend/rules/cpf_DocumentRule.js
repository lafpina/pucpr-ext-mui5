import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 12 - Document Validation Rule
export const cpf_DocumentRule = (orderObject, riskScoreObject) => {
    // NOTA: A lógica de detecção foi removida por questões de segurança
    // Entre em contato para implementação
    
    // Placeholder - sempre retorna score 0
    riskScoreObject.validCPF.score = 0;

    riskScoreObject = buildRiskScoreLog(
        "r012",
        "CPF",
        "Verificação de documento (implementação customizada)",
        0,
        riskScoreObject
    );

    return riskScoreObject;
};