import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import React from "react";
import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import formatTZOrderDate from "../../helper/utils/formatTZOrderDate";
import setCurrency from "../../helper/utils/setCurrency";

import InsertChartIcon from "@material-ui/icons/InsertChart";

import RiskScoreChart from "./RiskScoreChart";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    // backgroundColor: "#4d6e8a",
    backgroundColor: "#b1a878",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  table: {
    minWidth: 650,
  },
  color: "Grey",
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#c4bb87",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
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

  const handleClose = () => setOpen(false);

  useEffect(async () => {
    setClientName(orderDetail.cliente);
    const url = `/api/incomplete/${clientName}`;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    console.log("Data History=> ", data.history);
    setHistoryItems(data.history);
    setLoading(false);
  }, []);

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
            secondary={"Total de tentativas: " + historyItems.length}
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
                    <StyledTableCell component="th" scope="row">
                      {formatTZOrderDate(item.creationDate)}
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
                    <StyledTableCell align="left">
                      {item.statusDescription}
                    </StyledTableCell>
                  </StyledTableRow>
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
