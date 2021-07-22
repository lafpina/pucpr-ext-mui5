const setCurrency = (valor) =>
  (parseInt(valor) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default setCurrency;
