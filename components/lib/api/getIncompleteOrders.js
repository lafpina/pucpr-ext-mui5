import getOption from "./getOption";
import getURL from "./getURL";

export async function getIncompleteOrders(clientName) {
  let totalIncompleteOrders = 0;
  let qtyIncompleteOrders = 0;

  let options = getOption("order");
  let url = getURL("order", (incompleteOrders = true));

  let res = await fetch(url, options);

  if (res.ok) {
    const data = await res.json();
    const incompleteOrders = JSON.parse(JSON.stringify(data));

    "creationDate": "2019-02-04T10:29:11.0000000+00:00"

  
  const { year, month } = Date();

  let filteredOrders = DUMMY_ORDER_LIST.filter((order) => {
    const orderDate = new Date(order.date);
    return (
      orderDate.getFullYear() === year && orderDate.getMonth() === month - 1
    );
  });


    totalIncompleteOrders = incompleteOrders.list.length;
    for (let i = 0; i < totalIncompleteOrders; ++i) {
      if (incompleteOrders.list[i].clientName == clientName) {
        qtyIncompleteOrders = qtyIncompleteOrders + 1;
      }
    }
  } else {
    qtyIncompleteOrders = 0;
  }

  return qtyIncompleteOrders;
}
