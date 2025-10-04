import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 9 - Purchase History Rule
export const hst_fby_HistPurchaseRule = async (orderObject, riskScoreObject) => {
    // NOTA: A lógica de detecção foi removida por questões de segurança
    // Entre em contato para implementação
    
    // Placeholder - sempre retorna score 0
    riskScoreObject.historyPurchase.score = 0;
    riskScoreObject.historyPurchase.profile = {
        qty: 0,
        value: 0,
        dateFirstBuy: null,
        isGiftHistory: false,
        isPromissoryHistory: false,
        isPixHistory: false,
        isGT90History: false,
        isGT60History: false,
        isGT40History: false
    };
    riskScoreObject.firstBuying.score = 0;

    riskScoreObject = buildRiskScoreLog(
        "r009",
        "HST",
        "Verificação de histórico de compras (implementação customizada)",
        0,
        riskScoreObject
    );
    
    riskScoreObject = buildRiskScoreLog(
        "r017",
        "FBY",
        "Verificação de primeira compra (implementação customizada)",
        0,
        riskScoreObject
    );

    return riskScoreObject;
};