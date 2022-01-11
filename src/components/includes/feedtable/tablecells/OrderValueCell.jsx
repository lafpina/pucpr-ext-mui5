import TableCell from "@material-ui/core/TableCell";
import setCurrency from "../../../../backend/utils/setCurrency";
import { StyledBadgeCoupon } from "../badgezation/StyledBadge"


export const OrderValueCell = (props) => {

    // const { value } = props 
    const { orderDetail } = props;

    return (
        <TableCell align="right">
            {setCurrency(orderDetail.valor)}

            {orderDetail.coupon > " " && orderDetail.coupon.substr(0, 6) != "Compre" ? (
              <StyledBadgeCoupon
              anchorOrigin={{
                horizontal: "center",
                vertical: "bottom",
            }}
                badgeContent={orderDetail.coupon.substr(0, 12)}
              ></StyledBadgeCoupon>
             ) : ( 
               " " 
            )}


        </TableCell>
    )
}