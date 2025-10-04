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

};

export default convertTimezone;
