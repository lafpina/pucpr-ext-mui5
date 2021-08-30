const WHITE_LIST = [
  {
    whitedEmail: "danidietz@gmail.com",
    whitedCPF: "00830935088",
    whitedName: "Daniela Dietz Viana",
    isWhiteListed: true,
  },
  {
    whitedEmail: "byfc33@gmail.com",
    whitedCPF: "09384902144",
    whitedName: "Brenda Faz",
    isWhiteListed: true,
  },
  {
    whitedEmail: "mfranchin@hotmail.com",
    whitedCPF: "21995806870",
    whitedName: "Marcela Franchin Di Francisco",
    isWhiteListed: true,
  },
  {
    whitedEmail: "beataramis@gmail.com",
    whitedCPF: "44294165839",
    whitedName: "Beatriz Otsuka",
    isWhiteListed: true,
  },
  {
    whitedEmail: "buenobt@gmail.com",
    whitedCPF: "90144066653",
    whitedName: "Bruno Bueno",
    isWhiteListed: true,
  },
  {
    whitedEmail: "amandacdaa@gmail.com",
    whitedCPF: "97985961291",
    whitedName: "Amanda Amazonas",
    isWhiteListed: true,
  },
  {
    whitedEmail: "amandacs106@gmail.com",
    whitedCPF: "10994039794",
    whitedName: "Amanda Da Silva",
    isWhiteListed: true,
  },
  {
    whitedEmail: "rv.bianca@gmail.com",
    whitedCPF: "22326982894",
    whitedName: "Bianca Reis Verderosi",
    isWhiteListed: true,
  },
  {
    whitedEmail: "patymiyagi@gmail.com",
    whitedCPF: "38394990894",
    whitedName: "Patricia Miyagi",
    isWhiteListed: true,
  },
  {
    whitedEmail: "deiafeldon@gmail.com",
    whitedCPF: "35637421897",
    whitedName: "Andrea Feldon",
    isWhiteListed: true,
  },
  {
    whitedEmail: "dessachia@yahoo.com.br",
    whitedCPF: "05856740947",
    whitedName: "Andressa Chiamulera",
    isWhiteListed: true,
  },
  {
    whitedEmail: "masilveira82@gmail.com",
    whitedCPF: "04724272457",
    whitedName: "Mariana Silveira",
    isWhiteListed: true,
  },
  {
    whitedEmail: "mairaayres@gmail.com",
    whitedCPF: "10450650723",
    whitedName: "Maira Ayres Torres",
    isWhiteListed: true,
  },
  {
    whitedEmail: "lisboalien@gmail.com",
    whitedCPF: "02182508198",
    whitedName: "Aline De Farias Lisboa",
    isWhiteListed: true,
  },
  {
    whitedEmail: "gfmation@gmail.com",
    whitedCPF: "35337830813",
    whitedName: "Gisela Ferreira",
    isWhiteListed: true,
  },
  {
    whitedEmail: "thamarac.silva@hotmail.com",
    whitedCPF: "36951737851",
    whitedName: "Thâmara Silva",
    isWhiteListed: true,
  },
  {
    whitedEmail: "marydombrowsky@gmail.com",
    whitedCPF: "36063976825",
    whitedName: "Marina Dombrowsky",
    isWhiteListed: true,
  },
  {
    whitedEmail: "sabrina.santinelli@hotmail.com",
    whitedCPF: "31542977827",
    whitedName: "Sabrina Santinelli",
    isWhiteListed: true,
  },
  {
    whitedEmail: "fcalife@gmail.com",
    whitedCPF: "01427672474",
    whitedName: "Felipe Calife",
    isWhiteListed: true,
  },
  {
    whitedEmail: "caruzilber@gmail.com",
    whitedCPF: "26959370833",
    whitedName: "Carolina Zilber",
    isWhiteListed: true,
  },
  {
    whitedEmail: "gysaholanda@yahoo.com.br",
    whitedCPF: "03437538470",
    whitedName: "Gyselle Holanda",
    isWhiteListed: true,
  },
  {
    whitedEmail: "jubond@gmail.com",
    whitedCPF: "33272526889",
    whitedName: "Juliana Mandelbaum",
    isWhiteListed: true,
  },
  {
    whitedEmail: "julianasalazar.ju@gmail.com",
    whitedCPF: "10794552722",
    whitedName: "Juliana Salazar",
    isWhiteListed: true,
  },
  {
    whitedEmail: "claripark@gmail.com",
    whitedCPF: "21705009875",
    whitedName: "Clarice Park",
    isWhiteListed: true,
  },
  {
    whitedEmail: "lucianajesus@hotmail.com",
    whitedCPF: "28785455830",
    whitedName: "Luciana Jesus",
    isWhiteListed: true,
  },
  {
    whitedEmail: "filipescherrer@outlook.com",
    whitedCPF: "13249956708",
    whitedName: "Filipe Scherrer",
    isWhiteListed: true,
  },
  {
    whitedEmail: "nandarg@gmail.com",
    whitedCPF: "92384870572",
    whitedName: "Fernanda Regis",
    isWhiteListed: true,
  },
  {
    whitedEmail: "dhfait@gmail.com",
    whitedCPF: "04227997933",
    whitedName: "Déborah Fait",
    isWhiteListed: true,
  },
  {
    whitedEmail: "maltarissi@gmail.com",
    whitedCPF: "26719684850",
    whitedName: "Denise Rissi",
    isWhiteListed: true,
  },
  {
    whitedEmail: "brunofrep@gmail.com",
    whitedCPF: "22118417837",
    whitedName: "Carla e bruno Da silva",
    isWhiteListed: true,
  },
  {
    whitedEmail: "claucorsetti@yahoo.com.br",
    whitedCPF: "11035653702",
    whitedName: "Claudia Martins",
    isWhiteListed: true,
  },
  {
    whitedEmail: "nat.kuka@gmail.com",
    whitedCPF: "34302943807",
    whitedName: "Natalia Lohn",
    isWhiteListed: true,
  },
  {
    whitedEmail: "tatianalomelino@gmail.com",
    whitedCPF: "07813986733",
    whitedName: "Tatiana Braganca",
    isWhiteListed: true,
  },
  {
    whitedEmail: "ma.wainstok@gmail.com",
    whitedCPF: "10543574717",
    whitedName: "Mayra Wainstok",
    isWhiteListed: true,
  },
  {
    whitedEmail: "spatuzza1@yahoo.com.br",
    whitedCPF: "14745012810",
    whitedName: "Alexandre Spatuzza",
    isWhiteListed: true,
  },
  {
    whitedEmail: "barbara@schwermann.eu",
    whitedCPF: "57573697368",
    whitedName: "Barbara Schwermann",
    isWhiteListed: true,
  },
  {
    whitedEmail: "aguscomas@gmail.com",
    whitedCPF: "23127616880",
    whitedName: "Agustina Comas",
    isWhiteListed: true,
  },
  {
    whitedEmail: "seabra.mari@gmail.com",
    whitedCPF: "08869215709",
    whitedName: "Mariana Seabra da silva",
    isWhiteListed: true,
  },
];

export function isWhiteListed(parmEmail, parmCPF) {
  let whitedEmailParm;
  let whitedCpfParm;
  whitedEmailParm = WHITE_LIST.find(
    (wl) => wl.whitedEmail == parmEmail && wl.isWhiteListed
  );
  whitedCpfParm = WHITE_LIST.find(
    (wl) => wl.whitedCPF == parmCPF && wl.isWhiteListed
  );
  if (whitedEmailParm || whitedCpfParm) {
    return true;
  } else {
    return false;
  }
}

export function getAllWhiteListSet() {
  return WHITE_LIST.filter((email) => isWhiteListed);
}

export function getAllWhiteList() {
  return WHITE_LIST;
}
