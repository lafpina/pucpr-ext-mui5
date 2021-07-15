import buildPagarmeObject from "./build-pagarme-object";
import getMasterdataClientEmail from "./get-masterdata-client-email";
import formatTZOrderDate from "../../components/lib/utils/format-tz-order-date";
import { formatGiftDetail } from "./formaters";
import { formatPaymentGroup } from "./formaters";
import { formatPaymentMethod } from "./formaters";
import { formatClientName } from "./formaters";
import { formatCarrier } from "./formaters";
import { formatCoupon } from "./formaters";
import { formatLast4Digits } from "./formaters";

/*
paymentData.transactions[0].payments[0].paymentSystemName  //Mastercard, Vale
paymentData.transactions[0].payments[0].group  //creditCard
paymentData.transactions[0].payments[0].installments
paymentData.transactions[0].payments[0].tid  
paymentData.transactions[0].payments[0].lastDigits
paymentData.transactions[0].payments[0].value
paymentData.transactions[0].payments[0].giftCardId  // Id: a490f3a5-5c23-4ed1-8c05-3e58ea77603a_5387
paymentData.transactions[0].payments[0].giftCardCaption // Nome do Chá
*/

const buildOrderObject = async (vtexOrder) => {
  let giftDetail = formatGiftDetail(vtexOrder);
  let clientEmail = await getMasterdataClientEmail(vtexOrder);
  let paymentGroupObject = formatPaymentGroup(vtexOrder);

  let pagarmeObject = {
    cardHolder: " ",
    cardCountry: " ",
    cardInstallments: " ",
  };

  let hasCreditCard = false;
  let tid = 0;
  for (
    let i = 0;
    i < vtexOrder.paymentData.transactions[0].payments.length;
    ++i
  ) {
    if (
      vtexOrder.paymentData.transactions[0].payments[i].group == "creditCard"
    ) {
      tid = vtexOrder.paymentData.transactions[0].payments[i].tid;
      hasCreditCard = true;
    }
  }

  if (hasCreditCard) {
    pagarmeObject = await buildPagarmeObject(vtexOrder.orderId, tid);
  }

  let itemName = [];
  for (let i = 0; i < vtexOrder.items.length; ++i) {
    itemName[i] =
      vtexOrder.items.length > 1
        ? ` (${i + 1}) ${vtexOrder.items[i].name} ` + "\n"
        : `${vtexOrder.items[i].name}`;
  }

  let orderObject = {
    // Transaction
    orderId: vtexOrder.orderId,
    creationDate: formatTZOrderDate(vtexOrder.creationDate),
    tid: paymentGroupObject.tid,
    //Value
    value: vtexOrder.value,
    totalItemsValue: vtexOrder.totals.find((id) => id.id == "Items"),
    totalShippingValue: vtexOrder.totals.find((id) => id.id == "Shipping"),
    // Payment
    paymentGroup: paymentGroupObject.group,
    paymentGroupActive: paymentGroupObject.paymentActive,
    paymentMethod: formatPaymentMethod(vtexOrder),
    // Pagarme Card Info
    cardHolder: pagarmeObject.cardHolder,
    cardCountry: pagarmeObject.cardCountry,
    cardInstallments: pagarmeObject.cardInstallments,
    cardLastDigits: formatLast4Digits(vtexOrder),
    coupon: formatCoupon(vtexOrder),
    // Delivery
    carrier: formatCarrier(vtexOrder),
    shippingCity: vtexOrder.shippingData.address.city,
    shippingState: vtexOrder.shippingData.address.state,
    shippingPostalCode: vtexOrder.shippingData.address.postalCode,
    status: vtexOrder.status,
    statusDescription: vtexOrder.statusDescription,
    // Client Data
    clientName: formatClientName(vtexOrder),
    clientEmail: clientEmail[0].email,
    cpf: vtexOrder.clientProfileData.document,
    phone: vtexOrder.clientProfileData.phone,
    // Gift
    giftName: giftDetail.name,
    giftId: giftDetail.id,
    // Products
    items: vtexOrder.items,
    itemName: itemName,
  };

  return orderObject;
};

export default buildOrderObject;
