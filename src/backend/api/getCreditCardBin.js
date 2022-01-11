export async function getCreditCardBin(bin) {
  const url = `https://api.freebinchecker.com/bin/${bin}`;

  const data = await fetch(url);

  let binData = null;

  console.log(data.status);

  if (data.status == 200) {
    // const binData = await data.json();
    // console.log(res);
    // binData = JSON.parse(JSON.stringify(data));
    // console.log(binData);

    console.log(data);
    // console.log(data.card.bin);

    // console.log(binData.card.bin);
    // console.log(binData.card.scheme);
    // console.log(binData.issuer.name);
    // console.log(binData.country.name);
  }

  //   {
  //     "valid": true,
  //     "card": {
  //       "bin": "370245",
  //       "scheme": "AMEX",
  //       "type": "credit",
  //       "category": "STANDARD"
  //     },
  //     "issuer": {
  //       "name": "BANESCO BANCO UNIVERSAL S.A.",
  //       "url": "www.banesco.com",
  //       "tel": "+58 212 501 11 11"
  //     },
  //     "country": {
  //       "name": "United States",
  //       "numeric code": "840",
  //       "alpha 2 code": "US",
  //       "latitude": "37.09024",
  //       "longitude": "-95.712891",
  //       "currency": "USD",
  //       "currency name": "United States dollar"
  //     }
  //   }

  return binData;
}

export default getCreditCardBin;
