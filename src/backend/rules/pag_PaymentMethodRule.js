import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 8 - Payment Method Rule
export const pag_PaymentMethodRule = (orderObject, riskScoreObject) => {
    // NOTA: A lógica de detecção foi removida por questões de segurança
    // Entre em contato para implementação
    
    // Placeholder - sempre retorna score 0
    riskScoreObject.paymentMethod.creditCard.score = 0;
    riskScoreObject.paymentMethod.promissory.score = 0;
    riskScoreObject.paymentMethod.instantPayment.score = 0;
    riskScoreObject.paymentMethod.giftCard.score = 0;

    riskScoreObject = buildRiskScoreLog(
        "r008",
        "PAG",
        "Verificação de método de pagamento (implementação customizada)",
        0,
        riskScoreObject
    );

    return riskScoreObject;
};