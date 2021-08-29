import getURL from "../../../helper/api/getURL";
import getOption from "../../../helper/api/getOption";
import titleCase from "../../../helper/utils/titleCase";

async function handler(req, res) {
  if (req.method === "GET") {
    const clientName = req.query.name;

    if (!clientName) {
      res.status(422).json({ message: "Nome do cliente inválido" });
      return;
    }

    const url = getURL("incompleteOrdersByCpf", true);
    const options = getOption("order");

    const data = await fetch(url, options);

    if (data.ok) {
      const history = await data.json();

      const totalIncompleteOrders = history.list.length;

      let historyList = [];

      const buyerName = titleCase(clientName);
      let incompleteOrderName;

      for (let i = 0; i < totalIncompleteOrders; i++) {
        incompleteOrderName = titleCase(history.list[i].clientName);

        if (incompleteOrderName === buyerName) {
          historyList.push(history.list[i]);
        }
      }
      res.status(200).json({ history: historyList });
    } else {
      res.status(500).json({ message: "Erro ao acessar os dados no servidor" });
    }
  } else {
    res.status(405).json({ message: "Metodo não autorizado" });
  }
}

export default handler;
