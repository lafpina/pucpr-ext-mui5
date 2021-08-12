import { lookForPurchaseHistory } from "../api/lookForPurchaseHistory";
import { convertDate } from "../utils/convertDate";
import { isBlackListed } from "../../../data/black-list";
import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 09
export const applyHistPurchaseRule = async (orderObject, riskScoreObject) => {
  // Score positively based on the history of purchase

  if (orderObject.clientEmail > " ") {
    riskScoreObject.historyPurchase.profile = await lookForPurchaseHistory(
      // orderObject.clientEmail
      orderObject.cpf
    );

    if (riskScoreObject.historyPurchase.profile.qty > 0) {
      const createDate = orderObject.creationDate.substr(0, 10);
      const now = convertDate(createDate); // Data da compra atual

      const past = new Date(
        riskScoreObject.historyPurchase.profile.dateFirstBuy.substr(0, 10)
      ); // Data da primeira compra

      const diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).

      let blackedResult = isBlackListed(
        orderObject.clientEmail,
        orderObject.cpf,
        orderObject.shippingPostalCode,
        orderObject.phone,
        orderObject.cardLastDigits,
        orderObject.shippingState,
        orderObject.shippingCity,
        orderObject.cardCountry
      );

      if (!blackedResult.isBlacked) {
        if (days > 90) {
          riskScoreObject.final -= 30;
          riskScoreObject.historyPurchase.score -= 30;
        } else if (days > 60) {
          riskScoreObject.final -= 20;
          riskScoreObject.historyPurchase.score -= 20;
        } else if (days > 40) {
          riskScoreObject.final -= 10;
          riskScoreObject.historyPurchase.score -= 10;
        }
        // History has at least one purchase for a gift list
        if (riskScoreObject.historyPurchase.profile.isGiftHistory) {
          riskScoreObject.final -= 40;
          riskScoreObject.historyPurchase.score -= 40;
        }
        if (riskScoreObject.historyPurchase.profile.isPromissoryHistory) {
          riskScoreObject.final -= 30;
          riskScoreObject.historyPurchase.score -= 30;
        }
        if (riskScoreObject.historyPurchase.profile.isPixHistory) {
          riskScoreObject.final -= 30;
          riskScoreObject.historyPurchase.score -= 30;
        }
        // Client has bought over 1.000 before this transaction
        if (riskScoreObject.historyPurchase.profile.value > 100000) {
          riskScoreObject.final -= 10;
          riskScoreObject.historyPurchase.score -= 10;
        }
        // Client has bought at least 100 before this transaction than can be
        // elegible for quantity evaluation
        if (riskScoreObject.historyPurchase.profile.value > 15000) {
          switch (riskScoreObject.historyPurchase.profile.qty) {
            case 1:
              riskScoreObject.final -= 5;
              riskScoreObject.historyPurchase.score -= 5;
              break;
            case 2:
              riskScoreObject.final -= 10;
              riskScoreObject.historyPurchase.score -= 10;
              break;
            case 3:
              riskScoreObject.final -= 15;
              riskScoreObject.historyPurchase.score -= 15;
              break;
            case 4:
              riskScoreObject.final -= 20;
              riskScoreObject.historyPurchase.score -= 20;
              break;
            case 5:
              riskScoreObject.final -= 25;
              riskScoreObject.historyPurchase.score -= 25;
              break;
            default:
              riskScoreObject.final -= 30;
              riskScoreObject.historyPurchase.score -= 30;
          }
        }
      }
    }
  }

  riskScoreObject = buildRiskScoreLog(
    "r009",
    "Histórico de Compras do Cliente",
    riskScoreObject.historyPurchase.score,
    riskScoreObject
  );

  return riskScoreObject;
};
