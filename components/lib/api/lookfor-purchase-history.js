export async function lookForPurchaseHistory(clientEmail) {
  let qtyPurchase = 0;

  const options3 = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-VTEX-API-AppKey": "vtexappkey-fraldasdipano-JUXTLA",
      "X-VTEX-API-AppToken":
        "VFFOSPADLSGIHYANORZFQBOHUPFVTHNPMGFKEORFVRQRQXIRUCHYNXQTQXUCJEKEFRVBTQIZZTJYLWRWGOBQAPBPPLTGTPWQGLMYBHXDUHYUNRHUFXVVDUEQPGLIXBGK",
    },
  };

  let res3 = await fetch(
    `https://fraldasdipano.vtexcommercestable.com.br/api/oms/pvt/orders?q=${clientEmail}`,
    options3
  );

  if (res3.ok) {
    const data3 = await res3.json();
    const clientOrders = JSON.parse(JSON.stringify(data3));
    qtyPurchase = clientOrders.list.length;
  } else {
    qtyPurchase = 0;
  }

  return qtyPurchase;
}
