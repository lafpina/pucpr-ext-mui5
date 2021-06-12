const convertTimezone = (dateTime, timezone) => {
  // 01234567890123456789012345678901
  // 2019-01-28T20:09:43.899958+00:00
  // 12345678901234567890123456789012

  var date = new Date(
    dateTime.slice(0, 4), // ano
    dateTime.slice(5, 7), // mês
    dateTime.slice(6, 8), // dia
    dateTime.slice(11, 13), // hora
    dateTime.slice(17, 19) // minuto
  );

  dateConverted = date - timezone;

  return dateConverted;

  //   var dtPartida = "20170620 11:20";
  //   var dtChegada = "20170620 16:40";

  //   var date1 = new Date(
  //       dtPartida.slice(0, 4),
  //       dtPartida.slice(4, 6),
  //       dtPartida.slice(6, 8),
  //       dtPartida.slice(9, 11),
  //       dtPartida.slice(12, 14)
  //     ),
  //     date2 = new Date(
  //       dtChegada.slice(0, 4),
  //       dtChegada.slice(4, 6),
  //       dtChegada.slice(6, 8),
  //       dtChegada.slice(9, 11),
  //       dtChegada.slice(12, 14)
  //     );

  //   var diffMs = date2 - date1;
  //   var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
  //   var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
  //   var diff = diffHrs + "h " + diffMins + "m";
  //   console.log(diff);
};

export default convertTimezone;
