import { makeStyles } from "@material-ui/styles";
import { SentimentVerySatisfied, SentimentSatisfiedAlt, SentimentSatisfied, SentimentDissatisfied, SentimentVeryDissatisfied, MoodBad } from "@material-ui/icons";

export function IconizeRiskLevel(props) {
  const classes = useRiskLevelStyles();
  switch (props.riskLevel) {
    case "Muito Baixo":
      return (
        <SentimentVerySatisfied
          className={classes.veryLowRisk}
          fontSize={props.size}
        />
      );
    case "Baixo":
      return (
        <SentimentSatisfiedAlt
          className={classes.lowRisk}
          fontSize={props.size}
        />
      );
    case "Moderado":
      return (
        <SentimentSatisfied
          className={classes.medRisk}
          fontSize={props.size}
        />
      );
    case "Alto":
      return (
        <SentimentDissatisfied
          className={classes.highRisk}
          fontSize={props.size}
        />
      );
    case "Muito Alto":
      return (
        <SentimentVeryDissatisfied
          className={classes.veryHighRisk}
          fontSize={props.size}
        />
      );
    case "Altíssimo":
      return (
        <MoodBad
          className={classes.veryHighRisk}
          fontSize={props.size}
        />
      );
  }
}

const useRiskLevelStyles = makeStyles({
  veryLowRisk: {
    color: "LimeGreen",
  },
  lowRisk: {
    color: "MediumSpringGreen",
  },
  medRisk: {
    color: "Gold",
  },
  highRisk: {
    color: "DarkOrange",
  },
  veryHighRisk: {
    color: "Red",
  },
  noRisk: {
    color: "LightSkyBlue",
  },
  giftCard: {
    color: "LightSkyBlue",
  },
  kitCustom: {
    color: "HotPink",
  },
});
