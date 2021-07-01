// Fetch VTEX API - GET LIST ORDERS
import getURL from "../../components/lib/api/getURL";
import getOption from "../../components/lib/api/getOption";

async function getVTEXListOrdersAPI(req, res) {
  let clientOrders;
  if (req.method === "POST") {
    let url = getURL("list", null);
    let options = getOption("order");

    let res = await fetch(url, options);

    if (res.ok) {
      const data = await res.json();
      clientOrders = JSON.parse(JSON.stringify(data));
      res.status(200);
      res.json({ message: "Success", clientOrders: clientOrders });
    }
  } else {
    res.status(405);
    res.json({ message: "Method Not Allowed", clientOrders: [] });
  }
}

export default getVTEXListOrdersAPI;
