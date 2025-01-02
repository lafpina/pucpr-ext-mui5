import React, { useState, useEffect } from "react";
import FeedTableDialog from "./FeedTableDialog";
import FeedTableDialogTitle from "./FeedTableDialogTitle";
import {
  Paper,
  Grid,
  Box,
  DialogContent,
  DialogContentText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import formatTZOrderDate from "../../../../backend/utils/formatTZOrderDate";
import setCurrency from "../../../../backend/utils/setCurrency";

// ✅ Estilização com `styled`
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: "#d5d5d5",
    fontSize: 14,
    fontWeight: "bold",
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
    color: theme.palette.text.primary,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const IncompleteOrdersWindow = (props) => {
  const { orderDetail, windowState } = props;
  const [cpf, setCpf] = useState(orderDetail.history[0]?.cpf || "");
  const [clientName, setClientName] = useState(orderDetail.cliente || "");
  const [open, setOpen] = useState(true);
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const url = `/api/incompletebycpf/${cpf}`;
        const response = await fetch(url, { method: "GET" });
        const data = await response.json();
        setHistoryItems(data.history || []);
        getCurrentOrder();
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados incompletos:", error);
        setLoading(false);
      }
    };

    if (cpf) fetchHistory();
  }, [cpf]);

  const getCurrentOrder = () => {
    const item = {
      orderId: `v${orderDetail.orderId}frdp-01`,
      date: orderDetail.dataCompra,
      value: orderDetail.valor,
      items: orderDetail.items,
      list: orderDetail.giftId,
      payment: orderDetail.payMethod,
      creditCard: orderDetail.creditCard,
      installments: orderDetail.history[0]?.parcelas || "",
      tid: "",
      statusDescription: orderDetail.statusDescription,
      reason: "-",
    };
    setItem(item);
  };

  return (
    <FeedTableDialog windowState={windowState}>
      <FeedTableDialogTitle orderDetail={orderDetail} />

      {/* ✅ Conteúdo */}
      <DialogContent sx={{ bgcolor: "WhiteSmoke" }}>
        <DialogContentText>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="Pedidos Incompletos">
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
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      Buscando dados históricos...
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    <FormatDetailLine detailLine={item} index={item.orderId} />
                    {historyItems.map((item, orderId) => (
                      <FormatDetailLine
                        detailLine={item}
                        index={orderId}
                        key={orderId}
                      />
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContentText>
      </DialogContent>
    </FeedTableDialog>
  );
};

const FormatDetailLine = (props) => {
  const { detailLine, index } = props;

  return (
    <StyledTableRow key={index}>
      <StyledTableCell component="th" scope="row">
        {formatTZOrderDate(detailLine.date).substr(0, 10)}
      </StyledTableCell>
      <StyledTableCell align="right">
        {detailLine.orderId?.substr(1, 6) || ""}
      </StyledTableCell>
      <StyledTableCell align="center">{detailLine.items}</StyledTableCell>
      <StyledTableCell align="right">
        {setCurrency(detailLine.value)}
      </StyledTableCell>
      <StyledTableCell align="center">
        {detailLine.creditCard || ""}
      </StyledTableCell>
      <StyledTableCell align="center">
        {detailLine.installments || ""}
      </StyledTableCell>
      <StyledTableCell align="left">
        {detailLine.statusDescription}
      </StyledTableCell>
      <StyledTableCell align="center">{detailLine.reason}</StyledTableCell>
    </StyledTableRow>
  );
};

export default IncompleteOrdersWindow;
