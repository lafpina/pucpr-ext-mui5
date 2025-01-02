import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles"; // Correta substituição para `withStyles`
import { IconizeGiftCard } from "../iconization/IconizeGiftCard";

// Estilização do Tooltip usando `styled`
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    backgroundColor: theme.palette.action.active,
    color: "Ivory",
    boxShadow: theme.shadows[2],
    fontSize: 13,
    cursor: "pointer",
  },
}));

// Componente Principal
export const OrderGiftCell = ({ giftId, giftName, giftEmail }) => {
  const handleTooltipClick = () => {
    copyTextToClipboard(giftEmail);
  };

  const copyTextToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .catch((err) => {
        console.error("Erro ao copiar para o Clipboard: ", err);
      });
  };

  return (
    <TableCell align="center">
      <LightTooltip
        title={giftEmail}
        placement="top-end"
        arrow
        interactive
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        aria-label="Gift"
        onClick={handleTooltipClick}
      >
        <IconButton>
          <IconizeGiftCard giftId={giftName} size="default" />
        </IconButton>
      </LightTooltip>
      <Typography
        variant="caption"
        component="h6"
        align="center"
        color="textSecondary"
      >
        {giftName}
      </Typography>
    </TableCell>
  );
};
