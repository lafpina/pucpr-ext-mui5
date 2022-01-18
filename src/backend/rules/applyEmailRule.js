import isClientCPFValid from "../utils/isClientCpfValid";
import titleCase from "../utils/titleCase";
import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";

//? Rule 13
export const applyEmailRule = (orderObject, riskScoreObject) => {
  // In case client email contains numbers risk increases in 5%
  const regex = /[0-9]/;
  const emailFirstPart = orderObject.clientEmail.split("@", 1);

  if (regex.test(emailFirstPart)) {
    riskScoreObject.validEmail.score += 5;
    riskScoreObject.final += 5;
  }

  // In case email client doesnt contain any portion of the name risk increases in 5%
  const cliName = titleCase(orderObject.clientName).split(" ");

  let qtyInstance = 0;
  const email = emailFirstPart.toString();
  const verifyNameEmail = (name) => {
    const clientNamePortion = name.toString().toLowerCase();
    if (email.includes(clientNamePortion)) {
      qtyInstance++;
    }
  };

  cliName.forEach(verifyNameEmail);

  if (qtyInstance === 0) {
    riskScoreObject.validEmail.score += 5;
    riskScoreObject.final += 5;
  }

  // In case of not a free email domain risk increases in 5%
  let isFreeDomainEmail = false;
  const freeEmail = [
    "gmail",
    "hotmail",
    "yahoo",
    "outlook",
    "icloud",
    "uol",
    "globo",
    "msn",
    "terra",
    "live",
  ];
  for (var i = 0; i < freeEmail.length; i++) {
    if (orderObject.clientEmail.indexOf(freeEmail[i]) != -1) {
      isFreeDomainEmail = true;
    }
  }
  if (!isFreeDomainEmail) {
    riskScoreObject.validEmail.score += 5;
    riskScoreObject.final += 5;
  }

  // In case of email too long risk increases in 5%
  if (emailFirstPart.length > 25) {
    riskScoreObject.validEmail.score += 5;
    riskScoreObject.final += 5;
  }

  riskScoreObject = buildRiskScoreLog(
    "r013",
    "EML",
    "Email de cadastro sem relação com o nome do cliente, ou de domínio desconhecido, ou muito longo (EML)",
    riskScoreObject.validEmail.score,
    riskScoreObject
  );

  return riskScoreObject;

  // set final score to its max if e-mail is invalid
  // if (riskScoreObject.score > 85) {
  //   if (clientEmail) {
  //     if (!isClientEmailValid(clientEmail)) {
  //       isEmailValid = false;
  //       riskScoreObject.emailScore = +100;
  //       riskScoreObject.score = riskScoreObject.score + 100;
  //       console.log(`email ${clientEmail} não é válido`);
  //     }
  //   }
  // }
};
