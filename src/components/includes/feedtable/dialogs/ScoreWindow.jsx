import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { List, ListItemText, ListItem, Divider } from '@material-ui/core'
import { Paper, Grid, Box, Fab, IconButton } from '@mui/material'
import Draggable from 'react-draggable';
import ScoreChart from './ScoreChart'
import CloseIcon from '@mui/icons-material/Close';
import { IconizeRiskLevel } from "../iconization/IconizeRiskLevel"
import ScoreStyle from './ScoreStyle';

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
  const { orderDetail, windowState } = props;
  const [open, setOpen] = useState(true);
  const [isReportButtonClicked, setIsReportButtonClicked] = useState(false);
  const handleClickOpen = () => { setOpen(true) };
  const handleClose = () => {
    setOpen(false)
    windowState()
  };
  const handleReportButtonClicked = (e) => setIsReportButtonClicked((prevState) => !prevState);

  return (
    <>
      <Dialog
        open={open}
        fullWidth="lg"
        maxWidth="md"
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        {handleClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}

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
            <Grid container spacing={1}>

              {/* CHART */}

              <Grid item xs={9} >
                <Paper
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 210,
                  }}
                >
                  {/* <CardChart detail={orderDetail} /> */}
                  {/* <Box sx={{ color: '#455a64', m: 0.5, ml: 1, fontSize: 18 }}>
                    Análise
                  </Box> */}
                  <ScoreChart detail={orderDetail} />
                </Paper>
              </Grid>

              {/* PERFIL */}

              <Grid item xs={3} >
                <Paper
                  sx={{
                    p: 1,
                    display: 'flex row',
                    height: 210,
                  }}
                >
                  <Box sx={{ color: '#455a64', m: 0.5, ml: 1, fontSize: 18 }}>
                    Perfil
                  </Box>
                  <Box sx={{ color: 'SteelBlue', fontSize: 25, ml: 9.5, mt: 6 }}>
                    <IconizeRiskLevel riskLevel={orderDetail.scoreDesc} size="large" />
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sx={{ bgcolor: "WhiteSmoke", mt: 0.2 }}>
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: 14,
                    color: '#607d8b',
                  }}>

                  {/* PONTOS RELEVANTES */}

                  <Box sx={{ color: '#455a64', ml: 1, mt: 2, fontSize: 18, pl: 1 }}>
                    Pontos Relevantes
                  </Box>
                  <Box sx={{ ml: 1, mt: 0.2 }}>
                    <List dense >
                      {orderDetail.riskProfile.riskScoreLog
                        .filter((rule) => rule.score != 0)
                        .map((rule, ruleId) => {
                          return (
                            <div key={ruleId}>
                              <ListItem key={ruleId} >
                                <ListItemText
                                  id={rule.ruleId}
                                  primary={rule.ruleName}
                                // secondary={"score " + rule.score}
                                />
                              </ListItem>
                              <Divider />
                            </div>
                          );
                        })}
                    </List>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>

        {/* ACTIONS */}

        <DialogActions sx={{ bgcolor: '#cfd8dc' }}>
          <Fab variant="extended" size="medium" autoFocus onClick={handleClose}
            sx={{
              bgcolor: "#546e7a",
              color: "White",
              fontSize: 13,
              mb: 2,
              mt: 2,
              mr: 4,
              '&:hover': {
                color: 'white',
                backgroundColor: '#78909c',
              },
            }}
          >
            Reportar
          </Fab>
        </DialogActions>
        {/* {isReportButtonClicked && <QuestionDialog question={"Tem Certeza"} />} */}
      </Dialog>
    </>
  );
}
