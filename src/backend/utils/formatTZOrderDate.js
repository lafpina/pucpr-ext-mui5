import moment from "moment-timezone";

function formaTZOrderDate(date) {
  // moment.tz.add([
  //   "America/Brazil|BRST BRT|20 30|01010101010101010101010|1BIq0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10",
  // ]);

  let dt = moment.tz(date, "America/Brazil").format("YYYY-MM-DD HH:mm");

  let newDt = moment(dt).subtract(180, "m");

  return newDt.format("DD-MM-YYYY HH:mm");
}

export default formaTZOrderDate;


