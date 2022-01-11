import titleCase from "../utils/titleCase";
import getOption from "./getOption";
import getURL from "./getURL";

export async function getIncompleteOrders(clientName) {
  let totalIncompleteOrders = 0;
  let qtyIncompleteOrders = 0;
  let incompleteName = " ";
  let buyerName = " ";

  let options = getOption("order");
  let url = getURL("incompleteOrders", true);

  let res = await fetch(url, options);

  if (res.ok) {
    const data = await res.json();
    const incompleteOrders = JSON.parse(JSON.stringify(data));

    totalIncompleteOrders = incompleteOrders.list.length;

    for (let i = 0; i < totalIncompleteOrders; ++i) {
      incompleteName = titleCase(incompleteOrders.list[i].clientName);
      buyerName = titleCase(clientName);

      if (incompleteName === buyerName) {
        qtyIncompleteOrders = qtyIncompleteOrders + 1;
        // console.log("------------------------------------");
        // console.log(incompleteOrders.list[i].clientName);
        // console.log("Tentativa: ", qtyIncompleteOrders);
        // console.log("Posição: ", i + 1);
        // console.log("------------------------------------");
        // console.log(incompleteOrders.list[i].orderId);
        // console.log(incompleteOrders.list[i].creationDate);
        // console.log(incompleteOrders.list[i].paymentNames);
        // console.log(incompleteOrders.list[i].totalItems);
        // console.log(incompleteOrders.list[i].totalValue);
        // console.log("------------------------------------");
      }
    }
  } else {
    console.log("Não achou o cliente Incomplete Orders!!!", clientName);
    qtyIncompleteOrders = 0;
  }

  return qtyIncompleteOrders;
}
