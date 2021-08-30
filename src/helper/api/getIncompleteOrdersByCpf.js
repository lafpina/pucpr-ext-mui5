import getOption from "./getOption";
import getURL from "./getURL";

export async function getIncompleteOrdersByCpf(cpf) {
  const options = getOption("order");
  const url = getURL("IOCPF", cpf);

  let res = await fetch(url, options);

  let qtyIncompleteOrdersByCpf;

  if (res.ok) {
    const data = await res.json();
    const incompleteOrdersByCpf = JSON.parse(JSON.stringify(data));
    qtyIncompleteOrdersByCpf = incompleteOrdersByCpf.list.length;
  } else {
    console.log("Não achou o cliente Incomplete Orders CPF!!!", cpf);
    qtyIncompleteOrdersByCpf = 0;
  }

  return qtyIncompleteOrdersByCpf;
}
