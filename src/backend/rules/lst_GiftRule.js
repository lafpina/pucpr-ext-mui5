import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 7 - Gift List Rule
export const lst_GiftRule = (orderObject, riskScoreObject) => {
    // NOTA: A lógica de detecção foi removida por questões de segurança
    // Entre em contato para implementação
    
    // Placeholder - sempre retorna score 0
    riskScoreObject.giftGuest.score = 0;

    riskScoreObject = buildRiskScoreLog(
        "r007",
        "LST",
        "Verificação de lista de presentes (implementação customizada)",
        0,
        riskScoreObject
    );

    return riskScoreObject;
};