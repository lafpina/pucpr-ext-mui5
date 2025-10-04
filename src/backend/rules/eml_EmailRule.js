import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 13 - Email Validation Rule
export const eml_EmailRule = (orderObject, riskScoreObject) => {
    // NOTA: A lógica de detecção foi removida por questões de segurança
    // Entre em contato para implementação
    
    // Placeholder - sempre retorna score 0
    riskScoreObject.validEmail.score = 0;

    riskScoreObject = buildRiskScoreLog(
        "r013",
        "EML",
        "Verificação de email (implementação customizada)",
        0,
        riskScoreObject
    );

    return riskScoreObject;
};