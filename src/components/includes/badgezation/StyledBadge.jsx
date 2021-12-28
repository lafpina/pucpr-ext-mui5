import { withStyles, makeStyles } from "@material-ui/styles"
import Badge from "@material-ui/core/Badge";

export const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -27,
      color: "white",
      backgroundColor: "SteelBlue",
      top: -14,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
}))(Badge);

export const StyledBadgeRisk = withStyles((theme) => ({
    badge: {
        right: -27,
        color: "white",
        backgroundColor: "Tomato",
        top: -14,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}))(Badge);

export const StyledBadgeIncompleteOrders = withStyles((theme) => ({
    badge: {
        right: -27,
        color: "white",
        backgroundColor: "NavajoWhite",
        top: -14,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}))(Badge);

export const StyledBadgeCoupon = withStyles((theme) => ({
    badge: {
        left: -65,
        color: "white",
        backgroundColor: "LightBlue",
        top: 5,
        border: `4px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}))(Badge);

export const StyledBadgeWarning = withStyles((theme) => ({
    badge: {
        right: -27,
        color: "white",
        backgroundColor: "Orange",
        top: -14,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}))(Badge);

export const StyledBadgeItems = withStyles((theme) => ({
    badge: {
        right: 0,
        color: "white",
        backgroundColor: "LightSteelBlue",
        top: 0,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "1 4px",
    },
}))(Badge);

export const StyledBadgeHist = withStyles((theme) => ({
    badge: {
        right: -27,
        color: "white",
        backgroundColor: "LightBlue",
        top: -14,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}))(Badge);