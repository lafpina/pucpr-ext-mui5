//? API components
import getVtexOrder from "../../backend/api/getVtexOrder";
import getOption from "../../backend/api/getOption";
import getVtexListOrders from "../../backend/api/getVtexListOrders";
import getURL from "../../backend/api/getURL";

//? Helpers
import buildOrderObject from "../../backend/orders/buildOrderObject";
import { buildRiskScoreObject } from "../../backend/orders/buildRiskScoreObject";
import { buildOrderLine } from "../../backend/orders/buildOrderLine";
import getTodayDate from "../../backend/utils/getTodayDate";

import dynamic from "next/dynamic";


// Replaced a regular import as bellow to Dynamic Component With No SSR
// import Dashboard from "../../components/admin/Dashboard";
const DynamicComponentWithNoSSR = dynamic(
  () => import("../../components/admin/DashboardMui5"),
  { ssr: false }
);

function OrderListPage(props) {
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
