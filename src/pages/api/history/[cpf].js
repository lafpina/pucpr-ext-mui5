import getURL from "../../../backend/api/getURL";
import getOption from "../../../backend/api/getOption";

async function handler(req, res) {
  if (req.method === "GET") {
    const cpf = req.query.cpf;

    if (!cpf) {
      res.status(422).json({ message: "CPF inválido" });
      return;
    }

    const url = getURL("query", cpf);
    const options = getOption("order");

    const data = await fetch(url, options);

    if (data.ok) {
      const history = await data.json();
      res.status(200).json({ history: history });
    } else {
      res.status(500).json({ message: "Erro ao acessar os dados no servidor" });
    }
  } else {
    res.status(405).json({ message: "Metodo não autorizado" });
  }
}

export default handler;
