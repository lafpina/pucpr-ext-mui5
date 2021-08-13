import titleCase from "../utils/titleCase";
import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";
//? Rule 1
export const applyCardHolderRule = (orderObject, riskScoreObject) => {
  if (orderObject.paymentGroupActive.creditCard) {
    // Score positively depending on matches between client data and card data
    var nomeCadastro = titleCase(orderObject.clientName).split(" ");
    var nomeCartao = titleCase(orderObject.cardHolder).split(" ");

    var qtyInstance = 0;

    const verifyBuyer = (item) => {
      if (nomeCadastro.indexOf(item) > -1) {
        qtyInstance++;
      }
    };

    nomeCartao.forEach(verifyBuyer);

    if (qtyInstance > 1) {
      riskScoreObject.final -= 10;
      riskScoreObject.cardHolder.score = -10;
      riskScoreObject.cardHolder.yes = true;
    } else if (qtyInstance == 1) {
      riskScoreObject.final -= 5;
      riskScoreObject.cardHolder.score = -5;
      riskScoreObject.cardHolder.maybe = true;
    } else {
      riskScoreObject.cardHolder.no = true;
    }
  }

  riskScoreObject = buildRiskScoreLog(
    "r001",
    "Titularidade do Cartão de Crédito incompatível com o cadastro do cliente",
    riskScoreObject.cardHolder.score,
    riskScoreObject
  );

  return riskScoreObject;
};
