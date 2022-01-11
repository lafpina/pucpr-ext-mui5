import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { styled } from '@mui/material/styles';


const StyledTableCell = styled(TableCell, {})({
  color: "Gray",
  backgroundColor: "Snow",
  fontSize: 12,
});


export const OrderTableBodyHist = (props) => {
  const { history } = props;

  return (
    <TableBody>
      {history.map((historyRow, index) => (
        <TableRow key={index}>
          <StyledTableCell align="left">{historyRow.cpf}</StyledTableCell>
          <StyledTableCell align="left">{historyRow.emailCliente}</StyledTableCell>
          <StyledTableCell align="left">{historyRow.phone}</StyledTableCell>
          <StyledTableCell align="left">{historyRow.postalCode}</StyledTableCell>
          <StyledTableCell align="center">{historyRow.state}</StyledTableCell>
          <StyledTableCell align="center">{historyRow.cardCountry}</StyledTableCell>
          <StyledTableCell align="center">{historyRow.parcelas}</StyledTableCell>
          <StyledTableCell align="left">{historyRow.titular}</StyledTableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
