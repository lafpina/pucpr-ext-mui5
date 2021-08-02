import TableCell from "@material-ui/core/TableCell"
import IconButton from "@material-ui/core/IconButton";
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from "@material-ui/core/styles";
import { StyledBadgeItems } from "../badgezation/StyledBadge";

const LightTooltip = withStyles(theme => ({
   tooltip: {
      backgroundColor: theme.palette.action.active,
      color: "Ivory",
      boxShadow: theme.shadows[2],
      fontSize: 13,
   }
}))(Tooltip);

<StyledBadgeItems />

export const OrderItemCell = (props) => {

   const { item, itemName } = props

   return (
      <>
         <TableCell align="center">
            <IconButton>
               <LightTooltip 
                  title={itemName} 
                  placement="top-end"
                  interactive 
                  TransitionComponent={Fade} 
                  TransitionProps={{ timeout: 600 }} 
                  aria-label="Itens">
                  <StyledBadgeItems badgeContent={item} max={100}></StyledBadgeItems>
               </LightTooltip>
            </IconButton>
         </TableCell>
      </>
   )
}

