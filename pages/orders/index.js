import styles from "../../styles/Home.module.css";
//? Material UI
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
//? API components
const pagarme = require("pagarme");
import getOrder from "../../components/lib/api/getOrder";
import getOption from "../../components/lib/api/getOption";
import getListOrders from "../../components/lib/api/getListOrders";
import getURL from "../../components/lib/api/getURL";
//? Customized components
import setCurrency from "../../components/lib/utils/setCurrency";
import RiskScoreListTable from "../../components/orders/risk-score-list-table";
import titleCase from "../../components/lib/utils/titleCase";
import { isBlackListed } from "../../data/black-list.js";
import { isWhiteListed } from "../../data/white-list.js";
import { buildCarrier } from "../../components/orders/build-carrier";
import { buildFirstLastName } from "../../components/orders/build-first-last-name";
import { getRiskProfile } from "../../components/orders/get-risk-profile";
import showMessageError from "../../components/lib/utils/show-message-error";
import formatTZOrderDate from "../../components/lib/utils/format-tz-order-date";
import { TramRounded } from "@material-ui/icons";

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

function OrderListPage(props) {
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
          <RiskScoreListTable orders={props.allOrders} />
        ) : (
          showMessageError(props.eMessage, props.eMessage2)
        )}
      </div>
    </Container>
  );
}

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

      let coupon = " ";
      if (vtexOrder.ratesAndBenefitsData.rateAndBenefitsIdentifiers[0]) {
        coupon =
          vtexOrder.ratesAndBenefitsData.rateAndBenefitsIdentifiers[0].name;
      }

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
        vOrder.value,
        coupon
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

      let orderDate = formatTZOrderDate(vOrder.creationDate);

      let shippingMethod =
        carrier.indexOf("Retirada") > -1 ? "Retirada" : carrier;

      let payMethod = {
        creditCard: false,
        creditCardHolder: false,
        giftCard: false,
        promissory: false,
        instantPayment: false,
      };

      if (paymentGroup.indexOf("creditCard") > -1) {
        payMethod.creditCard = true;
        payMethod.creditCardHolder = riskProfile.riskIsCardHolder;
      }
      if (paymentGroup.indexOf("giftCard") > -1) {
        payMethod.giftCard = true;
      }
      if (paymentGroup.indexOf("promissory") > -1) {
        payMethod.promissory = true;
      }
      if (paymentGroup.indexOf("instantPayment") > -1) {
        payMethod.instantPayment = true;
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
        status: vOrder.status,
        scoreDesc: riskProfile.riskDescription,
        score: riskProfile.riskScore,
        riskProfile: riskProfile,
        kitCustom: riskProfile.riskKitCustom,
        blackListed: isBlackListed(pEmailClient, vOrder.cpf) ? true : false,
        whiteListed: isWhiteListed(pEmailClient, vOrder.cpf) ? true : false,
        payMethod: payMethod,
        promo: coupon,

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
      console.log("Pedido não encontrada na VTEX");
    }
  }
  //*-----------------------------------------------------
  //*? Return to React
  //*-----------------------------------------------------
  console.log("Regenerando a Página com ISR (Incremental Static Regereration)");

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

export default OrderListPage;
