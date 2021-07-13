const WHITE_LIST = [
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
