import { FlareSharp } from "@material-ui/icons";
import getOption from "./getOption";
import getURL from "./getURL";

export async function lookForPurchaseHistory(query) {
  let historyPurchaseProfile = {
    qty: 0,
    value: 0,
    isGT90History: false,
    isGT60History: false,
    isGT40History: false,
    isGiftHistory: false,
    isGT999valHistory: false,
    isPromissoryHistory: false,
    isPixHistory: false,
    dateFirstBuy: " ",
  };

  let qtyPurchase = 0;
  let qtyInvoiced = 0;

  let options = getOption("order");

  let url = getURL("query", query);

  let res = await fetch(url, options);

  if (res.ok) {
    const data = await res.json();
    const clientOrders = JSON.parse(JSON.stringify(data));
    qtyPurchase = clientOrders.list.length;

    historyPurchaseProfile.dateFirstBuy =
      clientOrders.list[qtyPurchase - 1].creationDate;

    for (let i = 0; i < qtyPurchase; ++i) {
      if (clientOrders.list[i].status === "invoiced") {
        qtyInvoiced += 1;
        historyPurchaseProfile.qty += 1;
        historyPurchaseProfile.value += clientOrders.list[i].totalValue;

        if (clientOrders.list[i].paymentNames.indexOf("Vale") > -1) {
          historyPurchaseProfile.isGiftHistory = true;
        }

        if (
          clientOrders.list[i].paymentNames.indexOf(
            "Depósito",
            "Boleto Bancário"
          ) > -1
        ) {
          historyPurchaseProfile.isPromissoryHistory = true;
        }

        if (clientOrders.list[i].paymentNames.indexOf("Pix") > -1) {
          historyPurchaseProfile.isPixHistory = true;
        }
      }
    }
  } else {
    console.log("Error lookForPurchaseHistory:", query, res);
    qtyInvoiced = 0;
    historyPurchaseProfile.qty = 0;
    historyPurchaseProfile.value = 0;
    historyPurchaseProfile.isGiftHistory = false;
    historyPurchaseProfile.isPromissoryHistory = false;
    historyPurchaseProfile.isPixHistory = false;
  }

  // return qtyInvoiced;
  return historyPurchaseProfile;
}
