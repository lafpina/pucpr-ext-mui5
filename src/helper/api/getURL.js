function getURL(fetchTarget, filter) {
  const parmEnv = "vtexcommercestable";
  const parmAcc = "fraldasdipano";
  const parmPerPage = 50;
  const page = 1;

  // Os parâmetros abaixo estão corretos mas não retorna a lista
  // const startDate = "2021-07-17";
  // const endDate = "2021-07-17";
  // const fCreateDate = `creationDate%3A%5B${startDate}T02%3A00%3A00.000Z%20TO%20${endDate}T01%3A59%3A59.999Z%5D`;

  switch (fetchTarget) {
    case "feed":
      return `https://${parmAcc}.${parmEnv}.com.br/api/orders/feed`;

    case "order": // Retrieve order by orderId
      return `https://${parmAcc}.${parmEnv}.com.br/api/oms/pvt/orders/${filter}`;

    case "query": // Retrieve order by email or CPF
      return `https://${parmAcc}.${parmEnv}.com.br/api/oms/pvt/orders?q=${filter}`;

    case "list":
      // Não retorna a lista por alguma razão. Ivestigar.
      // return `https://${parmAcc}.${parmEnv}.com.br/api/oms/pvt/orders?f_creationDate=${fCreateDate}`;

      return `https://${parmAcc}.${parmEnv}.com.br/api/oms/pvt/orders?orderBy=orderId,desc&per_page=${parmPerPage}&page=${page}`;

    case "incompleteOrders":
      return `https://${parmAcc}.${parmEnv}.com.br/api/oms/pvt/orders?incompleteOrders=${filter}&per_page=100&page=1`;

    case "masterdata":
      return `http://api.vtexcrm.com.br/fraldasdipano/dataentities/CL/search/?userId=${filter}&_fields=email`;

    case "IOCPF":
      return `https://${parmAcc}.${parmEnv}.com.br/api/oms/pvt/orders?incompleteOrders=true&q=${filter}`;
  }
}

export default getURL;
