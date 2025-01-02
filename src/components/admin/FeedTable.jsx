import React from "react";
import { useTheme, styled } from "@mui/material/styles";
import {
  Paper,
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableFooter,
  TablePagination,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";

// Table Cells
import { OrderIdCell } from "../includes/feedtable/tablecells/OrderIdCell";
import { OrderCreateDateCell } from "../includes/feedtable/tablecells/OrderCreateDateCell";
import { OrderClientCell } from "../includes/feedtable/tablecells/OrderClientCell";
import { OrderItemCell } from "../includes/feedtable/tablecells/OrderItemCell";
import { OrderValueCell } from "../includes/feedtable/tablecells/OrderValueCell";
import { OrderPaymentCell } from "../includes/feedtable/tablecells/OrderPaymentCell";
import { OrderShippingToCell } from "../includes/feedtable/tablecells/OrderShippingToCell";
import { OrderHistoryCell } from "../includes/feedtable/tablecells/OrderHistoryCell";
import { OrderGiftCell } from "../includes/feedtable/tablecells/OrderGiftCell";
import { OrderStatusCell } from "../includes/feedtable/tablecells/OrderStatusCell";
import { OrderScoreCell } from "../includes/feedtable/tablecells/OrderScoreCell";
import { OrderTableHead } from "../includes/feedtable/tablecells/OrderTableHead";
import { OrderTableHeadHist } from "../includes/feedtable/tablecells/OrderTableHeadHist";
import { OrderTableBodyHist } from "../includes/feedtable/tablecells/OrderTableBodyHist";

// ✅ Estilização da linha da tabela
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "& > *": {
    borderBottom: "unset",
    fontSize: 13,
    color: "Gray",
  },
}));

// ✅ Componente de Paginação Personalizada
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => onPageChange(event, 0);
  const handleBackButtonClick = (event) => onPageChange(event, page - 1);
  const handleNextButtonClick = (event) => onPageChange(event, page + 1);
  const handleLastPageButtonClick = (event) =>
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// ✅ Componente de Linha da Tabela
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <StyledTableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <OrderIdCell orderId={row.orderId} />
        <OrderCreateDateCell createDate={row.dataCompra} />
        <OrderClientCell client={row.cliente} />
        <OrderItemCell orderDetail={row} />
        <OrderValueCell orderDetail={row} />
        <OrderPaymentCell orderDetail={row} />
        <OrderShippingToCell shippingTo={row.destino} />
        <OrderHistoryCell orderDetail={row} />
        <OrderGiftCell
          giftId={row.giftId}
          giftName={row.giftName}
          giftEmail={row.giftEmail}
        />
        <OrderStatusCell
          statusDescription={row.statusDescription}
          status={row.status}
        />
        <OrderScoreCell orderDetail={row} />
      </StyledTableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={17}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="detalhe">
                <OrderTableHeadHist />
                <OrderTableBodyHist history={row.history} />
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

// ✅ Componente Principal
export default function FeedTable(props) {
  const { orders } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <OrderTableHead />
        <TableBody>
          {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
            <Row key={order.orderId} row={order} />
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={12} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, { label: "Tudo", value: -1 }]}
              colSpan={12}
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) =>
                setRowsPerPage(parseInt(event.target.value, 10))
              }
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
