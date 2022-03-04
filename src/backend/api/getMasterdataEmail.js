// Fetch VTEX API - GET MASTERDATA

async function getMasterdataEmail(url, options) {
  let vtexEmail = [];

  let res = await fetch(url, options);

  if (res.ok) {
    let data = await res.json();
    vtexEmail = JSON.parse(JSON.stringify(data));
    console.log('vtexEmail:', vtexEmail)
  } else {
    console.log('PROBLEMA AO OBTER EMAIL DO MASTERDATA!')
    vtexEmail = ''
  }
  return vtexEmail;
}

export default getMasterdataEmail;
