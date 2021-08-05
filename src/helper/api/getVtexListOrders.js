// Fetch VTEX API - GET LIST ORDERS
import getURL from "./getURL";
import getOption from "./getOption";

async function getVtexListOrders() {
  let clientOrders;
  let url = getURL("list", null);
  let options = getOption("order");

  console.log("Fetching LIST Order....");
  console.log("URL", url);

  let res = await fetch(url, options);

  if (res.ok) {
    console.log("Fetch OK");
    const data = await res.json();
    clientOrders = JSON.parse(JSON.stringify(data));
  } else {
    console.log(`Não foi encontrado registro para a URL ${url}`);
    console.log(res);
  }
  return clientOrders;
}

export default getVtexListOrders;
