import TableCell from "@mui/material/TableCell";
import PropTypes from 'prop-types';

export const OrderClientCell = ({ client }) => {
  return (
    <TableCell align="left">
      {client}
    </TableCell>
  );
};

// Validação de Propriedades (Boa Prática)
OrderClientCell.propTypes = {
  client: PropTypes.string.isRequired,
};
