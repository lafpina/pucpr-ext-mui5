import React from "react";
//? Material UI
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
//? Includes
import { OrderIdCell } from "../includes/order_table_cells/OrderIdCell";
import { OrderCreateDateCell } from "../includes/order_table_cells/OrderCreateDateCell";
import { OrderClientCell } from "../includes/order_table_cells/OrderClientCell";
import { OrderItemCell } from "../includes/order_table_cells/OrderItemCell";
import { OrderValueCell } from "../includes/order_table_cells/OrderValueCell";
import { OrderPaymentCell } from "../includes/order_table_cells/OrderPaymentCell";
import { OrderShippingToCell } from "../includes/order_table_cells/OrderShippingToCell";
import { OrderHistoryCell } from "../includes/order_table_cells/OrderHistoryCell";
import { OrderGiftCell } from "../includes/order_table_cells/OrderGiftCell";
import { OrderStatusCell } from "../includes/order_table_cells/OrderStatusCell";
import { OrderScoreCell } from "../includes/order_table_cells/OrderScoreCell";

import { OrderTableHead } from "../includes/order_table_cells/OrderTableHead";
import { OrderTableHeadHist } from "../includes/order_table_cells/OrderTableHeadHist";
import { OrderTableBodyHist } from "../includes/order_table_cells/OrderTableBodyHist";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
      fontSize: 13,
      color: "Gray",
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <>
      <TableRow className={classes.root}>
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
        <OrderPaymentCell
          orderDetail={row}
          // creditCard={row.creditCard}
          // incompleteOrders={row.incompleteOrders}
          // paymentMethod={row.payMethod}
        />
        <OrderShippingToCell shippingTo={row.destino} />

        <OrderHistoryCell orderDetail={row} />

        <OrderGiftCell giftId={row.giftId} giftName={row.giftName} />

        <OrderStatusCell
          statusDescription={row.statusDescription}
          status={row.status}
        />

        <OrderScoreCell orderDetail={row} />
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={17}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {/* <Typography variant="button" color="textSecondary" component="div">
                {row.cliente}
              </Typography> */}
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

export default function NewOrders(props) {
  const { orders } = props;
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <OrderTableHead />
          <TableBody>
            {orders.map((order) => (
              <Row key={order.orderId} row={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
