import { React, useState, useEffect } from "react";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { Fade } from "@material-ui/core";
import { withStyles } from '@mui/styles';
import { IconizeRiskLevel } from "../iconization/IconizeRiskLevel";
import { StyledBadge } from "../badgezation/StyledBadge";
import { StyledBadgeRisk } from "../badgezation/StyledBadge";
import { StyledBadgeWarning } from "../badgezation/StyledBadge";
import ScoreWindow from "../dialogs/ScoreWindow"


const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.action.active,
    color: "Ivory",
    boxShadow: theme.shadows[2],
    fontSize: 13,
  },
}))(Tooltip);

<>
  <StyledBadge />
  <StyledBadgeRisk />
  <StyledBadgeWarning />
</>;

export const OrderScoreCell = (props) => {
  const { orderDetail } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleCellClick = (e) => setIsOpen((prevState) => !prevState);

  return (
    <>
      <TableCell onClick={handleCellClick} lign="left">
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
              ></StyledBadgeRisk>
            ) : orderDetail.score > 60 ? (
              <StyledBadgeWarning
                badgeContent={orderDetail.score}
                max={999}
              ></StyledBadgeWarning>
            ) : (
              <StyledBadge
                badgeContent={orderDetail.score}
                max={999}
              ></StyledBadge>
            )}
            <IconizeRiskLevel
              riskLevel={orderDetail.scoreDesc}
              size="default"
            />
          </IconButton>
        </LightTooltip>
      </TableCell>
      {isOpen && <ScoreWindow windowState={handleCellClick} orderDetail={orderDetail} />}
      {/* {isOpen && <RiskScoreDialog orderDetail={orderDetail} />} */}
    </>
  );
};
