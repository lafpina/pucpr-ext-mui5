import TableCell from "@material-ui/core/TableCell";
import setCurrency from "../../../helper/utils/setCurrency";

export const OrderValueCell = (props) => {

    const { value } = props 

    return (
        <TableCell align="right">
            {setCurrency(value)}
        </TableCell>
    )
}