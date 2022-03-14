function getOption(fetchTarget) {
  const parmMethod = "GET";
  const parmAccept = "application/json";
  const parmContentType = "application/json";

  // const startDate = "2021-07-17";
  // const endDate = "2021-07-17";
  // const fCreateDate = `creationDate%3A%5B${startDate}T02%3A00%3A00.000Z%20TO%20${endDate}T01%3A59%3A59.999Z%5D`;

  switch (fetchTarget) {
    case "feed":
      return {
        method: parmMethod,
        qs: { maxlot: "10" },
        // qs: {
        //   f_creationDate: fCreateDate,
        // },ß
        headers: {
          Accept: parmAccept,
          "Content-Type": parmContentType,
          "X-VTEX-API-AppKey": process.env.VTEX_API_KEY,
          "X-VTEX-API-AppToken": process.env.VTEX_API_TOKENID,
        },
      };
      break;
    case "order":
      return {
        method: parmMethod,
        // qs: {
        //   f_creationDate: fCreateDate,
        // },
        headers: {
          Accept: parmAccept,
          "Content-Type": parmContentType,
          "X-VTEX-API-AppKey": process.env.VTEX_API_KEY,
          "X-VTEX-API-AppToken": process.env.VTEX_API_TOKENID,
        },
      };
      break;
    case "masterdata":
      return {
        method: parmMethod,
        headers: {
          Accept: "application/vnd.vtex.ds.v10+json",
          "Content-Type": parmContentType,
          "X-VTEX-API-AppKey": process.env.VTEX_API_KEY,
          "X-VTEX-API-AppToken": process.env.VTEX_API_TOKENID,
        },
      };
      break;
  }
}

export default getOption;
