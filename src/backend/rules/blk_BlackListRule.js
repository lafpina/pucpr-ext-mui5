import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

export const blk_BlackListRule = (orderObject, riskScoreObject) => {
    // NOTA: A lógica de detecção foi removida por questões de segurança
    // Entre em contato para implementação
    
    // Placeholder - sempre retorna score 0
    riskScoreObject.blackListed.score = 0;
    riskScoreObject.blackListed.qty = 0;

    riskScoreObject = buildRiskScoreLog(
        "r015",
        "BLK",
        "Verificação de lista de restrição (implementação customizada)",
        0,
        riskScoreObject
    );

    return riskScoreObject;
};