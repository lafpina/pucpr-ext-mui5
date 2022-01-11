import { lookForPurchaseHistory } from "../api/lookForPurchaseHistory";
import { convertDate } from "../utils/convertDate";
import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 09
export const applyHistPurchaseRule = async (orderObject, riskScoreObject) => {
  // Score positively based on the history of purchase

  riskScoreObject.historyPurchase.profile = await lookForPurchaseHistory(
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

    if (days > 90) {
      riskScoreObject.final -= 30;
      riskScoreObject.historyPurchase.score -= 30;
      riskScoreObject.historyPurchase.profile.isGT90History = true;
    } else if (days > 60) {
      riskScoreObject.final -= 20;
      riskScoreObject.historyPurchase.score -= 20;
      riskScoreObject.historyPurchase.profile.isGT60History = true;
    } else if (days > 40) {
      riskScoreObject.final -= 10;
      riskScoreObject.historyPurchase.score -= 10;
      riskScoreObject.historyPurchase.profile.isGT40History = true;
    }
    // History has at least one payment using Gift Credit (Vale)
    if (riskScoreObject.historyPurchase.profile.isGiftHistory) {
      riskScoreObject.final -= 40;
      riskScoreObject.historyPurchase.score -= 40;
    }
    // History has at least one purchase for a Promissory (Boleto)
    if (riskScoreObject.historyPurchase.profile.isPromissoryHistory) {
      riskScoreObject.final -= 30;
      riskScoreObject.historyPurchase.score -= 30;
    }
    // History has at least one purchase for an Instant Payment (PIX)
    if (riskScoreObject.historyPurchase.profile.isPixHistory) {
      riskScoreObject.final -= 30;
      riskScoreObject.historyPurchase.score -= 30;
    }
    // Client has bought over 1.000 before this transaction
    if (riskScoreObject.historyPurchase.profile.value > 100000) {
      riskScoreObject.final -= 10;
      riskScoreObject.historyPurchase.score -= 10;
    }

    // Client has bought at least 150 before this transaction than can be
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
  } else {
    riskScoreObject.final += 5;
    riskScoreObject.firstBuying.score = 5;
  }
  // }

  riskScoreObject = buildRiskScoreLog(
    "r009",
    "HST",
    "Histórico de Compras do Cliente e a sua relação com a forma de pagamento",
    riskScoreObject.historyPurchase.score,
    riskScoreObject
  );
  riskScoreObject = buildRiskScoreLog(
    "r017",
    "FBY",
    "Primeira compra no Site",
    riskScoreObject.firstBuying.score,
    riskScoreObject
  );

  return riskScoreObject;
};
