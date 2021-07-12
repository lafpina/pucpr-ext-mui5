import styles from "../../styles/Home.module.css";
import Image from "next/image";
// import MainLayout from "../../components/layouts/mainLayouts";
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
import getMasterdataEmail from "../../components/lib/api/getMasterdataEmail";
//? Customized components
import setCurrency from "../../components/lib/utils/setCurrency";
import RiskScoreListTable from "../../components/orders/risk-score-list-table";
import titleCase from "../../components/lib/utils/titleCase";
import { isBlackListed } from "../../../data/black-list.js";
import { isWhiteListed } from "../../../data/white-list.js";
import { buildCarrier } from "../../components/orders/build-carrier";
import { buildFirstLastName } from "../../components/orders/build-first-last-name";
import { getRiskProfile } from "../../components/orders/get-risk-profile";
import showMessageError from "../../components/lib/utils/show-message-error";
import formatTZOrderDate from "../../components/lib/utils/format-tz-order-date";
import { TramRounded } from "@material-ui/icons";
import { gridCheckboxSelectionColDef, gridColumnsTotalWidthSelector } from "@material-ui/data-grid";

import PrimarySearchAppBar from "../../components/layouts/appNavBar";
import Dashboard from "@material-ui/icons/Dashboard";

// import Dashboard from "../../templates/Dashboard";

import orderScore from "../../helper/orders/order-score";
import buildOrderObject from "../../helper/orders/build-order-object";
import { buildRiskScoreObject } from "../../helper/orders/build-risk-score-object";


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
      {/* <Dashboard /> */}
      {/* <PrimarySearchAppBar /> */}

      <Typography className={classes.title} component="h5" align="left">
        <Image
          src="/logoAlerteMe.png"
          alt="logo AlerteMe"
          className={styles.logoOrders}
          width={96}
          height={45}
        />
      </Typography>
      {/* <Typography
        className={classes.description}
        variant="caption"
        component="h6"
        align="center"
        color="textSecondary"
        align="right"
      >
        Últimos {props.statistics.totalOrders} pedidos -{" "}
        {props.statistics.totalHighRisk} Suspeito(s) - Risco de{" "}
        {setCurrency(props.statistics.totalAmountRisk)} (
        {parseFloat(
          (props.statistics.totalHighRisk / props.statistics.totalOrders) * 100
        ).toFixed(2) + "%"}
        )
      </Typography> */}
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

// export async function getStaticProps() {
export async function getServerSideProps() {
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

  //! Fetch LIST ORDER
  let orderList = await getListOrders();

  if (orderList) {
    eMessage.fetchStatus = 200;
    cleanFeedOrders = orderList.list;
  }

  //*-----------------------------------------------------
  //*? Fetch Order based on cleanFeedOrders -> allOrders
  //*-----------------------------------------------------

  let statistics = {
    totalHighRisk: 0,
    totalMediumRisk: 0,
    totalLowRisk: 0,
    totalAmountRisk: 0,
    totalOrders: 0,
  };

  let options = getOption("order");

  for (let i = 0; i < cleanFeedOrders.length; ++i) {
    let orderParm = cleanFeedOrders[i].orderId;
    let url = getURL("order", orderParm);

    //! Fetch GET ORDER
    let vtexOrder = await getOrder(url, options);

    if (vtexOrder) {
      const orderObject = await buildOrderObject(vtexOrder);
      const riskScoreObject = await buildRiskScoreObject(orderObject);

      let paymentOption = {
        creditCard: orderObject.paymentGroupActive.creditCard,
        isCreditCardHolder: riskScoreObject.cardHolder,
        giftCard: orderObject.paymentGroupActive.giftCard,
        promissory: orderObject.paymentGroupActive.promissory,
        instantPayment: orderObject.paymentGroupActive.instantPayment
      }

      if (orderObject.orderId == "v957355frdp-01") {
        console.log("-------------------------------------")
        console.log("Cliente:", orderObject.clientName)
        console.log("Payment Option:", paymentOption)
        console.log("Card Holder:", orderObject.cardHolder)

        console.log("----------")

        console.log(orderObject)
        console.log(riskScoreObject)

      }

      allOrders.push({
        order: orderObject.orderId.substr(1, 6) + "           " + orderObject.carrier,
        cliente: orderObject.clientName.substr(0, 35),
        qtyPurchase: riskScoreObject.historyPurchase.profile.qty,
        dataCompra: orderObject.creationDate.substr(0, 5) + " " + orderObject.creationDate.substr(11, 5), // dd-mm hh-mm
        items: orderObject.items.length,
        valor: orderObject.value,
        giftId: orderObject.giftId,
        destino: orderObject.shippingCity,
        status: orderObject.status,
        scoreDesc: riskScoreObject.description,
        score: riskScoreObject.final,
        riskProfile: riskScoreObject,
        kitCustom: riskScoreObject.customProduct.score,
        blackListed: isBlackListed(
          orderObject.clientEmail,
          orderObject.cpf,
          orderObject.shippingPostalCode,
          orderObject.phone,
          orderObject.cardLastDigits,
          orderObject.shippingState
        )
          ? true
          : false,
        whiteListed: isWhiteListed(orderObject.clientEmail, orderObject.cpf) ? true : false,
        payMethod: paymentOption,
        promo: orderObject.coupon,
        incompleteOrders: riskScoreObject.incompleteOrders.qty,

        history: [
          {
            cpf: orderObject.cpf,
            emailCliente: orderObject.clientEmail,
            phone: orderObject.phone,
            pagamento: orderObject.cardLastDigits,
            parcelas: orderObject.cardInstallments,
            postalCode: orderObject.shippingPostalCode,
            state: orderObject.shippingState,
            cardCountry: titleCase(orderObject.cardCountry),
            // cardLastDigits: orderObject.cardLastDigits,
            parcelas: orderObject.cardInstallments,
            // titular: " "
            titular: orderObject.cardHolder != null ? titleCase(orderObject.cardHolder) : "" ,
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
  console.log("Retornando ao React");

  return {
    props: {
      cleanFeedOrders,
      allOrders,
      eMessage,
      eMessage2,
      statistics,
    },
    // revalidate: 120, // 2 minutos
  };
}

export default OrderListPage;
