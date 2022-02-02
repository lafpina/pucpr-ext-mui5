import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'


function OrderDetail(props) {
  const { orderDetail } = props
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} >
          <Box sx={{ color: '#607d8b', fontSize: 16, mt: 0.5 }}>
            {orderDetail.orderId}
            <Box sx={{ display: 'inline', mt: 0.5, ml: 1, color: scoreStyle(orderDetail.score) }}>
              {orderDetail.score}%
            </Box>
          </Box>
        </Grid>
        <Divider />
      </Grid>
    </>
  )
}

export default OrderDetail