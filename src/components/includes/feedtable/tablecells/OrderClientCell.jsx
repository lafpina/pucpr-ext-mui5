import TableCell from "@material-ui/core/TableCell";

export const OrderClientCell = (props) => {

    const { client } = props 

    return (
        <TableCell align="left">
          {client}
        </TableCell>
    )
}