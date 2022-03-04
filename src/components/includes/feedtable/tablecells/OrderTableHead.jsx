import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from '@mui/styles';
import { IconizeTitleOrder, IconizeTitleDate, IconizeTitleClient, IconizeTitleItems, IconizeTitleValue, IconizeTitlePayment, IconizeTitleDestination, IconizeTitleProfile, IconizeTitleGift, IconizeTitleScore, IconizeTitleStatus } from "../iconization/IconizeTitle";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.action.hover,
    // color: theme.palette.warning.dark,
    color: '#757575',
    fontSize: 12,
  },
  body: {
    fontSize: 12,
    color: theme.palette.info.light,
  },
}))(TableCell);

export const OrderTableHead = () => {
  return (
    <>
      <TableHead>
        <TableRow>
          <StyledTableCell />
          {/* <StyledTableCell align="center">{<IconizeTitleOrder size="medium" />}</StyledTableCell>
            <StyledTableCell align="center">{<IconizeTitleDate size="medium" />}</StyledTableCell>
            <StyledTableCell align="left">{<IconizeTitleClient size="medium" />}</StyledTableCell>
            <StyledTableCell align="center">{<IconizeTitleItems size="medium" />}</StyledTableCell>
            <StyledTableCell align="right">{<IconizeTitleValue size="medium" />}</StyledTableCell>
            <StyledTableCell align="center">{<IconizeTitlePayment size="medium" />}</StyledTableCell>
            <StyledTableCell align="left">{<IconizeTitleDestination size="medium" />}</StyledTableCell>
            <StyledTableCell align="center">{<IconizeTitleProfile size="medium" />}</StyledTableCell>
            <StyledTableCell align="center">{<IconizeTitleGift size="medium" />}</StyledTableCell>
            <StyledTableCell align="center">{<IconizeTitleStatus size="medium" />}</StyledTableCell>
            <StyledTableCell align="right">{<IconizeTitleScore size="medium" />}</StyledTableCell> */}
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
          <StyledTableCell align="right">Score</StyledTableCell>

        </TableRow>
      </TableHead>
    </>
  )
}
