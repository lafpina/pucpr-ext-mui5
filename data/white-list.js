const WHITE_LIST = [
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
