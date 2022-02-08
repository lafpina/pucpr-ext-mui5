import titleCase from "../utils/titleCase";
import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";
//? Rule 1
export const tit_CardHolderRule = (orderObject, riskScoreObject) => {
  if (orderObject.paymentGroupActive.creditCard) {
    // Score positively depending on matches between client data and card data
    var nomeCadastro = titleCase(orderObject.clientName).split(" ");
    var nomeCartao = titleCase(orderObject.cardHolder).split(" ");

    var text = ''
    var qtyInstance = 0;
    var risk = true

    const verifyBuyer = (item) => {
      if (nomeCadastro.indexOf(item) > -1) {
        qtyInstance++;
      }
    };

    nomeCartao.forEach(verifyBuyer);

    if (qtyInstance > 1) {
      text = ' possui grande chance de ser o titular '
      risk = false
      riskScoreObject.final -= 10;
      riskScoreObject.cardHolder.score = -10;
      riskScoreObject.cardHolder.yes = true;
    } else if (qtyInstance == 1) {
      text = ' possui alguma relação com o titular '
      risk = false
      riskScoreObject.final -= 5;
      riskScoreObject.cardHolder.score = -5;
      riskScoreObject.cardHolder.maybe = true;
    } else {
      // score negatively if client isnt the card holder
      text = ' não é o titular '
      risk = true
      riskScoreObject.cardHolder.score += 5;
      riskScoreObject.final += 5;
      riskScoreObject.cardHolder.no = true;
    }
  }

  let text2 = ''

  if (risk) {
    text2 = ', que pode aumentar o risco'
  } else {
    text2 = ', que pode atenuar o risco'
  }

  riskScoreObject = buildRiskScoreLog(
    "r001",
    "TIT",
    `Cliente ${text} do Cartão de Crédito ${text2} (TIT)`,
    riskScoreObject.cardHolder.score,
    riskScoreObject
  );

  return riskScoreObject;
};
