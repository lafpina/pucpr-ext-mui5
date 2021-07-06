import getOption from "../../helper/vtex-apis/get-option";
import getURL from "../../helper/vtex-apis/get-url";
import getOrder from "../../helper/vtex-apis/get-order";

const orderScore = async (order) => {
  // Set Credentials
  let url = getURL("order", order);
  let options = getOption("order");

  let vtexOrder = await getOrder(url, options);

  if (vtexOrder) {
    let giftDetail = formatGiftDetail(vtexOrder);
    let paymentMethodDetail = formatPaymentMethod(vtexOrder);
    let paymentGroupDetail = formatPaymentGroup(vtexOrder);

    let vOrder = {
      orderId: vtexOrder.orderId,
      creationDate: vtexOrder.creationDate,
      value: vtexOrder.value,
      shippingCity: vtexOrder.shippingData.address.city,
      shippingState: vtexOrder.shippingData.address.state,
      status: vtexOrder.status,
      cpf: vtexOrder.clientProfileData.document,
      phone: vtexOrder.clientProfileData.phone,
      items: vtexOrder.items,
      tid: vtexOrder.paymentData.transactions[0].payments[0].tid,
      giftId: giftDetail.id,
      giftName: giftDetail.name,
      clientFirstName: vtexOrder.clientProfileData.firstName,
      clientLastName: vtexOrder.clientProfileData.lastName,
      carrier: vtexOrder.shippingData.logisticsInfo[0].selectedSla,
      paymentGroup: paymentGroupDetail,
      paymentMethod: paymentMethodDetail,
    };

    console.log("---------------------------------------------");
    console.log("vOrder", vOrder);

    return true;
  } else {
    console.log("hummm");
    return null;
  }
};

export default orderScore;

//? Gift (ID da Lista, Nome da Lista)
const formatGiftDetail = (vtexOrder) => {
  let giftDetail = {
    id: "",
    name: "",
  };
  if (vtexOrder.giftRegistryData) {
    giftDetail.id = vtexOrder.giftRegistryData.giftRegistryId;
    giftDetail.name = vtexOrder.giftRegistryData.description;
  }
  return giftDetail;
};

//? Payment Method (Visa, Mastercard, etc)
const formatPaymentMethod = (vtexOrder) => {
  let paymentMethod = [];
  for (
    let i = 0;
    i < vtexOrder.paymentData.transactions[0].payments.length;
    ++i
  ) {
    paymentMethod[i] =
      vtexOrder.paymentData.transactions[0].payments[i].paymentSystemName;
  }
  return paymentMethod;
};

//? Payment Group (ex: Credit Card, Instant Payment(Pix), Gift Card(Vale), Promissory(Deposit))
const formatPaymentGroup = (vtexOrder) => {
  let paymentGroup = [];
  let pagarmeTid = "";
  for (
    let i = 0;
    i < vtexOrder.paymentData.transactions[0].payments.length;
    ++i
  ) {
    paymentGroup[i] = vtexOrder.paymentData.transactions[0].payments[i].group;
    if (paymentGroup[i] === "creditCard") {
      pagarmeTid = vtexOrder.paymentData.transactions[0].payments[i].tid;
    }
  }
  return paymentGroup;
};
