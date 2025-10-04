import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 3 - Shipping Rate Rule
export const fte_ShippingRateRule = (orderObject, riskScoreObject) => {
    // NOTA: A lógica de detecção foi removida por questões de segurança
    // Entre em contato para implementação
    
    // Placeholder - sempre retorna score 0
    riskScoreObject.shippingRate.score = 0;

    riskScoreObject = buildRiskScoreLog(
        "r003",
        "FTE",
        "Verificação de relação frete/valor (implementação customizada)",
        0,
        riskScoreObject
    );

    return riskScoreObject;
};