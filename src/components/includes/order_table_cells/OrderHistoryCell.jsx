import { React, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { Fade } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { StyledBadgeHist } from "../badgezation/StyledBadge";
import { IconizePurchaseProfile } from "../iconization/IconizePurchaseProfile";
import setCurrency from "../../../helper/utils/setCurrency";

import PurchaseHistoryDialog from "./PurchaseHistoryDialog";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.action.active,
    color: "Ivory",
    boxShadow: theme.shadows[2],
    fontSize: 13,
  },
}))(Tooltip);

<StyledBadgeHist />;

export const OrderHistoryCell = (props) => {
  const { orderDetail } = props;
  const [isOpen, setIsOpen] = useState(false);
  const handleCellClick = (e) => setIsOpen(true);

  return (
    <>
      <TableCell onClick={handleCellClick} align="center">
        <LightTooltip
          title={
            orderDetail.valuePurchase
              ? "Histórico total de compras de  " +
                setCurrency(orderDetail.valuePurchase)
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
            {orderDetail.qtyPurchase > 0 ? (
              <StyledBadgeHist
                badgeContent={orderDetail.qtyPurchase}
                max={999}
              ></StyledBadgeHist>
            ) : (
              ""
            )}
            <IconizePurchaseProfile
              qtyPurchase={orderDetail.qtyPurchase}
              blackListed={orderDetail.blackListed}
              whiteListed={orderDetail.whiteListed}
              size="default"
            />
          </IconButton>
        </LightTooltip>
      </TableCell>
      <>{isOpen && <PurchaseHistoryDialog orderDetail={orderDetail} />}</>
    </>
  );
};
