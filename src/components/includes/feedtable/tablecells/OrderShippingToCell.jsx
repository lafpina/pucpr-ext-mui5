import TableCell from "@mui/material/TableCell";

export const OrderShippingToCell = (props) => {
  const { shippingTo } = props;

  return (
    <TableCell align="left">
      {shippingTo}
    </TableCell>
  );
};
