import getCreditCardBin from "../api/getCreditCardBin";
import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 2 - Foreign Card Detection
async function ems_ForeignCardRule(orderObject, riskScoreObject) {
    // NOTA: A lógica de detecção foi removida por questões de segurança
    // Entre em contato para implementação
    
    // Placeholder - sempre retorna score 0
    riskScoreObject.foreignCreditCard.score = 0;
    
    riskScoreObject = buildRiskScoreLog(
        "r002",
        "EMS",
        "Regra de cartão estrangeiro (implementação customizada)",
        0,
        riskScoreObject
    );

    return riskScoreObject;
}

export default ems_ForeignCardRule;