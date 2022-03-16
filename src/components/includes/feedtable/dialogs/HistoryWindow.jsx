import React from 'react';
import { useState, useEffect } from 'react'
import { makeStyles, withStyles } from "@mui/styles";
import { Paper, Grid, Box, Divider, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Slide } from "@mui/material";
import Draggable from 'react-draggable';
import ScoreStyle from './ScoreStyle'
import FeedTableDialog from './FeedTableDialog'
import formatTZOrderDate from "../../../../backend/utils/formatTZOrderDate";
import setCurrency from "../../../../backend/utils/setCurrency";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  color: "#616161",
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#d5d5d5',
  },
  body: {
    fontSize: 13,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
    },
  },
}))(TableRow);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function ScoreWindow(props) {
  const classes = useStyles()
  const { orderDetail, windowState } = props;
  const [cpf, setCpf] = useState(orderDetail.history[0].cpf);
  const [historyItems, setHistoryItems] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(async () => {
    setCpf(orderDetail.history[0].cpf);
    const url = `/api/history/${cpf}`;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    setHistoryItems(data.history.list);
    setLoading(false);
  }, []);

  useEffect(() => {
    // get sum of totalValue prop across all objects in array
    const total = historyItems.reduce(function (prev, cur) {
      return cur.status == "invoiced" ? prev + cur.totalValue : prev;
    }, 0);
    setTotalValue(total);
  }, [!loading]);

  function sumUpInvoiced() {
    const totalInvoiced = historyItems.reduce(function (prev, cur) {
      return cur.status == "invoiced" ? prev + 1 : prev;
    }, 0);
    return totalInvoiced;
  }

  return (
    <FeedTableDialog windowState={windowState}>
      {/* TITLE */}
      <DialogTitle style={{ cursor: 'move' }} sx={{ bgcolor: "WhiteSmoke" }} id="Dialog-Score" >
        <Grid container spacing={1}>
          <Grid item xs={12} >
            <Box sx={{ color: '#607d8b', fontSize: 18, mt: 0.5 }}>
              {orderDetail.orderId}
              <Box sx={{ display: 'inline', color: '#546e7a', fontSize: 16, mt: 0.5, ml: 1 }}>
                {orderDetail.cliente}
              </Box>
              <Box sx={{ color: '#90a4ae', fontSize: 16, mt: 0.5 }}>
                Risco {orderDetail.scoreDesc}:
                <Box sx={{ display: 'inline', fontSize: 18, mt: 0.5, ml: 1, color: ScoreStyle(orderDetail.score) }}>
                  {orderDetail.score}%
                </Box>
              </Box>
            </Box>
          </Grid>
          <Divider />
        </Grid>
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent sx={{ bgcolor: "WhiteSmoke" }} >
        <DialogContentText>
          <Grid item xs={12} >
            <Paper
              sx={{
                p: 1,
                mb: 1.5,
                display: 'flex',
                flexDirection: 'column',
                height: 40,
              }}
            >
              <Box sx={{ fontSize: 14, color: '#757575', mb: 1 }}>
                {'Histórico:  ' + (sumUpInvoiced() > 0 &&
                  sumUpInvoiced() +
                  " " +
                  ((historyItems.length - 1) > 1
                    ? "pedidos faturados"
                    : "pedido faturado") +
                  " no valor total de " +
                  setCurrency(totalValue)) ||
                  "Nenhum pedido ainda faturado"}
              </Box>
            </Paper>
          </Grid>

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
                  <StyledTableCell align="right">Pagamento</StyledTableCell>
                  <StyledTableCell align="right">Lista</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  "Buscando dados históricos..."
                ) : (
                  <>
                    {historyItems.map((item, orderId) => (
                      <StyledTableRow key={orderId}>
                        <StyledTableCell component="th" scope="row" sx={{ color: '#455a64' }}>
                          {formatTZOrderDate(item.creationDate).substr(0, 10)}
                        </StyledTableCell>
                        <StyledTableCell align="right" sx={{ color: '#455a64' }}>
                          {item.orderId.substr(1, 6)}
                        </StyledTableCell>
                        <StyledTableCell align="center" sx={{ color: '#455a64' }}>
                          {item.totalItems}
                        </StyledTableCell>
                        <StyledTableCell align="right" sx={{ color: '#455a64' }}>
                          {setCurrency(item.totalValue)}
                        </StyledTableCell>
                        <StyledTableCell align="right" sx={{ color: '#455a64' }}>
                          {item.paymentNames}
                        </StyledTableCell>
                        <StyledTableCell align="right" sx={{ color: '#455a64' }}>
                          {item.listId}
                        </StyledTableCell>
                        <StyledTableCell align="left" sx={{ color: StatusStyle(item.statusDescription) }}>
                          {item.statusDescription}
                        </StyledTableCell>
                      </StyledTableRow>
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
}

const StatusStyle = (status) => {
  switch (status) {
    case 'Cancelado':
      return "#D66460";
      break;
    case 'Preparando Entrega':
      return "#f9a825";
      break;
    case 'Faturado':
      return "#60D660";
      break;
    default:
      return "#d5d5d5";
  }
};
