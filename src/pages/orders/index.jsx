import styles from "../../styles/Home.module.css";
import Image from "next/image";

//? Material UI
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";

//? API components
import getOrder from "../../components/lib/api/getOrder";
import getOption from "../../components/lib/api/getOption";
import getListOrders from "../../components/lib/api/getListOrders";
import getURL from "../../components/lib/api/getURL";

//? Customized components
import RiskScoreListTable from "../../components/orders/risk-score-list-table";
import buildOrderObject from "../../helper/orders/build-order-object";
import { buildRiskScoreObject } from "../../helper/orders/build-risk-score-object";
import { buildOrderLine } from "../../helper/orders/build-order-line"

import { buildRiskAnalysys } from "../../helper/orders/build-risk-analysis"

//? Lab
// import PrimarySearchAppBar from "../../components/layouts/appNavBar";
// import Dashboard from "@material-ui/icons/Dashboard";
// import Dashboard from "../../templates/Dashboard";


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
      <div>
        {props.eMessage.fetchListOrder === 200 ? (
          <RiskScoreListTable orders={props.allOrders} />
        ) : "Problema encontrado. Contacte o Desenvolvedor!"}
      </div>
    </Container>
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

      // if (orderObject.orderId == "v957699frdp-01") {
      //   console.log(orderLine)
      // }

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
      eMessage,
      allOrders,
    },
    // revalidate: 120, // 2 minutos
  };
}

export default OrderListPage;
