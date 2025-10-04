import buildPagarmeObject from "./buildPagarmeObject";
import getMasterdataClientEmail from "./getMasterdataClientEmail";
import formatTZOrderDate from "../utils/formatTZOrderDate";
import titleCase from "../utils/titleCase";
import { formatGiftDetail } from "./formaters";
import { formatPaymentGroup } from "./formaters";
import { formatPaymentMethod } from "./formaters";
import { formatClientName } from "./formaters";
import { formatCarrier } from "./formaters";
import { formatCoupon } from "./formaters";
import { formatCreditCard } from "./formaters";

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
        let i = 0; i < vtexOrder.paymentData.transactions[0].payments.length;
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
            vtexOrder.items.length > 1 ?
                ` (${i + 1}) ${vtexOrder.items[i].name} ` + "\n" :
                `${vtexOrder.items[i].name}`;
    }


    let ownerListId = null
    let ownerListName = null
    let ownerEmail = null

    if (vtexOrder.salesChannel == '2' && vtexOrder.customData) {

        console.log(vtexOrder.customData.customApps.fields)
        console.log(vtexOrder.customData.customApps.fields?.ownerListId)
        console.log(vtexOrder.customData.customApps.fields?.ownerListName)
        console.log(vtexOrder.customData.customApps.fields?.ownerListEmail)

        ownerListId = vtexOrder?.customData?.customApps?.[0]?.fields?.ownerListId
        ? vtexOrder.customData.customApps[0].fields.ownerListId.substring(0, 8)
        : null;

        ownerListName = vtexOrder.customData.customApps[0].fields.ownerListName
        ownerEmail = vtexOrder.customData.customApps[0].fields.ownerListEmail

    } else {
        ownerListName = giftDetail.name
        ownerListId = giftDetail.id
    }




    let orderObject = {

        orderId: vtexOrder.sequence,
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
        creditCard: formatCreditCard(vtexOrder),
        coupon: formatCoupon(vtexOrder),
        // Delivery
        carrier: formatCarrier(vtexOrder),
        shippingCity: titleCase(vtexOrder.shippingData.address.city),
        shippingState: vtexOrder.shippingData.address.state,
        shippingPostalCode: vtexOrder.shippingData.address.postalCode,
        status: vtexOrder.status,
        statusDescription: vtexOrder.statusDescription,
        // Client Data
        clientName: formatClientName(vtexOrder),
        clientEmail: clientEmail[0].email ? clientEmail[0].email : vtexOrder.clientProfileData.email,
        cpf: vtexOrder.clientProfileData.document,
        phone: vtexOrder.clientProfileData.phone,
        // Gift
        // giftName: giftDetail.name,
        // giftId: giftDetail.id,
        giftName: ownerListName,
        giftId: ownerListId,
        giftEmail: ownerEmail,
        // Products
        items: vtexOrder.items,
        itemName: itemName,
    };

    //return orderObject;
    // Implementação para evitar o "serialize error"
    return JSON.parse(JSON.stringify(orderObject, (key, value) => {
        return value === undefined ? null : value;
    }));
};

export default buildOrderObject;