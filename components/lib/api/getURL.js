function getURL(fetchTarget, filter) {
  switch (fetchTarget) {
    case "feed":
      return "https://fraldasdipano.vtexcommercestable.com.br/api/orders/feed";

    case "order":
      return `https://fraldasdipano.vtexcommercestable.com.br/api/oms/pvt/orders/${filter}`;

    case "list":
      return "https://fraldasdipano.vtexcommercestable.com.br/api/oms/pvt/orders?orderBy=orderId,desc&per_page=30&page=1";
  }
}

export default getURL;
