import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@mui/styles'
import { Table, TableHead, TableRow, TableBody, TableCell, TableContainer, Paper, DialogContentText, DialogContent } from '@mui/material'
import FeedTableDialog from './FeedTableDialog'
import FeedTableDialogTitle from './FeedTableDialogTitle'
import setCurrency from "../../../../backend/utils/setCurrency";

const useStyles = makeStyles((theme) => ({
  title: {
    // marginLeft: theme.spacing(2),
    flex: 1,
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
      // backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const ItemsWindows = (props) => {
  const classes = useStyles()
  const { orderDetail, windowState } = props
  const [orderId, setOrder] = useState(orderDetail.orderId);
  const [historyItems, setHistoryItems] = useState([{}]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    setOrder(orderDetail.orderId);
    const url = `/api/items/v${orderId}frdp-01`;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    setHistoryItems(data.history);
    setLoading(false);
  }, []);


  return (
    <FeedTableDialog windowState={windowState}>
      <FeedTableDialogTitle orderDetail={orderDetail} />
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
  )
}

export default ItemsWindows