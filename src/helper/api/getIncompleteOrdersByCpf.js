import getOption from "./getOption";
import getURL from "./getURL";

export async function getIncompleteOrdersByCpf(cpf) {
  const options = getOption("order");
  const url = getURL("IOCPF", cpf);

  let res = await fetch(url, options);

  let incompleteOrders = [];

  if (res.ok) {
    const data = await res.json();
    incompleteOrders = JSON.parse(JSON.stringify(data));
  } else {
    console.log("Não achou o cliente Incomplete Orders CPF!!!", cpf);
  }

  return incompleteOrders;
}
