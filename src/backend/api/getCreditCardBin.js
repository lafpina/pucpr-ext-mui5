export async function getCreditCardBin(bin) {
  const url = `https://api.freebinchecker.com/bin/${bin}`;

  const data = await fetch(url);

  let binData = null;

  console.log(data.status);

  if (data.status == 200) {

    console.log(data);

  }

  return binData;
}

export default getCreditCardBin;
