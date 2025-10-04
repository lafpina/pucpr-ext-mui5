//? Rule 6 - Custom Product Rule
export const applyCustomProductRule = (orderObject, riskScoreObject) => {
    // NOTA: A lógica de detecção foi removida por questões de segurança
    // Entre em contato para implementação
    
    // Placeholder - sempre retorna score 0
    riskScoreObject.customProduct.score = 0;
    
    riskScoreObject = buildRiskScoreLog(
        "r006",
        "CPR",
        "Regra de produto customizado (implementação customizada)",
        0,
        riskScoreObject
    );

    return riskScoreObject;
};