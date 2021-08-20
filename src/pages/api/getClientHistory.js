import getURL from "../../helper/api/getURL";
import getOption from "../../helper/api/getOption";

const getClientHistory = async (req, res) => {
  let clientOrders;
  if (req.method === "GET") {
    let url = getURL("query", null);
    let options = getOption("order");

    const res = await fetch(url, options);

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
};
