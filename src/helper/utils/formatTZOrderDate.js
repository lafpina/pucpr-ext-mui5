import moment from "moment-timezone";
// import moment from "moment-timezone-with-data.js"

let dateTZ = {
  compact: null,
  full: null,
};

function formaTZOrderDate(date) {
  let dt = moment.tz(date, "America/Brazil").format("YYYY-MM-DD HH:mm");

  let newDt = moment(dt).subtract(180, "m");

  // dateTZ.full = newDt;
  // dateTZ.compact = newDt.format("DD-MM-YYYY HH:mm");

  // return dateTZ;

  return newDt.format("DD-MM-YYYY HH:mm");
}

export default formaTZOrderDate;
