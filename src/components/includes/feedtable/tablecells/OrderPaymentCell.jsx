import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

import { StyledBadgeIncompleteOrders } from "../badgezation/StyledBadge";
import { IconizePaymentOption } from "../iconization/IconizePaymentOption";
import IncompleteOrdersWindow from "../dialogs/IncompleteOrdersWindow";

// Substituindo `withStyles` por `styled`
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  "& .MuiTooltip-tooltip": {
    backgroundColor: theme.palette.action.active,
    color: "Ivory",
    boxShadow: theme.shadows[2],
    fontSize: 13,
  },
}));

export const OrderPaymentCell = (props) => {
  const { orderDetail } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleCellClick = () => setIsOpen((prevState) => !prevState);

  return (
    <>
      <TableCell onClick={handleCellClick} align="center">
        <LightTooltip
          title={orderDetail.creditCard}
          placement="top"
          arrow
          interactive
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          aria-label="creditCard"
        >
          <IconButton>
            {orderDetail.incompleteOrders > 0 ? (
              <StyledBadgeIncompleteOrders
                badgeContent={orderDetail.incompleteOrders}
              />
            ) : null}
            <IconizePaymentOption
              payMethod={orderDetail.payMethod}
              size="default"
            />
          </IconButton>
        </LightTooltip>
      </TableCell>
      {isOpen && (
        <IncompleteOrdersWindow
          windowState={handleCellClick}
          orderDetail={orderDetail}
        />
      )}
    </>
  );
};
