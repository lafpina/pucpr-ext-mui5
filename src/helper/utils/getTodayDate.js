const getTodayDate = (parm) => {
  const dayName = [
    "domingo",
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado",
  ];
  const monName = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "Maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  const now = new Date();

  switch (parm) {
    case 4: //? segunda, 01 de janeiro de 2021
      return (
        dayName[now.getDay()] +
        ", " +
        now.getDate() +
        " de " +
        monName[now.getMonth()] +
        " de " +
        now.getFullYear()
      );
      break;
    case 3: //? segunda, 01 de janeiro
      return (
        dayName[now.getDay()] +
        ", " +
        now.getDate() +
        " de " +
        monName[now.getMonth()]
      );
      break;
    case 2: //? 01 de Janeiro
      return now.getDate() + " de " + monName[now.getMonth()];
      break;
    case 1: //? segunda
      return dayName[now.getDay()];
      break;
    default:
      return now.getDate() + " de " + monName[now.getMonth()];
  }
};

export default getTodayDate;
