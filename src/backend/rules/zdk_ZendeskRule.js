import getZendeskTickets from '../api/getZendeskTickets'
import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 09
export const zdk_ZendeskRule = async (orderObject, riskScoreObject) => {

    riskScoreObject.zendeskTickets.qty = await getZendeskTickets(orderObject.clientEmail);

    if (riskScoreObject.zendeskTickets.qty > 0) {
        switch (riskScoreObject.zendeskTickets.qty) {
            case 1:
                riskScoreObject.final -= 20;
                riskScoreObject.zendeskTickets.score -= 20;
                break
            case 2:
                riskScoreObject.final -= 30;
                riskScoreObject.zendeskTickets.score -= 30;
                break
            case 3:
                riskScoreObject.final -= 40;
                riskScoreObject.zendeskTickets.score -= 40;
                break
            default:
                riskScoreObject.final -= 50;
                riskScoreObject.zendeskTickets.score -= 50;
        }
    }

    riskScoreObject = buildRiskScoreLog(
        "r024",
        "ZDK",
        `Cliente possui pelo menos ${riskScoreObject.zendeskTickets.qty} chamado(s) pelo Zendesk, o que atenua o risco (ZDK)`,
        riskScoreObject.zendeskTickets.score,
        riskScoreObject
    );

    return riskScoreObject;
};
