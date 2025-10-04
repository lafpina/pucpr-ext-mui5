import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 10 - Incomplete Orders Rule
export const tnt_IncompOrdersRule = async (orderObject, riskScoreObject) => {
    // NOTA: A lógica de detecção foi removida por questões de segurança
    // Entre em contato para implementação
    
    // Placeholder - sempre retorna score 0
    riskScoreObject.incompleteOrders.score = 0;
    riskScoreObject.incompleteOrders.qty = 0;

    riskScoreObject = buildRiskScoreLog(
        "r010",
        "TNT",
        "Verificação de tentativas incompletas (implementação customizada)",
        0,
        riskScoreObject
    );

    return riskScoreObject;
};