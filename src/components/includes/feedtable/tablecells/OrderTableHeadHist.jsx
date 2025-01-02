import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { styled } from '@mui/material/styles';

// Estilização do TableCell utilizando styled
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: "Gray",
  backgroundColor: theme.palette.grey[100], // Usar o sistema de cores do Material-UI
  boxShadow: theme.shadows[1], // Aplicar sombra conforme o padrão Material-UI
  fontSize: 11,
  fontWeight: 'bold',
}));

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
