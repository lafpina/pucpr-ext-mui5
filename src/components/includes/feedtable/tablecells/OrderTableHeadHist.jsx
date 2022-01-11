import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { styled } from '@mui/material/styles';


const StyledTableCell = styled(TableCell, {})({
  color: "Gray",
  backgroundColor: "Snow",
  boxShadow: 2,
  fontSize: 11,
});

export const OrderTableHeadHist = () => {
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell align="left">CPF</StyledTableCell>
        <StyledTableCell align="left">EMAIL</StyledTableCell>
        <StyledTableCell align="left">TEL</StyledTableCell>
        <StyledTableCell align="left">CEP</StyledTableCell>
        <StyledTableCell align="center">ESTADO</StyledTableCell>
        <StyledTableCell align="center">PAÍS</StyledTableCell>
        <StyledTableCell align="center">PARCELA</StyledTableCell>
        <StyledTableCell align="left">TITULAR</StyledTableCell>
      </TableRow>
    </TableHead>
  );
};
