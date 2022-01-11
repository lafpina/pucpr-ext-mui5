import { Description } from "@material-ui/icons";
import { buildRiskScoreLog } from "../utils/buildRiskScoreLog";
import { convertDate } from "../utils/convertDate";
import formatTZOrderDate from "../utils/formatTZOrderDate";
import moment from 'moment';
//? Apply Order Error Check 
export const applyOrderErrorCheck = (orderObject, riskScoreObject) => {

  if (orderObject.paymentGroupActive.giftCard && orderObject.giftId) {
    riskScoreObject.orderErrorCheck.cpl = true;
    riskScoreObject.orderErrorCheck.score += 50;
  }
  
  const createDate = orderObject.creationDate.substr(0, 10)
  const convertedDate = convertDate(createDate)

  const days = daysInterval(convertedDate, getCurrentDate())

  // Pedido em Preparando Entrega por tempo excessivo.
  if (orderObject.status == "handling" && days > 3) {
    riskScoreObject.orderErrorCheck.spe = true;
    riskScoreObject.orderErrorCheck.score += 50;
  }

  // Pedido em Pronto para Manuseio por tempo excessivo.
  if (orderObject.status == "ready-for-handling" && days > 0) {
    riskScoreObject.orderErrorCheck.spm = true;
    riskScoreObject.orderErrorCheck.score += 50;
  }

  // Pedido em Pagamento Pendente por tempo excessivo.
  if (orderObject.status == "payment-pending" && days > 0) {
    riskScoreObject.orderErrorCheck.spp = true;
    riskScoreObject.orderErrorCheck.score += 50;
  }

  
  riskScoreObject = buildRiskScoreLog(
    "r020",
    "CPL",
    "Possibilidade do Cliente ter efetuado compra para a própria lista",
    riskScoreObject.orderErrorCheck.score ? riskScoreObject.orderErrorCheck.cpl : 0,
    riskScoreObject
  );

  riskScoreObject = buildRiskScoreLog(
    "r021",
    "SPE",
    "Pedido em Preparando Entrega por tempo excessivo",
    riskScoreObject.orderErrorCheck.score ? riskScoreObject.orderErrorCheck.spe : 0,
    riskScoreObject
  );

  riskScoreObject = buildRiskScoreLog(
    "r022",
    "SPM",
    "Pedido em Pronto para Manuseio por tempo excessivo",
    riskScoreObject.orderErrorCheck.score ? riskScoreObject.orderErrorCheck.spm : 0,
    riskScoreObject
  );

  riskScoreObject = buildRiskScoreLog(
    "r023",
    "SPP",
    "Pedido em Aguardando Pagamento por tempo excessivo",
    riskScoreObject.orderErrorCheck.score ? riskScoreObject.orderErrorCheck.spp : 0,
    riskScoreObject
  );

  return riskScoreObject;
};


const daysInterval = (start, end) => {

  const initialDate = moment(start)
  const endDate = moment(end)

  return endDate.diff(initialDate, "days")
}
 


const getCurrentDate = () => {
  let  today 		= new Date();
	let  dd 		= String(today.getDate()).padStart(2, '0');
	let  mm 		= String(today.getMonth() + 1).padStart(2, '0'); //janvier = 0
	let  yyyy 		= today.getFullYear();

  return yyyy + '-' + mm + '-' + dd
}