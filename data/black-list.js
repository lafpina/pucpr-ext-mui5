import titleCase from "../src/helper/utils/titleCase";
const BLACK_LIST = [
  {
    blackedName: "",
    blackedEmail: "marinasantoslemos30@gmail.com.br",
    blackedCPF: "",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription:
      "Monitorando apenas. Preciso identificar o uso do cupom",
    isBlackListed: true,
  },
  {
    blackedName: "Elisandra Barbosa",
    blackedEmail: "elisandra_ce@yahoo.com.br",
    blackedCPF: "32536201821",
    blackedPhone: "+5543984233191",
    blackedPostalCode: "86040-450",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription:
      "Cliente comprou, reclamou das parcelas e reportou como fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Naia Martins",
    blackedEmail: "naia_serena@hotmail.com",
    blackedCPF: "36139627800",
    blackedPhone: "+5562996808142",
    blackedPostalCode: "73770-000",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "Cliente com comportamento suspeito. Compra e cancela",
    isBlackListed: true,
  },
  {
    blackedName: "Debora Nack Cordeiro",
    blackedEmail: "deboranack_@hotmail.com",
    blackedCPF: "05358732985",
    blackedPhone: "+5547997103819",
    blackedPostalCode: "89480-000",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "Mastercard 522688****8941",
    blackedCardCountry: "",
    blackedDescription: "Cliente cancelou por não concordar em ser autenticada",
    isBlackListed: true,
  },
  {
    blackedName: "Roseli Simões",
    blackedEmail: "setecyber9@gmail.com",
    blackedCPF: "01740200900",
    blackedPhone: "+554199671718",
    blackedPostalCode: "84070-152",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "Visa 455183****0782",
    blackedCardCountry: "",
    blackedDescription: "Dado como Fraude pela Pagarme.",
    isBlackListed: true,
  },
  {
    blackedName: "Alexandra Basia Cogan De Barro",
    blackedEmail: "abc.debarros1@gmail.com",
    blackedCPF: "71710164123",
    blackedPhone: "+5561981128899",
    blackedPostalCode: "70344-060",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "American Express 379844****1005",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de Fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Felipe Barreto",
    blackedEmail: "feliperbarreto00@gmail.com",
    blackedCPF: "41728279852",
    blackedPhone: "+5517991843431",
    blackedPostalCode: "15025-035",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "Visa 498406****9890",
    blackedCardCountry: "",
    blackedDescription: "Fraude Confirmada",
    isBlackListed: true,
  },
  {
    blackedName: "Maria Eugenia",
    blackedEmail: "morenabala4421@gmail.com",
    blackedCPF: "48075350804",
    blackedPhone: "+5511952762209",
    blackedPostalCode: "08461-600",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "Mastercard 544570****7782",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de Fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Maria Eugenia",
    blackedEmail: "morenabala4421@gmail.com",
    blackedCPF: "48075350804",
    blackedPhone: "+5511952762209",
    blackedPostalCode: "08461-600",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "Visa 422200****3394",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de Fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Maria Eugenia",
    blackedEmail: "morenabala4421@gmail.com",
    blackedCPF: "48075350804",
    blackedPhone: "+5511952762209",
    blackedPostalCode: "08461-600",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "Visa 444458****2577",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de Fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Maria Eugenia",
    blackedEmail: "morenabala4421@gmail.com",
    blackedCPF: "48075350804",
    blackedPhone: "+5511952762209",
    blackedPostalCode: "08461-600",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "Mastercard 544731****9816",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de Fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Elivelton  Oliveira",
    blackedEmail: "zeniaraujoalbuquerquedasilva@gmail.com",
    blackedCPF: "40781205808",
    blackedPhone: "+5513996880863",
    blackedPostalCode: "36820-000",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "Mastercard 544731****8513",
    blackedCardCountry: "",
    blackedDescription: "Fraude Confirmada",
    isBlackListed: true,
  },
  {
    blackedName: "Ana paula Araujo",
    blackedEmail: "lilianahiguchi4@gmail.com",
    blackedCPF: "36125227871",
    blackedPhone: "+5513997283035",
    blackedPostalCode: "11347-210",
    blackedState: "",
    blackedCity: "São Vicente",
    blackedCreditCard: "Visa 422061****3810",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de Fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Ana paula Araujo",
    blackedEmail: "lilianahiguchi4@gmail.com",
    blackedCPF: "36125227871",
    blackedPhone: "+5513997283035",
    blackedPostalCode: "11347-210",
    blackedState: "",
    blackedCity: "São Vicente",
    blackedCreditCard: "Mastercard 530033****5364",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de Fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Ana paula Araujo",
    blackedEmail: "lilianahiguchi4@gmail.com",
    blackedCPF: "36125227871",
    blackedPhone: "+5513997283035",
    blackedPostalCode: "11347-210",
    blackedState: "",
    blackedCity: "São Vicente",
    blackedCreditCard: "Mastercard 550209****0230",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de Fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Célia Aparecida de oliveira",
    blackedEmail: "mhh1132000@gmail.com",
    blackedCPF: "01445921693",
    blackedPhone: "+5513996604516",
    blackedPostalCode: "11347-020",
    blackedState: "",
    blackedCity: "São Vicente",
    blackedCreditCard: "Mastercard 540105****1901",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de Fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Wellington Ferreira da silva",
    blackedEmail: "",
    blackedCPF: "",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "Mastercard 552937****9039",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de Fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Robinson De almeida",
    blackedEmail: "robisondealmeida2@gmail.com",
    blackedCPF: "02900132916",
    blackedPhone: "+5548999429718",
    blackedPostalCode: "89245-000",
    blackedState: "",
    blackedCity: "Araquari",
    blackedCreditCard: "Mastercard 545368****6455",
    blackedCardCountry: "Antigua And Barbuda",
    blackedDescription: "Suspeita de Fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Rute Ferreira da silva",
    blackedEmail: "silva1132000@gmail.com",
    blackedCPF: "19536281848",
    blackedPhone: "+5513996604516",
    blackedPostalCode: "11347-020",
    blackedState: "",
    blackedCity: "São Vicente",
    blackedCreditCard: "Visa 410863****5087",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de Fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Anísio Martins",
    blackedEmail: "tubaraolucca11@gmail.com",
    blackedCPF: "44194536649",
    blackedPhone: "+5513997098223",
    blackedPostalCode: "13407-450",
    blackedState: "",
    blackedCity: "São Vicente",
    blackedCreditCard: "Visa 403002****6089",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de Fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Wellington Ferreira da silva",
    blackedEmail: "wf1132000@gmail.com",
    blackedCPF: "07697022524",
    blackedPhone: "+5513996604516",
    blackedPostalCode: "11347-020",
    blackedState: "",
    blackedCity: "São Vicente",
    blackedCreditCard: "Elo 650487****5376",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de Fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Manasses Vieira",
    blackedEmail: "marlonbezerradecarvalhovieiram@gmail.com",
    blackedCPF: "12810476438",
    blackedPhone: "+5579998269941",
    blackedPostalCode: "58090-270",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "Mastercard 549167****1196",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de Fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Edeberto Nuss correa",
    blackedEmail: "dbertocorreanuss@hotmail.com",
    blackedCPF: "46931112791",
    blackedPhone: "+5594991236327",
    blackedPostalCode: "68390-000",
    blackedState: "PA",
    blackedCity: "",
    blackedCreditCard: "Mastercard 544915****8119",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de Fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Luana Silva Araujo",
    blackedEmail: "luadavi@hotmail.com",
    blackedCPF: "01783090529",
    blackedPhone: "+5571991234373",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "Pós-venda",
    isBlackListed: true,
  },
  {
    blackedName: "Adelcio Pereira da silva",
    blackedEmail: "adelciopereiradasilva4@gmail.com",
    blackedCPF: "13175564100",
    blackedPhone: "+5594991908363",
    blackedPostalCode: "68390-000",
    blackedState: "PA",
    blackedCity: "",
    blackedCreditCard: "Visa 477176****6294",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Adelcio Pereira da silva",
    blackedEmail: "adelciopereiradasilva4@gmail.com",
    blackedCPF: "13175564100",
    blackedPhone: "+5594991908363",
    blackedPostalCode: "68390-000",
    blackedState: "PA",
    blackedCity: "",
    blackedCreditCard: "Visa 464295****6269",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Luiz Antonio de Assunção Sousa",
    blackedEmail: "luizantoniodeassuncaosousa@gmail.com",
    blackedCPF: "36154300263",
    blackedPhone: "+5594992001452",
    blackedPostalCode: "68390-000",
    blackedState: "PA",
    blackedCity: "",
    blackedCreditCard: "Visa 421960****1904",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Rodrigo Avelino da Silva",
    blackedEmail: "rodrigoavelinodasilva33@gmail.com",
    blackedCPF: "00524732108",
    blackedPhone: "+5594991032218",
    blackedPostalCode: "68390-000",
    blackedState: "PA",
    blackedCity: "",
    blackedCreditCard: "Mastercard 536805****0942",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Roberto Tavares dos Santos Junior",
    blackedEmail: "robertojunior271@hotmail.com",
    blackedCPF: "98804081104",
    blackedPhone: "+5594991066230",
    blackedPostalCode: "68390-000",
    blackedState: "PA",
    blackedCity: "",
    blackedCreditCard: "Visa 490172****7375",
    blackedCardCountry: "",
    blackedDescription: "Suspeita de fraude",
    isBlackListed: true,
  },
  {
    blackedName: "Juliana Costa",
    blackedEmail: "junpereira@hotmail.com",
    blackedCPF: "33369154811",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "PROCON",
    isBlackListed: true,
  },
  {
    blackedName: "Mariana Santos Camara Gomes",
    blackedEmail: "marianascg@gmail.com",
    blackedCPF: "11886821720",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "",
    isBlackListed: true,
  },
  {
    blackedName: "Lindalbenes F Santos",
    blackedEmail: "lindalbenesferreira@yahoo.com",
    blackedCPF: "78321719287",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "",
    isBlackListed: true,
  },
  {
    blackedName: "Antonio Fabio Lima de Castro",
    blackedEmail: "antonofabiodcastro@gmail.com",
    blackedCPF: "02959023374",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "",
    isBlackListed: true,
  },
  {
    blackedName: "Elaine Viera de souza",
    blackedEmail: "meudia2402@gmail.com",
    blackedCPF: "99310112115",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "",
    isBlackListed: true,
  },
  {
    blackedName: "Milena Wachlevski",
    blackedEmail: "milenawm@yahoo.com",
    blackedCPF: "02594355976",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "",
    isBlackListed: true,
  },
  {
    blackedName: "Ana Celia Ferreira",
    blackedEmail: "anaceliaferreira1963@gmail.com",
    blackedCPF: "27835103249",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "",
    isBlackListed: true,
  },
  {
    blackedName: "Itatiani Antun",
    blackedEmail: "mafort1982@yahoo.com.br",
    cblackedCPF: "08902959724",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "",
    isBlackListed: true,
  },
  {
    blackedName: "Thayná Cavalcanti",
    blackedEmail: "thaynafariasfigueira@hotmail.com",
    blackedCPF: "11794121412",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "",
    isBlackListed: true,
  },
  {
    blackedName: "Patricia Sistherenn",
    blackedEmail: "patricia_sistherenn@hotmail.com",
    blackedCPF: "60008745374",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "",
    isBlackListed: true,
  },
  {
    blackedName: "Milena Monteiro",
    blackedEmail: "milenamonteiro1@hotmail.com",
    blackedCPF: "04362984577",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "",
    isBlackListed: true,
  },
  {
    blackedName: "Sandra Paiva",
    blackedEmail: "adrianafachinii4@gmail.com",
    blackedCPF: "004787824899",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "",
    isBlackListed: true,
  },
  {
    blackedName: "Fabio Leme",
    blackedEmail: "leme@ymail.com",
    cblackedCPF: "033915381802",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "",
    bisBlackListed: true,
  },
  {
    blackedName: "Gustavo Santos Silva",
    blackedEmail: "gustavossesportes@gmail.com",
    blackedCPF: "06124988674",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "",
    isBlackListed: true,
  },
  {
    blackedName: "Thainá Silveira",
    blackedEmail: "thai.mnhos@gmail.com",
    blackedCPF: "15455482777",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "",
    bisBlackListed: true,
  },
  {
    blackedName: "	Giovane Gonçalves Silva",
    blackedEmail: "giovanesilva2800@gmail.com",
    blackedCPF: "06080254611",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "",
    isBlackListed: true,
  },
  {
    blackedName: "1) Alice Melo - 2) Elisa Azevedo",
    blackedEmail: "elisagran@gmail.com",
    blackedCPF: "12968714791",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "",
    isBlackListed: true,
  },
  {
    blackedName: "Vanessa Abdala",
    blackedEmail: "vnabdala@gmail.com",
    blackedCPF: "29715961843",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "",
    isBlackListed: true,
  },
  {
    blackedName: "Francisca Melo",
    blackedEmail: "jeane@cidadeverde.com",
    blackedCPF: "55175627368",
    blackedPhone: "",
    blackedPostalCode: "",
    blackedState: "",
    blackedCity: "",
    blackedCreditCard: "",
    blackedCardCountry: "",
    blackedDescription: "",
    isBlackListed: true,
  },
];

export function isBlackListed(
  parmEmail,
  parmCPF,
  parmCEP,
  parmPhone,
  parmCard,
  parmState,
  parmCity,
  parmCardCountry
) {
  const cardCountry = titleCase(parmCardCountry);

  let isBlackedEmail = BLACK_LIST.find(
    (bl) => bl.blackedEmail == parmEmail && bl.isBlackListed
  );
  let isBlackedCPF = BLACK_LIST.find(
    (bl) => bl.blackedCPF == parmCPF && bl.isBlackListed
  );
  let isBlackedCEP = BLACK_LIST.find(
    (bl) => bl.blackedPostalCode == parmCEP && bl.isBlackListed
  );
  let isBlackedPhone = BLACK_LIST.find(
    (bl) => bl.blackedPhone == parmPhone && bl.isBlackListed
  );
  let isBlackedCard = BLACK_LIST.find(
    (bl) => bl.blackedCreditCard == parmCard && bl.isBlackListed
  );
  let isBlackedState = BLACK_LIST.find(
    (bl) => bl.blackedState == parmState && bl.isBlackListed
  );
  let isBlackedCity = BLACK_LIST.find(
    (bl) => bl.blackedCity == parmCity && parmCity > " " && bl.isBlackListed
  );
  let isBlackedCardCountry = BLACK_LIST.find(
    (bl) =>
      bl.blackedCardCountry == cardCountry &&
      cardCountry > " " &&
      bl.isBlackListed
  );

  let isBlacked = false;
  let blackListProfile = {
    isEmail: false,
    isCPF: false,
    isCEP: false,
    isPhone: false,
    isCard: false,
    isState: false,
    isCity: false,
    isCardCountry: false,
  };

  if (isBlackedEmail) {
    blackListProfile.isEmail = true;
    isBlacked = true;
  }
  if (isBlackedCPF) {
    blackListProfile.isCPF = true;
    isBlacked = true;
  }
  if (isBlackedCEP) {
    blackListProfile.isCEP = true;
    isBlacked = true;
  }
  if (isBlackedPhone) {
    blackListProfile.isPhone = true;
    isBlacked = true;
  }
  if (isBlackedCard) {
    blackListProfile.isCard = true;
    isBlacked = true;
  }
  if (isBlackedState) {
    blackListProfile.isState = true;
    isBlacked = true;
  }
  if (isBlackedCity) {
    blackListProfile.isCity = true;
    isBlacked = true;
  }
  if (isBlackedCardCountry) {
    blackListProfile.isCardCountry = true;
    isBlacked = true;
  }

  let blackedResult = {
    isBlacked: isBlacked,
    profile: blackListProfile,
  };

  return blackedResult;
}

export function getAllBlackListSet() {
  return BLACK_LIST.filter((email) => isBlackListed);
}

export function getAllBlackList() {
  return BLACK_LIST;
}

// export function getFilteredOrders(dateFilter) {
//   const { year, month } = dateFilter;

//   let filteredOrders = DUMMY_ORDER_LIST.filter((order) => {
//     const orderDate = new Date(order.date);
//     return (
//       orderDate.getFullYear() === year && orderDate.getMonth() === month - 1
//     );
//   });

//   return filteredOrders;
// }
