import {React, useState} from 'react';
import TableCell from "@material-ui/core/TableCell"
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';
import { Fade } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { IconizeRiskLevel } from "../iconization/IconizeRiskLevel";
import { StyledBadge } from "../badgezation/StyledBadge"
import { StyledBadgeRisk } from "../badgezation/StyledBadge"
import { StyledBadgeWarning } from "../badgezation/StyledBadge"

import ResponsiveDialog from "../ResponsiveDialog";

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.action.active,
    color: "Ivory",
    boxShadow: theme.shadows[2],
    fontSize: 13,
  }
}))(Tooltip);

<>
  <StyledBadge />
  <StyledBadgeRisk />
  <StyledBadgeWarning />
</>

export const OrderScoreCell = (props) => {
  const { score, scoreDesc } = props
  const [isOpen, setIsOpen] = useState(false);
  const handleCellClick = (e) => setIsOpen(true);
  return (
    <>
      <TableCell onClick={handleCellClick} lign="left">
        <LightTooltip 
          title={`Risco ${scoreDesc}`} 
          placement="top-end"
          arrow  
          interactive 
          TransitionComponent={Fade} 
          TransitionProps={{ timeout: 600 }} 
          aria-label="score" 
        >
          <IconButton>
            {score > 80 ? (
              <StyledBadgeRisk
                badgeContent={score}
                max={999}
              ></StyledBadgeRisk>
            ) : score > 60 ? (
              <StyledBadgeWarning
                badgeContent={score}
                max={999}
              ></StyledBadgeWarning>
            ) : (
              <StyledBadge badgeContent={score} max={999}></StyledBadge>
            )}
            <IconizeRiskLevel riskLevel={scoreDesc} size="medium" />
          </IconButton>
        </LightTooltip>
      </TableCell>
      {
        isOpen && 
        <ResponsiveDialog 
          title={"Avaliação do Pedido"}
          score={score} 
          scoreDesc={scoreDesc} 
        />
      }
    </>
  )
}

