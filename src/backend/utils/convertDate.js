export const convertDate = (date) => {
  // ex date: "DD-MM-AAAA HH:mm"

  // Precisamos quebrar a string para retornar cada parte
  const dataSplit = date.split("-");
  const day = dataSplit[0]; // DD
  const month = dataSplit[1]; // MM
  const year = dataSplit[2]; // AAAA

  // const data = new Date(year, month - 1, day);

  // Retorna o objeto Date, lembrando que o mês começa em 0, então fazemos -1.
  return new Date(year, month - 1, day);
};
