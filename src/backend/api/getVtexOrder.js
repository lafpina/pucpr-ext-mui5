// Fetch VTEX API - GET ORDER

async function getVtexOrder(url, options) {
  let order = [];


  let res = await fetch(url, options);

  if (res.ok) {

    let data = await res.json();
    order = JSON.parse(JSON.stringify(data));
  } else {
    console.log(`Não foi encontrado registro para a URL ${url}`);
    console.log(res);
  }
  return order;
}

export default getVtexOrder;
