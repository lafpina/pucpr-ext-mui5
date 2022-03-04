import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";
//? Rule 08
export const pag_PaymentMethodRule = (orderObject, riskScoreObject) => {
  // Score positively whether it's a deposit, pix or giftCard payment method

  let text = 'Metodo de pagamento inclui '
  let risk = true

  if (orderObject.paymentGroupActive.creditCard) {
    text = text.concat('Cartão de Crédito ')
    risk = true
    riskScoreObject.final += 15;
    riskScoreObject.paymentMethod.creditCard.score += 15;
  }
  if (orderObject.paymentGroupActive.promissory) {
    riskScoreObject.final -= 50;
    text = text.concat('BOLETO BANCÁRIO ')
    risk = false
    riskScoreObject.paymentMethod.promissory.score = -50;
  }
  if (orderObject.paymentGroupActive.instantPayment) {
    text = text.concat('PIX ')
    risk = false
    riskScoreObject.final -= 50;
    riskScoreObject.paymentMethod.instantPayment.score = -50;
  }
  if (orderObject.paymentGroupActive.giftCard) {
    text = text.concat('VALE ')
    risk = false
    riskScoreObject.final -= 50;
    riskScoreObject.paymentMethod.giftCard.score = -50;
  }


  if (risk) {
    text = text.concat(', que pode aumentar o risco')
  } else {
    text = text.concat(', que pode atenuar o risco')
  }

  const score =
    riskScoreObject.paymentMethod.promissory.score +
    riskScoreObject.paymentMethod.instantPayment.score +
    riskScoreObject.paymentMethod.creditCard.score +
    riskScoreObject.paymentMethod.giftCard.score;

  riskScoreObject = buildRiskScoreLog(
    "r008",
    "PAG",
    `${text} (PAG)`,
    score,
    riskScoreObject
  );

  return riskScoreObject;
};
