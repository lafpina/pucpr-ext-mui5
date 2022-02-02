import getZendeskTickets from '../api/getZendeskTickets'
import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 09
export const applyZendeskRule = async (orderObject, riskScoreObject) => {

    riskScoreObject.zendeskTickets.qty = await getZendeskTickets(orderObject.clientEmail);

    if (riskScoreObject.zendeskTickets.qty > 0) {
        riskScoreObject.final -= 15;
        riskScoreObject.zendeskTickets.score -= 15;
    }

    riskScoreObject = buildRiskScoreLog(
        "r024",
        "ZDK",
        `Cliente possui pelo menos ${riskScoreObject.zendeskTickets.qty} chamado(s) pelo Zendesk (ZDK)`,
        riskScoreObject.zendeskTickets.score,
        riskScoreObject
    );

    return riskScoreObject;
};
