import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Fade from "@material-ui/core/Fade";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { StyledBadgeIncompleteOrders } from "../badgezation/StyledBadge";
import { IconizePaymentOption } from "../iconization/IconizePaymentOption";
import { SettingsPowerRounded } from "@material-ui/icons";
import { useState } from "react";
import ResponsiveDialog from "../ResponsiveDialog";

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
  const { creditCard, incompleteOrders, paymentMethod } = props;
  const [isOpen, setOpen] = useState(false);

  const handleCellClick = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <TableCell onClick={handleCellClick} align="center">
        <LightTooltip
          title={creditCard}
          placement="top"
          arrow
          interactive
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          aria-label="creditCard"
        >
          <IconButton>
            {incompleteOrders > 0 ? (
              <StyledBadgeIncompleteOrders
                badgeContent={incompleteOrders}
              ></StyledBadgeIncompleteOrders>
            ) : (
              " "
            )}
            <IconizePaymentOption payMethod={paymentMethod} size="default" />
          </IconButton>
        </LightTooltip>
      </TableCell>
      {/* {isOpen && <ResponsiveDialog />} */}
    </>
  );
};
