import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export const OrderTableBodyHist = (props) => {

   const { history } = props

   return (
      <TableBody>
         {history.map((historyRow) => (
            <TableRow key={history.pedido}>
               <TableCell align="left">{historyRow.cpf}</TableCell>
               <TableCell align="left">{historyRow.emailCliente}</TableCell>
               <TableCell align="left">{historyRow.phone}</TableCell>
               <TableCell align="left">{historyRow.postalCode}</TableCell>
               <TableCell align="center">{historyRow.state}</TableCell>
               <TableCell align="center">{historyRow.cardCountry}</TableCell>
               <TableCell align="center">{historyRow.parcelas}</TableCell>
               <TableCell align="left">{historyRow.titular}</TableCell>
            </TableRow>
         ))}
      </TableBody>
   )
}
