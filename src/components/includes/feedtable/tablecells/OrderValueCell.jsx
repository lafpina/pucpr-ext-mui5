import TableCell from "@mui/material/TableCell";
import setCurrency from "../../../../backend/utils/setCurrency";
import { StyledBadgeCoupon } from "../badgezation/StyledBadge";
import { useState, useEffect } from "react";

export const OrderValueCell = (props) => {
  const { orderDetail } = props;
  const [couponName, setCouponName] = useState("");

  useEffect(() => {
    orderDetail.coupon?.forEach((coupon) => {
      console.log('coupon:', coupon)
      setCouponName(coupon);
    });
  }, [orderDetail.coupon]);


  return (
    <TableCell align="right">
      {setCurrency(orderDetail.valor)}
      {/* {/* Exibir Código do Cupom  */}
      {couponName ? (
        <StyledBadgeCoupon
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          badgeContent={couponName}
        />
      ) : null}
    </TableCell>
  );
};
