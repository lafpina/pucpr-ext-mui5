import getOption from "./getOption";
import getURL from "./getURL";

export async function lookForPurchaseHistory(clientEmail) {
  let historyPurchaseProfile = {
    qty: 0,
    value: 0,
    giftHistory: false,
  };

  let qtyPurchase = 0;
  let qtyInvoiced = 0;

  let options = getOption("order");
  let url = getURL("email", clientEmail);

  let res = await fetch(url, options);

  if (res.ok) {
    const data = await res.json();
    const clientOrders = JSON.parse(JSON.stringify(data));
    qtyPurchase = clientOrders.list.length;

    for (let i = 0; i < qtyPurchase; ++i) {
      if (clientOrders.list[i].status == "invoiced") {
        qtyInvoiced = qtyInvoiced + 1;

        historyPurchaseProfile.qty = historyPurchaseProfile.qty + 1;
        historyPurchaseProfile.value =
          historyPurchaseProfile.value + clientOrders.list[i].totalValue;

        if (clientOrders.list[i].paymentNames.indexOf("Vale") > -1) {
          historyPurchaseProfile.giftHistory = true;
        }
      }
    }
  } else {
    qtyInvoiced = 0;
    historyPurchaseProfile.qty = 0;
    historyPurchaseProfile.value = 0;
    historyPurchaseProfile.giftHistory = false;
  }

  // return qtyInvoiced;
  return historyPurchaseProfile;
}
