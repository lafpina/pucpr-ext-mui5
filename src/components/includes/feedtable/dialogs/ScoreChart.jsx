import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function Chart(props) {
  const { detail } = props
  const theme = useTheme();

  // Generate Sales Data
  function createData(ruleRef, score) {
    return { ruleRef, score };
  }

  // let scoreTotal = detail.riskScoreLog[0].score;
  let scoreTotal = 0;
  const data = [];
  data[0] = createData("Captura", 70)

  let i;
  for (i = 0; i <= 18; i++) {
    scoreTotal += detail.riskProfile.riskScoreLog[i].score;
    data[i + 1] = createData(
      detail.riskProfile.riskScoreLog[i].ruleRef,
      70 + scoreTotal
    );
  }
  data[i + 1] = createData("Final", 70 + scoreTotal);



  return (
    <React.Fragment>
      <ResponsiveContainer >
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 28,
            bottom: 10,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="ruleRef"
            stroke={theme.palette.text.secondary}
            style={theme.typography.caption}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.caption}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.caption,
              }}
            >
              SCORE
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="score"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}