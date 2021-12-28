import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";
import { IconizeTitleOrder } from "../iconization/IconizeTitle";
import { IconizeTitleDate } from "../iconization/IconizeTitle";
import { IconizeTitleClient } from "../iconization/IconizeTitle";
import { IconizeTitleItems } from "../iconization/IconizeTitle"
import { IconizeTitleValue } from "../iconization/IconizeTitle";
import { IconizeTitlePayment } from "../iconization/IconizeTitle"
import { IconizeTitleDestination } from "../iconization/IconizeTitle";
import { IconizeTitleProfile } from "../iconization/IconizeTitle";
import { IconizeTitleGift } from "../iconization/IconizeTitle";
import { IconizeTitleScore } from "../iconization/IconizeTitle";
import { IconizeTitleStatus } from "../iconization/IconizeTitle";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.warning.dark,
    fontSize: 12,
  },
  body: {
    fontSize: 12,
    color: theme.palette.info.light,
    },
}))(TableCell);

export const OrderTableHead = () => {
    return (
      <>
        <TableHead>
          <TableRow>
                  <StyledTableCell />
                  <StyledTableCell align="center">{<IconizeTitleOrder size="default" />}</StyledTableCell>
                  <StyledTableCell align="center">{<IconizeTitleDate size="default" />}</StyledTableCell>
                  <StyledTableCell align="left">{<IconizeTitleClient size="default" />}</StyledTableCell>
                  <StyledTableCell align="center">{<IconizeTitleItems size="default" />}</StyledTableCell>
                  <StyledTableCell align="right">{<IconizeTitleValue size="default" />}</StyledTableCell>
                  <StyledTableCell align="center">{<IconizeTitlePayment size="default" />}</StyledTableCell>
                  <StyledTableCell align="left">{<IconizeTitleDestination size="default" />}</StyledTableCell>
                  <StyledTableCell align="center">{<IconizeTitleProfile size="default" />}</StyledTableCell>
                  <StyledTableCell align="center">{<IconizeTitleGift size="default" />}</StyledTableCell>
                  <StyledTableCell align="center">{<IconizeTitleStatus size="default" />}</StyledTableCell>
                  <StyledTableCell align="right">{<IconizeTitleScore size="default" />}</StyledTableCell>
          </TableRow>
       </TableHead>
      </>
    )
}
