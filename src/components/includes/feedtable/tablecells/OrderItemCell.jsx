import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Fade from "@material-ui/core/Fade";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from '@mui/styles';
import { StyledBadgeItems } from "../badgezation/StyledBadge";
import ItemsWindow from '../dialogs/ItemsWindow'
import { useState } from "react";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.action.active,
    color: "Ivory",
    boxShadow: theme.shadows[2],
    fontSize: 13,
  },
}))(Tooltip);

<StyledBadgeItems />;

export const OrderItemCell = (props) => {
  const { orderDetail } = props;
  const [isOpen, setIsOpen] = useState(false);
  const handleCellClick = (e) => setIsOpen((prevState) => !prevState);

  return (
    <>
      <TableCell onClick={handleCellClick} align="center">
        <IconButton>
          <StyledBadgeItems
            badgeContent={orderDetail.items}
            max={100}
          ></StyledBadgeItems>
          {/* </LightTooltip> */}
        </IconButton>
      </TableCell>
      {/* {isOpen && <ItemsDialog orderDetail={orderDetail} />} */}
      {isOpen && <ItemsWindow windowState={handleCellClick} orderDetail={orderDetail} />}
    </>
  );
};
