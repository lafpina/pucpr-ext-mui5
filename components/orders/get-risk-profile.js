import { determineRisk } from "../../components/orders/determine-risk";
import { lookForPurchaseHistory } from "../../components/lib/api/lookfor-purchase-history";
import titleCase from "../../components/lib/utils/titleCase";
import { getIncompleteOrders } from "../../components/lib/api/getIncompleteOrders";

export async function getRiskProfile(
  order,
  clientName,
  cardName,
  clientEmail,
  carrier,
  items,
  gift,
  payment,
  cardCountry,
  cardInstallments,
  value,
  coupon
) {
  var riskProfile = {
    riskCardHolder: 0,
    riskCarrier: 0,
    riskGift: 0,
    riskPayment: 0,
    riskCustomKit: 0,
    riskValue: 0,
    qtyPurchase: 0,
    riskHistoryPurchase: 0,
    riskScore: 100,
    riskDescription: "Muito Alto",
    riskKitCustom: " ",
    riskIsCardHolder: false,
    riskCouponDiscount: 0,
    riskIncompleteOrders: 0,
  };

  riskProfile.riskIncompleteOrders = await getIncompleteOrders(clientName);

  if (riskProfile.riskIncompleteOrders == 2) {
    riskProfile.riskScore = riskProfile.riskScore + 5;
  } else if (riskProfile.riskIncompleteOrders == 3) {
    riskProfile.riskScore = riskProfile.riskScore + 10;
  } else if (riskProfile.riskIncompleteOrders == 4) {
    riskProfile.riskScore = riskProfile.riskScore + 15;
  } else if (riskProfile.riskIncompleteOrders > 4) {
    riskProfile.riskScore = riskProfile.riskScore + 30;
  }

  if (coupon > " " && coupon.indexOf("Compre Junto") == -1) {
    riskProfile.riskScore = riskProfile.riskScore - 15;
    riskProfile.riskCouponDiscount = -15;
  }

  // Entrega (5)Entrega Expressa - (15)Retirada na Loja

  if (carrier === "Expressa") {
    riskProfile.riskScore = riskProfile.riskScore - 5;
    riskProfile.riskCarrier = -5;
  } else if (carrier === "Retirada") {
    riskProfile.riskScore = riskProfile.riskScore - 15;
    riskProfile.riskCarrier = -15;
  }

  // Compra para uma lista (20)

  if (gift) {
    riskProfile.riskScore = riskProfile.riskScore - 20;
    riskProfile.riskGift = -20;
  }

  // Compra com Depósito Bancário (30)

  if (payment[0].substr(0, 8) === "Depósito") {
    riskProfile.riskScore = riskProfile.riskScore - 30;
    riskProfile.riskPayment = -30;
  }

  // Compra com Pix (35)

  if (payment[0] === "Pix") {
    riskProfile.riskScore = riskProfile.riskScore - 35;
    riskProfile.riskPayment = -35;
  }

  // Compra com Vale (40)

  if (payment.indexOf("Vale") > -1) {
    riskProfile.riskScore = riskProfile.riskScore - 35;
    riskProfile.riskPayment = -35;
  }

  // Compra Enxoval Customizado (15)

  for (let i = 0; i < items.length; ++i) {
    if (items[i].refId === "PAC0075") {
      riskProfile.riskKitCustom = items[i].refId;
      riskProfile.riskScore = riskProfile.riskScore - 15;
      riskProfile.riskCustomKit = -15;
    }
  }

  // Titular do cartão (15)

  var cliName = titleCase(clientName);
  var carName = titleCase(cardName);

  let buyerName;
  let creditCardName;
  let sizeBuyerName;
  let sizeCreditCardName;

  if (cardName != " ") {
    buyerName = cliName.split(" ");
    creditCardName = carName.split(" ");
    sizeBuyerName = buyerName.length;
    sizeCreditCardName = creditCardName.length;

    if (
      // Primeiro e último nome iguais
      buyerName[0] == creditCardName[0] &&
      buyerName[sizeBuyerName - 1] == creditCardName[sizeCreditCardName - 1]
    ) {
      riskProfile.riskScore = riskProfile.riskScore - 15;
      riskProfile.riskCardHolder = -15;
      riskProfile.riskIsCardHolder = true;
    } else if (
      // Último nome iguais
      buyerName[sizeBuyerName - 1] == creditCardName[sizeCreditCardName - 1]
    ) {
      riskProfile.riskScore = riskProfile.riskScore - 10;
      riskProfile.riskCardHolder = -10;
    } else if (buyerName[0] == creditCardName[0]) {
      // Primeiro nome iguais
      riskProfile.riskScore = riskProfile.riskScore - 5;
      riskProfile.riskCardHolder = -5;
    }
  }

  // Valor < 500 (5)

  if (value < 50000 && items > 3 && cardCountry === "BRAZIL") {
    riskProfile.riskScore = riskProfile.riskScore - 5;
    riskProfile.riskValue = -5;
  }

  // Valor > 1000 à vista (+5)

  if (value > 100000 && cardInstallments == 1) {
    riskProfile.riskScore = riskProfile.riskScore + 5;
    riskProfile.riskValue = +5;
  }

  // Histórico de Compras (10)
  if (clientEmail > " ") {
    riskProfile.qtyPurchase = await lookForPurchaseHistory(clientEmail);
    if (riskProfile.qtyPurchase > 1) {
      switch (riskProfile.qtyPurchase) {
        case 2:
          riskProfile.riskScore = riskProfile.riskScore - 5;
          riskProfile.riskHistoryPurchase = -5;
          break;
        case 3:
          riskProfile.riskScore = riskProfile.riskScore - 10;
          riskProfile.riskHistoryPurchase = -10;
          break;
        case 4:
          riskProfile.riskScore = riskProfile.riskScore - 15;
          riskProfile.riskHistoryPurchase = -15;
          break;
        case 5:
          riskProfile.riskScore = riskProfile.riskScore - 20;
          riskProfile.riskHistoryPurchase = -20;
          break;
        default:
          riskProfile.riskScore = riskProfile.riskScore - 25;
          riskProfile.riskHistoryPurchase = -25;
      }
    }
  } else {
    riskProfile.qtyPurchase = 1;
  }

  if (riskProfile.riskScore > 100) riskProfile.riskScore = 100;

  riskProfile.riskDescription = determineRisk(riskProfile.riskScore);

  if (clientEmail === "adelina.n.dedel@gmail.com") {
    console.log("=================( Início )=====================");
    console.log("Order: ", order);
    console.log("--------------------------------------------(15)");
    console.log("clientName: ", cliName);
    console.log("cardName: ", carName);
    console.log("riskCardHolder: ", riskProfile.riskCardHolder);
    console.log("-------------------------(5)Entrega (15)Retirada");
    console.log("Carrier: ", carrier);
    console.log("riskCarrier: ", riskProfile.riskCarrier);
    console.log("--------------------------------------------(20)");
    console.log("Gift: ", gift);
    console.log("riskGift: ", riskProfile.riskGift);
    console.log("-------------------------(30) Depósito (40) Vale");
    console.log("Payment: ", payment);
    console.log("riskPayment: ", riskProfile.riskPayment);
    console.log("--------------------------------------------(15)");
    console.log("Item Customizado: ", riskProfile.riskkitCustom);
    console.log("riskCustomKit: ", riskProfile.riskCustomKit);
    console.log("---------------------------------------------(5)");
    console.log("Value: ", value);
    console.log("riskValue: ", riskProfile.riskValue);
    console.log("cardCountry: ", cardCountry);
    console.log("cardInstallments: ", cardInstallments);
    console.log("---------------------------------------------(15)");
    console.log("Histórico de Compras: ", riskProfile.qtyPurchase);
    console.log("riskHistoryPurchase: ", riskProfile.riskHistoryPurchase);
    console.log("-------------------------------------------------");
    console.log("Discount ==> ", discount);
    console.log("riskCouponDiscount ==> ", riskProfile.riskCouponDiscount);
    console.log("-------------------------------------------------");
    console.log("riskScore ==> ", riskProfile.riskScore);
    console.log("Avaliação ==> ", riskProfile.riskDescription);

    console.log("==================( Fim )=======================");
  }

  return riskProfile;
}
