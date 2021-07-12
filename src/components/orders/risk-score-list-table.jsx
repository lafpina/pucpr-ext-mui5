import React from "react";
//? Material Design
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Badge from "@material-ui/core/Badge";
//? Customized Components Row
import setCurrency from "../lib/utils/setCurrency";
import MainLayout from "../layouts/mainLayouts";
import { IconizeStatus } from "./iconization/iconize-status";
import { IconizePurchaseProfile } from "./iconization/iconize-purchase-profile";
import { IconizeRiskLevel } from "./iconization/iconize-risk-level";
import { IconizeCardHolder } from "./iconization/iconize-card-holder";
import { IconizeGiftCard } from "./iconization/iconize-gift-card";
import { IconizePromo } from "./iconization/iconize-promo";
import { IconizeKitCustom } from "./iconization/iconize-kit-custom";
import { IconizePaymentOption } from "./iconization/iconize-payment-option";
import { Tab } from "@material-ui/icons";
//? Customized Components Title
import { IconizeTitleOrder } from "./iconization/iconize-title";
import { IconizeTitleDate } from "./iconization/iconize-title";
import { IconizeTitleClient } from "./iconization/iconize-title";
import { IconizeTitleProfile } from "./iconization/iconize-title";
import { IconizeTitlePayment } from "./iconization/iconize-title";
import { IconizeTitleGift } from "./iconization/iconize-title";
import { IconizeTitlePromo } from "./iconization/iconize-title";
import { IconizeTitleItems } from "./iconization/iconize-title";
import { IconizeTitleValue } from "./iconization/iconize-title";
import { IconizeTitleDestination } from "./iconization/iconize-title";
import { IconizeTitleStatus } from "./iconization/iconize-title";
import { IconizeTitleScore } from "./iconization/iconize-title";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -27,
    color: "white",
    backgroundColor: "SteelBlue",
    top: -14,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const StyledBadgeRisk = withStyles((theme) => ({
  badge: {
    right: -27,
    color: "white",
    backgroundColor: "Tomato",
    top: -14,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const StyledBadgeIncompleteOrders = withStyles((theme) => ({
  badge: {
    right: -27,
    color: "white",
    backgroundColor: "NavajoWhite",
    top: -14,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const StyledBadgeWarning = withStyles((theme) => ({
  badge: {
    right: -27,
    color: "white",
    backgroundColor: "Orange",
    top: -14,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const StyledBadgeItems = withStyles((theme) => ({
  badge: {
    right: 0,
    color: "white",
    backgroundColor: "LightSteelBlue",
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "1 4px",
  },
}))(Badge);

const StyledBadgeHist = withStyles((theme) => ({
  badge: {
    right: -27,
    color: "white",
    backgroundColor: "LightBlue",
    top: -14,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const StyledTableCell = withStyles((theme) => ({
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

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
      fontSize: 15,
      color: "Gray",
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        {/* Order */}

        <TableCell component="th" align="center" scope="row">
          {row.order}
        </TableCell>

        {/* Data */}

        <TableCell align="center" size="small">
          {row.dataCompra}
        </TableCell>

        {/* Client */}

        <TableCell align="left">{row.cliente}</TableCell>

        {/* Purchase Profile */}

        <TableCell align="center">
          <IconButton>
            {row.qtyPurchase > 0 ? (
              <StyledBadgeHist
                badgeContent={row.qtyPurchase}
                max={999}
              ></StyledBadgeHist>
            ) : (
              ""
            )}
            <IconizePurchaseProfile
              qtyPurchase={row.qtyPurchase}
              blackListed={row.blackListed}
              whiteListed={row.whiteListed}
              size="medium"
            />
          </IconButton>
        </TableCell>

        {/* Payment Option */}

        <TableCell align="center">
          <IconButton>
            {row.incompleteOrders > 0 ? (
              <StyledBadgeIncompleteOrders
                badgeContent={row.incompleteOrders}
              ></StyledBadgeIncompleteOrders>
            ) : (
              " "
            )}

            <IconizePaymentOption payMethod={row.payMethod} size="medium" />
          </IconButton>
        </TableCell>

        {/* Gift */}

        <TableCell align="center">
          <IconButton>
            <IconizeGiftCard giftId={row.giftId} size="medium" />
          </IconButton>
          <Typography
            className={classes.description}
            variant="caption"
            component="h6"
            align="center"
            color="textSecondary"
            align="center"
          >
            {row.giftId}
          </Typography>
        </TableCell>

        {/* Promo */}

        <TableCell align="center">
          <IconButton>
            <IconizeKitCustom kitCustom={row.kitCustom} size="medium" />
            <IconizePromo promo={row.promo} size="medium" />
          </IconButton>

          <Typography
            className={classes.description}
            variant="caption"
            // component="h6"
            // align="center"
            color="textSecondary"
          >
            {row.promo}
          </Typography>
        </TableCell>

        {/* Items */}

        <TableCell align="center">
          <IconButton>
            <StyledBadgeItems
              badgeContent={row.items}
              max={100}
            ></StyledBadgeItems>
          </IconButton>
        </TableCell>

        {/* Value */}

        <TableCell align="right">{setCurrency(row.valor)}</TableCell>
        {/* <TableCell align="right">{setCurrency(row.totalShippingValue)}</TableCell> */}

        {/* Shipping To */}

        <TableCell align="left">{row.destino}</TableCell>

        {/* Status */}

        <TableCell align="center">
          <IconButton>
            <IconizeStatus status={row.status} size="medium" />
          </IconButton>
        </TableCell>

        {/* Score */}

        <TableCell align="center">
          <IconButton>
            {row.score > 80 ? (
              <StyledBadgeRisk
                badgeContent={row.score}
                max={999}
              ></StyledBadgeRisk>
            ) : row.score > 70 ? (
              <StyledBadgeWarning
                badgeContent={row.score}
                max={999}
              ></StyledBadgeWarning>
            ) : (
              <StyledBadge badgeContent={row.score} max={999}></StyledBadge>
            )}

            <IconizeRiskLevel riskLevel={row.scoreDesc} size="medium" />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={17}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" color="textSecondary" component="div">
                Dados Cadastrais - {row.cliente}
              </Typography>
              <Table size="small" aria-label="detalhe">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">CPF</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">TEL</TableCell>
                    <TableCell align="left">CEP</TableCell>
                    <TableCell align="center">Estado</TableCell>
                    <TableCell align="left">Pagamento</TableCell>
                    <TableCell align="center">País</TableCell>
                    <TableCell align="center">Parc</TableCell>
                    {/* <TableCell align="center">Cartão</TableCell> */}
                    <TableCell align="left">Titular</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.pedido}>
                      <TableCell align="left">{historyRow.cpf}</TableCell>
                      <TableCell align="left">
                        {historyRow.emailCliente}
                      </TableCell>
                      <TableCell align="left">{historyRow.phone}</TableCell>
                      <TableCell align="left">{historyRow.postalCode}</TableCell>
                      <TableCell align="center">{historyRow.state}</TableCell>
                      <TableCell align="left">{historyRow.pagamento}</TableCell>
                      <TableCell align="center">
                        {historyRow.cardCountry}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow.parcelas}
                      </TableCell>
                      {/* <TableCell align="center">{historyRow.cardLastDigits}</TableCell> */}
                      <TableCell align="left">{historyRow.titular}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function RiskScoreListTable(props) {
  const { orders } = props;
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="collapsible table">
        <caption>
          {<IconizeRiskLevel riskLevel={"Muito Baixo"} size="small" />} Muito
          baixo
          {<IconizeRiskLevel riskLevel={"Baixo"} size="small" />} Baixo
          {<IconizeRiskLevel riskLevel={"Moderado"} size="small" />} Moderado
          {<IconizeRiskLevel riskLevel={"Alto"} size="small" />} Alto
          {<IconizeRiskLevel riskLevel={"Muito Alto"} size="small" />} Muito
          alto
        </caption>
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell align="center">{<IconizeTitleOrder size="medium" />}</StyledTableCell>
            <StyledTableCell align="center">{<IconizeTitleDate size="medium" />} </StyledTableCell>
            <StyledTableCell align="left">{<IconizeTitleClient size="medium" />}</StyledTableCell>
            <StyledTableCell align="center">{<IconizeTitleProfile size="medium" />}</StyledTableCell>
            <StyledTableCell align="center">{<IconizeTitlePayment size="medium" />}</StyledTableCell>

            <StyledTableCell align="center">{<IconizeTitleGift size="medium" />}</StyledTableCell>
            <StyledTableCell align="center">{<IconizeTitlePromo size="medium" />}</StyledTableCell>

            <StyledTableCell align="center">{<IconizeTitleItems size="medium" />}</StyledTableCell>
            <StyledTableCell align="center">{<IconizeTitleValue size="medium" />}</StyledTableCell>
            {/* <StyledTableCell align="center">{<IconizeTitleValue size="medium" />}</StyledTableCell>           */}

            <StyledTableCell align="left">{<IconizeTitleDestination size="medium" />}</StyledTableCell>
            <StyledTableCell align="center">{<IconizeTitleStatus size="medium" />}</StyledTableCell>
            <StyledTableCell align="right">{<IconizeTitleScore size="medium" />}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <Row key={order.order} row={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
