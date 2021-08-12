//? Material UI
import { makeStyles } from "@material-ui/core";

//? API components
import getVtexOrder from "../../helper/api/getVtexOrder";
import getOption from "../../helper/api/getOption";
import getVtexListOrders from "../../helper/api/getVtexListOrders";
import getURL from "../../helper/api/getURL";

//? Helpers
import buildOrderObject from "../../helper/orders/buildOrderObject";
import { buildRiskScoreObject } from "../../helper/orders/buildRiskScoreObject";
import { buildOrderLine } from "../../helper/orders/buildOrderLine";
import getTodayDate from "../../helper/utils/getTodayDate";

import dynamic from "next/dynamic";

// Replaced a regular import as bellow to Dynamic Component With No SSR
// import Dashboard from "../../components/admin/Dashboard";
const DynamicComponentWithNoSSR = dynamic(
  () => import("../../components/admin/Dashboard"),
  { ssr: false }
);

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

  const {
    allOrders,
    notificationBlackList,
    notificationWhiteList,
    notificationAlerts,
    totalRiskAmount,
    todayDate,
  } = props;

  return (
    <>
      {/* <Dashboard */}
      <DynamicComponentWithNoSSR
        orders={allOrders}
        notificationBlackList={notificationBlackList}
        notificationWhiteList={notificationWhiteList}
        notificationAlerts={notificationAlerts}
        totalRiskAmount={totalRiskAmount}
        todayDate={todayDate}
      />
    </>
  );
}
//*-----------------------------------------------------
//* BACKEND NODE
//*-----------------------------------------------------
// export async function getStaticProps() {
export async function getServerSideProps() {
  var allOrders = [];
  let eMessage = {
    fetchListOrder: 0,
  };
  let notificationBlackList = 0;
  let notificationWhiteList = 0;
  let notificationAlerts = 0;
  let totalRiskAmount = 0;

  //! Fetch LIST ORDER
  const getListOrders = await getVtexListOrders();

  if (getListOrders) {
    console.log("Fetch List efetuado com sucesso. Iniciar o LOOP");
    eMessage.fetchListOrder = 200;
    const listOrders = getListOrders.list;
    let options = getOption("order");
    //*-----------------------------------------------------
    //* Loop thru the List to fetch each order of the list
    //*-----------------------------------------------------
    for (let i = 0; i < listOrders.length; ++i) {
      const orderId = listOrders[i].orderId;
      let url = getURL("order", orderId);
      //! Fetch GET ORDER
      const getOrder = await getVtexOrder(url, options);
      //*-----------------------------------------------------
      //* For each order call helper functions to process it
      //*-----------------------------------------------------
      if (getOrder) {
        console.log("Passo 3 - Início de Processamento da Order");
        const orderObject = await buildOrderObject(getOrder);
        const riskScoreObject = await buildRiskScoreObject(orderObject);
        const orderLine = buildOrderLine(orderObject, riskScoreObject);

        // console.log("Mapping thru Risk Score Log");
        // orderLine.riskScoreLog.map((rule, ruleId) => {
        //   // key = ruleId;
        //   console.log(rule.ruleId);
        //   console.log(rule.ruleName);
        //   console.log(rule.score);
        // });

        allOrders.push(orderLine);

        console.log("Passo 4 - Array criado!");
        console.log("----------------------------------------------");

        if (orderLine.blackListed)
          notificationBlackList += allOrders[i].blackListedQty;

        if (orderLine.whiteListed)
          notificationWhiteList += allOrders[i].whiteListedQty;

        if (allOrders[i].status !== "canceled") {
          notificationAlerts += allOrders[i].alertsQty;
          if (riskScoreObject.final > 80) {
            totalRiskAmount += orderObject.value;
          }
        }
      } else {
        console.log("Pedido não encontrado na VTEX");
      }
    }
  } else {
    console.log("Lista não processada!");
  }
  const todayDate = getTodayDate(3);
  //let totalValue = allOrders.reduce((prevVal, elem) => prevVal + elem.valor, 0)
  //*-----------------------------------------------------
  //*? Return to React
  //*-----------------------------------------------------
  console.log("Retornando ao React");

  return {
    props: {
      eMessage,
      allOrders,
      notificationBlackList,
      notificationWhiteList,
      notificationAlerts,
      totalRiskAmount,
      todayDate,
    },
    // revalidate: 120, // 2 minutos
  };
}

export default OrderListPage;
