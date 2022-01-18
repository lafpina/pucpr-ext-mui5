import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { useState, useEffect } from "react";
import { withStyles } from "@material-ui/styles";
import { makeStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import setCurrency from "../../../../backend/utils/setCurrency";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#4d6e8a",
    // backgroundColor: "#b1a878",
  },
  title: {
    // marginLeft: theme.spacing(2),
    flex: 1,
  },
  table: {
    minWidth: 650,
  },
  color: "Grey",
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: "#c4bb87",
    backgroundColor: "#4d6e8a",
    // color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      // backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function IncompleteOrdersDialog(props) {
  const classes = useStyles();
  const { orderDetail } = props;
  // const handleChartOpen = (e) => setIsChartOpen((prevState) => !prevState);
  // const [isChartOpen, setIsChartOpen] = useState(false);

  const [cpf, setCpf] = useState(orderDetail.history[0].cpf);
  const [clientName, setClientName] = useState(orderDetail.cliente);
  const [open, setOpen] = useState(true);
  const [historyItems, setHistoryItems] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});

  const handleClose = () => setOpen(false);

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
    <Dialog
      // fullScreen
      maxWidth="lg"
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Tentativas de Compra
          </Typography>
          {/* <Button autoFocus color="inherit" onClick={handleChartOpen}>
            <InsertChartIcon />
          </Button> */}
        </Toolbar>
      </AppBar>
      <List>
        <ListItem>
          <ListItemText
            primary={orderDetail.cliente}
            secondary={
              "Total de tentativas incompletas: " + historyItems.length
            }
          />
        </ListItem>
      </List>

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
              <StyledTableCell align="right">Lista</StyledTableCell>
              <StyledTableCell align="center">Pagamento</StyledTableCell>
              <StyledTableCell align="right">Parcelas</StyledTableCell>
              {/* <StyledTableCell align="center">TID</StyledTableCell> */}
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

      {/* {isChartOpen && <RiskScoreChart detail={orderDetail} />} */}
    </Dialog>
  );
}

const FormatDetailLine = (props) => {
  const { detailLine, index } = props;

  console.log("Detail Line", detailLine, index)

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
        <StyledTableCell align="right">{detailLine.list}</StyledTableCell>
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
