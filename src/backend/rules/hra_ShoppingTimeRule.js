import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 5 - Shopping Time Rule
export const hra_ShoppingTimeRule = (orderObject, riskScoreObject) => {
    // NOTA: A lógica de detecção foi removida por questões de segurança
    // Entre em contato para implementação
    
    // Placeholder - sempre retorna score 0
    riskScoreObject.shoppingTime.score = 0;

    riskScoreObject = buildRiskScoreLog(
        "r005",
        "HRA",
        "Verificação de horário de compra (implementação customizada)",
        0,
        riskScoreObject
    );

    return riskScoreObject;
};