import { React, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { Fade } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { StyledBadgeHist } from "../badgezation/StyledBadge";
import { IconizePurchaseProfile } from "../iconization/IconizePurchaseProfile";
import setCurrency from "../../../helper/utils/setCurrency";
import { SettingsPowerRounded } from "@material-ui/icons";

import ResponsiveDialog from "../ResponsiveDialog";

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
  const { valuePurchase, qtyPurchase, blackListed, whiteListed } = props;
  const [isOpen, setIsOpen] = useState(false);
  const handleCellClick = (e) => setIsOpen(true);

  return (
    <>
      <TableCell onClick={handleCellClick} align="center">
        <LightTooltip
          title={
            valuePurchase
              ? "Histórico total de compras de  " + setCurrency(valuePurchase)
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
            {qtyPurchase > 0 ? (
              <StyledBadgeHist
                badgeContent={qtyPurchase}
                max={999}
              ></StyledBadgeHist>
            ) : (
              ""
            )}
            <IconizePurchaseProfile
              qtyPurchase={qtyPurchase}
              blackListed={blackListed}
              whiteListed={whiteListed}
              size="default"
            />
          </IconButton>
        </LightTooltip>
      </TableCell>
      {isOpen && (
        <ResponsiveDialog
          title={"Histórico de Compras"}
          score=""
          scoreDesc=""
        />
      )}
    </>
  );
};
