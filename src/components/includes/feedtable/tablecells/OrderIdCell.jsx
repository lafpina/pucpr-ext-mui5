import TableCell from "@material-ui/core/TableCell";

export const OrderIdCell = (props) => {

    const { orderId } = props 

    return (
        <TableCell component="th" align="center" scope="row">
            {orderId}
        </TableCell>
    )
}