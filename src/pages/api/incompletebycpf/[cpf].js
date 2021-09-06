import getURL from "../../../helper/api/getURL";
import getOption from "../../../helper/api/getOption";
import { ContactSupportOutlined } from "@material-ui/icons";
import formaTZOrderDate from "../../../helper/utils/formatTZOrderDate";

async function handler(req, res) {
  if (req.method === "GET") {
    const clientCpf = req.query.cpf;

    if (!clientCpf) {
      res.status(422).json({ message: "CPF do cliente inválido" });
      return;
    }

    const url = getURL("IOCPF", clientCpf);
    const options = getOption("order");

    const data = await fetch(url, options);

    if (data.ok) {
      const history = await data.json();

      const objIncompleteOrders = await buildObjIncompleteOrders(history.list);

      res.status(200).json({ history: objIncompleteOrders });
    } else {
      res.status(500).json({ message: "Erro ao acessar os dados no servidor" });
    }
  } else {
    res.status(405).json({ message: "Metodo não autorizado" });
  }
}

export default handler;

const buildObjIncompleteOrders = async (history) => {
  const options = getOption("order");

  const obj = [];
  let objIncompleteOrders = {}


  console.log("history ====> ", history.length, history)

  for (let i = 0; i < history.length; i++) {
    objIncompleteOrders = {
      date: "",
      orderId: "",
      items: "",
      value: "",
      payment: "",
      creditCard:  " ",
      list: "",
      status: "",
      installments: "",
      tid: "",
      reason: "",
    };
    const fullDate = formaTZOrderDate(history[i].creationDate);
    const partialDate = fullDate.substr(0, 5) + " " + fullDate.substr(11, 5);
    objIncompleteOrders.date = partialDate;
    objIncompleteOrders.orderId = history[i].orderId;
    objIncompleteOrders.items = history[i].totalItems;
    objIncompleteOrders.value = history[i].totalValue;
    objIncompleteOrders.payment = history[i].paymentNames;
    objIncompleteOrders.list = history[i].listId;
    objIncompleteOrders.status = "Incompleto";

    const url = getURL("order", history[i].orderId);
    const result = await fetch(url, options);
    if (result.ok) {
      const getOrder = await result.json();

      objIncompleteOrders.creditCard =
        history[i].paymentNames +
        " " +
        (getOrder.paymentData.transactions[0].payments[0].group == "creditCard"
          ? getOrder.paymentData.transactions[0].payments[0].firstDigits +
            "****" +
            getOrder.paymentData.transactions[0].payments[0].lastDigits
          : " ");

      objIncompleteOrders.installments =
        getOrder.paymentData.transactions[0].payments[0].installments;
      objIncompleteOrders.tid =
        getOrder.paymentData.transactions[0].payments[0].tid;
      objIncompleteOrders.reason = getOrder.cancelReason;
    } else {
      objIncompleteOrders.creditCard = "-";
      objIncompleteOrders.installments = "-";
      objIncompleteOrders.tid = "-";
      objIncompleteOrders.reason = "-";
    }
    obj.push(objIncompleteOrders);
  }
  console.log("OBJ --> ", obj  )
  return obj;
};
