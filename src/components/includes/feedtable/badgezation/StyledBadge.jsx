import { styled } from '@mui/material/styles';
import Badge from "@mui/material/Badge";

export const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -27,
        color: "white",
        backgroundColor: "SteelBlue",
        top: -14,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));

export const StyledBadgeRisk = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -27,
        color: "white",
        backgroundColor: "Tomato",
        top: -14,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));

export const StyledBadgeIncompleteOrders = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -27,
        color: "white",
        backgroundColor: "NavajoWhite",
        top: -14,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));

export const StyledBadgeCoupon = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        left: -65,
        color: "white",
        backgroundColor: "LightBlue",
        top: 5,
        border: `4px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));

export const StyledBadgeWarning = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -27,
        color: "white",
        backgroundColor: "Orange",
        top: -14,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));

export const StyledBadgeItems = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 0,
        color: "white",
        backgroundColor: "LightSteelBlue",
        top: 0,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "1 4px",
    },
}));

export const StyledBadgeHist = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -27,
        color: "white",
        backgroundColor: "LightBlue",
        top: -14,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));
