import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import React from "react";
import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
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

import setCurrency from "../../../../backend/utils/setCurrency";
import Image from "next/image";

import InsertChartIcon from "@material-ui/icons/InsertChart";

import RiskScoreChart from "./RiskScoreChart";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    // backgroundColor: theme.palette.warning.dark,
    backgroundColor: "#4d6e8a",
  },
  title: {
    // marginLeft: theme.spacing(2),
    flex: 1,
  },
  color: "Grey",
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#9bb2c7",
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

export default function ItemsDialog(props) {
  const classes = useStyles();
  const { orderDetail } = props;
  const [open, setOpen] = React.useState(true);
  const [orderId, setOrder] = useState(orderDetail.orderId);
  const [historyItems, setHistoryItems] = useState([{}]);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChartOpen = (e) => setIsChartOpen((prevState) => !prevState);

  useEffect(async () => {
    setOrder(orderDetail.orderId);
    const url = `/api/items/v${orderId}frdp-01`;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    setHistoryItems(data.history);
    setLoading(false);
  }, []);

  return (
    <Dialog
      maxWidth
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
            {orderDetail.cliente}
          </Typography>
        </Toolbar>
      </AppBar>

      <List>
        <ListItem>
          <ListItemText
            primary={"Pedido " + orderDetail.orderId}
            secondary={
              "Total de " +
              historyItems.length +
              " itens " +
              "em " +
              orderDetail.dataCompra
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
              <StyledTableCell align="left">Refência</StyledTableCell>
              <StyledTableCell align="left">SKU</StyledTableCell>
              <StyledTableCell align="left">Nome</StyledTableCell>
              <StyledTableCell align="right">Quantidade</StyledTableCell>
              <StyledTableCell align="right">Valor</StyledTableCell>
              {/* <StyledTableCell align="left">Produto</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              "Buscando dados históricos..."
            ) : (
              <>
                {historyItems.map((item, itemId) => (
                  <StyledTableRow key={itemId}>
                    <StyledTableCell align="left">{item.refId}</StyledTableCell>
                    <StyledTableCell align="left">
                      {item.productId}
                    </StyledTableCell>
                    <StyledTableCell align="left">{item.name}</StyledTableCell>
                    <StyledTableCell align="right">
                      {item.quantity}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {setCurrency(item.price)}
                    </StyledTableCell>
                    {/* <StyledTableCell align="left">
                      {
                        <a>
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            // className={styles.logo}
                            width={80}
                            height={42}
                          />
                        </a>
                      }
                    </StyledTableCell> */}
                  </StyledTableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
}
