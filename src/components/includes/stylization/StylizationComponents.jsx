import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from '@material-ui/core/Tooltip';

export const useRowStyles = makeStyles({
    root: {
        "& > *": {
        borderBottom: "unset",
        fontSize: 15,
        color: "Gray",
        },
    },
});

export const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.warning.dark,
      fontSize: 14,
    },
    body: {
      fontSize: 14,
      color: theme.palette.info.light,
    },
}))(TableCell);
  
export const StyledTooltip = withStyles({
    tooltip: {
        color: "Ivory",
        backgroundColor: "LightSlateGray",
        fontSize: 12,
    }
})(Tooltip);
  
  
export const LightTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: theme.palette.action.active,
        color: "Ivory",
        boxShadow: theme.shadows[4],
        fontSize: 13,
    }
}))(Tooltip);