import { styled } from "@mui/material/styles";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";

// Estilização individual dos ícones para corresponder às classes antigas
const VeryLowRiskIcon = styled(SentimentVerySatisfiedIcon)(({ theme }) => ({
  color: "LimeGreen",
}));

const LowRiskIcon = styled(SentimentSatisfiedAltIcon)(({ theme }) => ({
  color: "MediumSpringGreen",
}));

const MedRiskIcon = styled(SentimentSatisfiedIcon)(({ theme }) => ({
  color: "Gold",
}));

const HighRiskIcon = styled(SentimentDissatisfiedIcon)(({ theme }) => ({
  color: "DarkOrange",
}));

const VeryHighRiskIcon = styled(SentimentVeryDissatisfiedIcon)(({ theme }) => ({
  color: "Red",
}));

const DefaultRiskIcon = styled(SentimentNeutralIcon)(({ theme }) => ({
  color: "RedLightSkyBlueRed",
}));

// Componente principal com lógica para exibir ícones estilizados
export function IconizeRiskLevel(props) {
  switch (props.riskLevel) {
    case "Muito Baixo":
      return <VeryLowRiskIcon fontSize={props.size} />;
    case "Baixo":
      return <LowRiskIcon fontSize={props.size} />;
    case "Moderado":
      return <MedRiskIcon fontSize={props.size} />;
    case "Alto":
      return <HighRiskIcon fontSize={props.size} />;
    case "Muito Alto":
      return <VeryHighRiskIcon fontSize={props.size} />;
    default:
      return <DefaultRiskIcon fontSize={props.size} />;
  }
}
