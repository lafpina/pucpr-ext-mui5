// Fetch VTEX API - GET LIST ORDERS
import getURL from "./getURL";
import getOption from "./getOption";
import moment from "moment";

async function getVtexListOrders() {
    let clientOrders;

    const encodedUrl = defineEncodedUrl()
    let url = getURL("ListOrdersByRangeDate", encodedUrl);

    let options = getOption("order");

    try {
        let res = await fetch(url, options);

        if (!res.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        if (res.ok) {
            const data = await res.json();
            clientOrders = JSON.parse(JSON.stringify(data));
        } else {
            console.log(`Não foi encontrado registro para a URL ${url}`);
            console.log(res);
        }
        return clientOrders;
    } catch (err) {
        console.log('========== ERRO INÍCIO ==========')
        console.log(err)
        console.log('========== ERRO FIM ==========')

    }

}

export default getVtexListOrders;


const defineEncodedUrl = () => {

    const startDate = moment().format('2025-10-04')
    const endDate = moment().format('2025-10-05')
    return `f_creationDate=creationDate:%5B${startDate}T03:00:00.000Z%20TO%20${endDate}T02:59:59.999Z%5D&orderBy=creationDate,desc`

}