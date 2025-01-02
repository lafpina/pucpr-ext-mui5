import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";

export const OrderIdCell = ({ orderId }) => {
  return (
    <TableCell component="th" align="center" scope="row">
      {orderId}
    </TableCell>
  );
};

// Validação das Propriedades (opcional, mas recomendado)
OrderIdCell.propTypes = {
  orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
