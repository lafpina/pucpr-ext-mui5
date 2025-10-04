import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 14 - Area Code Rule
export const ddd_AreaCodeRule = (orderObject, riskScoreObject) => {
    // NOTA: A lógica de detecção foi removida por questões de segurança
    // Entre em contato para implementação
    
    // Placeholder - sempre retorna score 0
    riskScoreObject.areaCode.score = 0;

    riskScoreObject = buildRiskScoreLog(
        "r014",
        "DDD",
        "Verificação de DDD (implementação customizada)",
        0,
        riskScoreObject
    );

    return riskScoreObject;
};