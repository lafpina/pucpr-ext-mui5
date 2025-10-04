
import { useState, useEffect } from "react";
import { TableCell, IconButton, Tooltip, Fade } from "@mui/material";
import { styled } from "@mui/material/styles"; // Correta substituição para `withStyles`
import { StyledBadgeHist } from "../badgezation/StyledBadge";
import { IconizePurchaseProfile } from "../iconization/IconizePurchaseProfile";
import setCurrency from "../../../../backend/utils/setCurrency";
import HistoryWindow from "../dialogs/HistoryWindow";

import { StyledBadgeCoupon } from "../badgezation/StyledBadge";

// Estilização do Tooltip usando `styled`
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    backgroundColor: theme.palette.action.active,
    color: "Ivory",
    boxShadow: theme.shadows[2],
    fontSize: 13,
  },
}));

// Componente Principal
export const OrderHistoryCell = (props) => {
  const { orderDetail } = props;
  const [isOpen, setIsOpen] = useState(false);

  const [couponName, setCouponName] = useState("");

  const handleCellClick = () => setIsOpen((prevState) => !prevState);

useEffect(() => {
    orderDetail.coupon?.forEach((coupon) => {
      console.log('coupon:', coupon)
      if (coupon.includes('BonifiQ')) {
        setCouponName(coupon);
      } 
    });
  }, [orderDetail.coupon]);


  return (
    <>
      <TableCell onClick={handleCellClick} align="center">
        <LightTooltip
          title={
            orderDetail.valuePurchase
              ? "Histórico total de compras de " + setCurrency(orderDetail.valuePurchase)
              : "Primeira compra"
          }
          placement="top-end"
          interactive
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          arrow
          aria-label="Order History"
        >
          <IconButton>
            {orderDetail.qtyPurchase > 0 && (
              <StyledBadgeHist
                badgeContent={orderDetail.qtyPurchase}
                max={999}
              />
            )}
            <IconizePurchaseProfile
              qtyPurchase={orderDetail.qtyPurchase}
              blackListed={orderDetail.blackListed}
              whiteListed={orderDetail.whiteListed}
              orderErrorCheck={orderDetail.orderErrorCheckScore}
              size="default"
            />
          </IconButton>
        </LightTooltip>

        {/* Exibir Código do Cupom */}
              {couponName ? (
                <StyledBadgeCoupon
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  badgeContent={couponName}
                />
              ) : null}
      </TableCell>
      {isOpen && <HistoryWindow windowState={handleCellClick} orderDetail={orderDetail} />}
    </>
  );
};
