import { lookForPurchaseHistory } from "../api/lookForPurchaseHistory";
import { convertDate } from "../utils/convertDate";
import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";
import setCurrency from '../utils/setCurrency'

//? Rule 09
export const hst_fby_HistPurchaseRule = async (orderObject, riskScoreObject) => {
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


    var text = ''
    var text1 = 'Histórico de compras com a primeira compra efetuda há '
    var text2 = 'Possui em seu histórico pelo menos um pagamento com '
    var text3 = 'Identificado um volume total de '
    var text4 = 'totalizando '

    if (days > 365) {
      const years = days / 365
      text = text1.concat(Math.round(years), ' ano(s).')
    } else {
      text = text1.concat(days, ' dia(s). ')
    }


    switch (true) {
      case (days > 90):
        riskScoreObject.final -= 30;
        riskScoreObject.historyPurchase.score -= 30;
        riskScoreObject.historyPurchase.profile.isGT90History = true;
        break
      case (days > 60):
        riskScoreObject.final -= 20;
        riskScoreObject.historyPurchase.score -= 20;
        riskScoreObject.historyPurchase.profile.isGT60History = true;
        break
      case (days > 40):
        riskScoreObject.final -= 10;
        riskScoreObject.historyPurchase.score -= 10;
        riskScoreObject.historyPurchase.profile.isGT40History = true;
        break
    }

    // History has at least one payment using Gift Credit (Vale)
    if (riskScoreObject.historyPurchase.profile.isGiftHistory) {
      text = text.concat(text2, ' VALE. ')
      riskScoreObject.final -= 40;
      riskScoreObject.historyPurchase.score -= 40;
    }
    // History has at least one purchase for a Promissory (Boleto)
    if (riskScoreObject.historyPurchase.profile.isPromissoryHistory) {
      text = text.concat(text2, ' BOLETO BANCÁRIO. ')
      riskScoreObject.final -= 30;
      riskScoreObject.historyPurchase.score -= 30;
    }
    // History has at least one purchase for an Instant Payment (PIX)
    if (riskScoreObject.historyPurchase.profile.isPixHistory) {
      text = text.concat(text2, ' PIX. ')
      riskScoreObject.final -= 30;
      riskScoreObject.historyPurchase.score -= 30;
    }
    // Client has bought over 1.000 before this transaction
    text = text.concat(text3, setCurrency(riskScoreObject.historyPurchase.profile.value), ' em compras, ')
    if (riskScoreObject.historyPurchase.profile.value > 100000) {
      riskScoreObject.final -= 10;
      riskScoreObject.historyPurchase.score -= 10;
    }

    text = text.concat(text4, riskScoreObject.historyPurchase.profile.qty, ' pedido(s) efetuado(s).')
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
    `${text}  🆗`,
    riskScoreObject.historyPurchase.score,
    riskScoreObject
  );
  riskScoreObject = buildRiskScoreLog(
    "r017",
    "FBY",
    "Primeira compra no Site  ❗",
    riskScoreObject.firstBuying.score,
    riskScoreObject
  );

  return riskScoreObject;
};
