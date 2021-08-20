// Exemplo de api que deve ser testado.

import { lookForPurchaseHistory } from "../../helper/api/lookForPurchaseHistory";

function handler(req, res) {
  const clientCpf = req.query.clientCpf;

  purchaseHistory = await lookForPurchaseHistory(clientCpf);

  res.json({ message: "Success", purchaseHistory: purchaseHistory });
}

export default handler;
