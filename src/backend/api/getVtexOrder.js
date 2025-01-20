// Fetch VTEX API - GET ORDER

async function getVtexOrder(url, options) {
  let order = [];

  //console.log("Passo 1 - Fetching Get Order....");

  let res = await fetch(url, options);

  if (res.ok) {
    //console.log("Passo 2 - Fetch OK");
    let data = await res.json();
    order = JSON.parse(JSON.stringify(data));
  } else {
    console.log(`Não foi encontrado registro para a URL ${url}`);
    console.log(res);
  }
  return order;
}

export default getVtexOrder;
