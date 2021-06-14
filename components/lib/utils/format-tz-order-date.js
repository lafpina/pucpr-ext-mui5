import moment from "moment-timezone";

function formaTZOrderDate(date) {
  let dt = moment.tz(date, "America/Brazil").format("YYYY-MM-DD HH:mm");
  let tz = moment(dt).tz("America/Brazil").format("Z");
  let newDt = moment(dt).subtract(180, "m");
  return newDt.format("DD-MM-YYYY HH:mm");
}

export default formaTZOrderDate;
