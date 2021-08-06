import titleCase from "../utils/titleCase";
//? Rule 1
export const applyCardHolderRule = (orderObject, riskScoreObject) => {
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

  return riskScoreObject;
};
