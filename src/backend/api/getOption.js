function getOption(fetchTarget) {
  const parmMethod = "GET";
  const parmAccept = "application/json";
  const parmContentType = "application/json";

  // const startDate = "2021-07-17";
  // const endDate = "2021-07-17";
  // const fCreateDate = `creationDate%3A%5B${startDate}T02%3A00%3A00.000Z%20TO%20${endDate}T01%3A59%3A59.999Z%5D`;

  const parmAppKey = "vtexappkey-fraldasdipano-JUXTLA";
  const parmAppToken =
    "VFFOSPADLSGIHYANORZFQBOHUPFVTHNPMGFKEORFVRQRQXIRUCHYNXQTQXUCJEKEFRVBTQIZZTJYLWRWGOBQAPBPPLTGTPWQGLMYBHXDUHYUNRHUFXVVDUEQPGLIXBGK";

  switch (fetchTarget) {
    case "feed":
      return {
        method: parmMethod,
        qs: { maxlot: "10" },
        // qs: {
        //   f_creationDate: fCreateDate,
        // },
        headers: {
          Accept: parmAccept,
          "Content-Type": parmContentType,
          "X-VTEX-API-AppKey": parmAppKey,
          "X-VTEX-API-AppToken": parmAppToken,
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
          "X-VTEX-API-AppKey": parmAppKey,
          "X-VTEX-API-AppToken": parmAppToken,
        },
      };
      break;
    case "masterdata":
      return {
        method: parmMethod,
        headers: {
          Accept: "application/vnd.vtex.ds.v10+json",
          "Content-Type": parmContentType,
          "X-VTEX-API-AppKey": parmAppKey,
          "X-VTEX-API-AppToken": parmAppToken,
        },
      };
      break;
  }
}

export default getOption;
