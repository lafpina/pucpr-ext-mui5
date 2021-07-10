import buildPagarmeObject from "./build-pagarme-object";
import getMasterdataClientEmail from "./get-masterdata-client-email";
import { formatGiftDetail } from "./formaters";
import { formatPaymentGroup } from "./formaters";
import { formatPaymentMethod } from "./formaters";
import { formatClientName } from "./formaters";
import { formatCarrier } from "./formaters";
import { formatCoupon } from "./formaters";

const buildOrderObject = async (vtexOrder) => {
  let giftDetail = formatGiftDetail(vtexOrder);

  let clientEmail = await getMasterdataClientEmail(vtexOrder);

  let pagarmeObject = await buildPagarmeObject(
    vtexOrder.orderId,
    vtexOrder.paymentData.transactions[0].payments[0].tid
  );

  let paymentGroupObject = formatPaymentGroup(vtexOrder);

  console.log("Payment Group Object:", paymentGroupObject);

  let orderObject = {
    // Transaction
    orderId: vtexOrder.orderId,
    tid: paymentGroupObject.tid,
    creationDate: vtexOrder.creationDate,
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
    coupon: formatCoupon(vtexOrder),
    // Delivery
    carrier: formatCarrier(vtexOrder),
    shippingCity: vtexOrder.shippingData.address.city,
    shippingState: vtexOrder.shippingData.address.state,
    status: vtexOrder.status,
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
  };

  return orderObject;
};

export default buildOrderObject;
