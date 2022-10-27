import { DialogTitle, Grid, Box, Divider, Paper } from '@mui/material'
import ScoreStyle from './ScoreStyle'

const FeedTableDialogTitle = (props) => {
  const { orderDetail } = props

  return (
    <>
      {/* TITLE */}
      < DialogTitle style={{ cursor: 'move' }} sx={{ bgcolor: "WhiteSmoke" }} id="draggable-dialog-title" >
        <Grid container spacing={1}>
          <Grid item xs={9} >
            <Box sx={{ color: '#607d8b', fontSize: 18, mt: 0.5, p: 2 }}>
              Pedido: {orderDetail.orderId}
              <Box sx={{ display: 'inline', color: '#546e7a', fontSize: 16, ml: 1 }}>
                {orderDetail.cliente}
              </Box>
              <Box sx={{ color: '#90a4ae', fontSize: 16 }}>
                Risco {orderDetail.scoreDesc}:
                <Box sx={{ display: 'inline', fontSize: 22, ml: 1, color: ScoreStyle(orderDetail.score) }}>
                  {orderDetail.score}%
                </Box>
              </Box>
            </Box>
          </Grid>
          <Divider />
        </Grid>
      </DialogTitle >
    </>
  )
}
export default FeedTableDialogTitle