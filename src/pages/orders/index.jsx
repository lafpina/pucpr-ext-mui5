//? Material UI
import { makeStyles } from "@material-ui/core";

//? API components
import getOrder from "../../helper/api/getOrder";
import getOption from "../../helper/api/getOption";
import getListOrders from "../../helper/api/getListOrders";
import getURL from "../../helper/api/getURL";

//? Helpers
import buildOrderObject from "../../helper/orders/buildOrderObject";
import { buildRiskScoreObject } from "../../helper/orders/buildRiskScoreObject";
import { buildOrderLine } from "../../helper/orders/buildOrderLine"
import { buildRiskAnalysys } from "../../helper/orders/buildRiskAnalysis"
import getTodayDate from "../../helper/utils/getTodayDate";

//? Lab
import Dashboard from "../../components/admin/Dashboard"

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
    <>
      <Dashboard 
        orders={props.allOrders} 
        notificationBlackList={props.notificationBlackList} 
        notificationWhiteList={props.notificationWhiteList} 
        notificationAlerts={props.notificationAlerts}
        totalRiskAmount={props.totalRiskAmount} 
        todayDate={props.todayDate}
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
  var cleanFeedOrders = [];

  let eMessage = {
    fetchListOrder: 0,
  }

  let notificationBlackList = 0
  let notificationWhiteList = 0
  let notificationAlerts = 0
  let totalRiskAmount = 0

  //! Fetch LIST ORDER
  let orderList = await getListOrders();

  if (orderList) {
    eMessage.fetchListOrder = 200;
    cleanFeedOrders = orderList.list;
  }

  //*-----------------------------------------------------
  //*? Fetch Order based on cleanFeedOrders -> allOrders
  //*-----------------------------------------------------
  let options = getOption("order");

  for (let i = 0; i < cleanFeedOrders.length; ++i) {
    let orderParm = cleanFeedOrders[i].orderId;
    let url = getURL("order", orderParm);

    //! Fetch GET ORDER
    let vtexOrder = await getOrder(url, options);

    if (vtexOrder) {
      const orderObject = await buildOrderObject(vtexOrder);
      const riskScoreObject = await buildRiskScoreObject(orderObject);
      const riskAnalysisResult = buildRiskAnalysys(riskScoreObject)
      const orderLine = buildOrderLine(orderObject, riskScoreObject, riskAnalysisResult)
      allOrders.push(orderLine)

      notificationBlackList += allOrders[i].blackListedQty
      notificationWhiteList += allOrders[i].whiteListedQty

      if (allOrders[i].status !== "canceled") {
        notificationAlerts += allOrders[i].alertsQty
        if (riskScoreObject.final > 80) {
          totalRiskAmount += orderObject.value 
       }
      }
      // if (orderObject.orderId == "v958149frdp-01") {
      //   console.log(orderLine)
      // }

    } else {
      console.log("Pedido não encontrada na VTEX");
    }
  } 

  const todayDate = getTodayDate(3)

  let totalValue = allOrders.reduce((prevVal, elem) => prevVal + elem.valor, 0)


  // let totVal0003 = allOrders.filter((order) => {
  //   order.creationTime.getHours() >"23" && order.creationTime.getHours() < "03"
  // })

  // console.log("Total Value:", totalValue)
  // console.log("Total 00:00 - 03:00:", totVal0003)
  // console.log(allOrders[0])


  // dogsAgeSum = animais.filter((animal) => animal.tipo === 'cao')
  // .map((cao) => cao.idade *= 7)
  // .reduce((total, cao) => total += cao)


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
      todayDate
    },
    // revalidate: 120, // 2 minutos
  };
}

export default OrderListPage;
