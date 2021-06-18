const BLACK_LIST = [
  {
    blackedEmail: "lindalbenesferreira@yahoo.com",
    blackedCPF: "78321719287",
    blackedName: "Lindalbenes F Santos",
    isBlackListed: true,
  },
  {
    blackedEmail: "antonofabiodcastro@gmail.com",
    blackedCPF: "02959023374",
    blackedName: "Antonio Fabio Lima de Castro",
    isBlackListed: true,
  },
  {
    blackedEmail: "meudia2402@gmail.com",
    blackedCPF: "99310112115",
    blackedName: "Elaine Viera de souza",
    isBlackListed: true,
  },
  {
    blackedEmail: "milenawm@yahoo.com",
    blackedCPF: "02594355976",
    blackedName: "Milena Wachlevski",
    isBlackListed: true,
  },
  {
    blackedEmail: "anaceliaferreira1963@gmail.com",
    blackedCPF: "27835103249",
    blackedName: "Ana Celia Ferreira",
    isBlackListed: true,
  },
  {
    blackedEmail: "mafort1982@yahoo.com.br",
    cblackedCPF: "08902959724",
    blackedName: "Itatiani Antun",
    isBlackListed: true,
  },
  {
    blackedEmail: "thaynafariasfigueira@hotmail.com",
    blackedCPF: "11794121412",
    blackedName: "Thayná Cavalcanti",
    isBlackListed: true,
  },
  {
    blackedEmail: "patricia_sistherenn@hotmail.com",
    blackedCPF: "60008745374",
    blackedName: "Patricia Sistherenn",
    isBlackListed: true,
  },
  {
    blackedEmail: "milenamonteiro1@hotmail.com",
    blackedCPF: "04362984577",
    blackedName: "Milena Monteiro",
    isBlackListed: true,
  },
  {
    blackedEmail: "adrianafachinii4@gmail.com",
    blackedCPF: "004787824899",
    blackedName: "Sandra Paiva",
    isBlackListed: true,
  },
  {
    blackedEmail: "leme@ymail.com",
    cblackedCPF: "033915381802",
    blackedName: "Fabio Leme",
    bisBlackListed: true,
  },
  {
    blackedEmail: "gustavossesportes@gmail.com",
    blackedCPF: "06124988674",
    blackedName: "Gustavo Santos Silva",
    isBlackListed: true,
  },
  {
    blackedEmail: "thai.mnhos@gmail.com",
    blackedCPF: "15455482777",
    blackedName: "Thainá Silveira",
    bisBlackListed: true,
  },
  {
    blackedEmail: "giovanesilva2800@gmail.com",
    blackedCPF: "06080254611",
    blackedName: "	Giovane Gonçalves Silva",
    isBlackListed: true,
  },
  {
    blackedEmail: "elisagran@gmail.com",
    blackedCPF: "12968714791",
    blackedName: "1) Alice Melo - 2) Elisa Azevedo",
    isBlackListed: true,
  },
  {
    blackedEmail: "vnabdala@gmail.com",
    blackedCPF: "29715961843",
    blackedName: "Vanessa Abdala",
    isBlackListed: true,
  },
  {
    blackedEmail: "jeane@cidadeverde.com",
    blackedCPF: "55175627368",
    blackedName: "Francisca Melo",
    isBlackListed: true,
  },
];

export function isBlackListed(parmEmail, parmCPF) {
  let blackedParm = false;

  if (parmEmail > " ") {
    blackedParm = BLACK_LIST.find(
      (bl) => bl.blackedEmail == parmEmail && bl.isBlackListed
    );
  }
  blackedParm = BLACK_LIST.find(
    (bl) => bl.blackedCPF == parmCPF && bl.isBlackListed
  );
  return blackedParm;
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
