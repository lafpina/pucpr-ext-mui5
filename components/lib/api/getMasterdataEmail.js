// Fetch VTEX API - GET MASTERDATA

async function getMasterdataEmail(url, options) {
  let vtexEmail = [];

  let res = await fetch(url, options);

  if (res.ok) {
    let data = await res.json();
    vtexEmail = JSON.parse(JSON.stringify(data));
  }
  return vtexEmail;
}

export default getMasterdataEmail;
