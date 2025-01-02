import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

import { StyledBadgeItems } from "../badgezation/StyledBadge";
import ItemsWindow from "../dialogs/ItemsWindow";

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

export const OrderItemCell = (props) => {
  const { orderDetail } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleCellClick = () => setIsOpen((prevState) => !prevState);

  return (
    <>
      <TableCell onClick={handleCellClick} align="center">
        <LightTooltip
          title={`Itens: ${orderDetail.items}`}
          placement="top"
          arrow
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
        >
          <IconButton>
            <StyledBadgeItems
              badgeContent={orderDetail.items}
              max={100}
            />
          </IconButton>
        </LightTooltip>
      </TableCell>
      {isOpen && (
        <ItemsWindow windowState={handleCellClick} orderDetail={orderDetail} />
      )}
    </>
  );
};
