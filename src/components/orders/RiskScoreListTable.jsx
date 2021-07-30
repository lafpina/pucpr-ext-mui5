import React from "react";
import { Link } from "next/link"
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
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
//? Customized Components Row
import setCurrency from "../../helper/utils/setCurrency";
import MainLayout from "../layouts/mainLayouts";
import { IconizeStatus } from "./iconization/IconizeStatus";
import { IconizePurchaseProfile } from "./iconization/IconizePurchaseProfile";
import { IconizeRiskLevel } from "./iconization/IconizeRiskLevel";
import { IconizeCardHolder } from "./iconization/IconizeCardHolder";
import { IconizeGiftCard } from "./iconization/IconizeGiftCard";
// import { IconizePromo } from "./iconization/IconizePromo";
import { IconizeKitCustom } from "./iconization/IconizeKitCustom";
import { IconizePaymentOption } from "./iconization/IconizePaymentOption";
import { Style, Tab } from "@material-ui/icons";
//? Customized Components Title
import { IconizeTitleOrder } from "./iconization/IconizeTitle";
import { IconizeTitleDate } from "./iconization/IconizeTitle";
import { IconizeTitleClient } from "./iconization/IconizeTitle";
import { IconizeTitleProfile } from "./iconization/IconizeTitle";
import { IconizeTitlePayment } from "./iconization/IconizeTitle";
import { IconizeTitleGift } from "./iconization/IconizeTitle";
import { IconizeTitleItems } from "./iconization/IconizeTitle";
import { IconizeTitleValue } from "./iconization/IconizeTitle";
import { IconizeTitleDestination } from "./iconization/IconizeTitle";
import { IconizeTitleStatus } from "./iconization/IconizeTitle";
import { IconizeTitleScore } from "./iconization/IconizeTitle";
// import { IconizeTitlePromo } from "./iconization/IconizeTitle";
//? Customized Components Badge Styles
import { StyledBadge } from "./badgezation/StyledBadge"
import { StyledBadgeRisk } from "./badgezation/StyledBadge"
import { StyledBadgeIncompleteOrders } from "./badgezation/StyledBadge"
import { StyledBadgeWarning } from "./badgezation/StyledBadge"
import { StyledBadgeItems } from "./badgezation/StyledBadge"
import { StyledBadgeHist } from "./badgezation/StyledBadge"

import Title from "../admin/Title"

<>
  <StyledBadge />
  <StyledBadgeRisk />
  <StyledBadgeIncompleteOrders />
  <StyledBadgeWarning />
  <StyledBadgeItems />
  <StyledBadgeHist />
</>

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

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
      fontSize: 13,
      color: "Gray",
    },
  },
});

const LightTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: theme.palette.action.active,
        color: "Ivory",
        boxShadow: theme.shadows[2],
        fontSize: 13,
    }
}))(Tooltip);


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

        {/* Items */}

        <TableCell align="center">
          <IconButton>
            <LightTooltip 
              title={row.itemName} 
              placement="top-end"
              interactive 
              TransitionComponent={Fade} 
              TransitionProps={{ timeout: 600 }} 
              aria-label="Itens">
              <StyledBadgeItems
                badgeContent={row.items}
                max={100}
              ></StyledBadgeItems>
            </LightTooltip>
          </IconButton>
        </TableCell>

        {/* Value */}

        <TableCell align="right">{setCurrency(row.valor)}</TableCell>

        {/* Payment Option */}

        <TableCell align="center">
          <LightTooltip title={row.creditCard} placement="top" arrow interactive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} aria-label="Cartão">
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
          </LightTooltip>
        </TableCell>        

        {/* Shipping To */}

        <TableCell align="left">{row.destino}</TableCell>

        {/* Purchase Profile */}

        <TableCell align="center">
          <LightTooltip title={row.valuePurchase ? "Histórico total de compras de  " + setCurrency(row.valuePurchase) : "Primeira compra" } placement="top-end" interactive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} arrow aria-label="Cartão">
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
          </LightTooltip>
        </TableCell>

        {/* Gift */}

        <TableCell align="center">
          <LightTooltip title={row.giftName} placement="top-end" interactive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} aria-label="Itens">
            <IconButton>
              <IconizeGiftCard giftId={row.giftId} size="medium" />
            </IconButton>
          </LightTooltip>
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

        {/* <TableCell align="center">
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
        </TableCell> */}

        {/* Status */}

        <TableCell align="center">
          <LightTooltip title={row.statusDescription} placement="top-end" arrow interactive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} aria-label="Itens">
            <IconButton>
              <IconizeStatus status={row.status} size="medium" />
            </IconButton>
          </LightTooltip>  
        </TableCell>

        {/* Score */}

        <TableCell align="left">
          <LightTooltip 
          title={`Risco ${row.scoreDesc}`} 
          placement="top-end"
          arrow  
          interactive 
          TransitionComponent={Fade} 
          TransitionProps={{ timeout: 600 }} 
          aria-label="score" 
        >
            <IconButton>
              {row.score > 80 ? (
                <StyledBadgeRisk
                  badgeContent={row.score}
                  max={999}
                ></StyledBadgeRisk>
              ) : row.score > 60 ? (
                <StyledBadgeWarning
                  badgeContent={row.score}
                  max={999}
                ></StyledBadgeWarning>
              ) : (
                <StyledBadge badgeContent={row.score} max={999}></StyledBadge>
              )}
              <IconizeRiskLevel riskLevel={row.scoreDesc} size="medium" />
            </IconButton>
          </LightTooltip>
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
                    {/* <TableCell align="left">Pagamento</TableCell> */}
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
                      {/* <TableCell align="left">{historyRow.pagamento}</TableCell> */}
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
  // const classes = useStyles()
  return (
    <>
    <Title>Recentes</Title>
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="collapsible table">
        {/* <caption> */}
          {/* {<IconizeRiskLevel riskLevel={"Muito Baixo"} size="small" />} Muito
          baixo
          {<IconizeRiskLevel riskLevel={"Baixo"} size="small" />} Baixo
          {<IconizeRiskLevel riskLevel={"Moderado"} size="small" />} Moderado
          {<IconizeRiskLevel riskLevel={"Alto"} size="small" />} Alto
          {<IconizeRiskLevel riskLevel={"Muito Alto"} size="small" />} Muito
          alto */}
        {/* </caption> */}
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
            {/* <StyledTableCell align="center">{<IconizeTitlePromo size="medium" />}</StyledTableCell> */}
            <StyledTableCell align="center">{<IconizeTitleStatus size="default" />}</StyledTableCell>
            <StyledTableCell align="right">{<IconizeTitleScore size="default" />}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <Row key={order.order} row={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}