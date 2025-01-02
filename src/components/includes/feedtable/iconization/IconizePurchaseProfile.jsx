import React from "react";
import { 
  ErrorOutlineOutlined, 
  FavoriteOutlined, 
  CheckCircleOutline, 
  ReportProblem 
} from "@mui/icons-material";
import ErrorIcon from "@mui/icons-material/Error";

/**
 * Componente responsável por exibir diferentes ícones com base nas propriedades recebidas.
 * @param {Object} props - Propriedades do componente.
 * @param {boolean} props.blackListed - Indica se está na lista negra.
 * @param {number} props.orderErrorCheck - Número de erros no pedido.
 * @param {boolean} props.whiteListed - Indica se está na lista branca.
 * @param {number} props.qtyPurchase - Quantidade de compras.
 * @param {string} props.size - Tamanho do ícone.
 */
export function IconizePurchaseProfile(props) {
  const { blackListed, orderErrorCheck, whiteListed, qtyPurchase, size } = props;

  // Renderização condicional com estilização diretamente no sx
  if (blackListed) {
    return <ErrorIcon sx={{ color: "DimGray" }} fontSize={size} />;
  }

  if (orderErrorCheck > 0) {
    return <ReportProblem sx={{ color: "LightCoral" }} fontSize={size} />;
  }

  if (whiteListed) {
    return <FavoriteOutlined sx={{ color: "Pink" }} fontSize={size} />;
  }

  if (qtyPurchase > 0) {
    return <CheckCircleOutline sx={{ color: "PowderBlue" }} fontSize={size} />;
  }

  return <ErrorOutlineOutlined sx={{ color: "Gold" }} fontSize={size} />;
}
