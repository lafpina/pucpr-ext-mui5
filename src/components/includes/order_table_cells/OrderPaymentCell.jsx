import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Fade from "@material-ui/core/Fade";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { StyledBadgeIncompleteOrders } from "../badgezation/StyledBadge";
import { IconizePaymentOption } from "../iconization/IconizePaymentOption";
import { useState } from "react";
import IncompleteOrdersDialog from "../IncompleteOrdersDialog";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.action.active,
    color: "Ivory",
    boxShadow: theme.shadows[2],
    fontSize: 13,
  },
}))(Tooltip);

<StyledBadgeIncompleteOrders />;

export const OrderPaymentCell = (props) => {
  // const { creditCard, incompleteOrders, paymentMethod } = props;
  const { orderDetail } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleCellClick = (e) => setIsOpen((prevState) => !prevState);

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
              ></StyledBadgeIncompleteOrders>
            ) : (
              " "
            )}
            <IconizePaymentOption
              payMethod={orderDetail.payMethod}
              size="default"
            />
          </IconButton>
        </LightTooltip>
      </TableCell>
      {isOpen && <IncompleteOrdersDialog orderDetail={orderDetail} />}
    </>
  );
};
