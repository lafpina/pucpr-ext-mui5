// Fetch VTEX API - GET LIST ORDERS
import getURL from "./getURL";
import getOption from "./getOption";

async function getListOrders() {
  let clientOrders;
  let url = getURL("list", null);
  let options = getOption("order");

  let res = await fetch(url, options);

  if (res.ok) {
    const data = await res.json();
    clientOrders = JSON.parse(JSON.stringify(data));
  }
  return clientOrders;
}

export default getListOrders;
