import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles"; // Correta importação para Material-UI 5
import { IconizeStatus } from "../iconization/IconizeStatus";

// Estilização com `styled`
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: theme.palette.action.active,
    color: "Ivory",
    boxShadow: theme.shadows[2],
    fontSize: 13,
  },
}));

export const OrderStatusCell = (props) => {
  const { statusDescription, status } = props;

  return (
    <TableCell align="center">
      <LightTooltip
        title={statusDescription}
        placement="top-end"
        arrow
        interactive
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        aria-label="Status"
      >
        <IconButton disableRipple>
          <IconizeStatus status={status} size="default" />
        </IconButton>
      </LightTooltip>
    </TableCell>
  );
};
