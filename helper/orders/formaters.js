//? Gift (ID da Lista, Nome da Lista)
export const formatGiftDetail = (vtexOrder) => {
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
export const formatPaymentMethod = (vtexOrder) => {
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

export const formatClientName = (vtexOrder) => {
  let clientFirstName = vtexOrder.clientProfileData.firstName;
  let clientLastName = vtexOrder.clientProfileData.lastName;

  let firstName =
    clientFirstName[0].toUpperCase() + clientFirstName.slice(1).toLowerCase();
  let lastName =
    clientLastName[0].toUpperCase() + clientLastName.slice(1).toLowerCase();

  return firstName.concat(" " + lastName);
};

export const formatCarrier = (vtexOrder) => {
  let vCarrier = vtexOrder.shippingData.logisticsInfo[0].selectedSla;
  if (vCarrier === "PAC" || vCarrier === "Sedex") return vCarrier;
  if (vCarrier.substr(0, 7) === "Entrega") return "Expressa";
  if (vCarrier.substr(0, 8) === "Retirada") return "Retirada";
  if (vCarrier.substr(0, 14) === "Não contribuir") return "";
};

export const formatCoupon = (vtexOrder) => {
  let coupon = " ";
  if (vtexOrder.ratesAndBenefitsData.rateAndBenefitsIdentifiers[0]) {
    coupon = vtexOrder.ratesAndBenefitsData.rateAndBenefitsIdentifiers[0].name;
  }
  return coupon;
};

//? Payment Group (ex: Credit Card, Instant Payment(Pix), Gift Card(Vale), Promissory(Deposit))
export const formatPaymentGroup = (vtexOrder) => {
  let paymentGroupObject = {
    group: [],
    tid: null,
    paymentActive: {
      creditCard: false,
      giftCard: false,
      promissory: false,
      instantPayment: false,
    },
  };

  for (
    let i = 0;
    i < vtexOrder.paymentData.transactions[0].payments.length;
    ++i
  ) {
    paymentGroupObject.group[i] =
      vtexOrder.paymentData.transactions[0].payments[i].group;
    // if one of transactions has a TID by nature (credit card or pix) than catch it.
    if (paymentGroupObject.group[i] === "creditCard" || "pix") {
      paymentGroupObject.tid =
        vtexOrder.paymentData.transactions[0].payments[i].tid;
    }
    if (paymentGroupObject.group[i] === "creditCard") {
      paymentGroupObject.paymentActive.crediCard = true;
    }
    if (paymentGroupObject.group[i] === "giftCard") {
      paymentGroupObject.paymentActive.giftCard = true;
    }
    if (paymentGroupObject.group[i] === "promissory") {
      paymentGroupObject.paymentActive.promissory = true;
    }
    if (paymentGroupObject.group[i] === "instantPayment") {
      paymentGroupObject.paymentActive.instantPayment = true;
    }
  }
  return paymentGroupObject;
};
