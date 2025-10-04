import titleCase from "../src/backend/utils/titleCase";
const BLACK_LIST = [
    {
        blackedName: "",
        blackedEmail: "",
        blackedCPF: "",
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
