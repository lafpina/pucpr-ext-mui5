import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { styled } from '@mui/material/styles';
import { 
  IconizeTitleOrder, 
  IconizeTitleDate, 
  IconizeTitleClient, 
  IconizeTitleItems, 
  IconizeTitleValue, 
  IconizeTitlePayment, 
  IconizeTitleDestination, 
  IconizeTitleProfile, 
  IconizeTitleGift, 
  IconizeTitleScore, 
  IconizeTitleStatus 
} from "../iconization/IconizeTitle";

// Estilização utilizando styled
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.action.hover,
    color: '#757575',
    fontSize: 12,
    fontWeight: 'bold',
  },
  '&.MuiTableCell-body': {
    fontSize: 12,
    color: theme.palette.info.light,
  },
}));

export const OrderTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell />
        <StyledTableCell align="center">Pedido</StyledTableCell>
        <StyledTableCell align="center">Data</StyledTableCell>
        <StyledTableCell align="left">Cliente</StyledTableCell>
        <StyledTableCell align="center">Produto</StyledTableCell>
        <StyledTableCell align="right">Valor</StyledTableCell>
        <StyledTableCell align="center">Pagamento</StyledTableCell>
        <StyledTableCell align="left">Entrega</StyledTableCell>
        <StyledTableCell align="center">Histórico</StyledTableCell>
        <StyledTableCell align="center">Lista</StyledTableCell>
        <StyledTableCell align="center">Status</StyledTableCell>
        <StyledTableCell align="right">Perfil</StyledTableCell>
      </TableRow>
    </TableHead>
  );
};
