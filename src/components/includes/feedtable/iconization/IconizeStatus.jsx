import { styled } from "@mui/material/styles";
import TimerIcon from "@mui/icons-material/Timer";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // Ícone padrão para status desconhecido

// Estilização individual para cada status
const AguardandoIcon = styled(TimerIcon)(({ theme }) => ({
  color: "LightGrey",
}));

const CarenciaIcon = styled(ScheduleIcon)(({ theme }) => ({
  color: "LightGrey",
}));

const ManuseioIcon = styled(ScreenShareIcon)(({ theme }) => ({
  color: "LightGrey",
}));

const PreparandoIcon = styled(ShoppingBasketIcon)(({ theme }) => ({
  color: "Tan",
}));

const FaturadoIcon = styled(MonetizationOnIcon)(({ theme }) => ({
  color: "LightGrey",
}));

const CanceladoIcon = styled(CancelIcon)(({ theme }) => ({
  color: "LightGrey",
}));

const DefaultIcon = styled(HelpOutlineIcon)(({ theme }) => ({
  color: "DarkGray",
}));

// Componente principal com ícones estilizados
export function IconizeStatus(props) {
  switch (props.status) {
    case "payment-pending":
      return <AguardandoIcon fontSize={props.size} />;
    case "window-to-cancel":
      return <CarenciaIcon fontSize={props.size} />;
    case "ready-for-handling":
      return <ManuseioIcon fontSize={props.size} />;
    case "handling":
      return <PreparandoIcon fontSize={props.size} />;
    case "invoiced":
      return <FaturadoIcon fontSize={props.size} />;
    case "canceled":
      return <CanceladoIcon fontSize={props.size} />;
    default:
      return <DefaultIcon fontSize={props.size} />;
  }
}
