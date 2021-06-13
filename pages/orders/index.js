import styles from "../../styles/Home.module.css";
import moment from "moment-timezone";
//? Material UI
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
//? API
const pagarme = require("pagarme");
import getOrder from "../../components/lib/api/getOrder";
//? Customized components
import { isBlackListed } from "../../data/black-list.js";
import { isWhiteListed } from "../../data/white-list.js";
import setCurrency from "../../components/lib/utils/setCurrency";
import RiskScoreList from "../../components/orders/order-feed";
import getURL from "../../components/lib/api/getURL";
import getOption from "../../components/lib/api/getOption";
import titleCase from "../../components/lib/utils/titleCase";
import getListOrders from "../../components/lib/api/getListOrders";

const useStyles = makeStyles({
  title: {
    fontSize: 22,
    color: "LightGrey",
    marginTop: 10,
    marginBotton: 15,
  },
  subTitle: {
    fontSize: 15,
    color: "SteelBlue",
    marginBotton: 12,
  },
});

function AllOrdersPage(props) {
  const classes = useStyles();
  return (
    <Container>
      <Typography className={classes.title} component="h5" align="left">
        <img
          src="/logoAlerteMe.png"
          alt="logo AlerteMe"
          className={styles.logoOrders}
        />
      </Typography>

      <Typography
        className={classes.description}
        variant="caption"
        component="h6"
        align="center"
        color="textSecondary"
        gutterBottom="true"
        align="right"
      >
        Últimos {props.statistics.totalOrders} pedidos -{" "}
        {props.statistics.totalHighRisk} Suspeito(s) - Risco de{" "}
        {setCurrency(props.statistics.totalAmountRisk)} (
        {parseFloat(
          (props.statistics.totalHighRisk / props.statistics.totalOrders) * 100
        ).toFixed(2) + "%"}
        )
      </Typography>

      <div>
        {props.eMessage.fetchStatus === 200 ? (
          <RiskScoreList orders={props.allOrders} />
        ) : (
          showMessageError(props.eMessage, props.eMessage2)
        )}
      </div>
    </Container>
  );
}

const showMessageError = (eMessage, eMessage2) => {
  {
    console.log("===================== ERROR MESSAGE ================");
    console.log("STATUS: ", eMessage.fetchStatus);
    // console.log("URL: ", eMessage.fetchUrl);
    // console.log("QS: ", eMessage.fetchQs);
    // console.log("HEADER: ", eMessage.fetchHeader);
    console.log("====================================================");
    console.log("===================== ERROR MESSAGE 2 ==============");
    console.log("STATUS: ", eMessage2.fetchStatus);
    // console.log("URL: ", eMessage2.fetchUrl);
    // console.log("HEADER: ", eMessage2.fetchHeader);
    console.log("====================================================");
  }
};

export async function getStaticProps() {
  var eMessage = {
    fetchStatus: "",
    fetchUrl: "",
    fetchQs: "",
    fetchHeader: "",
  };

  var eMessage2 = {
    fetchStatus: "",
    fetchUrl: "",
    fetchQs: "",
    fetchHeader: "",
  };

  var allOrders = [];
  var cleanFeedOrders = [];

  //*-----------------------------------------------------
  //*? Fetch Feed -> cleanFeedOrders
  //*-----------------------------------------------------

  // let url, options;

  // url = getURL("feed");
  // options = getOption("feed");

  // let res = await fetch(url, options);
  // let data = await res.json();

  // if (res.ok) {
  //   eMessage.fetchStatus = res.status;
  //   cleanFeedOrders = JSON.parse(JSON.stringify(data));
  // } else {
  //   allOrders = [];
  //   eMessage.error = res.ok;
  // }

  let orderList = await getListOrders(); // Fetch VTEX API - GET LIST ORDERS

  if (orderList) {
    eMessage.fetchStatus = 200;
    cleanFeedOrders = orderList.list;
  }

  //*-----------------------------------------------------
  //*? Fetch Order based on cleanFeedOrders -> allOrders
  //*-----------------------------------------------------

  let i;
  let apiPagarme = "ak_live_i3JdusnggPsU1ymvogfoOfmmkvGfMM";
  let fullName;
  let giftId;
  let giftName;
  let pCardHolder;
  let pEmailClient;
  let pCardCountry;
  let pCardInstallments;

  let options = getOption("order");

  let url;
  let vtexOrder;
  let vOrder = {};

  let statistics = {};

  statistics = {
    totalHighRisk: 0,
    totalMediumRisk: 0,
    totalLowRisk: 0,
    totalAmountRisk: 0,
    totalOrders: 0,
  };

  for (i = 0; i < cleanFeedOrders.length; ++i) {
    let orderParm = cleanFeedOrders[i].orderId;

    url = getURL("order", orderParm);

    vtexOrder = await getOrder(url, options);

    if (vtexOrder) {
      giftId = "";
      giftName = "";
      if (vtexOrder.giftRegistryData) {
        giftId = vtexOrder.giftRegistryData.giftRegistryId;
        giftName = vtexOrder.giftRegistryData.description;
      }

      let paymentMethod = [];
      for (
        let i = 0;
        i < vtexOrder.paymentData.transactions[0].payments.length;
        ++i
      ) {
        paymentMethod[i] =
          vtexOrder.paymentData.transactions[0].payments[i].paymentSystemName;
      }

      let paymentGroup = [];
      let pagarmeTid = "";
      for (
        let i = 0;
        i < vtexOrder.paymentData.transactions[0].payments.length;
        ++i
      ) {
        paymentGroup[i] =
          vtexOrder.paymentData.transactions[0].payments[i].group;
        if (paymentGroup[i] === "creditCard") {
          pagarmeTid = vtexOrder.paymentData.transactions[0].payments[i].tid;
        }
      }

      vOrder = {
        orderId: vtexOrder.orderId,
        creationDate: vtexOrder.creationDate,
        value: vtexOrder.value,
        shippingCity: vtexOrder.shippingData.address.city,
        shippingState: vtexOrder.shippingData.address.state,
        status: vtexOrder.status,
        cpf: vtexOrder.clientProfileData.document,
        phone: vtexOrder.clientProfileData.phone,
        cardBrand:
          vtexOrder.paymentData.transactions[0].payments[0].paymentSystemName,
        items: vtexOrder.items,
        tid: vtexOrder.paymentData.transactions[0].payments[0].tid,
        creditCardGroup: paymentGroup,
        giftId: giftId,
        giftName: giftName,
        clientFirstName: vtexOrder.clientProfileData.firstName,
        clientLastName: vtexOrder.clientProfileData.lastName,
        carrier: vtexOrder.shippingData.logisticsInfo[0].selectedSla,
        payment: vtexOrder.paymentData.transactions[0].payments[0].group,
        paymentMethod: paymentMethod,
      };

      pCardHolder = " ";
      pEmailClient = " ";
      pCardCountry = " ";
      pCardInstallments = " ";

      let carrier = " ";
      if (
        vtexOrder.paymentData.transactions.length > 0 &&
        vOrder.creditCardGroup.indexOf("creditCard") > -1
      ) {
        //*-----------------------------------------------------
        //*? Fetch Pagarme based on TID -> transactions
        //*-----------------------------------------------------

        await pagarme.client
          .connect({ api_key: apiPagarme })
          .then((client) => client.transactions.find({ id: pagarmeTid }))
          .then((transaction) => {
            pCardHolder = transaction.card_holder_name;
            pEmailClient = transaction.customer.email;
            pCardCountry = transaction.card.country;
            pCardInstallments = transaction.installments;
          })
          .catch((e) => {
            console.log("Erro fetch Pagarme: ", vOrder.orderId, vOrder.tid, e);
          });
      }

      fullName = buildFirstLastName(
        vOrder.clientFirstName,
        vOrder.clientLastName
      );

      carrier = buildCarrier(vOrder.carrier);

      const riskProfile = await getRiskProfile(
        vOrder.orderId,
        fullName,
        pCardHolder,
        pEmailClient,
        carrier,
        vOrder.items,
        vOrder.giftId,
        vOrder.paymentMethod,
        pCardCountry,
        pCardInstallments,
        vOrder.value
      );

      let payment = vOrder.paymentMethod[0];
      if (vOrder.paymentMethod[1]) {
        payment = payment + " " + vOrder.paymentMethod[1];
      }

      statistics.totalOrders = statistics.totalOrders + 1;

      switch (riskProfile.riskScore) {
        case 100:
        case 95:
        case 90:
          statistics.totalHighRisk = statistics.totalHighRisk + 1;
          statistics.totalAmountRisk =
            statistics.totalAmountRisk + vOrder.value;
        case 85:
        case 80:
          statistics.totalMediumRisk = statistics.totalMediumRisk + 1;
        default:
          statistics.totalLowRisk = statistics.totalLowRisk + 1;
      }

      let dt = moment
        .tz(vOrder.creationDate, "America/Brazil")
        .format("YYYY-MM-DD HH:mm");
      let tz = moment(dt).tz("America/Brazil").format("Z");
      let newDt = moment(dt).subtract(180, "m");
      let orderDate = newDt.format("DD-MM-YYYY HH:mm");

      let shippingMethod =
        carrier.indexOf("Retirada") > -1 ? "Retirada" : carrier;

      let cardHolder = " ";
      if (paymentGroup.indexOf("creditCard") > -1) {
        if (riskProfile.riskIsCardHolder === true) {
          cardHolder = "Sim";
        } else if (riskProfile.riskIsCardHolder === false) {
          cardHolder = "Não";
        }
      }

      let pix = false;
      if (
        vtexOrder.paymentData.transactions[0].payments[0].paymentSystemName ==
        "Pix"
      ) {
        pix = true;
      }

      allOrders.push({
        order: vOrder.orderId.substr(1, 6) + "           " + shippingMethod,
        cliente: fullName.substr(0, 25),
        qtyPurchase: riskProfile.qtyPurchase,
        dataCompra: orderDate.substr(0, 5) + " " + orderDate.substr(11, 5), // dd-mm hh-mm
        items: vOrder.items.length,
        valor: vOrder.value,
        giftId: vOrder.giftId,
        destino: vOrder.shippingCity.concat(" " + vOrder.shippingState),
        cardHolder: cardHolder,
        status: vOrder.status,
        scoreDesc: riskProfile.riskDescription,
        score: riskProfile.riskScore,
        riskProfile: riskProfile,
        kitCustom: riskProfile.riskKitCustom,
        blackListed: isBlackListed(pEmailClient, vOrder.cpf) ? true : false,
        whiteListed: isWhiteListed(pEmailClient, vOrder.cpf) ? true : false,
        pix: pix,

        history: [
          {
            cpf: vOrder.cpf,
            emailCliente: pEmailClient,
            phone: vOrder.phone,
            pagamento: payment,
            parcelas: pCardInstallments,
            titular: titleCase(pCardHolder),
          },
        ],
      });
    } else {
      console.log("ORDER não encontrada na VTEX");
    }
  }

  //*-----------------------------------------------------
  //*? Return allOrders to the orders page
  //*-----------------------------------------------------

  return {
    props: {
      cleanFeedOrders,
      allOrders,
      eMessage,
      eMessage2,
      statistics,
    },
    revalidate: 120, // 2 minutos
  };
}

export default AllOrdersPage;

//? FUNÇÕES QUE IRÃO SE TRANFORMAR EM COMPONENTS

async function getRiskProfile(
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
  value
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
  };

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
    console.log("riskScore ==> ", riskProfile.riskScore);
    console.log("Avaliação ==> ", riskProfile.riskDescription);
    console.log("==================( Fim )=======================");
  }

  return riskProfile;
}

function determineRisk(riskScore) {
  switch (riskScore) {
    case 100:
      return "Muito Alto";
    case 95:
    case 90:
      return "Alto";
    case 85:
    case 80:
      return "Moderado";
    case 75:
    case 70:
      return "Baixo";
    default:
      return "Muito Baixo";
  }
}

async function lookForPurchaseHistory(clientEmail) {
  let qtyPurchase = 0;

  const options3 = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-VTEX-API-AppKey": "vtexappkey-fraldasdipano-JUXTLA",
      "X-VTEX-API-AppToken":
        "VFFOSPADLSGIHYANORZFQBOHUPFVTHNPMGFKEORFVRQRQXIRUCHYNXQTQXUCJEKEFRVBTQIZZTJYLWRWGOBQAPBPPLTGTPWQGLMYBHXDUHYUNRHUFXVVDUEQPGLIXBGK",
    },
  };

  let res3 = await fetch(
    `https://fraldasdipano.vtexcommercestable.com.br/api/oms/pvt/orders?q=${clientEmail}`,
    options3
  );

  if (res3.ok) {
    const data3 = await res3.json();
    const clientOrders = JSON.parse(JSON.stringify(data3));
    qtyPurchase = clientOrders.list.length;
  } else {
    qtyPurchase = 0;
  }

  return qtyPurchase;
}

function buildFirstLastName(vFirstName, vLastName) {
  let firstName =
    vFirstName[0].toUpperCase() + vFirstName.slice(1).toLowerCase();
  let lastName = vLastName[0].toUpperCase() + vLastName.slice(1).toLowerCase();

  return firstName.concat(" " + lastName);
}

function buildCarrier(vCarrier) {
  if (vCarrier === "PAC" || vCarrier === "Sedex") return vCarrier;
  if (vCarrier.substr(0, 7) === "Entrega") return "Expressa";
  if (vCarrier.substr(0, 8) === "Retirada") return "Retirada";
  if (vCarrier.substr(0, 14) === "Não contribuir") return "";
}
