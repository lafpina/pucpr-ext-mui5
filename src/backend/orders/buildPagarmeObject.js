const pagarme = require("pagarme");

const buildPagarmeObject = async (vtexOrderId, vtexTid) => {
  let pagarmeObject = {
    cardHolder: " ",
    cardCountry: " ",
    cardInstallments: " ",
  };

  await pagarme.client
    .connect({ api_key: process.env.PAGARME_API_KEY })
    .then((client) => client.transactions.find({ id: vtexTid }))
    .then((transaction) => {
      pagarmeObject.cardHolder = transaction.card_holder_name;
      pagarmeObject.cardCountry = transaction.card.country;
      pagarmeObject.cardInstallments = transaction.installments;
    })
    .catch((e) => {
      console.log("Erro fetch Pagarme: ", vtexOrderId, vtexTid, e.TypeError);
      console.log(e)
    });
  return pagarmeObject;
};

export default buildPagarmeObject;
