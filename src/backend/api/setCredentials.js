const setCredentials = () => {
  // URL PARMS
  const accountName = "";
  const environment = "vtexcommercestable";
  const filter = "orders";
  // OPTIONS PARMS
  const fCreateDate =
    "creationDate%3A%5B2016-01-01T02%3A00%3A00.000Z%20TO%202021-01-01T01%3A59%3A59.999Z%5D";
  const accept = "application/json";
  const contentType = "application/json; charset=utf-8";

  const useAlerteMeAccess = false;

  // SET ACCESS CREDENTIALS USED BY GIFT LIST AS DEFAULT
  let appKey = "";
  let appToken =
    "";

  if (useAlerteMeAccess) {
    // SET ACCESS CREDENTIALS CREATED SPECIFICALLY FOR ALERTEMEJS
    appKey = "";
    appToken =
      "";
  }

  // DEFINE URL TO FETCH LIST ORDERS WITH FILTER PARMS
  const url = `https://${accountName}.${environment}.com.br/api/oms/pvt/${filter}`;

  // DEFINE OPTIONS ACCORDING TO API

  const options = {
    method: "GET",
    qs: {
      f_creationDate: fCreateDate,
    },
    headers: {
      Accept: accept,
      "Content-Type": contentType,
      "X-VTEX-API-AppKey": appKey,
      "X-VTEX-API-AppToken": appToken,
    },
  };
};

export default setCredentials;
