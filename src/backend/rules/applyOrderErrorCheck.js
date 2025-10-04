import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Apply Order Error Check 
export const applyOrderErrorCheck = (orderObject, riskScoreObject) => {
    // NOTA: A lógica de detecção foi removida por questões de segurança
    // Entre em contato para implementação
    
    // Placeholder - sempre retorna score 0
    riskScoreObject.orderErrorCheck.cpl = false;
    riskScoreObject.orderErrorCheck.spe = false;
    riskScoreObject.orderErrorCheck.spm = false;
    riskScoreObject.orderErrorCheck.spp = false;
    riskScoreObject.orderErrorCheck.score = 0;

    riskScoreObject = buildRiskScoreLog(
        "r020",
        "CPL",
        "Verificação de compra para lista própria (implementação customizada)",
        0,
        riskScoreObject
    );

    riskScoreObject = buildRiskScoreLog(
        "r021",
        "SPE",
        "Verificação de tempo em preparando entrega (implementação customizada)",
        0,
        riskScoreObject
    );

    riskScoreObject = buildRiskScoreLog(
        "r022",
        "SPM",
        "Verificação de tempo em pronto para manuseio (implementação customizada)",
        0,
        riskScoreObject
    );

    riskScoreObject = buildRiskScoreLog(
        "r023",
        "SPP",
        "Verificação de tempo em aguardando pagamento (implementação customizada)",
        0,
        riskScoreObject
    );

    return riskScoreObject;
};