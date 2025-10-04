import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

export const rlv_WhiteListRule = (orderObject, riskScoreObject) => {
    // NOTA: A lógica de detecção foi removida por questões de segurança
    // Entre em contato para implementação
    
    // Placeholder - sempre retorna score 0
    riskScoreObject.whiteListed.score = 0;
    riskScoreObject.whiteListed.qty = 0;

    riskScoreObject = buildRiskScoreLog(
        "r016",
        "RLV",
        "Verificação de lista de clientes relevantes (implementação customizada)",
        0,
        riskScoreObject
    );

    return riskScoreObject;
};