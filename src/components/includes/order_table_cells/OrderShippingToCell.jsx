import TableCell from "@material-ui/core/TableCell";

export const OrderShippingToCell = (props) => {

    const { shippingTo } = props 

    return (
        <TableCell align="left">
          {shippingTo}
        </TableCell>
    )
}