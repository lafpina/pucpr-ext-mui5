import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Grid from '@mui/material/Grid';
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Box from '@mui/material/Box';
import { IconizeRiskLevel } from "../iconization/IconizeRiskLevel"
import Fab from '@mui/material/Fab';
import ScoreChart from './ScoreChart'
import setCurerency from "../../../../backend/utils/setCurrency"

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

const scoreStyle = (score) => {
  switch (score) {
    case 100:
    case 95:
    case 90:
    case 85:
    case 80:
      return "#D66460";
      break;
    case 75:
    case 70:
    case 65:
      return "#f9a825";
      break;
    default:
      return "#60D660";
  }
};

export default function ScoreWindow(props) {

  const { orderDetail } = props;
  const [open, setOpen] = React.useState(true);
  const [isChartOpen, setIsChartOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
        {/* TITLE */}

        <DialogTitle style={{ cursor: 'move' }} sx={{ bgcolor: "WhiteSmoke" }} id="Dialog-Score" >
          <Grid container spacing={1}>
            <Grid item xs={12} >
              <Box sx={{ color: '#607d8b', fontSize: 16, mt: 0.5  }}>
              {orderDetail.orderId}
                <Box sx={{ display: 'inline', color: '#546e7a', fontSize: 16, mt: 0.5, ml: 1  }}>
                 {orderDetail.cliente}
                </Box>
                <Box sx={{ display: 'inline', color: '#90a4ae', fontSize: 16, mt: 0.5, ml: 1 }}>
                 Risco {orderDetail.scoreDesc}:
                </Box>
                <Box sx={{ display: 'inline', mt: 0.5, ml: 1, color: scoreStyle(orderDetail.score) }}>
                  {orderDetail.score}%
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
                  <Box sx={{color: '#455a64', m: 0.5, ml: 1, fontSize: 18 }}>
                    Perfil
                  </Box>
                  <Box sx={{ color: 'SteelBlue', fontSize: 25 , ml: 9.5, mt: 6 }}>
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

                  <Box sx={{color: '#455a64', ml: 1, mt: 2, fontSize: 18, pl: 1 }}>
                    Pontos Relevantes
                  </Box>
                  <Box sx={{ ml: 1, mt: 0.2 }}>
                    <List dense >
                      {orderDetail.riskProfile.riskScoreLog
                      .filter((rule) => rule.score != 0)
                      .map((rule, ruleId) => {
                        return (
                          <div key={ruleId}>
                            <ListItem key={ruleId} button>
                              <ListItemText
                                id={rule.ruleId}
                                primary={rule.ruleName}
                                secondary={"score " + rule.score}
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
      </Dialog>
    </>
  );
}

