import { determineRisk } from "../../components/orders/determine-risk";
import { lookForPurchaseHistory } from "../../components/lib/api/lookfor-purchase-history";
import titleCase from "../../components/lib/utils/titleCase";
import { getIncompleteOrders } from "../../components/lib/api/getIncompleteOrders";
import isClientEmailValid from "../../components/lib/api/is-client-email-valid";
import isClientCPFValid from "../lib/utils/is-client-cpf-valid";

export async function getRiskProfile(
  orderId,
  clientName,
  cpf,
  cardName,
  clientEmail,
  carrier,
  items,
  gift,
  payMethod,
  cardCountry,
  cardInstallments,
  value,
  coupon
) {
  var riskProfile = {
    incompleteOrders: 0,
    couponDiscount: 0,
    carrier: 0,
    gift: 0,
    payment: 0,
    customKit: 0,
    historyPurchaseScore: 0,
    historyPurchase: {
      qty: 0,
      value: 0,
    },
    value: 0,
    kitCustom: " ",
    isEmailValid: true,
    emailScore: 0,
    isCpfValid: true,
    cpfScore: 0,
    cardHolder: 0,
    isCardHolder: {
      yes: false,
      maybe: false,
      no: false,
    },
    score: 100,
    description: "Muito Alto",
  };

  //? Titular do cartão (cardHolder)

  var nomeCadastro = titleCase(clientName).split(" ");
  var nomeCartao = titleCase(cardName).split(" ");

  var qtyInstance = 0;

  nomeCartao.forEach(verifyBuyer);

  function verifyBuyer(item) {
    if (nomeCadastro.indexOf(item) > -1) {
      qtyInstance++;
    }
  }

  if (qtyInstance > 1) {
    riskProfile.score = riskProfile.score - 10;
    riskProfile.cardHolder = -10;
    riskProfile.isCardHolder.yes = true;
  } else if (qtyInstance == 1) {
    riskProfile.score = riskProfile.score - 5;
    riskProfile.cardHolder = -5;
    riskProfile.isCardHolder.maybe = true;
  } else {
    riskProfile.isCardHolder.no = true;
  }

  //? Tentativas de compra antes da efetivação da compra atual (incompleteOrders)

  riskProfile.incompleteOrders = await getIncompleteOrders(clientName);

  if (riskProfile.incompleteOrders == 2) {
    riskProfile.score = riskProfile.score + 5;
  } else if (riskProfile.incompleteOrders == 3) {
    riskProfile.score = riskProfile.score + 10;
  } else if (riskProfile.incompleteOrders == 4) {
    riskProfile.score = riskProfile.score + 15;
  } else if (riskProfile.incompleteOrders > 4) {
    riskProfile.score = riskProfile.score + 30;
  }

  //? Cupom de desconto (couponDiscount)

  if (coupon > " " && coupon.indexOf("Compre Junto") == -1) {
    riskProfile.score = riskProfile.score - 15;
    riskProfile.couponDiscount = -15;
  }

  //? Entrega (carrier)

  if (carrier === "Expressa") {
    riskProfile.score = riskProfile.score - 5;
    riskProfile.carrier = -5;
  } else if (carrier === "Retirada") {
    riskProfile.score = riskProfile.score - 15;
    riskProfile.carrier = -15;
  }

  //? Compra para uma lista (gift)

  if (gift) {
    riskProfile.score = riskProfile.score - 20;
    riskProfile.gift = -20;
  }

  //? Método de Pagamento (payment)

  if (payMethod.promissory) {
    riskProfile.score = riskProfile.score - 30;
    riskProfile.payment = -30;
  }

  if (payMethod.instantPayment) {
    riskProfile.score = riskProfile.score - 35;
    riskProfile.payment = -35;
  }

  if (payMethod.giftCard) {
    riskProfile.score = riskProfile.score - 35;
    riskProfile.payment = -35;
  }

  //? Compra Enxoval Customizado (customKit)

  for (let i = 0; i < items.length; ++i) {
    if (items[i].refId === "PAC0075") {
      riskProfile.kitCustom = items[i].refId;
      riskProfile.score = riskProfile.score - 15;
      riskProfile.customKit = -15;
    }
  }

  //? Histórico de Compras (historyPurchase)

  if (clientEmail > " ") {
    riskProfile.historyPurchase = await lookForPurchaseHistory(clientEmail);
    if (
      riskProfile.historyPurchase.qty > 0 &&
      riskProfile.historyPurchase.value > 40000
    ) {
      switch (riskProfile.historyPurchase.qty) {
        case 1:
          riskProfile.score = riskProfile.score - 5;
          riskProfile.historyPurchaseScore = -5;
          break;
        case 2:
          riskProfile.score = riskProfile.score - 10;
          riskProfile.historyPurchaseScore = -10;
          break;
        case 3:
          riskProfile.score = riskProfile.score - 15;
          riskProfile.historyPurchaseScore = -15;
          break;
        case 4:
          riskProfile.score = riskProfile.score - 20;
          riskProfile.historyPurchaseScore = -20;
          break;
        case 5:
          riskProfile.score = riskProfile.score - 25;
          riskProfile.historyPurchaseScore = -25;
          break;
        default:
          riskProfile.score = riskProfile.score - 30;
          riskProfile.historyPurchaseScore = -30;
      }
    }
  }

  //? Relação valor e condição de pagamento (value)

  // if (value < 50000 && items > 3 && cardCountry === "BRAZIL") {
  //   riskProfile.score = riskProfile.score - 5;
  //   riskProfile.value = -5;
  // }

  if (value > 100000 && !payMethod.giftCard && !payMethod.promissory) {
    // primeira compra
    if (riskProfile.historyPurchase.qty === 0) {
      riskProfile.score = riskProfile.score + 5;
      riskProfile.value = riskProfile.value + 5;
    }
    // pagamento em uma única parcela
    if (cardInstallments === 1) {
      riskProfile.score = riskProfile.score + 5;
      riskProfile.value = riskProfile.value + 5;
    }
    // pagamento com a menor parcela
    if (cardInstallments === 6) {
      riskProfile.score = riskProfile.score + 5;
      riskProfile.value = riskProfile.value + 5;
    }
  }

  const cpfStatusOk = isClientCPFValid(cpf);
  if (!cpfStatusOk) {
    isCpfValid = false;
    riskProfile.cpfScore = +100;
    riskProfile.score = riskProfile.score + 100;
    console.log(`CPF ${cpf} não é válido`);
  }

  if (riskProfile.score > 85) {
    if (clientEmail) {
      if (!isClientEmailValid(clientEmail)) {
        isEmailValid = false;
        riskProfile.emailScore = +100;
        riskProfile.score = riskProfile.score + 100;
        console.log(`email ${clientEmail} não é válido`);
      }
    }
  }

  if (riskProfile.score > 100) riskProfile.score = 100;

  riskProfile.description = determineRisk(riskProfile.score);

  if (orderId === "v954789frdp-01") {
    console.log(`Risk Profile de ${clientName} ======> :`, riskProfile);
  }

  return riskProfile;
}
