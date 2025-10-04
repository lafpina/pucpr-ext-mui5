import React, { useState, useEffect } from "react";
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

import FeedTableDialog from "./FeedTableDialog";
import formatTZOrderDate from "../../../../backend/utils/formatTZOrderDate";
import setCurrency from "../../../../backend/utils/setCurrency";
import FeedTableDialogTitle from "./FeedTableDialogTitle";

//Estilização com `styled`
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: "#d5d5d5",
    fontSize: 13,
    fontWeight: "bold",
  },
  "&.MuiTableCell-body": {
    fontSize: 13,
    color: theme.palette.text.primary,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function ScoreWindow(props) {
  const { orderDetail, windowState } = props;
  const [cpf, setCpf] = useState(orderDetail.history[0]?.cpf || "");
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const url = `/api/history/${cpf}`;
        const response = await fetch(url, { method: "GET" });
        const data = await response.json();
        setHistoryItems(data.history.list || []);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
        setLoading(false);
      }
    };

    if (cpf) fetchHistory();
  }, [cpf]);

  useEffect(() => {
    const total = historyItems.reduce((prev, cur) => {
      return cur.status === "invoiced" ? prev + cur.totalValue : prev;
    }, 0);
    setTotalValue(total);
  }, [historyItems]);

  function sumUpInvoiced() {
    return historyItems.reduce((prev, cur) => {
      return cur.status === "invoiced" ? prev + 1 : prev;
    }, 0);
  }

  return (
    <FeedTableDialog windowState={windowState}>
      <FeedTableDialogTitle orderDetail={orderDetail} />

      {/* Conteúdo */}
      <DialogContent sx={{ bgcolor: "WhiteSmoke" }}>
        <DialogContentText>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 1,
                mb: 1.5,
                display: "flex",
                flexDirection: "column",
                height: 40,
              }}
            >
              <Box sx={{ fontSize: 14, color: "#757575", mb: 1 }}>
                {"Histórico: "}
                {sumUpInvoiced() > 0
                  ? `${sumUpInvoiced()} ${
                      historyItems.length > 1
                        ? "pedidos faturados"
                        : "pedido faturado"
                    } no valor total de ${setCurrency(totalValue)}`
                  : "Não há compras faturadas"}
              </Box>
            </Paper>
          </Grid>

          {/* Tabela */}
          <TableContainer component={Paper}>
            <Table size="small" aria-label="Histórico de Pedidos">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Data</StyledTableCell>
                  <StyledTableCell align="right">Pedido</StyledTableCell>
                  <StyledTableCell align="center">Itens</StyledTableCell>
                  <StyledTableCell align="right">Valor</StyledTableCell>
                  <StyledTableCell align="right">Pagamento</StyledTableCell>
                  <StyledTableCell align="right">Lista</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      Buscando dados históricos...
                    </TableCell>
                  </TableRow>
                ) : (
                  historyItems.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {formatTZOrderDate(item.creationDate).substr(0, 10)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.orderId.substr(1, 6)}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.totalItems}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {setCurrency(item.totalValue)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.paymentNames}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.listId}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ color: StatusStyle(item.statusDescription) }}
                      >
                        {item.statusDescription}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContentText>
      </DialogContent>
    </FeedTableDialog>
  );
}

// Função para definir a cor do status
const StatusStyle = (status) => {
  switch (status) {
    case "Cancelado":
      return "#D66460";
    case "Preparando Entrega":
      return "#f9a825";
    case "Faturado":
      return "#60D660";
    default:
      return "#d5d5d5";
  }
};
