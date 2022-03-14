import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconizeTitleItems } from '../feedtable/iconization/IconizeTitle'
import { IconizeTitleValue } from '../feedtable/iconization/IconizeTitle'
import { IconizeTitleGift } from '../feedtable/iconization/IconizeTitle'
import { IconizeTitleScore } from '../feedtable/iconization/IconizeTitle'
import CancelIcon from "@material-ui/icons/Cancel";
import setCurrency from '../../../backend/utils/setCurrency';

const FeedBar = (props) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalGift, setTotalGift] = useState(0);
  const [totalRisk, setTotalRisk] = useState(0);
  const [totalCanceled, setTotalCanceled] = useState(0)

  useEffect(() => {
    let total = props.orders.reduce(function (total, amount) {
      return total + amount.valor
    }, 0)
    setTotalAmount(total)
  }, [totalAmount])

  useEffect(() => {
    const onlyGift = props.orders.filter(item => item.giftId > '')
    let total = onlyGift.reduce(function (total, amount) {
      return total + amount.valor
    }, 0)
    setTotalGift(total)
  }, [totalGift])

  useEffect(() => {
    const onlyRisk = props.orders.filter(item => item.score > 75)
    let total = onlyRisk.reduce(function (total, amount) {
      return total + amount.valor
    }, 0)
    setTotalRisk(total)
  }, [totalRisk])

  useEffect(() => {
    const onlyRisk = props.orders.filter(item => item.status == 'canceled')
    let total = onlyRisk.reduce(function (total, amount) {
      return total + amount.valor
    }, 0)
    setTotalCanceled(total)
  }, [totalCanceled])


  const FeedBarItem = (props) => {
    const { icon, totalAmount, newTotal } = props
    return (newTotal > 0 ? (
      <Box sx={{ ml: 2, display: 'inline' }}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', }}>
          {icon}
          <Typography fontSize='12px' sx={{ color: '#758d94', p: 1, display: 'inline', align: 'center' }}>
            {setCurrency(newTotal)} ({(newTotal / totalAmount * 100).toFixed(2)}%)
          </Typography>
        </div>
      </Box>) : null
    )
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={11.8} >
        <Paper sx={{ ml: 3, mt: 2, p: 1, display: 'flex', flexDirection: 'column', height: 55, background: '#ffffff' }}>
          <Box sx={{ ml: 2, display: 'flex' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', }}>
              <IconizeTitleItems size="small" />
              <Typography align='justify' fontSize='12px' sx={{ color: '#758d94', p: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                {props.orders.length}
              </Typography>
            </div>
            <Box sx={{ ml: 2, display: 'inline' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', }}>
                <IconizeTitleValue size="small" />
                <Typography fontSize='12px' sx={{ color: '#758d94', p: 1, display: 'inline', align: 'center' }}>
                  {setCurrency(totalAmount)} {props.orders.length > 0 ? '(' + (setCurrency(totalAmount / props.orders.length)) + ')' : ''}
                </Typography>
              </div>
            </Box>
            <FeedBarItem icon={<IconizeTitleGift size='small' />} totalAmount={totalAmount} newTotal={totalGift} />
            <FeedBarItem icon={<CancelIcon size='small' sx={{ color: '#758d94' }} />} totalAmount={totalAmount} newTotal={totalCanceled} />
            <FeedBarItem icon={<IconizeTitleScore size='small' />} totalAmount={totalAmount} newTotal={totalRisk} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}
export default FeedBar
