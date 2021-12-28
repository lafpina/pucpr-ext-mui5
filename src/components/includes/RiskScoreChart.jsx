import React from "react";
import { makeStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Legend,
  Tooltip,
  CartesianGrid,
} from "recharts";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    // backgroundColor: theme.palette.warning.dark,
    backgroundColor: "#4d6e8a",
    // backgroundColor: "#968f52",
    // backgroundColor: "#546d77",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  color: "Grey",
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RiskScoreChart(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { detail } = props;
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  // Generate Sales Data
  function createData(ruleRef, score) {
    return { ruleRef, score };
  }

  // let scoreTotal = detail.riskScoreLog[0].score;
  let scoreTotal = 0;
  const data = [];
  data[0] = createData("Captura", 70)

  let i;
  for (i = 0; i <= 17; i++) {
    scoreTotal += detail.riskProfile.riskScoreLog[i].score;
    data[i + 1] = createData(
      detail.riskProfile.riskScoreLog[i].ruleRef,
      70 + scoreTotal
    );
  }
  data[i + 1] = createData("Final", 70 + scoreTotal);

  // data.sort(function (a, b) {
  //   return a.ruleRef - b.ruleRef;
  // });

  return (
    <>
      <Dialog
        fullScreen
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
              Pedido {detail.orderId} {detail.cliente}
            </Typography>
          </Toolbar>
        </AppBar>
        {/* Chart */}
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 70,
              right: 100,
              bottom: 100,
              left: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ruleRef" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary}>
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: "middle",
                  fill: theme.palette.text.secondary,
                }}
              >
                SCORE
              </Label>
            </YAxis>
            <Tooltip />
            {/* <Legend /> */}
            <Line
              type="monotone"
              dataKey="score"
              stroke={theme.palette.primary.main}
              // stroke="red"
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </Dialog>
    </>
  );
}
