import getURL from "../../../helper/api/getURL";
import getOption from "../../../helper/api/getOption";

async function handler(req, res) {
  if (req.method === "GET") {
    const orderId = req.query.orderId;

    if (!orderId) {
      res.status(422).json({ message: "Número do Pedido inválido" });
      return;
    }

    const url = getURL("order", orderId);
    const options = getOption("order");

    const data = await fetch(url, options);

    if (data.ok) {
      const history = await data.json();
      res.status(200).json({ history: history.items });
    } else {
      res.status(500).json({ message: "Erro ao acessar os dados no servidor" });
    }
  } else {
    res.status(405).json({ message: "Metodo não autorizado" });
  }
}

export default handler;
