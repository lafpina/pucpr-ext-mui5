const WHITE_LIST = [
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
  let whitedParm = false;

  if (parmEmail > " ") {
    whitedParm = WHITE_LIST.find(
      (wl) => wl.whitedEmail == parmEmail && wl.isWhiteListed
    );
  }
  whitedParm = WHITE_LIST.find(
    (wl) => wl.whitedCPF == parmCPF && wl.isWhiteListed
  );
  return whitedParm;
}

export function getAllWhiteListSet() {
  return WHITE_LIST.filter((email) => isWhiteListed);
}

export function getAllWhiteList() {
  return WHITE_LIST;
}
