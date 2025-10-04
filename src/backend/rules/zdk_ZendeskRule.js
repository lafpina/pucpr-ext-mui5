import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 24 - Zendesk Rule
export const zdk_ZendeskRule = async (orderObject, riskScoreObject) => {
    // NOTA: A lógica de detecção foi removida por questões de segurança
    // Entre em contato para implementação
    
    // Placeholder - sempre retorna score 0
    riskScoreObject.zendeskTickets.score = 0;
    riskScoreObject.zendeskTickets.qty = 0;

    riskScoreObject = buildRiskScoreLog(
        "r024",
        "ZDK",
        "Verificação de histórico Zendesk (implementação customizada)",
        0,
        riskScoreObject
    );

    return riskScoreObject;
};