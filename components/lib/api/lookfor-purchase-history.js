import getOption from "./getOption";
import getURL from "./getURL";

export async function lookForPurchaseHistory(clientEmail) {
  let qtyPurchase = 0;
  let qtyInvoiced = 0;

  let options = getOption("order");
  let url = getURL("email", clientEmail);

  console.log("options:", options);
  console.log("url:", url);

  let res = await fetch(url, options);

  if (res.ok) {
    const data = await res.json();
    const clientOrders = JSON.parse(JSON.stringify(data));
    qtyPurchase = clientOrders.list.length;

    for (let i = 0; i < qtyPurchase; ++i) {
      if (clientOrders.list[i].status == "invoiced") {
        qtyInvoiced = qtyInvoiced + 1;
      }
    }
  } else {
    qtyInvoiced = 0;
  }

  return qtyInvoiced;
}
