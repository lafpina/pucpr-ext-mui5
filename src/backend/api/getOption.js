function getOption(fetchTarget) {
  const parmMethod = "GET";
  const parmAccept = "application/json";
  const parmContentType = "application/json";

  switch (fetchTarget) {
    case "feed":
      return {
        method: parmMethod,
        qs: { maxlot: "10" },

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
