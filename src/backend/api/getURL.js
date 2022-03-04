import moment from "moment";

function getURL(fetchTarget, filter) {
  const parmEnv = "vtexcommercestable";
  const parmAcc = "fraldasdipano";
  const parmPerPage = 8;
  const page = 1;

  switch (fetchTarget) {
    case "feed":
      return `https://${parmAcc}.${parmEnv}.com.br/api/orders/feed`;

    case "order": // Retrieve order by orderId
      return `https://${parmAcc}.${parmEnv}.com.br/api/oms/pvt/orders/${filter}`;

    case "query": // Retrieve order by email or CPF
      return `https://${parmAcc}.${parmEnv}.com.br/api/oms/pvt/orders?q=${filter}`;

    case "list":
      return `https://${parmAcc}.${parmEnv}.com.br/api/oms/pvt/orders?orderBy=orderId,desc&per_page=${parmPerPage}&page=${page}`;

    case "incompleteOrders":
      return `https://${parmAcc}.${parmEnv}.com.br/api/oms/pvt/orders?incompleteOrders=${filter}&per_page=100&page=1`;

    case "masterdata":
      return `http://api.vtexcrm.com.br/fraldasdipano/dataentities/CL/search/?userId=${filter}&_fields=email`;

    case "IOCPF":
      return `https://${parmAcc}.${parmEnv}.com.br/api/oms/pvt/orders?incompleteOrders=true&q=${filter}`;

    case "ListOrders1Day":
      const startDate = moment().format('YYYY-MM-DD')
      const endDate = moment().add(1, 'days').format('YYYY-MM-DD')
      const encodedUrl = `f_creationDate=creationDate:%5B${startDate}T03:00:00.000Z%20TO%20${endDate}T02:59:59.999Z%5D&orderBy=creationDate,desc`

      return `https://${parmAcc}.${parmEnv}.com.br/api/oms/pvt/orders?${encodedUrl}&per_page=100&page=1`

    // return `https://${parmAcc}.${parmEnv}.com.br/api/oms/pvt/orders?utc=+0300?f_creationDate=creationDate%3A%5B${startDate}T02%3A00%3A00.000Z%20TO%20${endDate}T01%3A59%3A59.999Z%5D&f_hasInputInvoice=false`

    case "ListOrdersByRangeDate":
      return `https://${parmAcc}.${parmEnv}.com.br/api/oms/pvt/orders?${filter}&per_page=100&page=1`
  }
}

export default getURL;
