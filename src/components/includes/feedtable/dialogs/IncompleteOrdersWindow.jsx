import React from "react";
import { useState, useEffect } from 'react'
import FeedTableDialog from './FeedTableDialog'
import FeedTableDialogTitle from './FeedTableDialogTitle'
import { makeStyles, withStyles } from "@mui/styles";
import { Paper, Grid, Box, DialogContent, DialogContentText } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Draggable from 'react-draggable';
import formatTZOrderDate from "../../../../backend/utils/formatTZOrderDate";
import setCurrency from "../../../../backend/utils/setCurrency";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
  },
  table: {
    minWidth: 650,
  },
  color: "Grey",
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#d5d5d5",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
    },
  },
}))(TableRow);


const IncompleteOrdersWindow = (props) => {
  const classes = useStyles();
  const { orderDetail, windowState } = props;
  const [cpf, setCpf] = useState(orderDetail.history[0].cpf);
  const [clientName, setClientName] = useState(orderDetail.cliente);
  const [open, setOpen] = useState(true);
  const [historyItems, setHistoryItems] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});

  useEffect(async () => {
    // setClientName(orderDetail.cliente);
    // const url = `/api/incomplete/${clientName}`;
    setCpf(orderDetail.history[0].cpf);
    const url = `/api/incompletebycpf/${cpf}`;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    console.log("Data History=> ", data.history);
    setHistoryItems(data.history);
    getCurrentOrder();
    setLoading(false);
  }, []);

  const getCurrentOrder = () => {
    const item = {
      orderId: `v${orderDetail.orderId}frdp-01`,
      date: orderDetail.dataCompra,
      value: orderDetail.valor,
      items: orderDetail.items,
      list: orderDetail.giftId,
      payment: orderDetail.payMethod,
      creditCard: orderDetail.creditCard,
      installments: orderDetail.history[0].parcelas,
      tid: "",
      statusDescription: orderDetail.statusDescription,
      reason: "-",
    };
    setItem(item);
  };

  return (
    <FeedTableDialog windowState={windowState}>
      <FeedTableDialogTitle orderDetail={orderDetail} />
      {/* CONTENT */}
      <DialogContent sx={{ bgcolor: "WhiteSmoke" }} >
        <DialogContentText>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Data</StyledTableCell>
                  <StyledTableCell align="right">Pedido</StyledTableCell>
                  <StyledTableCell align="center">Itens</StyledTableCell>
                  <StyledTableCell align="right">Valor</StyledTableCell>
                  <StyledTableCell align="center">Pagamento</StyledTableCell>
                  <StyledTableCell align="right">Parcelas</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                  <StyledTableCell align="center">Motivo</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  "Buscando dados históricos..."
                ) : (
                  <>
                    <FormatDetailLine detailLine={item} index={item.orderId} />
                    {historyItems.map((item, orderId) => (
                      <FormatDetailLine detailLine={item} index={orderId} />
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContentText>
      </DialogContent>
    </FeedTableDialog>
  )
}

const FormatDetailLine = (props) => {
  const { detailLine, index } = props;

  return (
    <>
      <StyledTableRow key={index}>
        <StyledTableCell component="th" scope="row">
          {detailLine.date}
        </StyledTableCell>
        <StyledTableCell align="right">
          {detailLine.orderId.substr(1, 6)}
        </StyledTableCell>
        <StyledTableCell align="center">{detailLine.items}</StyledTableCell>
        <StyledTableCell align="right">
          {setCurrency(detailLine.value)}
        </StyledTableCell>
        <StyledTableCell align="center">
          {detailLine.creditCard ? detailLine.creditCard : ""}
        </StyledTableCell>
        <StyledTableCell align="center">
          {detailLine.installments}
        </StyledTableCell>
        <StyledTableCell align="left">
          {detailLine.statusDescription}
        </StyledTableCell>
        <StyledTableCell align="center">{detailLine.reason}</StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default IncompleteOrdersWindow