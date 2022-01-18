import TableCell from "@material-ui/core/TableCell";
import setCurrency from "../../../../backend/utils/setCurrency";
import { StyledBadgeCoupon } from "../badgezation/StyledBadge"
import { useState, useEffect } from 'react'

export const OrderValueCell = (props) => {
  const { orderDetail } = props;
  const [couponName, setCouponName] = useState('')

  useEffect(() => {
    orderDetail.coupon.map((coupon) => {
      if (coupon.includes('CDN')) {
        setCouponName(coupon)
      }
    })
  }, [])

  return (
    <TableCell align="right">
      {setCurrency(orderDetail.valor)}
      {/* Show Coupon Code */}
      {couponName > ' '
        ?
        <StyledBadgeCoupon anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          badgeContent={couponName}
        ></StyledBadgeCoupon>
        : ''
      }
    </TableCell>
  )
}
