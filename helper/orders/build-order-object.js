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

  let orderObject = {
    orderId: vtexOrder.orderId,
    tid: vtexOrder.paymentData.transactions[0].payments[0].tid,
    creationDate: vtexOrder.creationDate,
    value: vtexOrder.value,
    paymentGroup: formatPaymentGroup(vtexOrder),
    paymentMethod: formatPaymentMethod(vtexOrder),
    cardHolder: pagarmeObject.cardHolder,
    cardCountry: pagarmeObject.cardCountry,
    cardInstallments: pagarmeObject.cardInstallments,
    coupon: formatCoupon(vtexOrder),
    carrier: formatCarrier(vtexOrder),
    shippingCity: vtexOrder.shippingData.address.city,
    shippingState: vtexOrder.shippingData.address.state,
    status: vtexOrder.status,
    clientName: formatClientName(vtexOrder),
    clientEmail: clientEmail,
    cpf: vtexOrder.clientProfileData.document,
    phone: vtexOrder.clientProfileData.phone,
    giftName: giftDetail.name,
    giftId: giftDetail.id,
    items: vtexOrder.items,
  };

  return orderObject;
};

export default buildOrderObject;
