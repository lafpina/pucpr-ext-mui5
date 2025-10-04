import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 4 - Payment Value Rule
export const val_PaymentValueRule = (orderObject, riskScoreObject) => {
    // NOTA: A lógica de detecção foi removida por questões de segurança
    // Entre em contato para implementação
    
    // Placeholder - sempre retorna score 0
    riskScoreObject.paymentValue.score = 0;

    riskScoreObject = buildRiskScoreLog(
        "r004",
        "VAL",
        "Verificação de valor de pagamento (implementação customizada)",
        0,
        riskScoreObject
    );

    return riskScoreObject;
};