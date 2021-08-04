import getOption from "./getOption";
import getURL from "./getURL";

export async function getIncompleteOrdersByCpf(cpf) {
  let totalIncompleteOrdersByCpf = 0;
  let qtyIncompleteOrdersByCpf = 0;

  let options = getOption("order");
  let url = getURL("incompleteOrdersByCpf", cpf);

  console.log(cpf);
  console.log(url);

  // const url_encoded = encodeURI(url);

  let res = await fetch(url, options);

  if (res.ok) {
    const data = await res.json();
    const incompleteOrdersByCpf = JSON.parse(JSON.stringify(data));

    totalIncompleteOrdersByCpf = incompleteOrdersByCpf.list.length;

    for (let i = 0; i < totalIncompleteOrdersByCpf; ++i) {
      qtyIncompleteOrdersByCpf += 1;
      console.log("------------------------------------");
      console.log("CPF: ", cpf);
      console.log(incompleteOrdersByCpf.list[i].clientName);
      console.log("Tentativa: ", qtyIncompleteOrdersByCpf);
      console.log("Posição: ", i + 1);
      console.log("------------------------------------");
      console.log(incompleteOrdersByCpf.list[i].orderId);
      console.log(incompleteOrdersByCpf.list[i].creationDate);
      console.log(incompleteOrdersByCpf.list[i].paymentNames);
      console.log(incompleteOrdersByCpf.list[i].totalItems);
      console.log(incompleteOrdersByCpf.list[i].totalValue);
      console.log("------------------------------------");
    }
  } else {
    console.log("Não achou o cliente Incomplete Orders CPF!!!", cpf);
    qtyIncompleteOrdersByCpf = 0;
  }

  return qtyIncompleteOrdersByCpf;
}
