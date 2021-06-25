import moment from "moment-timezone";
// import moment from "moment-timezone-with-data.js"

function formaTZOrderDate(date) {

  let dt = moment.tz(date, "America/Brazil").format("YYYY-MM-DD HH:mm");
  
  let newDt = moment(dt).subtract(180, "m");
  return newDt.format("DD-MM-YYYY HH:mm");
}

export default formaTZOrderDate;







