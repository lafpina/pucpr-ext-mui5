import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 6 - Coupon Discount Rule
export const cdn_CouponDiscountRule = (orderObject, riskScoreObject) => {
    // NOTA: A lógica de detecção foi removida por questões de segurança
    // Entre em contato para implementação
    
    // Placeholder - sempre retorna score 0
    riskScoreObject.couponDiscount.score = 0;

    riskScoreObject = buildRiskScoreLog(
        "r006",
        "CDN",
        "Verificação de cupom de desconto (implementação customizada)",
        0,
        riskScoreObject
    );

    return riskScoreObject;
};