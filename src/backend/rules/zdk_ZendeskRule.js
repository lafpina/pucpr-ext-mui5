import getZendeskTickets from '../api/getZendeskTickets'
import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 09
export const zdk_ZendeskRule = async (orderObject, riskScoreObject) => {

    riskScoreObject.zendeskTickets.qty = await getZendeskTickets(orderObject.clientEmail);


    switch (true) {
        case (riskScoreObject.zendeskTickets.qty > 1):
            riskScoreObject.final -= 10;
            riskScoreObject.zendeskTickets.score -= 10;
            break
        case (riskScoreObject.zendeskTickets.qty = 1):
            riskScoreObject.final -= 5;
            riskScoreObject.zendeskTickets.score -= 5;
            break
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
