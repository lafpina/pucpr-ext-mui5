import TableCell from "@material-ui/core/TableCell"
import IconButton from "@material-ui/core/IconButton";
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from "@material-ui/core/styles";
import { StyledBadgeIncompleteOrders } from "../badgezation/StyledBadge";
import { IconizePaymentOption } from "../iconization/IconizePaymentOption";


const LightTooltip = withStyles(theme => ({
   tooltip: {
      backgroundColor: theme.palette.action.active,
      color: "Ivory",
      boxShadow: theme.shadows[2],
      fontSize: 13,
   }
}))(Tooltip);

<StyledBadgeIncompleteOrders />

export const OrderPaymentCell = (props) => {

    const { creditCard, incompleteOrders, paymentMethod } = props

    return (
       <>

      <TableCell align="center">
         <LightTooltip title={creditCard} placement="top" arrow interactive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} aria-label="creditCard">
            <IconButton>
               {
                  incompleteOrders > 0 ? (
                     <StyledBadgeIncompleteOrders badgeContent={incompleteOrders}></StyledBadgeIncompleteOrders>
                  ) : " "
               }
               <IconizePaymentOption payMethod={paymentMethod} size="medium" />
            </IconButton>
         </LightTooltip>
      </TableCell>  
     </>
    )
}

   