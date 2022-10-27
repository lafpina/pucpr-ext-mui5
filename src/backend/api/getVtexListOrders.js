// Fetch VTEX API - GET LIST ORDERS
import getURL from "./getURL";
import getOption from "./getOption";
import moment from "moment";

async function getVtexListOrders() {
    let clientOrders;
    // let url = getURL("list", null);
    // let url = getURL("ListOrders1Day", null);

    const encodedUrl = defineEncodedUrl()
    let url = getURL("ListOrdersByRangeDate", encodedUrl);

    let options = getOption("order");

    console.log("Fetching LIST Order....");
    console.log("URL", url);

    let res = await fetch(url, options);

    if (res.ok) {
        console.log("Fetch OK");
        const data = await res.json();
        clientOrders = JSON.parse(JSON.stringify(data));
        // console.log(clientOrders.list);
    } else {
        console.log(`Não foi encontrado registro para a URL ${url}`);
        console.log(res);
    }
    return clientOrders;
}

export default getVtexListOrders;


const defineEncodedUrl = () => {

    const startDate = moment().format('2022-10-27')
    const endDate = moment().format('2022-10-28')
    return `f_creationDate=creationDate:%5B${startDate}T03:00:00.000Z%20TO%20${endDate}T02:59:59.999Z%5D&orderBy=creationDate,desc`



    // quando precisa pegar o dia anterior
    // const startDate = moment().subtract(10, 'days').format('YYYY-MM-DD') // = Transações dos últimos 2 dias
    //const endDate = moment().add(1, 'days').format('YYYY-MM-DD')
}