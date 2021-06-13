import { makeStyles } from "@material-ui/core/styles";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

export function IconizeRiskLevel(props) {
  const classes = useRiskLevelStyles();
  switch (props.riskLevel) {
    case "Muito Baixo":
      return (
        <SentimentVerySatisfiedIcon
          className={classes.veryLowRisk}
          fontSize={props.size}
        />
      );
    case "Baixo":
      return (
        <SentimentSatisfiedAltIcon
          className={classes.lowRisk}
          fontSize={props.size}
        />
      );
    case "Moderado":
      return (
        <SentimentSatisfiedIcon
          className={classes.medRisk}
          fontSize={props.size}
        />
      );
    case "Alto":
      return (
        <SentimentDissatisfiedIcon
          className={classes.highRisk}
          fontSize={props.size}
        />
      );
    case "Muito Alto":
      return (
        <SentimentVeryDissatisfiedIcon
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
