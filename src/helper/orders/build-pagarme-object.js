const pagarme = require("pagarme");

const buildPagarmeObject = async (vtexOrderId, vtexTID) => {
  let pagarmeObject = {
    cardHolder: " ",
    cardCountry: " ",
    cardInstallments: " ",
  };

  await pagarme.client
    .connect({ api_key: "ak_live_i3JdusnggPsU1ymvogfoOfmmkvGfMM" })
    .then((client) => client.transactions.find({ id: vtexTID }))
    .then((transaction) => {
      pagarmeObject.cardHolder = transaction.card_holder_name;
      pagarmeObject.cardCountry = transaction.card.country;
      pagarmeObject.cardInstallments = transaction.installments;
    })
    .catch((e) => {
      console.log("Erro fetch Pagarme: ", vtexOrderId, vtexTID, e.TypeError);
    });
  return pagarmeObject;
};

export default buildPagarmeObject;
