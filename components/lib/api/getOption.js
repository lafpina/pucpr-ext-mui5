function getOption(fetchTarget) {
  const parmMethod = "GET";
  const parmAccept = "application/json";
  const parmContentType = "application/json";
  const parmAppKey = "vtexappkey-fraldasdipano-JUXTLA";
  const parmAppToken =
    "VFFOSPADLSGIHYANORZFQBOHUPFVTHNPMGFKEORFVRQRQXIRUCHYNXQTQXUCJEKEFRVBTQIZZTJYLWRWGOBQAPBPPLTGTPWQGLMYBHXDUHYUNRHUFXVVDUEQPGLIXBGK";

  switch (fetchTarget) {
    case "feed":
      return {
        method: parmMethod,
        qs: { maxlot: "10" },
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
        headers: {
          Accept: parmAccept,
          "Content-Type": parmContentType,
          "X-VTEX-API-AppKey": parmAppKey,
          "X-VTEX-API-AppToken": parmAppToken,
        },
      };
      break;
  }
}

export default getOption;
