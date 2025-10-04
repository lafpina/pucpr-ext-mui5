const WHITE_LIST = [{
        whitedEmail: "",
        whitedCPF: "",
        whitedName: "",
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