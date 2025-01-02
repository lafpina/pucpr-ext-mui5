import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

// Definindo um estilo personalizado para TableCell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.paper,
  fontSize: 12,
  padding: theme.spacing(1),
}));

export const OrderTableBodyHist = ({ history }) => {
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
