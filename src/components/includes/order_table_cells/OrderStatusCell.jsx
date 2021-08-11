import TableCell from "@material-ui/core/TableCell"
import IconButton from "@material-ui/core/IconButton";
import { Fade } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from "@material-ui/core/styles";
import { IconizeStatus } from "../iconization/IconizeStatus";

const LightTooltip = withStyles(theme => ({
   tooltip: {
      backgroundColor: theme.palette.action.active,
      color: "Ivory",
      boxShadow: theme.shadows[2],
      fontSize: 13,
   }
}))(Tooltip);

export const OrderStatusCell = (props) => {

   const { statusDescription, status} = props

   return (
      <TableCell align="center">
         <LightTooltip title={statusDescription} placement="top-end" arrow interactive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} aria-label="Status">
            <IconButton>
               <IconizeStatus status={status} size="default" />
            </IconButton>
         </LightTooltip>  
      </TableCell>
   )
}

