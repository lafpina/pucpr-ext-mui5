import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 1 - Card Holder Rule
export const tit_CardHolderRule = (orderObject, riskScoreObject) => {
    // NOTA: A lógica de detecção foi removida por questões de segurança
    // Entre em contato para implementação
    
    // Placeholder - sempre retorna score 0
    riskScoreObject.cardHolder.score = 0;
    riskScoreObject.cardHolder.yes = false;
    riskScoreObject.cardHolder.maybe = false;
    riskScoreObject.cardHolder.no = false;

    riskScoreObject = buildRiskScoreLog(
        "r001",
        "TIT",
        "Verificação de titular do cartão (implementação customizada)",
        0,
        riskScoreObject
    );

    return riskScoreObject;
};