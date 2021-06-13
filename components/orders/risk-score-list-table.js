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
//? Customized Components
import setCurrency from "../lib/utils/setCurrency";
import MainLayout from "../layouts/mainLayouts";
import { IconizeStatus } from "./iconization/iconize-status";
import { IconizePurchaseProfile } from "./iconization/iconize-purchase-profile";
import { IconizeRiskLevel } from "./iconization/iconize-risk-level";
import { IconizeCardHolder } from "./iconization/iconize-card-holder";
import { IconizeGiftCard } from "./iconization/iconize-gift-card";
import { IconizeKitCustom } from "./iconization/iconize-kit-custom";

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
    backgroundColor: "SkyBlue",
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
    <React.Fragment>
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
        <TableCell component="th" align="center" scope="row">
          {row.order}
        </TableCell>
        <TableCell align="center" size="small" classes="">
          {row.dataCompra}
        </TableCell>
        <TableCell align="left">{row.cliente}</TableCell>
        <TableCell align="center">
          <IconButton>
            {row.qtyPurchase > 1 ? (
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
        <TableCell align="center">
          {row.pix > " " ? (
            <Badge color="error" variant="dot">
              <IconButton>
                <IconizeCardHolder cardHolder={row.cardHolder} size="medium" />
              </IconButton>
            </Badge>
          ) : (
            <IconButton>
              <IconizeCardHolder cardHolder={row.cardHolder} size="medium" />
            </IconButton>
          )}
        </TableCell>

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
        <TableCell align="center">
          <IconButton>
            <IconizeKitCustom kitCustom={row.kitCustom} size="medium" />
          </IconButton>
        </TableCell>

        <TableCell align="center">
          <IconButton>
            <StyledBadgeItems
              badgeContent={row.items}
              max={100}
            ></StyledBadgeItems>
          </IconButton>
        </TableCell>

        <TableCell align="right">{setCurrency(row.valor)}</TableCell>

        <TableCell align="left">{row.destino}</TableCell>

        <TableCell align="center">
          <IconButton>
            <IconizeStatus status={row.status} size="medium" />
          </IconButton>
        </TableCell>

        <TableCell align="center">
          <IconButton>
            {row.score > 85 ? (
              <StyledBadgeRisk
                badgeContent={row.score}
                max={999}
              ></StyledBadgeRisk>
            ) : (
              <StyledBadge badgeContent={row.score} max={999}></StyledBadge>
            )}

            <IconizeRiskLevel riskLevel={row.scoreDesc} size="medium" />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 1, paddingTop: 1 }} colSpan={17}>
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
                    <TableCell align="left">Pagamento</TableCell>
                    <TableCell align="center">Parcelas</TableCell>
                    <TableCell align="left">Titular do Cartão</TableCell>
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
                      <TableCell align="left">{historyRow.pagamento}</TableCell>
                      <TableCell align="center">
                        {historyRow.parcelas}
                      </TableCell>
                      <TableCell align="left">{historyRow.titular}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function RiskScoreListTable(props) {
  const { orders } = props;
  return (
    <MainLayout>
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
              <StyledTableCell align="center">PEDIDO</StyledTableCell>
              <StyledTableCell align="center"> DATA </StyledTableCell>
              <StyledTableCell align="left">CLIENTE</StyledTableCell>
              <StyledTableCell align="center">PERFIL COMPRA</StyledTableCell>
              <StyledTableCell align="center">PERFIL PAGAMENTO</StyledTableCell>

              <StyledTableCell align="center">GIFT</StyledTableCell>
              <StyledTableCell align="center">KIT</StyledTableCell>

              <StyledTableCell align="center">PRODUTOS</StyledTableCell>
              <StyledTableCell align="right">VALOR TOTAL</StyledTableCell>

              <StyledTableCell align="left">DESTINO</StyledTableCell>
              <StyledTableCell align="center">STATUS</StyledTableCell>
              <StyledTableCell align="center">SCORE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <Row key={order.order} row={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainLayout>
  );
}
