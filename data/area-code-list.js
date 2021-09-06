const AREA_CODE_LIST = [
  {
    areaCode: "11",
    state: "SP",
  },
  {
    areaCode: "12",
    state: "SP",
  },
  {
    areaCode: "13",
    state: "SP",
  },
  {
    areaCode: "14",
    state: "SP",
  },
  {
    areaCode: "15",
    state: "SP",
  },
  {
    areaCode: "16",
    state: "SP",
  },
  {
    areaCode: "17",
    state: "SP",
  },
  {
    areaCode: "18",
    state: "SP",
  },
  {
    areaCode: "19",
    state: "SP",
  },
  {
    areaCode: "21",
    state: "RJ",
  },
  {
    areaCode: "22",
    state: "RJ",
  },
  {
    areaCode: "24",
    state: "RJ",
  },
  {
    areaCode: "27",
    state: "ES",
  },
  {
    areaCode: "28",
    state: "RJ",
  },
  {
    areaCode: "31",
    state: "MG",
  },
  {
    areaCode: "32",
    state: "MG",
  },
  {
    areaCode: "33",
    state: "MG",
  },
  {
    areaCode: "34",
    state: "MG",
  },
  {
    areaCode: "35",
    state: "MG",
  },
  {
    areaCode: "37",
    state: "MG",
  },
  {
    areaCode: "38",
    state: "MG",
  },
  {
    areaCode: "41",
    state: "PR",
  },
  {
    areaCode: "42",
    state: "PR",
  },
  {
    areaCode: "43",
    state: "PR",
  },
  {
    areaCode: "44",
    state: "PR",
  },
  {
    areaCode: "45",
    state: "PR",
  },
  {
    areaCode: "46",
    state: "PR",
  },
  {
    areaCode: "47",
    state: "SC",
  },
  {
    areaCode: "48",
    state: "SC",
  },
  {
    areaCode: "49",
    state: "SC",
  },
  {
    areaCode: "51",
    state: "RS",
  },
  {
    areaCode: "53",
    state: "RS",
  },
  {
    areaCode: "54",
    state: "RS",
  },
  {
    areaCode: "55",
    state: "RS",
  },
  {
    areaCode: "61",
    state: "DF",
  },
  {
    areaCode: "62",
    state: "GO",
  },
  {
    areaCode: "63",
    state: "TO",
  },
  {
    areaCode: "64",
    state: "GO",
  },
  {
    areaCode: "65",
    state: "MT",
  },
  {
    areaCode: "66",
    state: "MT",
  },
  {
    areaCode: "67",
    state: "MS",
  },
  {
    areaCode: "68",
    state: "AC",
  },
  {
    areaCode: "69",
    state: "RO",
  },
  {
    areaCode: "71",
    state: "BA",
  },
  {
    areaCode: "73",
    state: "BA",
  },
  {
    areaCode: "74",
    state: "BA",
  },
  {
    areaCode: "75",
    state: "BA",
  },
  {
    areaCode: "77",
    state: "BA",
  },
  {
    areaCode: "79",
    state: "SE",
  },
  {
    areaCode: "81",
    state: "PE",
  },
  {
    areaCode: "82",
    state: "AL",
  },
  {
    areaCode: "83",
    state: "PB",
  },
  {
    areaCode: "84",
    state: "RN",
  },
  {
    areaCode: "85",
    state: "CE",
  },
  {
    areaCode: "86",
    state: "PI",
  },
  {
    areaCode: "87",
    state: "PE",
  },
  {
    areaCode: "88",
    state: "CE",
  },
  {
    areaCode: "89",
    state: "PI",
  },
  {
    areaCode: "91",
    state: "PA",
  },
  {
    areaCode: "92",
    state: "AM",
  },
  {
    areaCode: "93",
    state: "PA",
  },
  {
    areaCode: "94",
    state: "PA",
  },
  {
    areaCode: "95",
    state: "RR",
  },
  {
    areaCode: "96",
    state: "AP",
  },
  {
    areaCode: "97",
    state: "AM",
  },
  {
    areaCode: "98",
    state: "MA",
  },
  {
    areaCode: "99",
    state: "MA",
  },
];

export function isPhoneAreaCodeOk(areaCodeParm, stateParm) {
  let areaCodeReg = AREA_CODE_LIST.find((ddd) => ddd.areaCode == areaCodeParm);

  if (areaCodeReg.state === stateParm) return true;

  return false;
}
