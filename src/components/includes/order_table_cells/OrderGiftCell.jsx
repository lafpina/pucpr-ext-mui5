import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import { Fade } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { IconizeGiftCard } from "../iconization/IconizeGiftCard";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.action.active,
    color: "Ivory",
    boxShadow: theme.shadows[2],
    fontSize: 13,
  },
}))(Tooltip);

export const OrderGiftCell = (props) => {
  const { giftId, giftName } = props;

  return (
    <TableCell align="center">
      <LightTooltip
        title={giftName}
        placement="top-end"
        arrow
        interactive
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        aria-label="Gift"
      >
        <IconButton>
          <IconizeGiftCard giftId={giftId} size="default" />
        </IconButton>
      </LightTooltip>
      <Typography
        // className={classes.description}
        variant="caption"
        component="h6"
        align="center"
        color="textSecondary"
        align="center"
      >
        {giftId}
      </Typography>
    </TableCell>
  );
};
