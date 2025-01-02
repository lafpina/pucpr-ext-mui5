import React, { useState, useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material/styles";

import { IconizeRiskLevel } from "../iconization/IconizeRiskLevel";
import { StyledBadge } from "../badgezation/StyledBadge";
import { StyledBadgeRisk } from "../badgezation/StyledBadge";
import { StyledBadgeWarning } from "../badgezation/StyledBadge";
import ScoreWindow from "../dialogs/ScoreWindow";

// Estilização do Tooltip com styled
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

export const OrderScoreCell = (props) => {
  const { orderDetail } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleCellClick = () => setIsOpen((prevState) => !prevState);

  return (
    <>
      <TableCell onClick={handleCellClick} align="left">
        <LightTooltip
          title={`Risco ${orderDetail.scoreDesc}`}
          placement="top-end"
          arrow
          interactive
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          aria-label="score"
        >
          <IconButton>
            {orderDetail.score > 75 ? (
              <StyledBadgeRisk
                badgeContent={orderDetail.score}
                max={999}
              />
            ) : orderDetail.score > 60 ? (
              <StyledBadgeWarning
                badgeContent={orderDetail.score}
                max={999}
              />
            ) : (
              <StyledBadge
                badgeContent={orderDetail.score}
                max={999}
              />
            )}
            <IconizeRiskLevel
              riskLevel={orderDetail.scoreDesc}
              size="default"
            />
          </IconButton>
        </LightTooltip>
      </TableCell>
      {isOpen && (
        <ScoreWindow
          windowState={handleCellClick}
          orderDetail={orderDetail}
        />
      )}
    </>
  );
};
