function getURL(fetchTarget, filter) {
  switch (fetchTarget) {
    case "feed":
      return "https://fraldasdipano.vtexcommercestable.com.br/api/orders/feed";

    case "order":
      return `https://fraldasdipano.vtexcommercestable.com.br/api/oms/pvt/orders/${filter}`;

    case "email":
      return `https://fraldasdipano.vtexcommercestable.com.br/api/oms/pvt/orders?q=${filter}`;

    case "list":
      return "https://fraldasdipano.vtexcommercestable.com.br/api/oms/pvt/orders?orderBy=orderId,desc&per_page=30&page=1";

    case "incompleteOrders":
      return `https://fraldasdipano.vtexcommercestable.com.br/api/oms/pvt/orders?incompleteOrders=${filter}`;

    case "masterdata":
      return `http://api.vtexcrm.com.br/fraldasdipano/dataentities/CL/search/?userId=${filter}&_fields=email`;
  }
}

export default getURL;
