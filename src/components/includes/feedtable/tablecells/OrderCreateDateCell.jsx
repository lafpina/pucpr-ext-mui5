import TableCell from "@material-ui/core/TableCell";

export const OrderCreateDateCell = (props) => {

    const { createDate } = props 

    return (
        <TableCell align="center" size="small">
          {createDate}
        </TableCell>
    )
}