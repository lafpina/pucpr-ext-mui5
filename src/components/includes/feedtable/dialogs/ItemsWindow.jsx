import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  DialogContentText,
  DialogContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import FeedTableDialog from './FeedTableDialog';
import FeedTableDialogTitle from './FeedTableDialogTitle';
import setCurrency from '../../../../backend/utils/setCurrency';

// ✅ Estilização com `styled`
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: '#d5d5d5',
    fontSize: 14,
    fontWeight: 'bold',
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
    color: theme.palette.text.primary,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ItemsWindows = (props) => {
  const { orderDetail, windowState } = props;
  const [orderId, setOrder] = useState(orderDetail?.orderId || '');
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setOrder(orderDetail.orderId);
        const url = `/api/items/v${orderId}frdp-01`;
        const response = await fetch(url, { method: 'GET' });
        const data = await response.json();
        setHistoryItems(data.history || []);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados históricos:', error);
        setLoading(false);
      }
    };

    if (orderId) fetchHistory();
  }, [orderId, orderDetail]);

  return (
    <FeedTableDialog windowState={windowState}>
      <FeedTableDialogTitle orderDetail={orderDetail} />
      {/* ✅ Conteúdo */}
      <DialogContent sx={{ bgcolor: 'WhiteSmoke' }}>
        <DialogContentText>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="Detalhes dos Itens">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Referência</StyledTableCell>
                  <StyledTableCell align="left">SKU</StyledTableCell>
                  <StyledTableCell align="left">Nome</StyledTableCell>
                  <StyledTableCell align="right">Quantidade</StyledTableCell>
                  <StyledTableCell align="right">Valor</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Buscando dados históricos...
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {historyItems.map((item, itemId) => (
                      <StyledTableRow key={itemId}>
                        <StyledTableCell align="left">
                          {item.refId || '-'}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.productId || '-'}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.name || '-'}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {item.quantity || '-'}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {setCurrency(item.price || 0)}
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
};

export default ItemsWindows;
