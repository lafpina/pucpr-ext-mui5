import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 11 - Carrier Rule
export const etg_CarrierRule = (orderObject, riskScoreObject) => {
    // NOTA: A lógica de detecção foi removida por questões de segurança
    // Entre em contato para implementação
    
    // Placeholder - sempre retorna score 0
    riskScoreObject.carrier.score = 0;

    riskScoreObject = buildRiskScoreLog(
        "r011",
        "ETG",
        "Verificação de transportadora (implementação customizada)",
        0,
        riskScoreObject
    );

    return riskScoreObject;
};