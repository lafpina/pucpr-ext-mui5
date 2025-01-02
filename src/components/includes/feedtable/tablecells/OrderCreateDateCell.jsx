import TableCell from "@mui/material/TableCell";
import PropTypes from 'prop-types';

export const OrderCreateDateCell = ({ createDate }) => {
  return (
    <TableCell align="center" size="small">
      {createDate}
    </TableCell>
  );
};

// Validação de Propriedades (Boa Prática)
OrderCreateDateCell.propTypes = {
  createDate: PropTypes.string.isRequired,
};
