import TableCell from "@mui/material/TableCell";
import setCurrency from "../../../../backend/utils/setCurrency";
import { StyledBadgeCoupon } from "../badgezation/StyledBadge";
import { useState, useEffect } from "react";

export const OrderValueCell = (props) => {
  const { orderDetail } = props;
  const [couponName, setCouponName] = useState("");

  useEffect(() => {
    orderDetail.coupon?.forEach((coupon) => {
      if (coupon.includes("CDN") || coupon.includes("CDP") || coupon.includes("CFG")) {
        setCouponName(coupon);
      }
    });
  }, [orderDetail.coupon]);

  return (
    <TableCell align="right">
      {setCurrency(orderDetail.valor)}
      {/* Exibir Código do Cupom */}
      {couponName ? (
        <StyledBadgeCoupon
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
          badgeContent={couponName}
        />
      ) : null}
    </TableCell>
  );
};
