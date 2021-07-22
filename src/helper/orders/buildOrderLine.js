import titleCase from "../utils/titleCase";
import { isBlackListed } from "../../../data/black-list";
import { isWhiteListed } from "../../../data/white-list";

export const buildOrderLine = (
  orderObject,
  riskScoreObject,
  riskAnalysisResult
) => {
  let paymentOption = {
    creditCard: orderObject.paymentGroupActive.creditCard,
    isCreditCardHolder: riskScoreObject.cardHolder,
    giftCard: orderObject.paymentGroupActive.giftCard,
    promissory: orderObject.paymentGroupActive.promissory,
    instantPayment: orderObject.paymentGroupActive.instantPayment,
  };

  let orderLine = {
    order: orderObject.orderId.substr(1, 6),
    cliente: orderObject.clientName.substr(0, 35),
    qtyPurchase: riskScoreObject.historyPurchase.profile.qty,
    valuePurchase: riskScoreObject.historyPurchase.profile.value,
    // creationTime: Date(orderObject.creationDate).getHours(),
    dataCompra:
      orderObject.creationDate.substr(0, 5) +
      " " +
      orderObject.creationDate.substr(11, 5), // dd-mm hh-mm
    items: orderObject.items.length,
    itemName: orderObject.itemName,
    valor: orderObject.value,
    giftId: orderObject.giftId,
    giftName: orderObject.giftName,
    destino: orderObject.carrier
      ? orderObject.shippingCity + " (" + orderObject.carrier + ")"
      : orderObject.shippingCity,
    status: orderObject.status,
    statusDescription: orderObject.statusDescription,
    scoreDesc: riskScoreObject.description,
    score: riskScoreObject.final,
    riskProfile: riskScoreObject,
    kitCustom: riskScoreObject.customProduct.score,
    promo: orderObject.coupon,
    blackListed: isBlackListed(
      orderObject.clientEmail,
      orderObject.cpf,
      orderObject.shippingPostalCode,
      orderObject.phone,
      orderObject.cardLastDigits,
      orderObject.shippingState
    )
      ? true
      : false,
    whiteListed: isWhiteListed(orderObject.clientEmail, orderObject.cpf)
      ? true
      : false,
    blackListedQty: riskScoreObject.blackListed.qty,
    whiteListedQty: riskScoreObject.whiteListed.qty,
    alertsQty: riskScoreObject.alerts.qty,
    payMethod: paymentOption,

    incompleteOrders: riskScoreObject.incompleteOrders.qty,
    creditCard: orderObject.cardLastDigits,
    riskAnalysisResult: riskAnalysisResult,

    history: [
      {
        cpf: orderObject.cpf,
        emailCliente: orderObject.clientEmail,
        phone: orderObject.phone,
        pagamento: orderObject.cardLastDigits,
        parcelas: orderObject.cardInstallments,
        postalCode: orderObject.shippingPostalCode,
        state: orderObject.shippingState,
        cardCountry: titleCase(orderObject.cardCountry),
        parcelas: orderObject.cardInstallments,
        titular:
          orderObject.cardHolder != null
            ? titleCase(orderObject.cardHolder)
            : "",
      },
    ],
  };
  return orderLine;
};
